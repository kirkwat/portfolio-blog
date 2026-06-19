import Link from 'next/link';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

export default function ProjectSlugNotFound() {
  return (
    <>
      <Header
        id={null}
        type={null}
        path={[]}
        centered
        title="404 Project Not Found"
      />
      <div className="mx-auto flex justify-center">
        <Button
          variant="link"
          nativeButton={false}
          className="text-foreground hover:text-primary mb-4 h-auto border-0 p-0 font-serif text-xl font-normal underline underline-offset-auto opacity-80 duration-300 hover:opacity-100 md:mb-6"
          render={<Link href="/projects" />}
        >
          Return to Projects
        </Button>
      </div>
    </>
  );
}
