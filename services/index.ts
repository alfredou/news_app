import { request, gql } from 'graphql-request';
import { PostTypes, Edges } from '@/types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async (): Promise<Array<Edges>> => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
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

    //const result = await request<PostTypes>(graphqlAPI, query);
    const res = await fetch(graphqlAPI, {
      cache: "no-store",
      next: {revalidate: 20},
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query
      })
    })
    const result = await res.json()
    const {postsConnection} = result.data as PostTypes

    return postsConnection.edges
}