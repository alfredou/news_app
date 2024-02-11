import {screen, render, findByRole, findByText, getByText} from "@testing-library/react"
import CategoryPostList from "@/components/CategoryPostList"
import { presentPostsMock } from "@/mocks/presentPostsMock"


describe.skip("test the categoryPostList componente", ()=>{
    it("test if the component renders the first title", async ()=>{
          render(<CategoryPostList post={presentPostsMock}/>)
          const firstTitle = screen.getByText(presentPostsMock[0].node.title)
          expect(firstTitle).toBeInTheDocument()
    })
    it("test if the component renders all the titles", async ()=>{
          render(<CategoryPostList post={presentPostsMock}/>)
          const titleList = await screen.findAllByRole("heading", {level: 1})
          expect(titleList).toHaveLength(presentPostsMock.length)
    })
})