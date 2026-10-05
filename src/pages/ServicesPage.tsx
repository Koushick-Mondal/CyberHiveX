import { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Badge, Button, RouteLink, SectionHeader } from '../components/ui';
import type { PageProps } from '../types/site';
import { capabilities } from './capabilityData';
import { serviceCatalogue, serviceCategories } from './serviceCatalogue';
import type { ServiceCategory } from './serviceCatalogue';
import './pages.css';

export default function ServicesPage({ setActivePage }: PageProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');
  const [selected, setSelected] = useState(() => typeof window === 'undefined' ? 'threat-intelligence' : new URLSearchParams(window.location.search).get('service') || 'threat-intelligence');
  const search = query.trim().toLowerCase();
  const matches = serviceCatalogue.filter((service) => (category === 'all' || service.category === category) && `${service.label} ${service.scope} ${service.useCase} ${service.deliverable}`.toLowerCase().includes(search));
  const current = matches.find((service) => service.id === selected) ?? matches[0];
  const detail = capabilities.find((capability) => capability.id === current?.capability);
  const resetFilters = () => { setQuery(''); setCategory('all'); };

  return <div className="chx-pages pg-services"><div className="cyber-container">
    <header className="pg-hero"><div className="pg-eyebrow">Services</div><h1>A focused scope.<br />A useful working output.</h1><p className="pg-lead">Explore CyberHiveX’s security disciplines and engagement options. Start with the problem, define the authorized environment, and agree what a useful deliverable looks like.</p><p className="pg-note">Service scope, staffing, timing, and commercial availability are confirmed during an engagement discussion. This catalogue is a starting point for that conversation.</p></header>
    <section aria-labelledby="service-catalogue-title">
      <SectionHeader number="01" eyebrow="Service catalogue" title="Find the right starting point." description="Search or filter the catalogue, then select a service to review its scope and output." />
      <h2 id="service-catalogue-title" className="pg-sr-only">Search and explore services</h2>
      <div className="pg-catalogue-controls">
        <label htmlFor="service-search">Search services</label>
        <div className="pg-search"><Search size={18} aria-hidden="true" /><input id="service-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try evidence, cloud, or automation" autoComplete="off" /></div>
        <div className="pg-filter-buttons" role="group" aria-label="Service category">
          <Button variant="outline" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All services</Button>
          {serviceCategories.map((item) => <Button key={item.id} variant="outline" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</Button>)}
        </div>
        <p className="pg-results-count" role="status">{matches.length} {matches.length === 1 ? 'service' : 'services'} match your filters.</p>
      </div>
      {current ? <div className="pg-catalogue-layout">
        <ul className="pg-service-list" aria-label="Matching services">{matches.map((service) => <li key={service.id}><button type="button" aria-pressed={current.id === service.id} aria-controls="service-detail" onClick={() => setSelected(service.id)}><span>{service.label}</span><small>{service.metadata}</small><ArrowRight size={16} aria-hidden="true" /></button></li>)}</ul>
        <section id="service-detail" className="pg-panel" aria-labelledby="service-detail-title">
          <Badge>Scoped engagement</Badge><h2 id="service-detail-title">{current.label}</h2><p className="pg-label">{current.metadata}</p>
          <dl className="pg-detail-list"><div><dt>Scope</dt><dd>{current.scope}</dd></div><div><dt>When it helps</dt><dd>{current.useCase}</dd></div><div><dt>Working deliverable</dt><dd>{current.deliverable}</dd></div></dl>
          {detail && <div className="pg-service-context"><h3>Capability context</h3><p>{detail.description}</p><RouteLink page="capabilities" onNavigate={setActivePage} className="pg-card-link">Explore technical review topics <ArrowRight size={16} aria-hidden="true" /></RouteLink></div>}
          {current.category === 'organization' && <RouteLink page="solutions" onNavigate={setActivePage} className="pg-card-link">Explore organization solutions <ArrowRight size={16} aria-hidden="true" /></RouteLink>}
          <div className="pg-actions"><RouteLink page="licensing" onNavigate={setActivePage} className="btn-cyber-primary">Discuss {current.label.toLowerCase()} <ArrowRight size={16} aria-hidden="true" /></RouteLink><RouteLink page="pricing" onNavigate={setActivePage} className="btn-cyber-outline">How quoting works</RouteLink></div>
        </section>
      </div> : <div className="pg-empty-state"><h3>No services match these filters.</h3><p>Try a broader term or return to the full catalogue.</p><Button variant="outline" onClick={resetFilters}>Reset filters</Button></div>}
    </section>
    <section className="pg-cta" aria-label="Engagement methodology"><div><h2>Assessment is part of a wider workflow.</h2><p>See how authorized investigation connects to prioritization, defense, response, and improvement.</p></div><RouteLink page="approach" onNavigate={setActivePage} className="btn-cyber-outline">Explore our approach <ArrowRight size={16} aria-hidden="true" /></RouteLink></section>
  </div></div>;
}
