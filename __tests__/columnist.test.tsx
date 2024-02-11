import { authorsMock } from "@/mocks/authorsMock"
import Columnist from "@/components/Columnist"
import {screen, render} from "@testing-library/react"

describe.skip("Test the columnist component", ()=>{
    it("test if the authors are rendered",()=>{
         render(<Columnist authors={authorsMock}/>)
         expect(screen.getByText(/columnists/i)).toBeInTheDocument()
    })
    it("test if all the authors are rendered", async ()=>{
        render(<Columnist authors={authorsMock}/>)
        const authors = await screen.findAllByTestId(/columnist/i)
        expect(authors).toHaveLength(authorsMock.length)
    })
    it("test if the first name of the author is displayed", ()=>{
        render(<Columnist authors={authorsMock}/>)
        const firstAuthor = screen.getByText(authorsMock[0].name)
        expect(firstAuthor).toBeInTheDocument()
    })
})