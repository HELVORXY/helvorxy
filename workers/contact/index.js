const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

const clean = (value) => (typeof value === 'string' ? value.trim() : '');
const validEmail = (value) =>
  value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const handleRequest = async (request, env) => {
  if (request.method === 'GET') {
    if (!env.TURNSTILE_SITE_KEY) {
      return json({ message: 'Contact service is not configured.' }, 503);
    }
    return json({ siteKey: env.TURNSTILE_SITE_KEY });
  }

  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed.' }, 405);
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (!origin || origin !== requestUrl.origin) {
    return json({ message: 'Invalid form origin.' }, 403);
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > 16_000) {
    return json({ message: 'The message is too large.' }, 413);
  }

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.CONTACT_EMAIL ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL
  ) {
    return json({ message: 'Contact service is not configured.' }, 503);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ message: 'Invalid form submission.' }, 400);
  }

  if (clean(form.get('website'))) return json({ ok: true });

  const name = clean(form.get('name'));
  const email = clean(form.get('email'));
  const subject = clean(form.get('subject')).replace(/[\r\n]+/g, ' ');
  const message = clean(form.get('message'));
  const turnstileToken = clean(form.get('cf-turnstile-response'));

  if (
    name.length < 2 || name.length > 100 ||
    !validEmail(email) ||
    subject.length < 3 || subject.length > 150 ||
    message.length < 10 || message.length > 5000
  ) {
    return json({ message: 'Please check the form fields and try again.' }, 400);
  }

  if (!turnstileToken || turnstileToken.length > 2048) {
    return json({ message: 'Please complete the security check.' }, 400);
  }

  let verification;
  try {
    const verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get('CF-Connecting-IP') || undefined,
          idempotency_key: crypto.randomUUID(),
        }),
      }
    );
    verification = await verificationResponse.json();
  } catch {
    return json({ message: 'The security check is temporarily unavailable.' }, 503);
  }

  if (
    !verification.success ||
    verification.action !== 'contact' ||
    verification.hostname !== requestUrl.hostname
  ) {
    return json({ message: 'Security verification failed. Please try again.' }, 400);
  }

  const text = [
    'A new message was submitted through helvorxy.com.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    await env.CONTACT_EMAIL.send({
      to: env.CONTACT_TO_EMAIL,
      from: { email: env.CONTACT_FROM_EMAIL, name: 'Helvorxy Website' },
      replyTo: { email, name },
      subject: `Website contact – ${subject}`,
      text,
    });
  } catch {
    return json({ message: 'Your message could not be delivered. Please try again later.' }, 502);
  }

  return json({ ok: true });
};

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
