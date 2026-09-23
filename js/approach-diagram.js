/**
 * CYBERHIVEX TECHNOLOGY — Central Architecture Diagram & 6-Pillar Intelligence Core
 * Dynamic canvas visualizer + Interactive Pillar Deep Dive Details & Tactical Dossier Modal
 */
import { cyberAudio } from './audio.js';

// Comprehensive technical data for each pillar
const PILLAR_DOSSIERS = [
  {
    id: 'ai-sec',
    num: '01',
    badge: 'TACTICAL BLUEPRINT // 01 AI SECURITY',
    heading: 'AI SECURITY INTELLIGENCE',
    status: 'ACTIVE DEFENSE // ARMED',
    pipeline: 'AUTONOMOUS <12ms',
    classification: 'SOVEREIGN ENTERPRISE AI',
    overview: 'AI-driven behavioral analysis and intelligent real-time threat detection across deep telemetry. Combines continuous in-memory autoencoders, dynamic syscall heuristic graphs, and autonomous execution thread isolation.',
    pipelineSteps: [
      { step: '01', title: 'Telemetry Tap', desc: 'Continuous eBPF kernel capture across microservices, memory & cloud.' },
      { step: '02', title: 'Entropy Baseline', desc: 'Neural autoencoders model expected runtime operational variance.' },
      { step: '03', title: 'Adversary Scoring', desc: 'Cross-correlates anomalous deviations with MITRE TTPs in <8ms.' },
      { step: '04', title: 'Micro-Isolation', desc: 'Autonomous thread freeze and route severance without system downtime.' }
    ],
    capabilities: [
      { title: 'In-Memory Drift Autoencoders', desc: 'Continuously monitors running processes for reflective DLL injection, shellcode staging, and memory scraping.' },
      { title: 'Zero-Day Heuristic Neutralization', desc: 'Identifies unknown exploit payloads before public CVE publication by assessing instruction execution intent.' },
      { title: 'Adversarial AI Defense', desc: 'Fortifies enterprise LLMs and neural models against prompt injection, model extraction, and data poisoning.' },
      { title: 'Sub-12ms Micro-Quarantine', desc: 'Severing malicious execution pipelines in real time with 99.8% precision.' }
    ],
    terminalLogs: [
      { type: 'cyan', text: '[0x9A] Neural inference pipeline synchronized with 42,000 baseline models.' },
      { type: 'dim', text: '[0x9B] Host kernel probes (eBPF) reporting zero abnormal thread spawns.' },
      { type: 'green', text: '[0x9C] Memory scan complete: 0 injection artifacts found across 18,400 PID namespaces.' },
      { type: 'cyan', text: '[0x9D] Autonomous response loop verified: sub-12ms quarantine trigger armed.' }
    ],
    contactCategory: 'soc'
  },
  {
    id: 'threat-intel',
    num: '02',
    badge: 'TACTICAL BLUEPRINT // 02 THREAT INTEL',
    heading: 'GLOBAL THREAT RECONNAISSANCE',
    status: 'GLOBAL SURVEILLANCE // ACTIVE',
    pipeline: 'STREAMING <25ms',
    classification: 'GLOBAL ADVERSARY RADAR',
    overview: 'Continuous multi-vector surveillance monitoring 450,000+ worldwide sensors, dark web syndicates, and nation-state APT campaigns to preempt attacks before they reach enterprise perimeters.',
    pipelineSteps: [
      { step: '01', title: 'Sensor Ingestion', desc: '12.8B daily events harvested from global honey-nets & dark nodes.' },
      { step: '02', title: 'Syndicate Radar', desc: 'Autonomous crawling of illicit underground forums for stolen corporate tokens.' },
      { step: '03', title: 'Graph Correlation', desc: 'Correlates observed attacker footprints with known nation-state threat actors.' },
      { step: '04', title: 'Preemptive Patching', desc: 'Generates zero-day mitigation signatures distributed to edge firewalls.' }
    ],
    capabilities: [
      { title: '450,000+ Global Incursion Sensors', desc: 'Continuous global footprint detecting adversary reconnaissance probes before weaponization.' },
      { title: 'Dark Web Infiltration Radar', desc: 'Automated crawlers scanning darknet forums, leak sites, and paste sites for enterprise credential dumps.' },
      { title: 'Automated MITRE ATT&CK Mapping', desc: 'Instantly categorizes telemetry across 200+ tactics, techniques, and adversary sub-techniques.' },
      { title: 'Predictive Vector Simulation', desc: 'Simulates probable adversary pivoting maneuvers to fortify high-value database targets.' }
    ],
    terminalLogs: [
      { type: 'cyan', text: '[INTEL_FEED] Ingesting 140+ real-time STIX/TAXII incursion feeds.' },
      { type: 'dim', text: '[APT_MONITOR] Tracking 32 active threat syndicates across AP-South & EMEA.' },
      { type: 'green', text: '[IOC_SYNC] 1,420 IOCs updated into distributed edge filter in 18ms.' },
      { type: 'cyan', text: '[PREDICTION] High-confidence vector shield applied to perimeter gateways.' }
    ],
    contactCategory: 'soc'
  },
  {
    id: 'identity-sec',
    num: '03',
    badge: 'TACTICAL BLUEPRINT // 03 IDENTITY',
    heading: 'ZERO-TRUST IDENTITY GUARDIAN',
    status: 'ADAPTIVE VERIFY // STRICT',
    pipeline: 'SUB-SECOND RE-EVAL',
    classification: 'IDENTITY DEFENSE (ITDR)',
    overview: 'Continuous adaptive verification enforcing zero trust across all users, service accounts, automated API tokens, and machine workloads with ephemeral Just-In-Time privilege deprovisioning.',
    pipelineSteps: [
      { step: '01', title: 'Session Sampling', desc: 'Captures continuous behavioral biometric & device health markers.' },
      { step: '02', title: 'Risk Recalculation', desc: 'Sub-second risk scoring recalculates trust score on every request.' },
      { step: '03', title: 'Anomaly Intercept', desc: 'Halts token replay, Kerberoasting, and privilege elevation attempts.' },
      { step: '04', title: 'Ephemeral Revocation', desc: 'Instantly voids compromised sessions and terminates active tokens.' }
    ],
    capabilities: [
      { title: 'Continuous Dynamic Re-Authentication', desc: 'Re-evaluates authorization on every sensitive transaction, not just at initial sign-in.' },
      { title: 'Identity Threat Detection & Response (ITDR)', desc: 'Detects and neutralizes Kerberoasting, Golden Tickets, Pass-the-Hash, and token replay attacks.' },
      { title: 'Ephemeral Just-In-Time (JIT) Privilege', desc: 'Eliminates permanent administrator privileges; access is generated temporarily and destroyed on task completion.' },
      { title: 'Service Account & Agent Governance', desc: 'Locks down autonomous machine tokens, CI/CD runners, and API keys with hardware-bound keys.' }
    ],
    terminalLogs: [
      { type: 'cyan', text: '[ID_GATE] Continuous evaluation engine active: 18,940 active token sessions.' },
      { type: 'green', text: '[ITDR] Golden Ticket / Kerberoasting inspection: 0 abnormal ticket requests.' },
      { type: 'dim', text: '[JIT_MANAGER] Expired 42 temporary administrator grants upon task finish.' },
      { type: 'cyan', text: '[PASSKEY_AUTH] FIDO2 hardware attestation verified on all privileged sessions.' }
    ],
    contactCategory: 'zero-trust'
  },
  {
    id: 'infra-sec',
    num: '04',
    badge: 'TACTICAL BLUEPRINT // 04 INFRASTRUCTURE',
    heading: 'HYBRID CLOUD & WORKLOAD SHIELD',
    status: 'KERNEL DEFENSE // ACTIVE',
    pipeline: 'LATERAL HALT <15ms',
    classification: 'MULTI-CLOUD CSPM / CWPP',
    overview: 'Kernel-level protection and micro-segmented perimeter defense safeguarding bare-metal clusters, containerized Kubernetes pods, and hybrid multi-cloud backbones against lateral incursion.',
    pipelineSteps: [
      { step: '01', title: 'eBPF Kernel Probes', desc: 'Deep container socket and syscall inspection with zero performance penalty.' },
      { step: '02', title: 'Micro-Segmentation', desc: 'Software-defined policy engine restricts inter-pod communication strictly.' },
      { step: '03', title: 'Drift Identification', desc: 'Detects container layer drift and untrusted binaries in execution pipelines.' },
      { step: '04', title: 'Isolation Mesh', desc: 'Instantly severs compromised network namespaces to quarantine workloads.' }
    ],
    capabilities: [
      { title: 'Kernel-Level eBPF Telemetry', desc: 'Provides real-time visibility into process execution, network sockets, and container namespaces.' },
      { title: 'Micro-Segmented Perimeter Defense', desc: 'Enforces software-defined perimeters that stop attackers from pivoting between clusters.' },
      { title: 'Automated Multi-Cloud Compliance (CSPM)', desc: 'Continuous automated auditing of AWS, Azure, GCP, and Kubernetes against CIS benchmarks.' },
      { title: 'Immutable Image & Container Guardrails', desc: 'Cryptographically verifies container images in CI/CD before allowing deployment to production.' }
    ],
    terminalLogs: [
      { type: 'cyan', text: '[EBPF_GRID] 2,840 Kubernetes worker nodes streaming kernel telemetry.' },
      { type: 'green', text: '[POLICY_MESH] Software-defined perimeter enforcement: 100% active.' },
      { type: 'dim', text: '[DRIFT_DETECTOR] Comparing active pods against golden immutable image manifests.' },
      { type: 'cyan', text: '[CSPM] Continuous CIS compliance index: 99.4% across hybrid cloud backbones.' }
    ],
    contactCategory: 'cloud'
  },
  {
    id: 'digital-trust',
    num: '05',
    badge: 'TACTICAL BLUEPRINT // 05 DIGITAL TRUST',
    heading: 'CRYPTOGRAPHIC INTEGRITY LAYER',
    status: 'TPM ATTESTED // VERIFIED',
    pipeline: 'SUB-MS NON-REPUDIATION',
    classification: 'QUANTUM-RESISTANT ATTESTATION',
    overview: 'Establishes cryptographic, mathematical certainty across all digital transactions, sensitive APIs, and sovereign data flows with hardware roots of trust and immutable verification chains.',
    pipelineSteps: [
      { step: '01', title: 'Hardware Attestation', desc: 'Queries CPU secure enclaves & TPM 2.0 chips before granting execution rights.' },
      { step: '02', title: 'Data Provenance Seal', desc: 'Digitally signs and seals every high-value transaction at the line level.' },
      { step: '03', title: 'Mutual TLS 1.3 Mesh', desc: 'Enforces mutual zero-trust handshakes across internal and partner endpoints.' },
      { step: '04', title: 'Immutable Audit Log', desc: 'Commits non-repudiation cryptographic proofs to sovereign verifiable ledgers.' }
    ],
    capabilities: [
      { title: 'Line-Level Cryptographic Provenance', desc: 'Mathematical assurance that sensitive enterprise data has not been tampered with in transit or at rest.' },
      { title: 'Hardware TPM & Secure Enclave Verification', desc: 'Attests CPU firmware, memory integrity, and platform state prior to secrets provisioning.' },
      { title: 'Post-Quantum Ready Encryption', desc: 'Crystals-Kyber and Dilithium algorithm implementations ready for next-generation quantum resistance.' },
      { title: 'Tamper-Proof Audit Ledgers', desc: 'Immutable cryptographic trails ensuring 100% non-repudiation for regulatory and defense audits.' }
    ],
    terminalLogs: [
      { type: 'cyan', text: '[CRYPTO_ENGINE] Initializing post-quantum verification modules (Crystals-Kyber).' },
      { type: 'green', text: '[TPM_ATTEST] Root of trust established: Hardware enclave level 4 verified.' },
      { type: 'dim', text: '[PROVENANCE] 3.4M financial API transactions cryptographically sealed.' },
      { type: 'cyan', text: '[NON_REPUDIATION] Zero verifiable ledger discrepancies detected.' }
    ],
    contactCategory: 'zero-trust'
  },
  {
    id: 'sec-mon',
    num: '06',
    badge: 'TACTICAL BLUEPRINT // 06 MONITORING',
    heading: '24/7/365 SOVEREIGN SOC OPERATIONS',
    status: 'ACTIVE SURVEILLANCE // 24/7',
    pipeline: 'MTTD <12s // MTTC <45s',
    classification: 'AUTONOMOUS SIEM / SOAR COMMAND',
    overview: 'Unified telemetry fusion ingesting over 1.8M EPS. Pairs autonomous neural playbook execution with Tier-3 elite cyber commanders standing sovereign vigil around the clock.',
    pipelineSteps: [
      { step: '01', title: '1.8M EPS Ingestion', desc: 'Distributed real-time Kafka streams correlate enterprise-wide event data.' },
      { step: '02', title: 'Neural Graph Triaging', desc: 'Eliminates 99.9% of alert noise, elevating only true multi-stage attack paths.' },
      { step: '03', title: 'Automated SOAR Trigger', desc: 'Instantly fires containment playbooks to isolate endpoints and null routes.' },
      { step: '04', title: 'Elite SOC Command', desc: 'Tier-3 human-in-the-loop forensic experts confirm root cause containment.' }
    ],
    capabilities: [
      { title: 'Autonomous Next-Gen SIEM/SOAR', desc: 'Correlates enterprise log telemetry at massive scale without analyst fatigue.' },
      { title: 'Sub-45 Second Mean Time to Contain (MTTC)', desc: 'Automated playbooks isolate affected hosts, revoke compromised tokens, and firewall vectors.' },
      { title: '24/7/365 Sovereign Security Operations', desc: 'Dedicated cyber defense commanders monitoring critical infrastructure continuously.' },
      { title: 'Executive Cyber Resilience Scoring', desc: 'Live tactical metrics and attack surface exposure indices presented in unified dashboards.' }
    ],
    terminalLogs: [
      { type: 'cyan', text: '[SIEM_INGEST] Processing 1,842,910 events/sec across 48 distributed collectors.' },
      { type: 'green', text: '[MTTD_BENCHMARK] Average threat detection latency: 11.2 seconds.' },
      { type: 'dim', text: '[SOAR_DISPATCH] Autonomous playbooks executed: 14 benign port probes silenced.' },
      { type: 'cyan', text: '[SOC_WATCH] Tier-3 command console armed. Sovereign defense perimeter secure.' }
    ],
    contactCategory: 'soc'
  }
];

export function initApproachDiagram() {
  const canvas = document.getElementById('approach-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;

  const pillars = [
    { id: 'ai-sec', label: 'AI SECURITY', angle: -Math.PI / 2, color: '#00F3FF' },
    { id: 'threat-intel', label: 'THREAT INTEL', angle: -Math.PI / 6, color: '#00D4FF' },
    { id: 'identity-sec', label: 'IDENTITY SECURITY', angle: Math.PI / 6, color: '#00FFAA' },
    { id: 'infra-sec', label: 'INFRASTRUCTURE', angle: Math.PI / 2, color: '#88B4E8' },
    { id: 'digital-trust', label: 'DIGITAL TRUST', angle: (5 * Math.PI) / 6, color: '#00F3FF' },
    { id: 'sec-mon', label: 'SEC MONITORING', angle: (-5 * Math.PI) / 6, color: '#33F6FF' }
  ];

  let activePillarIndex = 0;
  let dataPackets = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const newWidth = Math.floor(rect.width);
    const newHeight = Math.floor(rect.height);

    if (newWidth === width && newHeight === height && width > 0) return;
    width = newWidth;
    height = newHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    centerX = width / 2;
    centerY = height / 2;
  }

  function spawnPacket(targetIndex = null, speedMultiplier = 1) {
    if (dataPackets.length > 50) return;
    const targetIdx = targetIndex !== null ? targetIndex : Math.floor(Math.random() * pillars.length);
    dataPackets.push({
      pillarIdx: targetIdx,
      progress: 0,
      speed: (0.015 + Math.random() * 0.012) * speedMultiplier,
      direction: Math.random() > 0.4 ? 1 : -1,
      isSpecial: targetIndex !== null
    });
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width, height) * 0.38;

    // 1. Draw Connecting Geometric Circuits & Nodes
    pillars.forEach((p, idx) => {
      const px = centerX + Math.cos(p.angle) * radius;
      const py = centerY + Math.sin(p.angle) * radius;
      const isActive = idx === activePillarIndex;

      // Circuit Line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(px, py);
      ctx.strokeStyle = isActive ? 'rgba(0, 243, 255, 0.85)' : 'rgba(0, 243, 255, 0.15)';
      ctx.lineWidth = isActive ? 2.5 : 1;
      ctx.stroke();

      if (isActive) {
        // Glowing halo line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.25)';
        ctx.lineWidth = 6;
        ctx.stroke();
      }

      // Outer Branch Ring
      ctx.beginPath();
      ctx.arc(px, py, isActive ? 22 : 18, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(0, 243, 255, 0.22)' : 'rgba(11, 18, 32, 0.85)';
      ctx.strokeStyle = isActive ? '#00F3FF' : 'rgba(0, 243, 255, 0.4)';
      ctx.lineWidth = isActive ? 2.5 : 1;
      if (isActive) {
        ctx.shadowColor = '#00F3FF';
        ctx.shadowBlur = 18;
      }
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Core Accent Dot
      ctx.beginPath();
      ctx.arc(px, py, isActive ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#FFFFFF' : '#00F3FF';
      ctx.fill();

      // Outer Mini Node Label
      ctx.font = isActive ? '700 10px "JetBrains Mono", monospace' : '9px "JetBrains Mono", monospace';
      ctx.fillStyle = isActive ? '#00F3FF' : '#94A3B8';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, px, py + 34);
    });

    // 2. Draw Traveling Data Packets
    if (Math.random() < 0.25) spawnPacket();

    for (let i = dataPackets.length - 1; i >= 0; i--) {
      const pkt = dataPackets[i];
      pkt.progress += pkt.speed;

      if (pkt.progress >= 1) {
        dataPackets.splice(i, 1);
        continue;
      }

      const p = pillars[pkt.pillarIdx];
      const px = centerX + Math.cos(p.angle) * radius;
      const py = centerY + Math.sin(p.angle) * radius;

      const currentProgress = pkt.direction === 1 ? pkt.progress : 1 - pkt.progress;
      const x = centerX + (px - centerX) * currentProgress;
      const y = centerY + (py - centerY) * currentProgress;

      ctx.beginPath();
      ctx.arc(x, y, pkt.isSpecial ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = pkt.isSpecial ? '#00FFAA' : '#00F3FF';
      ctx.shadowBlur = pkt.isSpecial ? 12 : 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Central Intelligence Core
    const pulse = Math.sin(time * 0.003) * 3;

    // Glowing Core Aura
    const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 48 + pulse);
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.3, 'rgba(0, 243, 255, 0.85)');
    coreGrad.addColorStop(0.7, 'rgba(0, 163, 255, 0.22)');
    coreGrad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 48 + pulse, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.fill();

    // Central Hexagon Core Body
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#05070A';
    ctx.strokeStyle = '#00F3FF';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00F3FF';
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Core Label
    ctx.font = '700 8.5px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00F3FF';
    ctx.textAlign = 'center';
    ctx.fillText('INTELLIGENCE', centerX, centerY - 2);
    ctx.fillText('CORE', centerX, centerY + 9);

    // 4. Dynamic Rotating Targeting Reticle on Active Pillar Node
    const activeP = pillars[activePillarIndex];
    const activePx = centerX + Math.cos(activeP.angle) * radius;
    const activePy = centerY + Math.sin(activeP.angle) * radius;

    ctx.save();
    ctx.translate(activePx, activePy);
    ctx.rotate(time * 0.002);
    ctx.strokeStyle = '#00F3FF';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 5. Topic Telemetry HUD Display on Canvas (Bottom Panel)
    const dossier = PILLAR_DOSSIERS[activePillarIndex];
    if (dossier) {
      const hudW = Math.min(width - 24, 430);
      const hudH = 76;
      const hudX = (width - hudW) / 2;
      const hudY = height - hudH - 12;

      ctx.save();
      // Semi-transparent glass background
      ctx.fillStyle = 'rgba(5, 7, 10, 0.9)';
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(0, 243, 255, 0.25)';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.roundRect(hudX, hudY, hudW, hudH, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Status pulse light
      const blink = Math.sin(time * 0.006) > 0;
      ctx.fillStyle = blink ? '#00F3FF' : '#00FFAA';
      ctx.shadowColor = '#00F3FF';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(hudX + 16, hudY + 18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pillar Title on Canvas
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.fillText(`${dossier.num} // ${dossier.heading}`, hudX + 28, hudY + 22);

      // Status Text
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00F3FF';
      ctx.fillText(`● STATUS: ${dossier.status}`, hudX + 16, hudY + 41);

      // Pipeline and Classification
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(`● ${dossier.pipeline} | ${dossier.classification}`, hudX + 16, hudY + 58);

      // Topic-Specific Wave / Radar / Hash Visualizer Widget (Right corner of HUD)
      const gaugeX = hudX + hudW - 55;
      const gaugeY = hudY + 22;

      if (activePillarIndex === 0) {
        // AI Security: Neural Sine wave
        ctx.strokeStyle = '#00F3FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let gx = 0; gx < 40; gx += 2) {
          const gy = Math.sin(time * 0.008 + gx * 0.25) * 8;
          if (gx === 0) ctx.moveTo(gaugeX + gx, gaugeY + gy);
          else ctx.lineTo(gaugeX + gx, gaugeY + gy);
        }
        ctx.stroke();
      } else if (activePillarIndex === 1) {
        // Threat Intel: Rotating radar sweep
        const rAngle = time * 0.004;
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(gaugeX + 20, gaugeY + 4, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gaugeX + 20, gaugeY + 4);
        ctx.lineTo(gaugeX + 20 + Math.cos(rAngle) * 12, gaugeY + 4 + Math.sin(rAngle) * 12);
        ctx.stroke();
      } else if (activePillarIndex === 2) {
        // Identity: Biometric hash scanning line
        ctx.strokeStyle = '#00FFAA';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(gaugeX + 5, gaugeY - 8, 30, 24);
        ctx.fillStyle = '#00FFAA';
        const scanLine = ((time * 0.02) % 22);
        ctx.fillRect(gaugeX + 7, gaugeY - 6 + scanLine, 26, 2);
      } else if (activePillarIndex === 3) {
        // Infrastructure: Multi-cloud pod cluster
        ctx.strokeStyle = '#88B4E8';
        ctx.lineWidth = 1;
        for (let c = 0; c < 3; c++) {
          for (let r = 0; r < 2; r++) {
            ctx.strokeRect(gaugeX + c * 12, gaugeY - 6 + r * 12, 8, 8);
          }
        }
      } else if (activePillarIndex === 4) {
        // Digital Trust: Quantum key ring
        ctx.strokeStyle = '#00F3FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(gaugeX + 20, gaugeY + 4, 10, time * 0.003, time * 0.003 + Math.PI * 1.5);
        ctx.stroke();
      } else {
        // Security Monitoring: EKG pulse line
        ctx.strokeStyle = '#33F6FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gaugeX, gaugeY + 4);
        ctx.lineTo(gaugeX + 8, gaugeY + 4);
        ctx.lineTo(gaugeX + 14, gaugeY - 9);
        ctx.lineTo(gaugeX + 20, gaugeY + 13);
        ctx.lineTo(gaugeX + 26, gaugeY + 4);
        ctx.lineTo(gaugeX + 40, gaugeY + 4);
        ctx.stroke();
      }

      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // --- Interaction & Pillar Selection ---
  const pillarCards = document.querySelectorAll('.pillar-card');

  function selectPillar(index, shouldScroll = false) {
    if (index < 0 || index >= pillars.length) return;
    activePillarIndex = index;

    pillarCards.forEach((card, idx) => {
      const isSelected = idx === index;
      if (isSelected) {
        card.classList.add('active');
        card.setAttribute('aria-expanded', 'true');
        const indicator = card.querySelector('.indicator-label');
        if (indicator) indicator.textContent = 'ACTIVE';
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-expanded', 'false');
        const indicator = card.querySelector('.indicator-label');
        if (indicator) indicator.textContent = 'DETAILS';
      }
    });

    if (shouldScroll) {
      const targetCard = pillarCards[index];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    cyberAudio.playIntercept();
  }

  // Bind Pillar Cards
  pillarCards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // Avoid interference if clicking buttons inside card
      if (e.target.closest('.open-pillar-dossier-btn') || e.target.closest('.pulse-pillar-btn')) {
        return;
      }
      selectPillar(idx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectPillar(idx);
      }
    });
  });

  // Pulse Telemetry Buttons
  document.querySelectorAll('.pulse-pillar-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pillarIdx = parseInt(btn.dataset.pillar, 10);
      selectPillar(pillarIdx);

      // Trigger high-speed particle volley toward that node
      for (let i = 0; i < 14; i++) {
        setTimeout(() => {
          spawnPacket(pillarIdx, 1.8 + Math.random() * 0.8);
        }, i * 35);
      }

      cyberAudio.playIntercept();
    });
  });

  // --- Tactical Dossier Modal Wiring ---
  const dossierModal = document.getElementById('pillar-dossier-modal');
  const dossierBadge = document.getElementById('dossier-badge');
  const dossierHeading = document.getElementById('dossier-heading');
  const dossierStatusText = document.getElementById('dossier-status-text');
  const dossierPipelineText = document.getElementById('dossier-pipeline-text');
  const dossierOverviewText = document.getElementById('dossier-overview-text');
  const dossierPipelineContainer = document.getElementById('dossier-pipeline-container');
  const dossierSpecsContainer = document.getElementById('dossier-specs-container');
  const dossierTerminalOutput = document.getElementById('dossier-terminal-output');
  const dossierTerminalTitle = document.getElementById('dossier-terminal-title');
  const dossierCloseBtn = document.getElementById('dossier-close-btn');
  const dossierDismissBtn = document.getElementById('dossier-dismiss-btn');
  const dossierContactBtn = document.getElementById('dossier-contact-btn');
  const contactModal = document.getElementById('contact-modal');
  const contactDefenseSelect = document.getElementById('contact-defense-need');

  let activeDossierPillarIdx = 0;

  function openDossier(pillarIdx) {
    activeDossierPillarIdx = pillarIdx;
    const data = PILLAR_DOSSIERS[pillarIdx];
    if (!data || !dossierModal) return;

    if (dossierBadge) dossierBadge.textContent = data.badge;
    if (dossierHeading) dossierHeading.textContent = data.heading;
    if (dossierStatusText) dossierStatusText.textContent = data.status;
    if (dossierPipelineText) dossierPipelineText.textContent = data.pipeline;
    if (dossierOverviewText) dossierOverviewText.textContent = data.overview;
    if (dossierTerminalTitle) dossierTerminalTitle.textContent = `CYBERHIVEX_CORE::${data.id.toUpperCase()}_DIAGNOSTICS`;

    // Populate Pipeline Steps
    if (dossierPipelineContainer) {
      dossierPipelineContainer.innerHTML = data.pipelineSteps.map(step => `
        <div class="dossier-pipe-step">
          <div class="dossier-step-num">STEP ${step.step}</div>
          <div class="dossier-step-title">${step.title}</div>
          <div class="dossier-step-desc">${step.desc}</div>
        </div>
      `).join('');
    }

    // Populate Capabilities Matrix
    if (dossierSpecsContainer) {
      dossierSpecsContainer.innerHTML = data.capabilities.map(cap => `
        <div class="dossier-spec-card">
          <div class="dossier-spec-title">
            <span style="color: var(--cyan-electric);">⚡</span>
            <span>${cap.title}</span>
          </div>
          <p class="dossier-spec-desc">${cap.desc}</p>
        </div>
      `).join('');
    }

    // Populate Terminal Logs
    if (dossierTerminalOutput) {
      dossierTerminalOutput.innerHTML = data.terminalLogs.map(log => {
        let cls = 'term-log-cyan';
        if (log.type === 'green') cls = 'term-log-green';
        if (log.type === 'threat') cls = 'term-log-threat';
        if (log.type === 'dim') cls = 'text-dim';
        return `<div><span class="${cls}">${log.text}</span></div>`;
      }).join('');
    }

    dossierModal.classList.add('active');
    cyberAudio.playClick();
  }

  function closeDossier() {
    if (dossierModal) {
      dossierModal.classList.remove('active');
      cyberAudio.playClick();
    }
  }

  // Bind Open Dossier Buttons
  document.querySelectorAll('.open-pillar-dossier-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pillarIdx = parseInt(btn.dataset.pillar, 10);
      selectPillar(pillarIdx);
      openDossier(pillarIdx);
    });
  });

  // Close Dossier Triggers
  dossierCloseBtn?.addEventListener('click', closeDossier);
  dossierDismissBtn?.addEventListener('click', closeDossier);
  dossierModal?.addEventListener('click', (e) => {
    if (e.target === dossierModal) {
      closeDossier();
    }
  });

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dossierModal?.classList.contains('active')) {
      closeDossier();
    }
  });

  // Connect Dossier Contact Button to Main Contact Modal
  dossierContactBtn?.addEventListener('click', () => {
    closeDossier();
    const data = PILLAR_DOSSIERS[activeDossierPillarIdx];
    if (data && contactDefenseSelect) {
      contactDefenseSelect.value = data.contactCategory;
    }
    if (contactModal) {
      contactModal.classList.add('active');
      cyberAudio.playIntercept();
    }
  });

  // --- Canvas Mouse & Click Interaction ---
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const radius = Math.min(width, height) * 0.38;

    pillars.forEach((p, idx) => {
      const px = centerX + Math.cos(p.angle) * radius;
      const py = centerY + Math.sin(p.angle) * radius;
      const dist = Math.hypot(clickX - px, clickY - py);
      if (dist < 32) {
        selectPillar(idx, true);
        // Fire mini burst of packets on canvas click
        for (let i = 0; i < 8; i++) {
          setTimeout(() => spawnPacket(idx, 1.5), i * 40);
        }
      }
    });
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const radius = Math.min(width, height) * 0.38;

    let isOverNode = false;
    pillars.forEach((p) => {
      const px = centerX + Math.cos(p.angle) * radius;
      const py = centerY + Math.sin(p.angle) * radius;
      if (Math.hypot(mouseX - px, mouseY - py) < 30) {
        isOverNode = true;
      }
    });

    canvas.style.cursor = isOverNode ? 'pointer' : 'default';
  });

  // Resize and Intersection Management
  let resizeTimer = null;
  function debouncedResize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(resize);
  }
  window.addEventListener('resize', debouncedResize);
  resize();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(canvas);
}
