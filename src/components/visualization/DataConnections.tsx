import { SCENE_NODE_ACTIVITY, SECURITY_NODES, type SceneStageId, type SecurityNode } from './securitySceneFixtures';
function connection(node: SecurityNode, mobile: boolean) {
  const x = (mobile ? node.mobileX ?? node.x : node.x) * 5.6;
  const y = (mobile ? node.mobileY ?? node.y : node.y) * 4.1;
  return `M${x} ${y} Q${x} 205 280 205`;
}
export default function DataConnections({ mobile, selected, stage }: { mobile: boolean; selected: string; stage: SceneStageId }) {
  const active = SCENE_NODE_ACTIVITY[stage];
  const nodes = mobile ? SECURITY_NODES.filter(node => node.mobileX !== undefined) : SECURITY_NODES;
  const outbound = stage === 'recommendation' || stage === 'resolved';
  return <g className={mobile ? 'sc-network-mobile' : 'sc-network-desktop'}>{nodes.map(node => <g key={node.id}>
    <path d={connection(node, mobile)} className={`sc-connection ${node.id === selected ? 'is-selected' : ''} ${active.includes(node.id) ? 'is-processing' : ''}`} />
    {active.includes(node.id) && <path key={`${node.id}-${stage}`} d={connection(node, mobile)} className={`sc-packet ${outbound ? 'sc-packet--outbound' : ''}`} style={{ animationDelay: `${Math.max(0, active.indexOf(node.id)) * 260}ms` }} />}
  </g>)}</g>;
}
