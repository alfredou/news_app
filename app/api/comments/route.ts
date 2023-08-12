import { GraphQLClient, gql } from 'graphql-request';
import { NextRequest, NextResponse } from "next/server";

interface CreateCommentResponse {
  createComment: {
    id: string
  }
}
const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!
const TOKEN: string | undefined = process.env.GRAPCMS_TOKEN
/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */
//cuando cambies tu archivo .env tienes que reiniciar tu servidor
// export a default function for API route to work
export async function POST(req: NextRequest) {
  try{
    //con el token autenticaremos o autorizaremos nuestro cliente graphql
    const body = await req.json()
    
      const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      });

       const query = gql`
         mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
           createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
         }
       `;

      const result = await graphQLClient.request<CreateCommentResponse>(query, body);
  
     return new NextResponse(JSON.stringify(result), { status: 201});
     //return res.status(200).send(result);
   } 
    catch(e){
       console.log(e)
     }
}
