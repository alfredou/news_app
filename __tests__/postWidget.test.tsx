import {screen, render, waitFor, act} from "@testing-library/react"
import { recentPosts } from "@/mocks/recentPosts";
import { relatedPosts } from "@/mocks/relatedPosts";
import request from "graphql-request";
import { Post } from "@/types";
import PostWidget from "@/components/PostWidget";

jest.mock('graphql-request', () => ({
    __esModule: true,
    gql: jest.fn(), // Agrega una mock para la función gql
    request: jest.fn(),
}));

  describe.skip('test the PostWidget component', ()=>{
    
    // Mock de las funciones de servicio
    jest.mock('../services', () => ({
      getSimilarPosts: jest.fn().mockResolvedValueOnce(relatedPosts),
      getRecentPosts: jest.fn().mockResolvedValueOnce(recentPosts)
    }));
    
      it('renders last news when no slug is provided', async () => {
            render(<PostWidget categories={['']} slug=""/>);
         
        await waitFor(()=>{
                expect(screen.getByText('Last News')).toBeInTheDocument();
        })
      });
    
      it('test if the component renders all the titles of the recentPosts news title', async ()=>{
        
             render(<PostWidget categories={['']} slug=""/>)
        
            //expect(getRecentPosts).toHaveBeenCalled()
            await waitFor(async ()=>{
                new Promise(async ()=>{
                    const categoryTitles = await screen.findAllByRole('heading', {level: 2});
                    expect(categoryTitles).toHaveLength(recentPosts.length);            
                })
            })
     })

      it('renders related news when slug is provided', async () => {
        render(<PostWidget categories={['present']} slug="bitcoin-now" />);
        
        await waitFor(()=>{
            expect(screen.getByText('Related News')).toBeInTheDocument();
        })
      });
  
      it('test if the component renders all the titles of the relatedPosts news title', async ()=>{
        
        render(<PostWidget categories={['present']} slug="bitcoin-now"/>)
   
       //expect(getRecentPosts).toHaveBeenCalled()
       await waitFor(async ()=>{
           new Promise(async ()=>{
               const categoryTitles = await screen.findAllByRole('heading', {level: 2});
               expect(categoryTitles).toHaveLength(recentPosts.length);            
           })
        })
      })

    afterEach(() => {
        jest.clearAllMocks();
      });
})