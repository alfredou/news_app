declare module "intersection-observer" {
    class IntersectionObserver {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit);
      observe(target: Element): void;
      unobserve(target: Element): void;
      disconnect(): void;
    }
  
    interface IntersectionObserverInit {
      root?: Element | null;
      rootMargin?: string;
      threshold?: number | number[];
    }
  
    type IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => void;
  
    interface IntersectionObserverEntry {
      readonly time: number;
      readonly rootBounds: DOMRectReadOnly | null;
      readonly boundingClientRect: DOMRectReadOnly;
      readonly intersectionRect: DOMRectReadOnly;
      readonly isIntersecting: boolean;
      readonly target: Element;
      readonly intersectionRatio: number;
    }
  
    export default IntersectionObserver;
  }
  