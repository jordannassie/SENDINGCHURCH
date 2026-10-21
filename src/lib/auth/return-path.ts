export function safeLeadsReturnPath(value: string | null) {
  if (!value) return null;
  if (value !== "/dashboard/leads") return null;
  return value;
}
