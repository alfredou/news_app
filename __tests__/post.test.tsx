import { screen, render, waitFor, act } from "@testing-library/react";
import Post from "@/components/Post";
import { posts } from "@/mocks/post";

global.fetch = jest.fn()

/*jest.mock('../services', () => ({
  getPosts: jest.fn().mockResolvedValueOnce(posts),
}));*/

describe.skip("test the Post component", ()=>{

  beforeEach(()=>{
    jest.clearAllMocks()
})

it('check if all the post are rendered', async ()=>{
  //(global.fetch as jest.Mock).mockResolvedValueOnce(posts)
      render(<Post />);

    await waitFor(async () => {
      await new Promise(async ()=>{
        const post = await screen.findAllByTestId(/post/i);
        expect(post.length).toBe(posts.length);
      })
    });
  })
})