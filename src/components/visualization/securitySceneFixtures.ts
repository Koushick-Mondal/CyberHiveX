import type { Severity } from '../rakshak/fixtures';

export interface SecurityNode {
  id: string; label: string; type: string; risk: Severity; status: string;
  x: number; y: number; mobileX?: number; mobileY?: number; evidence: string;
}
// Authored, fictional records only. IDs, severities and relationships do not describe live systems.
export const SECURITY_NODES: readonly SecurityNode[] = [
  { id: 'ASSET-042', label: 'Assets', type: 'Application', risk: 'Medium', status: 'Inventory review', x: 16, y: 22, mobileX: 16, mobileY: 22, evidence: 'api.example.com · Prepared inventory lists a diagnostic route. Reachability and access controls are unverified.' },
  { id: 'IDENTITY-017', label: 'Identity', type: 'Sign-in service', risk: 'High', status: 'Needs review', x: 13, y: 52, mobileX: 84, mobileY: 22, evidence: 'auth.example.com · EVT-9041: 18 unsuccessful sign-ins in a prepared 60-second window. No successful sign-in is recorded.' },
  { id: 'ENDPOINT-221', label: 'Endpoint', type: 'Example workstation', risk: 'Low', status: 'Context only', x: 22, y: 81, mobileX: 16, mobileY: 81, evidence: 'worker.example · Fictional workstation inventory reference. No endpoint telemetry is collected.' },
  { id: 'NETWORK-09', label: 'Network', type: 'Shared gateway', risk: 'Critical', status: 'Owner validation', x: 50, y: 90, mobileX: 84, mobileY: 81, evidence: 'gateway.example.com · DEMO-EVID-05 records a prepared management-baseline mismatch. No configuration change is performed.' },
  { id: 'THREAT-017', label: 'Threat context', type: 'Indicator record', risk: 'High', status: 'Intent unknown', x: 84, y: 22, evidence: '192.0.2.41 · Reserved documentation address shared by two fixtures. No reputation lookup or attribution.' },
  { id: 'VULN-204', label: 'Vulnerabilities', type: 'Configuration finding', risk: 'Medium', status: 'Unverified', x: 87, y: 52, evidence: 'DEMO-VULN-002 · Diagnostic-route exposure is an inventory claim, not a CVE or scan finding.' },
  { id: 'INTEL-031', label: 'Intelligence', type: 'Prepared correlation', risk: 'Medium', status: 'Context added', x: 78, y: 81, evidence: 'EVT-9043 · Sign-in and gateway records share a source and target. Correlation is not proof of malicious activity.' },
  { id: 'INCIDENT-04', label: 'Incident review', type: 'Example case', risk: 'Low', status: 'No confirmed incident', x: 50, y: 10, evidence: 'Prepared investigation case linking fictional evidence. No real incident is detected or resolved.' },
];
export const SCENE_EVENT = {
  id: 'EVT-9041', source: 'DEMO TELEMETRY', confidence: 85, risk: 'High' as const,
  recommendation: 'Review the sign-in evidence and validate rate-limit settings with the identity owner.',
};
export const SCENE_STAGES = [
  { id: 'idle', label: 'Ready', detail: 'A reserved-domain environment, ready for a prepared investigation.', duration: 1000 },
  { id: 'monitoring', label: 'Monitoring · simulated', detail: 'The scene illustrates available sources. No system is connected or monitored.', duration: 2300 },
  { id: 'detected', label: 'Event detected · fixture', detail: 'A prepared identity record lists repeated failed sign-ins. Compromise is not established.', duration: 2400 },
  { id: 'analyzing', label: 'Analyzing · prepared', detail: 'The fictional record moves to the core for a prepared explanation. No model inference runs.', duration: 2400 },
  { id: 'correlating', label: 'Correlating · prepared', detail: 'A shared source links two sample records. Intent and attribution remain unknown.', duration: 2300 },
  { id: 'risk', label: 'Risk assessment · High', detail: 'High is an authored scenario label for an internet-facing sign-in service, not a prediction.', duration: 2400 },
  { id: 'recommendation', label: 'Recommendation ready', detail: SCENE_EVENT.recommendation, duration: 3000 },
  { id: 'resolved', label: 'Review recorded · demo', detail: 'The illustration records a local review, then returns to simulated monitoring. No remediation occurred.', duration: 2400 },
] as const;
export type SceneStageId = typeof SCENE_STAGES[number]['id'];
// Prepared visual activity: these highlights are story beats, not live observations.
export const SCENE_NODE_ACTIVITY: Record<SceneStageId, readonly string[]> = {
  idle: [], monitoring: [], detected: ['IDENTITY-017'], analyzing: ['IDENTITY-017'],
  correlating: ['IDENTITY-017', 'INTEL-031', 'NETWORK-09'], risk: ['NETWORK-09'],
  recommendation: ['IDENTITY-017', 'ASSET-042'], resolved: ['ASSET-042'],
};
