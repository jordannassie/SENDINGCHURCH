import { LoginForm } from "./login-form";
import { safeLeadsReturnPath } from "@/lib/auth/return-path";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const leadsReturn = safeLeadsReturnPath(params.next ?? null) === "/dashboard/leads";

  return <LoginForm leadsReturn={leadsReturn} googleError={params.error === "google"} />;
}
