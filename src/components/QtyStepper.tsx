import React, { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (qty: number) => void;
  /** Product name, for screen readers */
  label: string;
  size?: 'sm';
}

/** − [qty] + control; the number can also be typed. */
const QtyStepper: React.FC<Props> = ({ value, onChange, label, size }) => {
  // Local text so the field can be briefly empty while typing
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);

  const commit = (raw: string) => {
    const n = Math.min(999, Math.max(1, parseInt(raw, 10) || 1));
    setText(String(n));
    if (n !== value) onChange(n);
  };

  return (
    <div className={`qty ${size === 'sm' ? 'qty--sm' : ''}`}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label={`Fewer ${label}`}>
        <Minus size={14} />
      </button>
      <input
        inputMode="numeric"
        value={text}
        onChange={e => setText(e.target.value.replace(/\D/g, '').slice(0, 3))}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && commit((e.target as HTMLInputElement).value)}
        aria-label={`Quantity of ${label}`}
      />
      <button type="button" onClick={() => onChange(Math.min(999, value + 1))} disabled={value >= 999} aria-label={`More ${label}`}>
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QtyStepper;
