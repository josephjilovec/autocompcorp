export type PublicContact = { email?: string; bookingUrl?: string };

// Approved PUBLIC business contact only. Empty until a destination is supplied.
export const approvedPublicContact: PublicContact = {};

export function readPublicContact(value: unknown): PublicContact {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  const result: PublicContact = {};
  if (typeof input.email === 'string') {
    const email = input.email.trim();
    if (email.length <= 160 && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) result.email = email;
  }
  if (typeof input.bookingUrl === 'string' && input.bookingUrl.length <= 2048) {
    try {
      const url = new URL(input.bookingUrl.trim());
      const local = /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[)/i.test(url.hostname);
      const sensitive = [...url.searchParams.keys()].some(key => /^(access_token|api_key|secret|password)$/i.test(key));
      if (url.protocol === 'https:' && !url.username && !url.password && !local && !sensitive) result.bookingUrl = url.toString();
    } catch { /* Invalid optional public contact information is not rendered. */ }
  }
  return result;
}

export function emailDraftHref(email: string, subject: string, brief: string) {
  const contact = readPublicContact({ email });
  if (!contact.email) return null;
  return 'mailto:' + encodeURIComponent(contact.email) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(brief);
}
