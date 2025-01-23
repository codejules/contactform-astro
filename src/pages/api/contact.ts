import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/api/contact.server';
import type { ApiResponse } from '../../lib/types/contact';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const result = await sendContactEmail(data);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' } as ApiResponse),
      { status: 500 }
    );
  }
};