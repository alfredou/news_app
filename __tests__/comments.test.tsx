import Comments from "@/components/Comments"
import {screen, render, waitFor } from "@testing-library/react"
import { postDetailMock } from "@/mocks/postDetailMock"
import { commentsMock } from "@/mocks/commentsMock"
import request from "graphql-request"
import { getComments } from "@/services"

jest.mock('graphql-request', () => ({
    __esModule: true,
    gql: jest.fn(), 
    request: jest.fn(),
}));

describe("test the Comments component", ()=>{
/*jest.mock("../services", ()=>({
    getComments: jest.fn().mockResolvedValueOnce(commentsMock)
}))*/

    it("test if the component renders the title comments", async ()=>{
        render(<Comments slug={postDetailMock.slug}/>)
        await waitFor(()=>{
             new Promise(async ()=>{
                expect(await screen.findByText(/2 Comments/i))
            })
        })
    })
    
    it("test if the component renders all the comments", async ()=>{
        render(<Comments slug={postDetailMock.slug}/>)       
         await waitFor(()=>{
         new Promise(async ()=>{
            const comments = await screen.findAllByTestId(/comments/i)
            expect(comments).toHaveLength(commentsMock.length)
           })
        })
    })
})