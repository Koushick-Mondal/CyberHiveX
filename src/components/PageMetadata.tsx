import { useEffect } from 'react';
import { routeMetadata, validatedSiteOrigin } from '../routes';
import type { PageId } from '../types/site';

function updateMeta(attribute: 'name' | 'property', key: string, content: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  const element = existing ?? document.createElement('meta');
  element.setAttribute(attribute, key);
  element.content = content;
  if (!existing) document.head.append(element);
}

export default function PageMetadata({ page }: { page: PageId }) {
  useEffect(() => {
    const metadata = routeMetadata(page);
    const origin = validatedSiteOrigin(import.meta.env.VITE_SITE_URL) ?? window.location.origin;
    const canonical = new URL(metadata.path, origin).href;
    document.title = metadata.title;
    updateMeta('name', 'description', metadata.description);
    updateMeta('name', 'robots', metadata.noindex ? 'noindex, follow' : 'index, follow');
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:site_name', 'CyberHiveX Technologies');
    updateMeta('property', 'og:title', metadata.title);
    updateMeta('property', 'og:description', metadata.description);
    updateMeta('property', 'og:url', canonical);
    updateMeta('property', 'og:image', new URL('/cyberhivex-full-clean.png', origin).href);
    updateMeta('property', 'og:image:alt', 'CyberHiveX Technologies');
    updateMeta('name', 'twitter:card', 'summary');
    updateMeta('name', 'twitter:title', metadata.title);
    updateMeta('name', 'twitter:description', metadata.description);
    updateMeta('name', 'twitter:image', new URL('/cyberhivex-full-clean.png', origin).href);
    const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page === 'notfound') {
      existing?.remove();
    } else {
      const link = existing ?? document.createElement('link');
      link.rel = 'canonical';
      link.href = canonical;
      if (!existing) document.head.append(link);
    }
  }, [page]);
  return null;
}
