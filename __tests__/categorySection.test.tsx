import { screen, render, waitFor, act } from "@testing-library/react";
import { links } from "@/navInfo";
import CategorySection from "@/components/CategorySection";
import PostListCategory from "@/components/PostListCategory";
import { presentPostsMock } from "@/mocks/presentPostsMock";


class IntersectionObserverMock implements IntersectionObserver {
    constructor() {}
    root!: Element | Document | null;
    rootMargin!: string;
    thresholds!: readonly number[];
    takeRecords(): IntersectionObserverEntry[] {
        throw new Error("Method not implemented.");
    }
    observe(target: Element) {
      return null;
    }
    unobserve(target: Element) {
      return null;
    }
    disconnect() {
      return null;
    }
  }
  (window as any).IntersectionObserver = IntersectionObserverMock;
  

describe("test the CategorySection and PostlistCategory components", () => {
    it("test if all the titles of the categorySection component are rendered", async () => {
      render(<CategorySection />);
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0)); // Esperar a que se resuelvan las promesas pendientes
      });
  
      const categoryTitles = await screen.findAllByRole('heading', { level: 1 });
      expect(categoryTitles).toHaveLength(links.length);
    });

  it('test if the post title and category name are rendered in the screen', async () => {
    render(<PostListCategory slug="Present" />);

    await waitFor(() => {
      new Promise(async ()=>{
        const categoryTitles = await screen.findAllByRole('heading', { level: 1 });
        const categoryPostName = await screen.findAllByRole('heading', { level: 2 });
        expect(categoryTitles).toHaveLength(presentPostsMock.slice(0,3).length)  
        expect(categoryPostName).toHaveLength(presentPostsMock.slice(0,3).length)      
         })
      });
   });

  afterEach(() => {
     jest.clearAllMocks();
   });
});
