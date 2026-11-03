import Image from "next/image";
import Link from "next/link";

export const SENDING_LOGO =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/Sending2/logos/sendinglogo2.png";

type LogoProps = {
  href?: string;
  invert?: boolean;
  className?: string;
  imageClassName?: string;
};

export function Logo({
  href = "/",
  invert = false,
  className = "",
  imageClassName = "h-10",
}: LogoProps) {
  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      <Image
        src={SENDING_LOGO}
        alt="Sending"
        width={2172}
        height={724}
        className={`${imageClassName} w-auto ${invert ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}
