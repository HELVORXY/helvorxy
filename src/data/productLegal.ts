import cvMakerPrivacyRaw from '../legal-documents/cvmaker-privacy.html?raw';
import cvMakerTermsRaw from '../legal-documents/cvmaker-terms.html?raw';
import gamepadPrivacyRaw from '../legal-documents/gamepad-privacy.html?raw';
import gamepadTermsRaw from '../legal-documents/gamepad-terms.html?raw';
import inviquePrivacyRaw from '../legal-documents/invique-privacy.html?raw';
import inviqueTermsRaw from '../legal-documents/invique-terms.html?raw';
import nureyaPrivacyRaw from '../legal-documents/nureya-privacy.html?raw';
import nureyaTermsRaw from '../legal-documents/nureya-terms.html?raw';
import wordexaPrivacyRaw from '../legal-documents/wordexa-privacy.html?raw';
import wordexaTermsRaw from '../legal-documents/wordexa-terms.html?raw';

export type LegalKind = 'privacy' | 'terms';

export type LegalDocument = {
  title: string;
  description: string;
  html: string;
};

export type ProductLegalDocuments = Partial<Record<LegalKind, LegalDocument>>;

/**
 * Converts the trusted, archived Blogger post bodies to neutral semantic HTML.
 * Blogger/Gemini editor attributes are intentionally removed so the site theme
 * remains in full control of typography, color and spacing.
 */
function prepareLegalHtml(source: string): string {
  const html = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(
      /<a\b[^>]*href=(['"])(.*?)\1[^>]*>/gi,
      (_match, _quote, href: string) => `<a href="${href}" rel="noopener noreferrer">`,
    )
    .replace(/<b\b[^>]*>/gi, '<strong>')
    .replace(/<\/b>/gi, '</strong>')
    .replace(/<(p|h1|h2|h3|h4|ul|ol|li|strong|em|blockquote|hr)\b[^>]*>/gi, '<$1>')
    .replace(
      /<(?!\/?(?:p|h[1-4]|ul|ol|li|strong|em|blockquote|hr|a)(?:\s|>|\/))[^>]+>/gi,
      '',
    )
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/^\s*<(h1|h2)>[\s\S]*?<\/\1>\s*/i, '')
    .replace(/<p><strong>(\d+\.[^<]+)<\/strong>\s*/gi, '<h2>$1</h2><p>')
    .replace(/please contact us via email:\s*<strong>Email:<\/strong>\s*/gi, 'please use our ')
    .replace(
      /<a\b[^>]*href="mailto:[^"]*"[^>]*>[^<]*<\/a>/gi,
      '<a href="/contact">contact form</a>',
    )
    .replace(/\[?k12181159@gmail\.com\]?/gi, '<a href="/contact">contact form</a>')
    .replace(
      /<strong>\[<\/strong>\s*https:\/\/helvorxy\.com\/contact\s*<strong>\]<\/strong>/gi,
      'https://helvorxy.com/contact',
    )
    .replace(/\[https:\/\/helvorxy\.com\/contact\]/gi, 'https://helvorxy.com/contact')
    .replace(
      /https:\/\/helvorxy\.com\/contact/gi,
      '<a href="/contact">contact form</a>',
    )
    .trim();

  return html.includes('<h2>') ? html : html.replace(/<(\/?)h3>/gi, '<$1h2>');
}

const document = (title: string, description: string, html: string): LegalDocument => ({
  title,
  description,
  html: prepareLegalHtml(html),
});

/** One authoritative registry drives every product-specific legal route. */
export const productLegalBySlug: Record<string, ProductLegalDocuments> = {
  'gamepad-tester': {
    privacy: document(
      'GamePad Tester & Massager Privacy Policy',
      'How GamePad Tester & Massager handles information and third-party services.',
      gamepadPrivacyRaw,
    ),
    terms: document(
      'GamePad Tester & Massager Terms and Conditions',
      'Terms, subscriptions, safety guidance and disclaimers for GamePad Tester & Massager.',
      gamepadTermsRaw,
    ),
  },
  nureya: {
    privacy: document(
      'Nureya Privacy Policy',
      'How Nureya handles location, notifications, local data and privacy choices.',
      nureyaPrivacyRaw,
    ),
    terms: document(
      'Nureya Terms and Conditions',
      'Terms governing the use of Nureya, its religious content and prayer-time tools.',
      nureyaTermsRaw,
    ),
  },
  'cv-maker-professional': {
    privacy: document(
      'CV Maker Privacy Policy',
      'How CV Maker handles resume content, local storage and technical information.',
      cvMakerPrivacyRaw,
    ),
    terms: document(
      'CV Maker Terms and Conditions',
      'Terms governing CV Maker, user content, subscriptions and PDF creation.',
      cvMakerTermsRaw,
    ),
  },
  wordexa: {
    privacy: document(
      'Wordexa Privacy Policy',
      'How Wordexa handles local learning data and protects user privacy.',
      wordexaPrivacyRaw,
    ),
    terms: document(
      'Wordexa Terms and Conditions',
      'Terms governing use of Wordexa and its educational content.',
      wordexaTermsRaw,
    ),
  },
  invique: {
    privacy: document(
      'Invique Privacy Policy',
      'How Invique handles invitations, photos and other content created on your device.',
      inviquePrivacyRaw,
    ),
    terms: document(
      'Invique Terms and Conditions',
      'Terms governing Invique, user-created designs, local storage and content sharing.',
      inviqueTermsRaw,
    ),
  },
};
