/**
 * Public app config, validated once at module load. `NEXT_PUBLIC_BASE_URL` is
 * the canonical site origin (metadata, sitemap, RSS, JSON-LD); defaults to
 * localhost in dev, and a production build on a non-https URL fails fast
 * (unless `NEXT_PUBLIC_CI` is set).
 */
const production = process.env.NODE_ENV === 'production';

function resolveBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(
      "Please provide the variable NEXT_PUBLIC_BASE_URL with a valid URL, such as: 'https://example.com'",
    );
  }

  const ci = Boolean(process.env.NEXT_PUBLIC_CI);
  if (production && !ci && url.protocol === 'http:') {
    throw new Error(
      'You are deploying a production build but NEXT_PUBLIC_BASE_URL uses http instead of https. The build will now fail to prevent deploying a faulty configuration. Please provide an https URL.',
    );
  }

  // Strip trailing slashes so callers can safely build `${baseUrl}/path`.
  return raw.replace(/\/+$/, '');
}

export const appConfig = {
  baseUrl: resolveBaseUrl(),
  production,
};
