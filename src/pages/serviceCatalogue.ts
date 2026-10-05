import type { CapabilityId } from './capabilityData';

export const serviceCategories = [
  { id: 'investigation', label: 'Intelligence & investigation' },
  { id: 'assurance', label: 'Security assessment' },
  { id: 'operations', label: 'Security operations' },
  { id: 'organization', label: 'Enterprise & MSME' },
  { id: 'platform', label: 'Platform & licensing' },
] as const;

export type ServiceCategory = typeof serviceCategories[number]['id'];
interface Service {
  id: string;
  label: string;
  category: ServiceCategory;
  scope: string;
  useCase: string;
  metadata: string;
  deliverable: string;
  capability?: CapabilityId;
}

export const serviceCatalogue: readonly Service[] = [
  { id: 'security-assessment', label: 'Security assessment', category: 'assurance', scope: 'Agreed organizational security posture, architecture, and important controls.', useCase: 'Leadership needs a coherent view of digital exposure and improvement priorities.', metadata: 'Scope-defined · Evidence review', deliverable: 'An executive risk summary and a technical improvement roadmap.' },
  { id: 'advisory', label: 'Security advisory', category: 'organization', scope: 'Cybersecurity policy, governance, and architecture decisions for leadership and engineering teams.', useCase: 'A team needs practical guidance to assign security ownership and plan investment.', metadata: 'Requirements-led · Decision support', deliverable: 'Documented policy, governance, and architecture recommendations.' },
  { id: 'threat-intelligence', label: 'AI-assisted threat intelligence', category: 'investigation', scope: 'Relevant security signals, indicators, and threat context from agreed sources.', useCase: 'An analyst team needs to turn noisy signals into questions worth investigating.', metadata: 'Analyst-led · Source-dependent', deliverable: 'A contextual investigation brief, evidence limitations, and review priorities.', capability: 'threat-intel' },
  { id: 'automation', label: 'Security automation', category: 'operations', scope: 'Repeatable triage and review workflows, integration constraints, and approval points.', useCase: 'Manual hand-offs slow a security workflow and responsibilities are unclear.', metadata: 'Workflow design · Human approvals', deliverable: 'A scoped workflow design with inputs, ownership, exceptions, and verification steps.', capability: 'threat-intel' },
  { id: 'osint', label: 'OSINT & external exposure', category: 'investigation', scope: 'Legally accessible public information and agreed organizational assets.', useCase: 'A team needs an ownership-checked view of its public-facing footprint.', metadata: 'Public information · Scope-defined', deliverable: 'An exposure inventory with source context, ownership gaps, and review actions.', capability: 'osint' },
  { id: 'forensics', label: 'Digital forensics', category: 'investigation', scope: 'Approved logs, system artifacts, and evidence-handling requirements.', useCase: 'An investigation needs an evidence-led account of activity across available sources.', metadata: 'Evidence-led · Access-dependent', deliverable: 'An event timeline, documented provenance, findings, and unresolved questions.', capability: 'forensics' },
  { id: 'red-team', label: 'Authorized red teaming', category: 'assurance', scope: 'Approved adversary-inspired scenarios, exclusions, and rules of engagement.', useCase: 'An organization wants to evaluate defensive visibility and response within agreed boundaries.', metadata: 'Explicit authorization · Stop conditions', deliverable: 'A scenario report connecting observations, defensive gaps, impact, and retest priorities.', capability: 'red-team' },
  { id: 'response', label: 'Incident response', category: 'operations', scope: 'Triage ownership, approved containment options, evidence, and recovery requirements.', useCase: 'A team needs to prepare or coordinate its incident workflow with business decision-makers.', metadata: 'Approval-led · Availability to be agreed', deliverable: 'An agreed response plan or scoped incident record with investigation and recovery actions.', capability: 'incident-response' },
  { id: 'assessment', label: 'Vulnerability assessment', category: 'assurance', scope: 'Authorized applications, APIs, networks, and cloud resources.', useCase: 'Known asset owners need verified weaknesses and achievable remediation priorities.', metadata: 'Scoped testing · Validation & retest', deliverable: 'An evidence-based findings report with severity context, owners, and verification guidance.', capability: 'vulnerability-assessment' },
  { id: 'enterprise', label: 'Enterprise security', category: 'organization', scope: 'Environment boundaries, SOC processes, integrations, identity, and operational responsibilities.', useCase: 'Distributed teams need a shared scope and a practical security review plan.', metadata: 'Complex environments · Requirements-led', deliverable: 'A requirements and coverage review with prioritized workstreams and decision ownership.' },
  { id: 'msme', label: 'MSME security', category: 'organization', scope: 'Core business applications, IT ownership, baseline controls, and response readiness.', useCase: 'A growing team needs a manageable starting point for security work.', metadata: 'Focused scope · Practical priorities', deliverable: 'A baseline review and staged action plan suited to available team capacity.' },
  { id: 'licensing', label: 'Platform & licensing discussion', category: 'platform', scope: 'Rakshak AI requirements, deployment boundaries, evaluation goals, and commercial questions.', useCase: 'A team wants to establish whether the demonstrated platform direction fits its workflow.', metadata: 'Requirements review · Availability unconfirmed', deliverable: 'A documented requirements discussion and next-step proposal, subject to confirmation.' },
];
