import type { APIRoute } from 'astro';
import { loadProfile } from '../../lib/profile';

export const prerender = false;

/** GET /api/interests — returns interests from PROFILE.md / content. */
export const GET: APIRoute = async () => {
  const profile = loadProfile();
  return new Response(
    JSON.stringify({
      interests: profile.interests,
      source: 'profile',
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );
};
