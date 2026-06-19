import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

/**
 * Serves the Sanity-hosted resume at the stable `/uploads/resume.pdf` URL,
 * replacing the old `pages/uploads/resume.pdf.tsx` (which embedded
 * `settings.resume` in an iframe and revalidated every second). A redirect to
 * the CDN file is the route-handler equivalent: the URL stays shareable and
 * always points at whatever file is currently uploaded in Studio.
 *
 * The `resume` field may be unset in the dataset — respond 404 in that case.
 */
export async function GET() {
  const siteSettings = await client.fetch(
    siteSettingsQuery,
    {},
    { perspective: 'published', cache: 'no-store' },
  );

  const resumeUrl = siteSettings?.resume;
  if (!resumeUrl) {
    return new Response('Resume not found', { status: 404 });
  }

  return Response.redirect(resumeUrl, 302);
}
