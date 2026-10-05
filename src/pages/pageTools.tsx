import { useRef } from 'react';
import type { KeyboardEvent } from 'react';

interface TabItem<Id extends string> {
  id: Id;
  label: string;
  number?: string;
  detail?: string;
}

interface PageTabsProps<Id extends string> {
  id: string;
  label: string;
  items: readonly TabItem<Id>[];
  value: Id;
  onChange: (value: Id) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

// A shared, keyboard-operable tab list for the secondary pages.
export function PageTabs<Id extends string>({ id, label, items, value, onChange, className = '', orientation = 'horizontal' }: PageTabsProps<Id>) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selectWithKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % items.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const item = items[next];
    if (!item) return;
    onChange(item.id);
    refs.current[item.id]?.focus();
  };
  return (
    <div className={`pg-tabs ${className}`} role="tablist" aria-label={label} aria-orientation={orientation}>
      {items.map((item, index) => (
        <button
          type="button"
          key={item.id}
          id={`${id}-tab-${item.id}`}
          role="tab"
          aria-selected={value === item.id}
          aria-controls={`${id}-panel-${item.id}`}
          tabIndex={value === item.id ? 0 : -1}
          ref={(element) => { refs.current[item.id] = element; }}
          onClick={() => onChange(item.id)}
          onKeyDown={(event) => selectWithKey(event, index)}
        >
          {item.number && <span className="pg-tab-number">{item.number}</span>}
          <span>{item.label}</span>
          {item.detail && <small>{item.detail}</small>}
        </button>
      ))}
    </div>
  );
}
