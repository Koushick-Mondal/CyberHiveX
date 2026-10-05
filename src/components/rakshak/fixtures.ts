export const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'] as const;
export type Severity = typeof SEVERITIES[number];
export type SeverityFilter = Severity | 'All';
export interface SecurityEvent {
  id: string; time: string; title: string; risk: Severity; source: string; target: string;
  category: string; status: string; analysis: string; evidence: string; rationale: string;
  recommendation: string; confidence: number; impact: string; factors: string[];
}
// Every confidence value below is an authored illustrative fixture percentage, not model output or a probability of compromise.
export const FIXTURE_DATE = '2026-01-15';
export const POSTURE_FIXTURE = { riskScore: 68, maximumScore: 100, status: 'Review required', basis: 'Authored baseline scenario: public services, one management mismatch and incomplete log coverage. Not calculated from local additions, not a live security score.' } as const;
export const HERO_EVENTS: SecurityEvent[] = [
  { id: 'EVT-9041', time: '12:04:31', title: 'Suspicious authentication', risk: 'High', source: '192.0.2.41', target: 'auth.example.com', category: 'Authentication', status: 'Needs review', confidence: 85,
    analysis: 'Repeated unsuccessful sign-ins in the sample log suggest an authentication pattern worth reviewing.', evidence: 'Fictional fixture: 18 unsuccessful sign-ins across 3 example accounts in a 60-second window. No successful sign-in is present.', rationale: 'High in this example because an internet-facing authentication service is affected. Account compromise is not established.', recommendation: 'Review the authentication logs, confirm the source context, and consider rate limits and multi-factor authentication.', impact: 'Potential disruption to example sign-in availability; no confirmed account loss.', factors: ['Public sign-in service', 'Repeated failures', 'No successful sign-in recorded'] },
  { id: 'EVT-9042', time: '12:04:42', title: 'Asset exposure detected', risk: 'Medium', source: '198.51.100.24', target: 'api.example.com', category: 'Exposure', status: 'Needs review', confidence: 70,
    analysis: 'A sample asset record lists a diagnostic endpoint as publicly reachable. This is a posture finding, not proof of exploitation.', evidence: 'Fictional fixture: api.example.com:8080/debug is marked public in the sample inventory; access controls have not been verified.', rationale: 'Medium risk: a potentially unnecessary exposed interface, with no evidence of compromise in the fixture.', recommendation: 'Verify the endpoint and its access controls. If unnecessary, restrict access and document the configuration change.', impact: 'Possible diagnostic information exposure; access and contents unverified.', factors: ['Inventory indicates public exposure', 'Authentication unknown', 'No exploitation evidence'] },
  { id: 'EVT-9043', time: '12:05:01', title: 'Indicator correlated', risk: 'Medium', source: '192.0.2.41', target: 'auth.example.com', category: 'Correlation', status: 'Context added', confidence: 65,
    analysis: 'Two sample records share a source address and target. A shared indicator helps investigation but does not identify an attacker.', evidence: 'Fictional fixture: a sign-in record and a sample gateway record both contain 192.0.2.41 and auth.example.com.', rationale: 'Medium risk: the correlation adds context, but the source address alone is insufficient to establish intent.', recommendation: 'Inspect both records and validate the relationship before escalating or changing any security policy.', impact: 'Investigation context only; attribution unconfirmed.', factors: ['Shared source', 'Shared target', 'No external reputation data'] },
  { id: 'EVT-9044', time: '12:05:17', title: 'Risk assessment completed', risk: 'Low', source: 'Local demo fixture', target: 'archive.example.com', category: 'Assessment', status: 'Review ready', confidence: 60,
    analysis: 'The sample archive asset has no public exposure recorded. This is an illustrative assessment, not an assurance of security.', evidence: 'Fictional fixture: archive.example.com is marked internal, with one owner and no open event in the sample inventory.', rationale: 'Low in this example because no exposed interface or suspicious activity is recorded for this asset.', recommendation: 'Validate the inventory against the real environment and schedule an access review.', impact: 'Inventory completeness is unknown; internal designation is not a guarantee.', factors: ['Internal designation', 'Known owner', 'Coverage not verified'] },
];
export const EVENTS: SecurityEvent[] = [...HERO_EVENTS,
  { id: 'EVT-9045', time: '12:06:08', title: 'Privileged configuration mismatch', risk: 'Critical', source: 'Prepared configuration audit', target: 'gateway.example.com', category: 'Configuration', status: 'Needs approval', confidence: 90,
    analysis: 'The prepared audit records a policy mismatch on the fictional shared gateway. Critical is the scenario priority, not a verified incident.', evidence: 'DEMO-EVID-05: baseline requires restricted management access; the fixture snapshot lists an unrestricted management rule.', rationale: 'Critical fixture priority because the example gateway is shared and a privileged management surface is involved.', recommendation: 'Validate the snapshot with the gateway owner and approve a rollback plan before considering a configuration change.', impact: 'Potential impact to all three downstream example services. No actual disruption or exploitation recorded.', factors: ['Shared gateway', 'Privileged access rule', 'Snapshot not independently verified'] },
  { id: 'EVT-9046', time: '12:07:10', title: 'Gateway log coverage gap', risk: 'High', source: 'Prepared log manifest', target: 'gateway.example.com', category: 'Telemetry', status: 'Needs review', confidence: 80,
    analysis: 'The sample manifest lacks one expected log segment; absence of a record does not establish tampering.', evidence: 'DEMO-EVID-06: expected 12:00–12:03 gateway segment is not included in the prepared bundle.', rationale: 'High scenario priority because incomplete coverage limits review of a shared service.', recommendation: 'Ask the example owner to confirm log retention and retrieve the missing interval before drawing conclusions.', impact: 'Reduced investigation coverage, no established compromise.', factors: ['Missing interval', 'Shared service', 'Cause unknown'] },
];
export interface Asset { name: string; address: string; kind: string; environment: string; technology: string; exposure: string; owner: string; risk: Severity; lastSeen: string; status: string; note: string; relationships: string[] }
export const ASSETS: Asset[] = [
  { name: 'auth.example.com', address: '192.0.2.10', kind: 'Authentication service', environment: 'Demo production', technology: 'Fictional identity gateway', exposure: 'Public', owner: 'Example identity team', risk: 'High', lastSeen: '12:04:31', status: 'Review needed', note: 'Validate sign-in patterns and rate-limit settings.', relationships: ['gateway.example.com', 'api.example.com'] },
  { name: 'api.example.com', address: '198.51.100.24', kind: 'Application API', environment: 'Demo staging', technology: 'Fictional HTTP service', exposure: 'Public', owner: 'Example application team', risk: 'Medium', lastSeen: '12:04:42', status: 'Review needed', note: 'Diagnostic endpoint listed on port 8080. Reachability is unverified.', relationships: ['gateway.example.com', 'auth.example.com'] },
  { name: 'archive.example.com', address: '203.0.113.30', kind: 'Archive service', environment: 'Demo internal', technology: 'Fictional object store', exposure: 'Internal', owner: 'Example operations team', risk: 'Low', lastSeen: '12:05:17', status: 'Inventory only', note: 'Internal designation comes from the fixture, not discovery.', relationships: ['gateway.example.com'] },
  { name: 'gateway.example.com', address: '192.0.2.1', kind: 'Shared gateway', environment: 'Demo production', technology: 'Fictional policy gateway', exposure: 'Public', owner: 'Example network team', risk: 'Critical', lastSeen: '12:07:10', status: 'Approval needed', note: 'Prepared baseline mismatch requires owner validation.', relationships: ['auth.example.com', 'api.example.com', 'archive.example.com'] },
];
export interface Indicator { id: string; value: string; type: string; severity: Severity; status: string; source: string; confidence: number; first: string; last: string; assets: string[]; inference: string }
export const INDICATORS: Indicator[] = [
  { id: 'DEMO-IOC-01', value: '192.0.2.41', type: 'IP address', severity: 'High', status: 'Needs validation', source: 'Prepared sign-in log', confidence: 85, first: '12:03:31', last: '12:05:01', assets: ['auth.example.com'], inference: 'Prepared correlation links sign-in and gateway records. Intent and attribution unknown.' },
  { id: 'DEMO-IOC-02', value: 'api.example.com:8080/debug', type: 'URL path', severity: 'Medium', status: 'Unverified', source: 'Prepared inventory', confidence: 70, first: '12:04:42', last: '12:04:42', assets: ['api.example.com'], inference: 'Inventory lists an endpoint; public access has not been tested.' },
  { id: 'DEMO-IOC-03', value: 'gateway.example.com', type: 'Domain', severity: 'Critical', status: 'Needs validation', source: 'Prepared audit', confidence: 90, first: '12:06:08', last: '12:07:10', assets: ['gateway.example.com', 'auth.example.com', 'api.example.com'], inference: 'Prepared dependency relationships imply potential shared-service impact, not verified compromise.' },
  { id: 'DEMO-IOC-04', value: 'archive.example.com', type: 'Domain', severity: 'Low', status: 'Context only', source: 'Prepared inventory', confidence: 60, first: '12:05:17', last: '12:05:17', assets: ['archive.example.com'], inference: 'Internal inventory context only. No malicious indicator is asserted.' },
];
export interface Vulnerability { id: string; title: string; asset: string; severity: Severity; exploitability: string; impact: string; status: string; recommendation: string; eventId: string }
export const VULNERABILITIES: Vulnerability[] = [
  { id: 'DEMO-VULN-001', title: 'Management baseline mismatch', asset: 'gateway.example.com', severity: 'Critical', exploitability: 'Unverified; privileged interface in fixture', impact: 'Shared service configuration', status: 'Owner validation', recommendation: 'Verify baseline and prepare an approved rollback.', eventId: 'EVT-9045' },
  { id: 'DEMO-VULN-002', title: 'Diagnostic route listed public', asset: 'api.example.com', severity: 'Medium', exploitability: 'Unknown; authentication not tested', impact: 'Potential diagnostic disclosure', status: 'Open demo finding', recommendation: 'Confirm access controls and business need.', eventId: 'EVT-9042' },
  { id: 'DEMO-VULN-003', title: 'Access-review date missing', asset: 'archive.example.com', severity: 'Low', exploitability: 'Not established; documentation gap', impact: 'Access governance uncertainty', status: 'Documentation review', recommendation: 'Record owner-approved access review evidence.', eventId: 'EVT-9044' },
  { id: 'DEMO-VULN-004', title: 'Rate-limit configuration unknown', asset: 'auth.example.com', severity: 'High', exploitability: 'Unknown; no successful access', impact: 'Potential sign-in availability', status: 'Owner validation', recommendation: 'Validate rate limits without testing the live service.', eventId: 'EVT-9041' },
];
export const MODULES = [
  { id: 'dashboard', label: 'Dashboard', group: 'Overview', description: 'A concise view of this fictional review session.' },
  { id: 'asset-discovery', label: 'Asset Discovery', group: 'Overview', description: 'Inspect a reserved-domain inventory and its prepared relationships.' },
  { id: 'threat-intelligence', label: 'Threat Intelligence', group: 'Investigate', description: 'Filter prepared indicators; validate context before drawing conclusions.' },
  { id: 'security-events', label: 'Security Events', group: 'Investigate', description: 'Search the sample event stream and inspect its evidence.' },
  { id: 'risk-analysis', label: 'Risk Analysis', group: 'Investigate', description: 'Review scenario priorities, evidence, impact and uncertainty.' },
  { id: 'vulnerability-intelligence', label: 'Vulnerability Intelligence', group: 'Investigate', description: 'Illustrative findings only. No scan results or real CVEs.' },
  { id: 'osint', label: 'OSINT', group: 'Investigate', description: 'Step through a local prepared relationship graph, without lookups.' },
  { id: 'digital-forensics', label: 'Digital Forensics', group: 'Investigate', description: 'Inspect a prepared evidence chronology and coverage limitations.' },
  { id: 'incident-timeline', label: 'Incident Timeline', group: 'Investigate', description: 'Follow the fictional session in timestamp order.' },
  { id: 'ai-security-analyst', label: 'AI Security Analyst', group: 'Review & respond', description: 'Evidence-led Q&A using prepared answers only. No external model.' },
  { id: 'ai-recommendations', label: 'AI Recommendations', group: 'Review & respond', description: 'Review prepared recommendations locally; no remediation occurs.' },
  { id: 'security-reports', label: 'Security Reports', group: 'Review & respond', description: 'Export the labelled fixtures and your local review state.' },
  { id: 'response-automation', label: 'Response / Automation', group: 'Review & respond', description: 'Advance a seven-stage local response simulation with an approval checkpoint.' },
] as const;
export type ModuleId = typeof MODULES[number]['id'];
export const RESPONSE_STAGES = [
  { name: 'Detect', detail: 'Record the prepared gateway mismatch, EVT-9045. Detection is a fixture, not monitoring.' },
  { name: 'Triage', detail: 'Confirm the scenario severity and affected shared-service context with the owner.' },
  { name: 'Investigate', detail: 'Compare DEMO-EVID-05 with the baseline; note the missing log interval.' },
  { name: 'Contain', detail: 'Illustrate an owner-approved management-access restriction. No policy is applied.' },
  { name: 'Eradicate', detail: 'Illustrate restoring the validated baseline. No system is changed.' },
  { name: 'Recover', detail: 'Illustrate owner verification and service checks. No request is sent.' },
  { name: 'Learn', detail: 'Record coverage gaps and a future review checkpoint in the local report.' },
] as const;
