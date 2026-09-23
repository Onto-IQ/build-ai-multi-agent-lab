import type { APIRoute } from 'astro';
import { insertContact } from '../../lib/db';

export const prerender = false;

/**
 * POST /api/contact
 * Lab 05: validate JSON {name,email,message}, persist with insertContact, return 201.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const row = insertContact(body);
    return new Response(JSON.stringify(row), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error';
    const status = message.startsWith('NOT_IMPLEMENTED') ? 501 : 400;
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  }
};
