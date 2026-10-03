export type SundayRsvp = {
  first_name: string;
  mobile: string;
  email: string;
  created_at: string;
};

const STORAGE_KEY = "sending-sunday-rsvps";

export function saveSundayRsvp(input: {
  first_name: string;
  mobile: string;
  email?: string;
}): SundayRsvp {
  const record: SundayRsvp = {
    first_name: input.first_name.trim(),
    mobile: input.mobile.trim(),
    email: input.email?.trim() ?? "",
    created_at: new Date().toISOString(),
  };

  const existing = readSundayRsvps();
  existing.push(record);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  return record;
}

export function readSundayRsvps(): SundayRsvp[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SundayRsvp[]) : [];
  } catch {
    return [];
  }
}
