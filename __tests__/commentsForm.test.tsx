import CommentsForm from "@/components/CommentsForm"
import {screen, render, fireEvent} from "@testing-library/react"
import { postDetailMock } from "@/mocks/postDetailMock"

describe("test the CommentsForm component", ()=>{
    it("test if the commentsForm title is rendered", ()=>{
        render(<CommentsForm slug={postDetailMock.slug}/>)
        expect(screen.getByText(/Leave a Reply/i)).toBeInTheDocument()
    })

    it("test if we can write in the commentsForm component", ()=>{
        render(<CommentsForm slug={postDetailMock.slug}/>)
        const commentInput = screen.getByPlaceholderText(/Comment/i)
        const nameInput = screen.getByPlaceholderText(/Name/i)
        const emailInput = screen.getByPlaceholderText(/Email/i)

        fireEvent.change(commentInput, {target: {value: "This is the comment input"}})
        fireEvent.change(nameInput, {target: {value: "This is the name input"}})
        fireEvent.change(emailInput, {target: {value: "This is the email input"}})

        expect(commentInput).toHaveValue("This is the comment input")
        expect(nameInput).toHaveValue("This is the name input")
        expect(emailInput).toHaveValue("This is the email input")
    })
})