import { ArrowRight, ArrowUp } from 'lucide-react';
import CyberLogo from './CyberLogo';
import { RouteLink } from './ui';
import './shell.css';
import type { PageId, PageProps } from '../types/site';
import { routes } from '../routes';
import UserModeControl from './UserModeControl';

const CURRENT_YEAR = new Date().getFullYear();

const groups: { heading: string; links: { label: string; page: PageId; query?: string; fragment?: string }[] }[] = [
  { heading: 'Company', links: [{ label: 'About', page: 'about' }, { label: 'Our approach', page: 'approach' }, { label: 'Contact', page: 'licensing' }] },
  { heading: 'Services', links: [{ label: 'Threat intelligence', page: 'services', query: 'service=threat-intelligence' }, { label: 'Security automation', page: 'services', query: 'service=automation' }, { label: 'OSINT', page: 'services', query: 'service=osint' }, { label: 'Digital forensics', page: 'services', query: 'service=forensics' }, { label: 'Red teaming', page: 'services', query: 'service=red-team' }, { label: 'Pricing & scope', page: 'pricing' }] },
  { heading: 'Products', links: [{ label: 'Product overview', page: 'products' }, { label: 'Rakshak AI', page: 'rakshak' }, { label: 'Development direction', page: 'products', fragment: 'roadmap' }, { label: 'Threat Lab demo', page: 'threatlab' }] },
  { heading: 'Legal', links: [{ label: 'Privacy information', page: 'privacy' }, { label: 'Terms information', page: 'terms' }, { label: 'Cookie information', page: 'cookies' }, { label: 'Responsible disclosure', page: 'disclosure' }] },
];

export default function Footer({ setActivePage }: PageProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  const linkList = (links: typeof groups[number]['links']) => <ul>{links.map(({ page, label, query, fragment }) => <li key={`${page}-${label}`}>{query || fragment ? <a href={`${routes[page].path}${query ? `?${query}` : ''}${fragment ? `#${fragment}` : ''}`}>{label}</a> : <RouteLink page={page} onNavigate={setActivePage}>{label}</RouteLink>}</li>)}</ul>;

  return (
    <footer className="shell-footer" data-component="site-footer">
      <div className="cyber-container">
        <div className="shell-footer-grid">
          <div className="shell-footer-brand-block">
            <RouteLink page="home" onNavigate={setActivePage} className="shell-brand" aria-label="CyberHiveX Technologies — home">
              <CyberLogo size={40} variant="light" alt="" />
              <span className="shell-brand-type"><span>CyberHiveX</span><small>TECHNOLOGIES</small></span>
            </RouteLink>
             <p>AI-Powered Proactive Cybersecurity &amp; Digital Defense</p>
             <p className="shell-footer-tagline" data-tagline="true">DETECT. DEFEND. DOMINATE.</p>
             <UserModeControl />
          </div>
           {groups.map(({ heading, links }) => <nav key={heading} className="shell-footer-links" aria-labelledby={`footer-${heading.toLowerCase()}-heading`}><h2 id={`footer-${heading.toLowerCase()}-heading`}>{heading}</h2>{linkList(links)}</nav>)}
           <div className="shell-footer-contact"><h2>Start a conversation</h2><p>Discuss your security priorities and assessment requirements.</p><RouteLink page="licensing" onNavigate={setActivePage} className="shell-footer-contact-link">Request security assessment<ArrowRight size={16} aria-hidden="true" /></RouteLink><p className="shell-footer-location">Greater Noida, Uttar Pradesh, India</p></div>
        </div>
        <div className="shell-footer-bottom"><p>© {CURRENT_YEAR} CyberHiveX Technologies. All rights reserved.</p><button type="button" onClick={scrollToTop} className="shell-top-button">Back to top<ArrowUp size={16} aria-hidden="true" /></button></div>
      </div>
    </footer>
  );
}
