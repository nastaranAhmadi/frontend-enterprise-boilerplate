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
  getDropdownMenuShellClassName,
  getDropdownRootClassName,
} from './Dropdown.styles';
import type { DropdownItemProps, DropdownLinkProps, DropdownProps } from './Dropdown.types';

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
    position = 'relative',
    openOnHover = false,
    hoverCloseDelay: hoverCloseDelayProp = 160,
    disabled,
    open,
    defaultOpen,
    onOpenChange,
    ...dropdownProps
  } = props;

  const hoverCloseDelay: number = hoverCloseDelayProp;
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const openedByHoverRef = useRef(false);
  const { isOpen, setOpen } = useControllableOpen({ open, defaultOpen, onOpenChange });

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    openedByHoverRef.current = false;
    setOpen(false);
  }, [clearCloseTimer, setOpen]);

  const openMenu = useCallback(
    (fromHover: boolean) => {
      clearCloseTimer();
      openedByHoverRef.current = fromHover;
      setOpen(true);
    },
    [clearCloseTimer, setOpen],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      openedByHoverRef.current = false;
      setOpen(false);
      closeTimerRef.current = null;
    }, hoverCloseDelay);
  }, [clearCloseTimer, hoverCloseDelay, setOpen]);

  useEffect(
    () => () => {
      clearCloseTimer();
    },
    [clearCloseTimer],
  );

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (menu && !openedByHoverRef.current) {
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

  // When position is static, menu is outside root in the tree for hit-testing —
  // still listen on document. Also attach hover leave to menu via shell handlers below.

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
            if (isOpen) {
              closeMenu();
            } else {
              openMenu(false);
            }
          }
        },
      } as Record<string, unknown>)
    : trigger;

  const hoverHandlers = openOnHover
    ? {
        onMouseEnter: () => {
          if (!disabled) {
            openMenu(true);
          }
        },
        onMouseLeave: () => {
          if (!disabled) {
            scheduleClose();
          }
        },
      }
    : {};

  return (
    <div
      {...dropdownProps}
      {...hoverHandlers}
      ref={setRefs}
      className={getDropdownRootClassName({ className, position })}
    >
      {triggerElement}
      {isOpen ? (
        <DropdownContext.Provider value={{ size, closeMenu }}>
          <div
            className={getDropdownMenuShellClassName({ align })}
            {...(openOnHover
              ? {
                  onMouseEnter: clearCloseTimer,
                  onMouseLeave: scheduleClose,
                }
              : {})}
          >
            <div
              id={menuId}
              ref={menuRef}
              role="menu"
              tabIndex={-1}
              onKeyDown={handleMenuKeyDown}
              className={getDropdownMenuClassName({ size, className: menuClassName })}
            >
              {children}
            </div>
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

export const DropdownLink = forwardRef<HTMLAnchorElement, DropdownLinkProps>(
  function DropdownLink(props, ref) {
    const { children, className, href, onClick, rel, target, ...linkProps } = props;
    const { size, closeMenu } = useDropdownContext();

    return (
      <a
        {...linkProps}
        ref={ref}
        href={href}
        rel={rel}
        target={target}
        role="menuitem"
        className={getDropdownItemClassName({ size, className })}
        onClick={(event) => {
          onClick?.(event);
          closeMenu();
        }}
      >
        {children}
      </a>
    );
  },
);

DropdownLink.displayName = 'DropdownLink';
