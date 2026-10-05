export const capabilities = [
  {
    id: 'threat-intel', label: 'Threat intelligence', title: 'From signals to investigation priorities.',
    description: 'Bring security events and threat context into a structured analyst workflow. Correlation helps frame questions; investigation and response decisions need evidence and operational ownership.',
    topics: [
      ['Signal review', 'Identify relevant indicators, activity patterns, and the data needed to investigate them.'],
      ['Threat context', 'Relate observed behavior to known techniques and your environment.'],
      ['Analyst workflow', 'Organize findings for review, escalation, and follow-up.'],
      ['Automation planning', 'Define repeatable steps, approval boundaries, and evidence requirements.'],
    ],
  },
  {
    id: 'osint', label: 'External exposure & OSINT', title: 'Understand the view from outside.',
    description: 'Review legally accessible public information to understand an organization’s digital footprint. Discovery findings need ownership checks and verification before they become remediation priorities.',
    topics: [
      ['Asset discovery', 'Review public domains, subdomains, and infrastructure in the agreed scope.'],
      ['DNS & mail configuration', 'Examine DNS records and email authentication policy.'],
      ['Exposed services', 'Review publicly reachable services and management interfaces with authorization.'],
      ['Finding verification', 'Confirm asset ownership and document evidence with appropriate context.'],
    ],
  },
  {
    id: 'forensics', label: 'Digital forensics', title: 'Reconstruct events with evidence.',
    description: 'Investigate digital artifacts and event sources to build a defensible account of what occurred. Collection and evidence handling are defined for each engagement.',
    topics: [
      ['Event timelines', 'Correlate logs and artifacts to establish a sequence of activity.'],
      ['System artifacts', 'Review relevant endpoint, application, and memory evidence.'],
      ['Identity activity', 'Examine authentication events and access changes.'],
      ['Evidence handling', 'Document collection methods, provenance, and investigation limitations.'],
    ],
  },
  {
    id: 'red-team', label: 'Authorized red teaming', title: 'Test defenses within an agreed scope.',
    description: 'Evaluate how approved systems and defensive processes respond to adversary-inspired scenarios. Explicit authorization, exclusions, stop conditions, and rules of engagement come before any active testing.',
    topics: [
      ['Applications & APIs', 'Scope testing around business workflows and approved interfaces.'],
      ['Cloud & identity', 'Review permission boundaries and agreed identity scenarios.'],
      ['Defensive visibility', 'Examine which test activities are observed, triaged, and escalated.'],
      ['Remediation review', 'Document findings and agree on targeted verification after changes.'],
    ],
  },
  {
    id: 'incident-response', label: 'Incident response', title: 'Prepare for coordinated response.',
    description: 'Establish a structured process for incident triage, containment decisions, investigation, and recovery. Available access, business impact, and approvals shape each response plan.',
    topics: [
      ['Triage & ownership', 'Clarify escalation paths and decision-making responsibilities.'],
      ['Containment planning', 'Identify approved isolation and access-revocation options.'],
      ['Investigation & recovery', 'Preserve relevant evidence and plan restoration checks.'],
      ['Lessons learned', 'Use findings to update procedures and reduce recurring gaps.'],
    ],
  },
  {
    id: 'vulnerability-assessment', label: 'Vulnerability assessment', title: 'Find weaknesses. Prioritize practical fixes.',
    description: 'Evaluate authorized applications, networks, and cloud resources for security weaknesses. Findings are reviewed in context so teams can plan remediation and retesting.',
    topics: [
      ['Assessment scope', 'Agree on assets, permissions, test windows, and exclusions.'],
      ['Configuration review', 'Examine relevant application, network, and cloud security settings.'],
      ['Validation', 'Review suspected findings and record reproducible evidence safely.'],
      ['Remediation priorities', 'Discuss severity, business context, ownership, and verification steps.'],
    ],
  },
] as const;

export type CapabilityId = typeof capabilities[number]['id'];
