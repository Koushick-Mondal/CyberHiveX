import type { ImgHTMLAttributes } from 'react';

interface CyberLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: number;
  variant?: 'light' | 'full' | 'full-light' | 'dark';
}

/** Existing supplied brand artwork, displayed without filters or added effects. */
export default function CyberLogo({ size = 48, variant = 'light', className = '', alt = 'CyberHiveX', style, ...props }: CyberLogoProps) {
  const isFull = variant === 'full' || variant === 'full-light';
  return (
    <img
      {...props}
      src={isFull ? '/cyberhivex-full-clean.png' : '/cyberhivex-brand-mark.png'}
      width={isFull ? undefined : size}
      height={size}
      alt={alt}
      className={className}
      style={{ width: isFull ? 'auto' : `${size}px`, height: `${size}px`, maxWidth: '100%', objectFit: 'contain', display: 'block', ...style }}
    />
  );
}
