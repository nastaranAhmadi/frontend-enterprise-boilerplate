import { Skeleton } from '@enterprise/ui/skeleton';

export default function LoadingPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-md px-md py-xl"
    >
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
    </main>
  );
}
