import { postDetailMock } from "@/mocks/postDetailMock";
import {screen, render, waitFor, act} from "@testing-library/react"
import PostDetail from "@/components/PostDetail";
import { social } from "@/navInfo";

describe.skip("test the postDetail component", ()=>{
    it("test if the postDetail component renders the title", ()=>{
        render(<PostDetail post={postDetailMock}/>)
        const PostDetailTitle = screen.getByRole('heading', {level: 1})
        expect(PostDetailTitle).toBeInTheDocument()   
    })

    it('test if all the social media icons are rendered', async ()=>{
        await act(async () => {
          render(<PostDetail post={postDetailMock} />);
        })
      
        await waitFor(async () => {
          const socialIcons = await screen.findAllByTestId(/social/i);
          expect(socialIcons).toHaveLength(social.length);
        });
      })
})