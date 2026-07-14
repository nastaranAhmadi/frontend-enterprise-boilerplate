import {
  createContext,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getHorizontalNavigationKeys,
  getVerticalNavigationKeys,
} from '../../../direction/textDirection';
import { useTextDirection } from '../../../hooks/useTextDirection';
import {
  getTabsBadgeClassName,
  getTabsItemClassName,
  getTabsListClassName,
  getTabsPanelClassName,
  getTabsRootClassName,
  normalizeOrientation,
  normalizeSize,
  normalizeVariant,
} from './Tabs.styles';
import type {
  TabsItemProps,
  TabsListProps,
  TabsOrientation,
  TabsPanelProps,
  TabsProps,
  TabsSize,
  TabsVariant,
} from './Tabs.types';

interface TabsContextValue {
  fullWidth: boolean;
  getPanelId: (key: string) => string;
  getTabId: (key: string) => string;
  listId: string;
  onSelect: (key: string) => void;
  orientation: TabsOrientation;
  registerTab: (key: string, node: HTMLButtonElement | null) => void;
  selectedKey: string | undefined;
  size: TabsSize;
  tabKeys: string[];
  variant: TabsVariant;
}

interface TabsListContextValue {
  listId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);
const TabsListContext = createContext<TabsListContextValue | null>(null);

const useTabsContext = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs.');
  }
  return context;
};

const useTabsListContext = (): TabsListContextValue => {
  const context = useContext(TabsListContext);
  if (!context) {
    throw new Error('Tabs.Item must be used within Tabs.List.');
  }
  return context;
};

const useControllableSelection = ({
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
}: Pick<TabsProps, 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange'>) => {
  const [uncontrolledKey, setUncontrolledKey] = useState<string | undefined>(defaultSelectedKey);
  const isControlled = selectedKey !== undefined;
  const currentKey = isControlled ? selectedKey : uncontrolledKey;

  const setSelectedKey = useCallback(
    (nextKey: string) => {
      if (!isControlled) {
        setUncontrolledKey(nextKey);
      }
      onSelectionChange?.(nextKey);
    },
    [isControlled, onSelectionChange],
  );

  return { currentKey, setSelectedKey };
};

const getEnabledTabButtons = (list: HTMLElement): HTMLButtonElement[] =>
  Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));

const focusTabAt = (list: HTMLElement, index: number, onSelect?: (key: string) => void): void => {
  const tabs = getEnabledTabButtons(list);
  if (tabs.length === 0) return;

  const wrappedIndex = ((index % tabs.length) + tabs.length) % tabs.length;
  const tab = tabs[wrappedIndex];
  tab?.focus();

  const tabKey = tab?.dataset.tabKey;
  if (tabKey && onSelect) {
    onSelect(tabKey);
  }
};

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, ref) {
  const {
    children,
    className,
    defaultSelectedKey,
    onSelectionChange,
    orientation = 'horizontal',
    selectedKey,
    ...rootProps
  } = props;

  const baseId = useId();
  const listId = `${baseId}-list`;
  const tabRegistryRef = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const [tabKeys, setTabKeys] = useState<string[]>([]);

  const { currentKey, setSelectedKey } = useControllableSelection({
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
  });

  const registerTab = useCallback((key: string, node: HTMLButtonElement | null) => {
    if (node) {
      tabRegistryRef.current.set(key, node);
    } else {
      tabRegistryRef.current.delete(key);
    }

    setTabKeys(Array.from(tabRegistryRef.current.keys()));
  }, []);

  const getTabId = useCallback((key: string) => `${baseId}-tab-${key}`, [baseId]);
  const getPanelId = useCallback((key: string) => `${baseId}-panel-${key}`, [baseId]);

  useEffect(() => {
    const firstKey = tabKeys[0];
    if (currentKey !== undefined || firstKey === undefined) {
      return;
    }

    setSelectedKey(firstKey);
  }, [currentKey, setSelectedKey, tabKeys]);

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      fullWidth: false,
      getPanelId,
      getTabId,
      listId,
      onSelect: setSelectedKey,
      orientation: normalizeOrientation(orientation),
      registerTab,
      selectedKey: currentKey,
      size: 'small',
      tabKeys,
      variant: 'underline',
    }),
    [currentKey, getPanelId, getTabId, listId, orientation, registerTab, setSelectedKey, tabKeys],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div ref={ref} className={getTabsRootClassName({ className })} {...rootProps}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(props, ref) {
  const {
    children,
    className,
    fullWidth = false,
    size = 'small',
    variant = 'underline',
    ...listProps
  } = props;

  const tabsContext = useTabsContext();
  const { isRtl } = useTextDirection();
  const resolvedVariant = normalizeVariant(variant);
  const resolvedSize = normalizeSize(size);
  const resolvedOrientation = tabsContext.orientation;

  const listContextValue = useMemo(() => ({ listId: tabsContext.listId }), [tabsContext.listId]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const list = event.currentTarget;
    const tabs = getEnabledTabButtons(list);
    if (tabs.length === 0) return;

    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    const isHorizontal = resolvedOrientation === 'horizontal';
    const navigationKeys = isHorizontal
      ? getHorizontalNavigationKeys(isRtl)
      : getVerticalNavigationKeys();
    const previousKey = navigationKeys.previous;
    const nextKey = navigationKeys.next;

    switch (event.key) {
      case previousKey:
        event.preventDefault();
        focusTabAt(
          list,
          currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1,
          tabsContext.onSelect,
        );
        break;
      case nextKey:
        event.preventDefault();
        focusTabAt(list, currentIndex === -1 ? 0 : currentIndex + 1, tabsContext.onSelect);
        break;
      case 'Home':
        event.preventDefault();
        focusTabAt(list, 0, tabsContext.onSelect);
        break;
      case 'End':
        event.preventDefault();
        focusTabAt(list, tabs.length - 1, tabsContext.onSelect);
        break;
      default:
        break;
    }
  };

  return (
    <TabsContext.Provider
      value={{
        ...tabsContext,
        fullWidth,
        size: resolvedSize,
        variant: resolvedVariant,
      }}
    >
      <TabsListContext.Provider value={listContextValue}>
        <div
          ref={ref}
          id={tabsContext.listId}
          role="tablist"
          tabIndex={-1}
          aria-orientation={resolvedOrientation}
          className={getTabsListClassName({
            className,
            fullWidth,
            orientation: resolvedOrientation,
            size: resolvedSize,
            variant: resolvedVariant,
          })}
          onKeyDown={handleKeyDown}
          {...listProps}
        >
          {children}
        </div>
      </TabsListContext.Provider>
    </TabsContext.Provider>
  );
});

TabsList.displayName = 'TabsList';

export const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps>(function TabsItem(props, ref) {
  const { badge, children, className, disabled = false, id, ...itemProps } = props;

  const {
    fullWidth,
    getPanelId,
    getTabId,
    onSelect,
    orientation,
    registerTab,
    selectedKey,
    size,
    variant,
  } = useTabsContext();
  useTabsListContext();

  const isSelected = selectedKey === id;
  const tabId = getTabId(id);
  const panelId = getPanelId(id);

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      registerTab(id, node);

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [id, ref, registerTab],
  );

  return (
    <button
      ref={setButtonRef}
      type="button"
      role="tab"
      id={tabId}
      data-tab-key={id}
      aria-selected={isSelected}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={getTabsItemClassName({
        className,
        fullWidth,
        orientation,
        selected: isSelected,
        size,
        variant,
      })}
      onClick={() => {
        if (!disabled) {
          onSelect(id);
        }
      }}
      {...itemProps}
    >
      <span className="inline-flex items-center gap-xs">
        {children}
        {badge !== undefined && badge !== null && badge !== '' ? (
          <span
            className={getTabsBadgeClassName({ selected: isSelected, variant })}
            aria-hidden="true"
          >
            {badge}
          </span>
        ) : null}
      </span>
    </button>
  );
});

TabsItem.displayName = 'TabsItem';

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(props, ref) {
  const { children, className, id, ...panelProps } = props;
  const { getPanelId, getTabId, selectedKey } = useTabsContext();

  const isSelected = selectedKey === id;
  const tabId = getTabId(id);
  const panelId = getPanelId(id);

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={getTabsPanelClassName({ className })}
      {...panelProps}
    >
      {isSelected ? children : null}
    </div>
  );
});

TabsPanel.displayName = 'TabsPanel';

export const Tabs = Object.assign(TabsRoot, {
  Item: TabsItem,
  List: TabsList,
  Panel: TabsPanel,
});
