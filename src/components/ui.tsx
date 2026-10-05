import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { routes } from '../routes';
import type { Navigate, PageId } from '../types/site';

export interface RouteLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  page: PageId;
  onNavigate?: Navigate;
}

export const RouteLink = forwardRef<HTMLAnchorElement, RouteLinkProps>(function RouteLink({ page, children, onNavigate, className = '', onClick, target, ...props }, ref) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey || (target && target !== '_self') ||
      props.download != null || typeof onNavigate !== 'function'
    ) return;
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <a {...props} ref={ref} href={routes[page].path} target={target} className={className} onClick={handleClick}>
      {children}
    </a>
  );
});

interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  number?: string | number;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export function SectionHeader({ number, eyebrow, title, description, className = '', ...props }: SectionHeaderProps) {
  return (
    <header className={`section-header ${className}`.trim()} {...props}>
      {(number != null || eyebrow) && (
        <p className="section-eyebrow">
          {number != null && <span className="section-number">{number}</span>}
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: string }

export function Badge({ children, tone = 'neutral', className = '', ...props }: BadgeProps) {
  return <span {...props} className={`ui-badge ui-badge--${tone} ${className}`.trim()}>{children}</span>;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'outline' | 'secondary' }

export function Button({ children, variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  const styleClass = variant === 'primary' ? 'btn-cyber-primary' : 'btn-cyber-outline';
  return <button {...props} type={type} className={`${styleClass} ${className}`.trim()}>{children}</button>;
}
