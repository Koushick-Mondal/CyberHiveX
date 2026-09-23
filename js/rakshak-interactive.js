/**
 * CYBERHIVEX TECHNOLOGY — Rakshak AI & Ecosystem Interactive Controller
 * Powers the interactive satellites, 6-stage autonomous workflow,
 * circular ecosystem model, and 8-stage continuous lifecycle.
 */
import { cyberAudio } from './audio.js';

export function initRakshakInteractive() {
  // 1. Rakshak AI Satellite Nodes Deep-Dive Inspector
  const satelliteNodes = document.querySelectorAll('.rakshak-satellite-node');
  const inspectorTitle = document.getElementById('rakshak-inspect-title');
  const inspectorDesc = document.getElementById('rakshak-inspect-desc');
  const inspectorBadge = document.getElementById('rakshak-inspect-badge');
  const inspectorMetrics = document.getElementById('rakshak-inspect-metrics');

  const RAKSHAK_CAPABILITIES = {
    'threat-detection': {
      title: 'Real-Time Threat Detection',
      badge: 'NEURAL CLUSTER // ACTIVE',
      badgeClass: 'badge-tech',
      desc: 'In-memory telemetry autoencoders and syscall drift models detect anomalous process executions in <8.4ms before signature publication.',
      metrics: [
        { label: 'DETECTION LATENCY', val: '< 8.4 ms', color: 'cyan' },
        { label: 'ACCURACY SCORE', val: '99.94%', color: 'green' },
        { label: 'MODELS LOADED', val: '42,000+', color: 'cyan' }
      ]
    },
    'risk-analysis': {
      title: 'Contextual Risk Analysis',
      badge: 'PROBABILISTIC SCORING',
      badgeClass: 'badge-tech',
      desc: 'Quantifies blast radius, asset criticality, and data sensitivity in real time to calculate dynamic risk scores across enterprise surfaces.',
      metrics: [
        { label: 'RISK CALCULATION', val: 'CONTINUOUS', color: 'cyan' },
        { label: 'EXPOSURE SCORING', val: '0 — 100 CVSS+', color: 'green' },
        { label: 'ASSET COVERAGE', val: '100% DISCOVERY', color: 'cyan' }
      ]
    },
    'vuln-intel': {
      title: 'Vulnerability Intelligence',
      badge: 'PRE-EXPLOITATION RADAR',
      badgeClass: 'badge-threat',
      desc: 'Correlates internal asset exposures with active zero-day exploit chatter across global intelligence feeds to prioritize high-risk CVEs.',
      metrics: [
        { label: 'CVE INGESTION', val: 'REAL-TIME', color: 'cyan' },
        { label: 'EXPLOIT PREDICTION', val: '87% PRECISION', color: 'green' },
        { label: 'SHADOW IT SCAN', val: 'AUTOMATED', color: 'cyan' }
      ]
    },
    'security-automation': {
      title: 'Security Automation & SOAR',
      badge: 'AUTONOMOUS PLAYBOOKS',
      badgeClass: 'badge-tech',
      desc: 'Instantaneous playbook execution eliminates human response latency, applying micro-isolation, egress nulling, and token revocation.',
      metrics: [
        { label: 'PLAYBOOK EXECUTION', val: '< 15 ms', color: 'green' },
        { label: 'AUTOMATION ACTIONS', val: '240+ HOOKS', color: 'cyan' },
        { label: 'ZERO HUMAN DELAY', val: 'ENABLED', color: 'cyan' }
      ]
    },
    'alert-analysis': {
      title: 'Autonomous Alert Analysis',
      badge: 'ALERT FATIGUE KILLER',
      badgeClass: 'badge-tech',
      desc: 'Filters out 98.7% of false positives by mathematically correlating multi-sensor signals into single cohesive incident graphs.',
      metrics: [
        { label: 'NOISE REDUCTION', val: '98.7%', color: 'green' },
        { label: 'DAILY EPS CAPACITY', val: '2.5M+ EPS', color: 'cyan' },
        { label: 'TRIAGE ACCELERATION', val: '24x FASTER', color: 'cyan' }
      ]
    },
    'threat-correlation': {
      title: 'Adversary Threat Correlation',
      badge: 'MITRE ATT&CK GRAPH',
      badgeClass: 'badge-tech',
      desc: 'Constructs temporal attack graphs mapping adversary lateral movement, privilege escalations, and C2 beacons across all hybrid zones.',
      metrics: [
        { label: 'GRAPH RESOLUTION', val: 'TEMPORAL LINEAGE', color: 'cyan' },
        { label: 'MITRE TTP MAPPING', val: '200+ TACTICS', color: 'green' },
        { label: 'CROSS-ZONE LINK', val: 'ENABLED', color: 'cyan' }
      ]
    },
    'response-execution': {
      title: 'Instant Defensive Response',
      badge: 'SURGICAL CONTAINMENT',
      badgeClass: 'badge-threat',
      desc: 'Quarantines infected hosts, severs malicious egress routes, and triggers immutable backup protection without taking operations offline.',
      metrics: [
        { label: 'CONTAINMENT (MTTC)', val: '< 12 Seconds', color: 'green' },
        { label: 'FAILOVER READ-ONLY', val: 'AUTOMATIC', color: 'cyan' },
        { label: 'DATA LOSS RISK', val: 'NEAR ZERO', color: 'green' }
      ]
    }
  };

  satelliteNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-satellite');
      if (!key || !RAKSHAK_CAPABILITIES[key]) return;

      satelliteNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');
      cyberAudio.playClick();

      const data = RAKSHAK_CAPABILITIES[key];
      if (inspectorTitle) inspectorTitle.textContent = data.title;
      if (inspectorDesc) inspectorDesc.textContent = data.desc;
      if (inspectorBadge) {
        inspectorBadge.textContent = data.badge;
        inspectorBadge.className = data.badgeClass;
      }

      if (inspectorMetrics) {
        inspectorMetrics.innerHTML = data.metrics.map(m => `
          <div class="metric-chip">
            <span class="metric-chip-label">${m.label}</span>
            <span class="metric-chip-val text-${m.color}">${m.val}</span>
          </div>
        `).join('');
      }
    });
  });

  // 2. How Rakshak AI Works: 6-Stage Interactive Horizontal Pipeline
  const rakshakSteps = document.querySelectorAll('.rakshak-flow-step');
  const rakshakStageDetail = document.getElementById('rakshak-stage-detail');

  const STAGE_DETAILS = [
    {
      step: '01',
      title: 'COLLECT // Telemetry & Multi-Source Ingestion',
      desc: 'Rakshak AI continuously taps raw telemetry across cloud environments (AWS, Azure, GCP), endpoints (EDR/XDR agents), network traffic (NDR behavioral sensors), identities, and public threat feeds without requiring disruptive agent overhead.',
      tags: ['Security Logs', 'Kernel Syscalls', 'Network PCAP', 'Cloud Trail', 'Identity Attestations'],
      badge: 'INPUT STAGE'
    },
    {
      step: '02',
      title: 'ANALYZE // Deep Neural Behavioral Modeling',
      desc: 'Telemetry flows through localized machine learning autoencoders that compare runtime execution paths against learned mathematical baselines, flagging micro-deviations before signatures are published.',
      tags: ['Neural Autoencoders', 'Entropy Scoring', 'Process Drift', 'Zero-Day Heuristics'],
      badge: 'PROCESSING'
    },
    {
      step: '03',
      title: 'UNDERSTAND // Threat Correlation & Graph Reasoning',
      desc: 'Rather than firing disjointed alerts, Rakshak AI reconstructs the entire attack graph. It connects IP reconnaissance, credential misuse, lateral movement, and C2 beacons into one unified timeline.',
      tags: ['MITRE ATT&CK Alignment', 'Attack Graph Lineage', 'Adversary Intent', 'Lateral Path Detection'],
      badge: 'CORRELATION'
    },
    {
      step: '04',
      title: 'PRIORITIZE // Dynamic Risk-Based Prioritization',
      desc: 'Every alert is evaluated in context of real business risk. Rakshak AI cross-references asset criticality, vulnerability exploitability, and network reachability to present only genuine threats.',
      tags: ['Blast Radius Assessment', 'CVSS Contextual Weighting', 'Noise Suppression: 98.7%'],
      badge: 'DECISION ENGINE'
    },
    {
      step: '05',
      title: 'ACT // Recommended & Automated Playbook Containment',
      desc: 'Depending on organizational security policies, Rakshak AI either suggests surgical mitigation actions or autonomously triggers micro-containment in under 15ms: freezing threads, isolating hosts, or revoking tokens.',
      tags: ['Autonomous Containment <15ms', 'Host Micro-Isolation', 'API Route Severing', 'SOAR Playbooks'],
      badge: 'EXECUTION'
    },
    {
      step: '06',
      title: 'LEARN // Continuous Posture Strengthening',
      desc: 'Every contained threat generates defensive intelligence. Telemetry, attack tactics, and containment signatures are fed back into baseline models to fortify the perimeter against future mutations.',
      tags: ['Feedback Loop', 'Signature Synthesis', 'Continuous Hardening', 'Zero Threat Recurrence'],
      badge: 'RESILIENCE'
    }
  ];

  rakshakSteps.forEach((stepEl, idx) => {
    stepEl.addEventListener('click', () => {
      rakshakSteps.forEach(s => s.classList.remove('active'));
      stepEl.classList.add('active');
      cyberAudio.playClick();

      const detail = STAGE_DETAILS[idx];
      if (rakshakStageDetail && detail) {
        rakshakStageDetail.innerHTML = `
          <div class="stage-detail-card">
            <div class="stage-detail-header">
              <span class="badge-tech">${detail.badge}</span>
              <span class="stage-detail-num font-mono text-cyan">${detail.step} / 06</span>
            </div>
            <h4 class="stage-detail-title">${detail.title}</h4>
            <p class="stage-detail-text">${detail.desc}</p>
            <div class="stage-detail-tags">
              ${detail.tags.map(t => `<span class="surface-tag" style="font-size:0.75rem; padding:0.25rem 0.6rem;">⚡ ${t}</span>`).join('')}
            </div>
          </div>
        `;
      }
    });
  });

  // 3. CyberHiveX Security Ecosystem Interactive Satellites
  const ecosystemSatellites = document.querySelectorAll('.ecosystem-node');
  const ecosystemCenterHeading = document.getElementById('ecosystem-status-heading');
  const ecosystemCenterDesc = document.getElementById('ecosystem-status-desc');

  const ECOSYSTEM_INFO = {
    'osint': {
      title: 'OSINT Intelligence',
      desc: 'Uncovers external exposures, leaked credentials, subdomains, and shadow cloud infrastructure before adversaries exploit them.'
    },
    'threat-intel': {
      title: 'Threat Intelligence',
      desc: 'Ingests global adversary feeds, nation-state APT telemetry, and darknet syndicate indicators into the Rakshak AI core.'
    },
    'security-logs': {
      title: 'Security Telemetry Logs',
      desc: 'High-throughput real-time ingestion of SIEM, eBPF kernel probes, firewalls, and cloud access audit trails.'
    },
    'digital-forensics': {
      title: 'Digital Forensics',
      desc: 'In-depth timeline reconstruction, artifact analysis, and root cause discovery feeding post-breach intelligence back into defense.'
    },
    'red-teaming': {
      title: 'Proactive Red Teaming',
      desc: 'Continuous authorized adversarial simulations uncover defensive gaps and validate resilience against real-world TTPs.'
    },
    'incident-response': {
      title: 'Incident Response',
      desc: '24/7 elite containment, investigation, and recovery operations orchestrated through autonomous Rakshak AI alerts.'
    },
    'vuln-assessment': {
      title: 'Vulnerability Assessment',
      desc: 'Automated continuous vulnerability discovery and exploit validation across cloud, networks, and internal assets.'
    },
    'security-automation': {
      title: 'Security Automation',
      desc: 'Instant SOAR playbooks, zero-touch mitigation, and policy enforcement across hybrid enterprise infrastructure.'
    }
  };

  ecosystemSatellites.forEach((sat) => {
    sat.addEventListener('click', () => {
      const key = sat.getAttribute('data-ecosystem');
      if (!key || !ECOSYSTEM_INFO[key]) return;

      ecosystemSatellites.forEach(s => s.classList.remove('active'));
      sat.classList.add('active');
      cyberAudio.playClick();

      const info = ECOSYSTEM_INFO[key];
      if (ecosystemCenterHeading) ecosystemCenterHeading.textContent = info.title;
      if (ecosystemCenterDesc) ecosystemCenterDesc.textContent = info.desc;
    });
  });

  // 4. Continuous Security Lifecycle Interactive Loop
  const lifecycleNodes = document.querySelectorAll('.lifecycle-step-node');
  const lifecycleDetailCard = document.getElementById('lifecycle-active-detail');

  const LIFECYCLE_STAGES = [
    { num: '01', name: 'DISCOVER', desc: 'Map all assets, cloud containers, external IPs, and APIs to establish an exhaustive attack surface inventory.' },
    { num: '02', name: 'DETECT', desc: 'Identify anomalous behaviors and malicious signals in real-time across deep telemetry using neural heuristics.' },
    { num: '03', name: 'ANALYZE', desc: 'Correlate alerts into unified attack graphs, contextualizing adversary intent and cross-zone reachability.' },
    { num: '04', name: 'PRIORITIZE', desc: 'Rank exposures according to actual exploitability and asset criticality rather than theoretical severity.' },
    { num: '05', name: 'DEFEND', desc: 'Enforce preemptive security controls, micro-segmentation, zero-trust identity policies, and edge protections.' },
    { num: '06', name: 'RESPOND', desc: 'Trigger automated surgical containment in milliseconds to neutralize active threats without operational downtime.' },
    { num: '07', name: 'LEARN', desc: 'Extract adversary indicators, analyze breach mechanics, and document root causes for threat intelligence synthesis.' },
    { num: '08', name: 'STRENGTHEN', desc: 'Harden defensive postures, update machine learning models, and close discovered gaps — completing the cycle.' }
  ];

  lifecycleNodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      lifecycleNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      cyberAudio.playClick();

      const stage = LIFECYCLE_STAGES[index];
      if (lifecycleDetailCard && stage) {
        lifecycleDetailCard.innerHTML = `
          <div class="lifecycle-info-box">
            <span class="badge-tech font-mono">STAGE ${stage.num} // 08</span>
            <h4 style="font-size: 1.4rem; color: var(--text-white); margin: 0.5rem 0; font-family: var(--font-display);">${stage.name}</h4>
            <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">${stage.desc}</p>
          </div>
        `;
      }
    });
  });
}
