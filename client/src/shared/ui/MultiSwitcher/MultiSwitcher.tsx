import { useState, type ReactNode } from 'react';
import styles from './MultiSwitcher.module.css';

export type SwitcherId = string | number;

export interface SwitcherItem<T = SwitcherId> {
  id: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface MultiSwitcherProps<T = SwitcherId> {
  items: SwitcherItem<T>[];
  defaultValue?: T;
  value?: T;
  onChange?: (id: T) => void;
  className?: string;
}

export const MultiSwitcher = <T extends SwitcherId>({
  items,
  defaultValue,
  value: controlledValue,
  onChange,
  className = '',
}: MultiSwitcherProps<T>) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );

  const activeId = isControlled ? controlledValue : internalValue;

  const handleClick = (id: T) => {
    if (isControlled) {
      onChange?.(id);
    } else {
      setInternalValue(id);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <button
            key={String(item.id)}
            type='button'
            className={`
              ${styles.item}
              ${isActive ? styles.active : ''}
              ${item.disabled ? styles.disabled : ''}
            `}
            onClick={() => !item.disabled && handleClick(item.id)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
