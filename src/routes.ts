import type { PageId } from './types/site';

export interface SiteRoute {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

export const routes = {
  home: { path: '/', title: 'CyberHiveX Technologies | AI-Powered Proactive Cybersecurity', description: 'CyberHiveX Technologies builds AI-powered proactive cybersecurity solutions for threat intelligence, vulnerability assessment, security testing, digital forensics, incident response, and digital resilience.' },
  about: { path: '/about', title: 'About CyberHiveX | Mission & Leadership', description: 'Meet the founders of CyberHiveX Technologies and explore our mission, working principles, and approach to defensive security.' },
  services: { path: '/services', title: 'Security Services | CyberHiveX', description: 'Explore authorized security assessments, application testing, cloud review, incident response, and security consulting engagements.' },
  rakshak: { path: '/rakshak-ai', title: 'Rakshak AI | Security Intelligence Workspace', description: 'Explore Rakshak AI through a local demonstration of security intelligence, investigation, evidence review, and human-guided response.' },
  products: { path: '/products', title: 'Products & Development Direction | CyberHiveX', description: 'Explore Rakshak AI, its local product demonstration, and the development direction of CyberHiveX security tools.' },
  approach: { path: '/approach', title: 'Our Security Approach | CyberHiveX', description: 'Understand our security engagement process, from agreed scope and evidence collection to reviewed findings and remediation guidance.' },
  pricing: { path: '/pricing', title: 'Pricing & Engagement Scope | CyberHiveX', description: 'Learn how assessment scope, environment, deliverables, and support requirements shape a custom CyberHiveX engagement quote.' },
  licensing: { path: '/contact', title: 'Contact & Assessment Requests | CyberHiveX', description: 'Prepare a security assessment or Rakshak AI inquiry with your environment, priorities, and engagement requirements.' },
  disclosure: { path: '/responsible-disclosure', title: 'Responsible Disclosure | CyberHiveX', description: 'Review guidance for preparing a vulnerability report, protecting sensitive evidence, and discussing authorized security research.' },
  privacy: { path: '/privacy-policy', title: 'Privacy Information | CyberHiveX', description: 'Review current privacy information for the CyberHiveX website and local demonstrations. Formal policy publication is pending.', noindex: true },
  terms: { path: '/terms', title: 'Website Terms Information | CyberHiveX', description: 'Review website and demonstration usage information. Formal terms and engagement agreements are pending publication.', noindex: true },
  cookies: { path: '/cookie-policy', title: 'Cookie & Browser Storage Information | CyberHiveX', description: 'Learn about browser storage, external font requests, and local interactions on this website. Formal cookie policy publication is pending.', noindex: true },
  capabilities: { path: '/capabilities', title: 'Security Capabilities | CyberHiveX', description: 'Explore CyberHiveX security capabilities and a clearly labelled local demonstration of authorized assessment workflows.' },
  solutions: { path: '/solutions', title: 'Security Solutions & Readiness | CyberHiveX', description: 'Explore security engagement options and use a local readiness checklist to organize your assessment priorities.' },
  ecosystem: { path: '/ecosystem', title: 'Defense Ecosystem | CyberHiveX', description: 'Explore a conceptual security lifecycle linking visibility, evidence, investigation, and reviewed response.' },
  threatlab: { path: '/threatlab', title: 'Threat Lab | Local Security Scenarios', description: 'Explore fictional threat scenarios in a local browser demonstration and inspect the resulting security investigation narrative.' },
  notfound: { path: '/404', title: 'Page Not Found | CyberHiveX', description: 'This page could not be found. Return to the CyberHiveX platform, explore services, or contact the team.', noindex: true },
} satisfies Record<PageId, SiteRoute>;

export const legacyHashRoutes: Readonly<Record<string, PageId>> = {
  '#home': 'home', '#about': 'about', '#services': 'capabilities',
  '#capabilities': 'capabilities', '#contact': 'licensing', '#licensing': 'licensing',
  '#rakshak': 'rakshak', '#solutions': 'solutions', '#ecosystem': 'ecosystem',
  '#threatlab': 'threatlab', '#cyber-intelligence': 'threatlab', '#security': 'ecosystem',
};

export function resolvePage(pathname: string, hash = ''): PageId {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path === '/' && legacyHashRoutes[hash.toLowerCase()]) return legacyHashRoutes[hash.toLowerCase()];
  return (Object.keys(routes) as PageId[]).find((page) => routes[page].path === path) ?? 'notfound';
}

/** A deployment origin is optional; never infer a public domain from the brand. */
export function validatedSiteOrigin(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return undefined;
    return url.origin;
  } catch { return undefined; }
}

export function routeMetadata(page: PageId): SiteRoute {
  return routes[page];
}
