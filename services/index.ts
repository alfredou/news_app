import { request, gql } from 'graphql-request';
import { PostAuthorsTypes, PostTypes, Edges, PostList, CategoryType, PostDetailsTypes, Comments, CommentsTypes} from '@/types';
import { CombinedType } from '@/components/CommentsForm';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async (limit?: number): Promise<Array<Edges>> => {
  const query = gql`
    query MyQuery($limit: Int){
      postsConnection(
        orderBy: createdAt_ASC
        last: $limit
      ){
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const variables = {
    limit: limit !== undefined ? limit : 100
  }
    //const result = await request<PostTypes>(graphqlAPI, query);
    const res = await fetch(graphqlAPI, {
      //cache: "no-store",
      next: {revalidate: 20},
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    

      const result = await res.json()
      const {postsConnection} = result.data as PostTypes
      
      return postsConnection.edges
}


export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          id
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  //const result = await request<PostDetailsTypes>(graphqlAPI, query, { slug });

  //return result.post;
  const variables = {slug}

  const res = await fetch(graphqlAPI, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables
      })
  })

  const result = await res.json()
  // Guard against null/undefined responses from the API
  if (!result || !result.data || !result.data.post) {
    return null
  }

  const resultingData = result.data as PostDetailsTypes
  return resultingData.post;
};

export const getSimilarPosts = async (slug: string, categories: string[]) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request<PostList>(graphqlAPI, query, {slug, categories});
  
  return result;
};


export const submitComment = async (obj: CombinedType) => {
  try{
    const result = await fetch("/api/comments", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const resultingRes = await result.json()
    return resultingRes

  }catch(e){
    console.log(e)
  }
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request<CommentsTypes>(graphqlAPI, query, { slug });

  return result
};


export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request<PostList>(graphqlAPI, query);

  return result
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories(first: 5) {
          name
          slug
        }
    }
  `;

  //const result = await request<CategoryType>(graphqlAPI, query);
    //const result = await request<PostTypes>(graphqlAPI, query);
    const res = await fetch(graphqlAPI, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query
      })
    })
    const result = await res.json()
    const {categories} = result.data as CategoryType

    return categories;
};

export const getCategoryPost = async (slug: string, limit: number) => {
  const query = gql`
  query GetCategoryPost($slug: String!, $limit: Int) {
    postsConnection(where: {categories_some: {slug: $slug}}, first: $limit) {
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }   
      }
    }
      authors {
        bio
      id
      name
      photo {
       url
      }
      category{
        name
        slug
      }
    }
  }`;


  const result = await request<PostAuthorsTypes>(graphqlAPI, query, { slug, limit });

  return {posts: result.postsConnection.edges, authors: result.authors};
};

/*
export const getAuthors = async ()=>{
 const query = gql`query MyQuery() {
  authors {
    bio
    id
    name
    photo {
      url
    }
    category{
      name
      slug
    }
  }
}`
   
  const result = await request<AuthorsList>(graphqlAPI, query)

  return result.authors
}*/