import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import {
  getDropdownItemClassName,
  getDropdownMenuClassName,
  getDropdownRootClassName,
} from './Dropdown.styles';
import type { DropdownItemProps, DropdownProps } from './Dropdown.types';

interface DropdownContextValue {
  size?: DropdownProps['size'];
  closeMenu: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within Dropdown.');
  }
  return context;
};

const useControllableOpen = ({
  open,
  defaultOpen,
  onOpenChange,
}: Pick<DropdownProps, 'open' | 'defaultOpen' | 'onOpenChange'>) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return { isOpen, setOpen };
};

const getEnabledMenuItems = (menu: HTMLElement): HTMLElement[] =>
  Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'));

const focusMenuItemAt = (menu: HTMLElement, index: number): void => {
  const items = getEnabledMenuItems(menu);
  if (items.length === 0) return;

  const wrappedIndex = ((index % items.length) + items.length) % items.length;
  items[wrappedIndex]?.focus();
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(props, ref) {
  const {
    trigger,
    children,
    className,
    menuClassName,
    size,
    align,
    disabled,
    open,
    defaultOpen,
    onOpenChange,
    ...dropdownProps
  } = props;

  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setOpen } = useControllableOpen({ open, defaultOpen, onOpenChange });

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (menu) {
      focusMenuItemAt(menu, 0);
    }

    const handlePointerDown = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const menu = menuRef.current;
    if (!menu) return;

    const items = getEnabledMenuItems(menu);
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusMenuItemAt(menu, currentIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusMenuItemAt(menu, currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusMenuItemAt(menu, 0);
        break;
      case 'End':
        event.preventDefault();
        focusMenuItemAt(menu, items.length - 1);
        break;
      default:
        break;
    }
  };

  const setRefs = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger, {
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu',
        'aria-controls': isOpen ? menuId : undefined,
        disabled: disabled || (trigger.props as { disabled?: boolean }).disabled,
        onClick: (event: ReactMouseEvent<HTMLElement>) => {
          (trigger.props as { onClick?: (event: ReactMouseEvent<HTMLElement>) => void }).onClick?.(
            event,
          );
          if (!disabled) {
            setOpen(!isOpen);
          }
        },
      } as Record<string, unknown>)
    : trigger;

  return (
    <div {...dropdownProps} ref={setRefs} className={getDropdownRootClassName({ className })}>
      {triggerElement}
      {isOpen ? (
        <DropdownContext.Provider value={{ size, closeMenu }}>
          <div
            id={menuId}
            ref={menuRef}
            role="menu"
            tabIndex={-1}
            onKeyDown={handleMenuKeyDown}
            className={getDropdownMenuClassName({ size, align, className: menuClassName })}
          >
            {children}
          </div>
        </DropdownContext.Provider>
      ) : null}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  function DropdownItem(props, ref) {
    const { children, className, disabled, destructive, onClick, type, ...itemProps } = props;
    const { size, closeMenu } = useDropdownContext();

    return (
      <button
        {...itemProps}
        ref={ref}
        type={type ?? 'button'}
        role="menuitem"
        disabled={disabled}
        className={getDropdownItemClassName({ size, destructive, className })}
        onClick={(event) => {
          onClick?.(event);
          if (!disabled) {
            closeMenu();
          }
        }}
      >
        {children}
      </button>
    );
  },
);

DropdownItem.displayName = 'DropdownItem';
