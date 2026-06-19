'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

/**
 * App Router replacement for the old `pages/500.tsx` +
 * `components/pages/ServerError.tsx`. Sits below the `(website)` layout, so
 * the navbar/footer keep rendering around it — matching the old `<Layout>`
 * chrome. The header markup mirrors `components/Header.tsx` (which can't be
 * reused verbatim here without pulling the portable-text stack into the
 * client error bundle).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console for debugging / error reporting
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="my-8 text-center">
        <h1 className="mb-2 text-4xl font-medium tracking-tight uppercase italic md:mb-4 lg:text-5xl">
          500 Server Error
        </h1>
        <Separator className="bg-foreground mx-auto mt-8 w-1/2" />
      </div>
      <div className="mx-auto flex flex-col items-center justify-center">
        <Button
          variant="link"
          onClick={() => reset()}
          className="text-foreground hover:text-primary mb-4 h-auto border-0 p-0 font-serif text-xl font-normal underline underline-offset-auto opacity-80 duration-300 hover:opacity-100 md:mb-6"
        >
          Try Again
        </Button>
        <Button
          variant="link"
          nativeButton={false}
          className="text-foreground hover:text-primary mb-4 h-auto border-0 p-0 font-serif text-xl font-normal underline underline-offset-auto opacity-80 duration-300 hover:opacity-100 md:mb-6"
          render={<Link href="/" />}
        >
          Return to Home
        </Button>
      </div>
    </>
  );
}
