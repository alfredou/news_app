export interface ApiResponse {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap:                       number;
    market_cap_rank:                  number;
    fully_diluted_valuation:          number;
    total_volume:                     number;
    high_24h:                         number;
    low_24h:                          number;
    price_change_24h:                 number;
    price_change_percentage_24h:      number;
    market_cap_change_24h:            number;
    market_cap_change_percentage_24h: number;
    circulating_supply:               number;
    total_supply:                     number;
    max_supply:                       number;
    ath:                              number;
    ath_change_percentage:            number;
    ath_date:                         Date;
    atl:                              number;
    atl_change_percentage:            number;
    atl_date:                         Date;
    roi:                              null;
    last_updated:                     Date;
}

export type CryptoTypes = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number, 
    price_change_percentage_24h: number, 
    total_volume: number
}

export type WeatherTypes = {
    temp: number
    humidity: number
    country: string
    main: string
    icon: string
    date: string
}

interface Categories {
  name: string,
  slug: string
}

interface Author {
  bio: string,
  name: string,
  id: string,
  photo: {
    url: string,
  } 
  category: Categories
}

type newAuthor = Omit<Author, "category">

export type PostAuthorsTypes = {
  postsConnection: {
      edges: Array<Edges>
    },
  authors: Author[]
}

interface ChildrenItem {
  type: string,
  children: {
    text: string
  }[]
}

interface RawContent{
   raw: {
      children: ChildrenItem[]
   }
}

interface PostData {
  author: newAuthor,
  createdAt: Date | string,
  slug: string,
  title: string,
  excerpt: string,
  featuredImage: {
    url: string,
  },
  categories: Array<Categories>,
  content: RawContent
}

interface Comments {
    name: string,
    createdAt: Date | string,
    comment: string
}

interface CommentsTypes {
  comments: Comments[]
}

interface Edges {
        node: Omit<PostData, "content">
  }

interface PostDetailsTypes {
   post: PostData
}

export type CategoryType = { categories: Array<Categories> }

export type PostTypes = {
    postsConnection: {
        edges: Array<Edges>
      }
}

type Post = Omit<PostData, "categories", "excerpt", "author", "content">

/*
export interface Post {
    createdAt: Date,
    slug: string,
    title: string,
    featuredImage: {
      url: string,
    }
}*/


export interface PostList {
  posts: Post[]
}

export interface LocationData {
  city: string;
  country: string;
}



