import { screen, render, waitFor, act } from "@testing-library/react";
import { links } from "@/navInfo";
import CategorySection from "@/components/CategorySection";

/*import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import PostListCategory from "@/components/PostListCategory";
import { getCategoryPost } from '@/services'; // Asumiendo que este es tu servicio para obtener datos
jest.mock('../services/index.ts', () => ({
  getCategoryPost: jest.fn().mockResolvedValue({ posts: [{ node: { slug: 'test-slug', featuredImage: { url: 'test-url' }, title: 'Test Title', categories: [{ name: 'Test Category' }] } }] })
}));
*/


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
  

describe.skip("CategorySection", () => {
    it("renders category sections correctly", async () => {
      render(<CategorySection />);
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0)); // Esperar a que se resuelvan las promesas pendientes
      });
  
      const categoryTitles = await screen.findAllByRole('heading', { level: 1 });
      expect(categoryTitles).toHaveLength(links.length);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });


/*describe('PostListCategory', () => {
  it('renders category posts correctly', async () => {
    render(<PostListCategory slug="Present" />);

    // Simula la intersección observada (supongamos que el elemento es visible en la pantalla)
    const divElement = screen.getByTestId('test-element');
    const observerCallback = divElement?.getBoundingClientRect().top;
    window.IntersectionObserver.prototype.observe = jest.fn().mockImplementation((_, options) => {
      options({ isIntersecting: true, boundingClientRect: { top: observerCallback } });
    });

    // Espera a que se carguen los datos de la categoría
    await waitFor(() => expect(getCategoryPost).toHaveBeenCalled());

    // Verifica que los elementos de la categoría se rendericen correctamente
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /test title/i })).toHaveAttribute('href', '/post/test-slug');
  });
});*/