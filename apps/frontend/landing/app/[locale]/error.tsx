'use client';

import { useEffect } from 'react';

import { LocalizedErrorContent } from '@/components/status/localized-status-content';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <LocalizedErrorContent onRetry={reset} />;
}
