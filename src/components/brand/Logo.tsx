import Image from "next/image";
import Link from "next/link";

export const SENDING_LOGO =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/sendinglogo.png";

type LogoProps = {
  href?: string;
  invert?: boolean;
  className?: string;
};

export function Logo({ href = "/", invert = false, className = "" }: LogoProps) {
  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      <Image
        src={SENDING_LOGO}
        alt="Sending"
        width={2161}
        height={728}
        className={`h-8 w-auto ${invert ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}
