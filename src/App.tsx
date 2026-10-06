import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode, type RefObject } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageMetadata from './components/PageMetadata';
import { legacyHashRoutes, resolvePage, routes } from './routes';
import type { Navigate, PageId, PageProps } from './types/site';
import { usePageMotion } from './hooks/usePageMotion';
import { useMagneticInteractions } from './hooks/useMagneticInteractions';

const LegalPage = lazy(() => import('./pages/LegalPage'));
const pages: Record<PageId, ComponentType<PageProps>> = {
  home: lazy(() => import('./pages/HomePage')),
  about: lazy(() => import('./pages/AboutPage')),
  rakshak: lazy(() => import('./pages/RakshakAIPage')),
  services: lazy(() => import('./pages/ServicesPage')),
  products: lazy(() => import('./pages/ProductsPage')),
  approach: lazy(() => import('./pages/ApproachPage')),
  pricing: lazy(() => import('./pages/PricingPage')),
  disclosure: lazy(() => import('./pages/ResponsibleDisclosurePage')),
  notfound: lazy(() => import('./pages/NotFoundPage')),
  privacy: (props) => <LegalPage {...props} document="privacy" />,
  terms: (props) => <LegalPage {...props} document="terms" />,
  cookies: (props) => <LegalPage {...props} document="cookies" />,
  capabilities: lazy(() => import('./pages/CapabilitiesPage')),
  solutions: lazy(() => import('./pages/SolutionsPage')),
  ecosystem: lazy(() => import('./pages/EcosystemPage')),
  threatlab: lazy(() => import('./pages/ThreatLabPage')),
  licensing: lazy(() => import('./pages/LicensingContactPage')),
};

function currentRoute() {
  return { page: resolvePage(window.location.pathname, window.location.hash), location: window.location.pathname + window.location.search + window.location.hash, hash: window.location.hash };
}
type RouteState = ReturnType<typeof currentRoute>;

class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return (
      <section className="cyber-container page-feedback" role="alert">
        <h1>This page could not load.</h1>
        <p>Your connection may have changed. Reload to try again. No inquiry has been submitted.</p>
        <button type="button" className="btn-cyber-primary" onClick={() => window.location.reload()}>Reload page</button>
      </section>
    );
    return this.props.children;
  }
}

/** Runs after a lazy page commits, so focus and section links target loaded content. */
function RouteView({ route, setActivePage, mainRef, hasNavigated }: { route: RouteState; setActivePage: Navigate; mainRef: RefObject<HTMLElement | null>; hasNavigated: RefObject<boolean> }) {
  const Page = pages[route.page];
  usePageMotion(mainRef, route.location);
  useMagneticInteractions(mainRef, route.location);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const legacyHash = window.location.pathname === '/' && legacyHashRoutes[route.hash.toLowerCase()];
      let section: HTMLElement | null = null;
      if (route.hash && !legacyHash) {
        try { section = document.getElementById(decodeURIComponent(route.hash.slice(1))); } catch { /* Malformed fragments simply have no target. */ }
      }
      if (section) {
        section.scrollIntoView({ block: 'start', behavior: 'auto' });
        if (!section.hasAttribute('tabindex')) section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
      } else if (hasNavigated.current) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        mainRef.current?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route, mainRef, hasNavigated]);
  return <div className="route-view" key={route.page}><Page setActivePage={setActivePage} /></div>;
}

function AppShell() {
  const [route, setRoute] = useState(currentRoute);
  const mainRef = useRef<HTMLElement>(null);
  const hasNavigated = useRef(false);

  useEffect(() => {
    const syncRoute = () => { hasNavigated.current = true; setRoute(currentRoute()); };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const navigate = useCallback<Navigate>((page) => {
    const path = routes[page].path;
    if (window.location.pathname === path && !window.location.hash && !window.location.search) {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      mainRef.current?.focus({ preventScroll: true });
      return;
    }
    window.history.pushState(null, '', path);
    hasNavigated.current = true;
    setRoute(currentRoute());
  }, []);

  return (
    <>
      <div className="site-app">
      <PageMetadata page={route.page} />
      <a href="#main-content" className="skip-link" onClick={(event) => { event.preventDefault(); mainRef.current?.focus(); }}>Skip to main content</a>
      <Navbar activePage={route.page} setActivePage={navigate} />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <PageErrorBoundary key={route.page}>
          <Suspense fallback={<div className="cyber-container page-feedback" role="status"><h1>Loading page</h1><p>Preparing your view…</p></div>}>
            <RouteView route={route} setActivePage={navigate} mainRef={mainRef} hasNavigated={hasNavigated} />
          </Suspense>
        </PageErrorBoundary>
      </main>
      <Footer setActivePage={navigate} />
      </div>
    </>
  );
}

export default function App() {
  return <AppShell />;
}
