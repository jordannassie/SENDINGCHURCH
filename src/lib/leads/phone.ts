export function hasPhoneExtension(raw: string) {
  return /(?:\bext(?:ension)?\.?|\bx)\s*\d+/i.test(raw);
}

export function normalizeUsPhone(
  raw: string,
): { ok: true; digits: string } | { ok: false; reason: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, reason: "Phone number is missing." };
  if (hasPhoneExtension(trimmed)) {
    return {
      ok: false,
      reason: "Extensions are not supported. Use a 10-digit US number.",
    };
  }

  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return { ok: false, reason: "Phone number is missing." };

  const normalized =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (normalized.length !== 10) {
    return {
      ok: false,
      reason:
        "Use a 10-digit US phone number. International numbers are not imported.",
    };
  }

  return { ok: true, digits: normalized };
}

export function formatUsPhone(digits: string) {
  if (digits.length !== 10) return digits;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function parseEmail(raw: string): {
  email: string | null;
  warning: string | null;
} {
  const trimmed = raw.trim();
  if (!trimmed) return { email: null, warning: null };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { email: null, warning: "Email looks invalid and was not saved." };
  }
  return { email: trimmed, warning: null };
}
