'use client';

import { FloatingButton } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { Search, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

type MenuAiChatLabels = {
  openAssistant: string;
  closeAssistant: string;
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  emptyHint: string;
};

type MenuAiChatProps = {
  labels: MenuAiChatLabels;
};

export const MenuAiChat = ({ labels }: MenuAiChatProps) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      wasOpenRef.current = true;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      };

      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }

    if (wasOpenRef.current) {
      fabRef.current?.focus();
      wasOpenRef.current = false;
    }

    return undefined;
  }, [open]);

  return (
    <div className="pointer-events-none fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:end-8">
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
          className="pointer-events-auto flex h-[min(28rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-fade-in-up"
        >
          <header className="flex items-start justify-between gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="min-w-0">
              <h2 id={`${panelId}-title`} className="text-base font-semibold leading-tight">
                {labels.title}
              </h2>
              <p className="mt-0.5 text-xs text-primary-foreground/80">{labels.subtitle}</p>
            </div>
            <Button
              ref={closeButtonRef}
              type="button"
              variant="ghost"
              size="small"
              aria-label={labels.closeAssistant}
              className="h-8 w-8 shrink-0 rounded-full px-0 text-primary-foreground hover:bg-white/15"
              onClick={() => {
                setOpen(false);
              }}
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            </Button>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-background/60 px-4 py-6 text-center">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <Search className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <p className="max-w-[16rem] text-sm text-muted-foreground">{labels.emptyHint}</p>
          </div>

          <form
            className="flex items-center gap-2 border-t border-border bg-surface p-3"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label className="sr-only" htmlFor={`${panelId}-input`}>
              {labels.placeholder}
            </label>
            <input
              id={`${panelId}-input`}
              type="text"
              placeholder={labels.placeholder}
              disabled
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70"
            />
            <Button
              type="submit"
              variant="filled"
              size="small"
              disabled
              className="rounded-full px-3"
            >
              {labels.send}
            </Button>
          </form>
        </section>
      ) : null}

      <FloatingButton
        ref={fabRef}
        type="button"
        color="primary"
        size="large"
        variant="circular"
        aria-label={open ? labels.closeAssistant : labels.openAssistant}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="pointer-events-auto shadow-xl"
        onClick={() => {
          setOpen((value) => !value);
        }}
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
        ) : (
          <Search aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
        )}
      </FloatingButton>
    </div>
  );
};
