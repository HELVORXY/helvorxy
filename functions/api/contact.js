const unavailable = () =>
  Response.json(
    { message: 'Contact service is not configured.' },
    {
      status: 503,
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );

export const onRequest = async ({ request, env }) => {
  if (!env.CONTACT_SERVICE) return unavailable();
  return env.CONTACT_SERVICE.fetch(request);
};
