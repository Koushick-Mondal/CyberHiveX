import { ArrowRight } from 'lucide-react';
import RakshakSecurityScene from './visualization/RakshakSecurityScene';

export default function CyberCommandCenterHeroVisual({ onExploreRakshak }: { onExploreRakshak?: () => void; onRequestAssessment?: () => void }) {
  return (
    <div className="ch-hero-preview">
      <RakshakSecurityScene />
      {onExploreRakshak && (
        <button type="button" className="ch-text-link ch-preview-link" onClick={onExploreRakshak}>
          Explore the interactive command center <ArrowRight size={15} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
