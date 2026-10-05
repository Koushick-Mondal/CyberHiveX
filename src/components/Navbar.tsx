import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import CyberLogo from './CyberLogo';
import { RouteLink } from './ui';
import './shell.css';
import type { PageId, PageProps } from '../types/site';

const navItems: { page: PageId; label: string; description: string }[] = [
  { page: 'home', label: 'Platform', description: 'Our approach to proactive cyber defense' },
  { page: 'rakshak', label: 'Rakshak AI', description: 'Explore the security intelligence platform' },
  { page: 'services', label: 'Services', description: 'Security services for your organization' },
  { page: 'approach', label: 'Approach', description: 'Scope, evidence, and reviewed outcomes' },
  { page: 'products', label: 'Products', description: 'Product demonstrations and development direction' },
  { page: 'pricing', label: 'Pricing', description: 'Plan a scoped security engagement' },
  { page: 'about', label: 'About', description: 'Our company, mission, and leadership' },
  { page: 'licensing', label: 'Contact', description: 'Discuss your security assessment' },
];

function MenuGlyph({ open = false }: { open?: boolean }) {
  return <span className={`shell-menu-glyph ${open ? 'is-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>;
}

export default function Navbar({ activePage, setActivePage }: PageProps & { activePage: PageId }) {
  const [menuPage, setMenuPage] = useState<PageId | null>(null);
  const isMenuOpen = menuPage === activePage;
  const setIsMenuOpen = (open: boolean) => setMenuPage(open ? activePage : null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => firstLinkRef.current?.focus());

    return () => {
      cancelAnimationFrame(focusFrame);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (!navigatingRef.current) menuButton?.focus({ preventScroll: true });
      navigatingRef.current = false;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const navigate = (page: PageId) => {
    navigatingRef.current = isMenuOpen;
    closeMenu();
    setActivePage(page);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMenu();
  };

  return (
    <>
      <header className="shell-navbar">
        <div className="shell-navbar-inner">
          <RouteLink page="home" onNavigate={navigate} className="shell-brand" aria-label="CyberHiveX Technologies — home">
            <CyberLogo size={36} variant="light" alt="" />
            <span className="shell-brand-type"><span>CyberHiveX</span><small>TECHNOLOGIES</small></span>
          </RouteLink>
          <nav className="shell-desktop-nav" aria-label="Main navigation">
            {navItems.map(({ page, label }) => (
              <RouteLink key={page} page={page} onNavigate={navigate} className="shell-nav-link" aria-current={activePage === page ? 'page' : undefined}>{label}</RouteLink>
            ))}
          </nav>
          <div className="shell-navbar-actions">
             <RouteLink page="licensing" onNavigate={navigate} className="btn-cyber-primary shell-assessment-link">Request Security Assessment<ArrowRight size={15} aria-hidden="true" /></RouteLink>
            <button ref={menuButtonRef} type="button" className="shell-menu-button" onClick={() => setIsMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-controls="site-navigation-dialog" aria-haspopup="dialog">
              <span>MENU</span><MenuGlyph open={isMenuOpen} />
            </button>
          </div>
        </div>
      </header>
      {createPortal(
        <dialog ref={dialogRef} id="site-navigation-dialog" className="shell-navigation-dialog" aria-labelledby="site-navigation-title" onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClose={closeMenu} onClick={handleBackdropClick}>
          <div className="shell-drawer">
            <div className="shell-drawer-header">
              <div><p className="shell-drawer-eyebrow">CYBERHIVEX TECHNOLOGIES</p><h2 id="site-navigation-title">Explore</h2></div>
              <button type="button" className="shell-menu-button" onClick={closeMenu} aria-label="Close navigation menu"><span>CLOSE</span><MenuGlyph open /></button>
            </div>
            <nav aria-label="Expanded navigation" className="shell-drawer-nav">
              {navItems.map(({ page, label, description }, index) => (
                <RouteLink key={page} ref={index === 0 ? firstLinkRef : undefined} page={page} onNavigate={navigate} className="shell-drawer-link" aria-current={activePage === page ? 'page' : undefined}>
                  <span className="shell-route-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="shell-route-copy"><strong>{label}</strong><span>{description}</span></span>
                  <ArrowRight size={18} aria-hidden="true" />
                </RouteLink>
              ))}
            </nav>
            <div className="shell-drawer-secondary">
              <RouteLink page="ecosystem" onNavigate={navigate} aria-current={activePage === 'ecosystem' ? 'page' : undefined}>Explore our defense ecosystem<ArrowRight size={16} aria-hidden="true" /></RouteLink>
              <RouteLink page="licensing" onNavigate={navigate} className="btn-cyber-primary">Request security assessment<ArrowRight size={16} aria-hidden="true" /></RouteLink>
              <p>Detect. Defend. Dominate.</p>
            </div>
          </div>
        </dialog>, document.body,
      )}
    </>
  );
}
