import Author from "@/components/Author";
import {screen, render } from "@testing-library/react"
import { postDetailMock } from "@/mocks/postDetailMock";

describe("test the Author component",()=>{
    it("test if the author component renders the author name", ()=>{
        render(<Author author={postDetailMock.author}/>)
        const authorName = screen.getByRole('heading', {level: 3})
        expect(authorName).toBeInTheDocument()
    })
    it("test if the author component renders the author bio", ()=>{
        render(<Author author={postDetailMock.author}/>)
        const authorBio = screen.getByText(postDetailMock.author.bio)
        expect(authorBio).toBeInTheDocument()
    })
})