export type PageId =
  | 'home' | 'about' | 'rakshak' | 'capabilities' | 'solutions' | 'ecosystem'
  | 'threatlab' | 'licensing' | 'services' | 'products' | 'approach' | 'pricing'
  | 'disclosure' | 'privacy' | 'terms' | 'cookies' | 'notfound';
export type Navigate = (page: PageId) => void;
export interface PageProps { setActivePage: Navigate }
