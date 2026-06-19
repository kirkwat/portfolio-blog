import Link from 'next/link';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

/**
 * 404 boundary for `notFound()` thrown inside the `(website)` route group.
 * Renders within the website layout, so the navbar/footer come for free.
 * Same visual design as the old `components/pages/NotFound.tsx`.
 */
export default function NotFound() {
  return (
    <>
      <Header
        id={null}
        type={null}
        path={[]}
        centered
        title="404 Page Not Found"
      />
      <div className="mx-auto flex justify-center">
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
