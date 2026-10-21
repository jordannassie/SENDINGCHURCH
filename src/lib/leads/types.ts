export const LEAD_STATUSES = [
  "new",
  "contacted",
  "coming",
  "attended",
  "do_not_contact",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  coming: "Coming",
  attended: "Attended",
  do_not_contact: "Do Not Contact",
};

export type SendingLead = {
  id: string;
  full_name: string;
  first_name?: string | null;
  last_name?: string | null;
  phone: string;
  phone_normalized: string;
  email: string | null;
  status: LeadStatus;
  notes: string | null;
  contacted_at: string | null;
  source: string | null;
  source_file: string | null;
  meta_lead_id: string | null;
  lead_created_at: string | null;
  imported_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ParsedLead = {
  rowNumber: number;
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  emailWarning: string | null;
  metaLeadId: string | null;
  leadCreatedAt: string | null;
};

export type InvalidRow = {
  rowNumber: number;
  reason: string;
};

export const DEFAULT_INVITATION =
  "Hi {first_name}! This is Jordan with Sending Church. Thanks for your interest in our Frisco Bible group. Would you like the details for our next gathering?";

export const PAGE_SIZE = 50;

export const UPSERT_OPTIONS = {
  onConflict: "phone_normalized",
  ignoreDuplicates: true,
} as const;
