import Image from "next/image";
import Link from "next/link";

export const SENDING_LOGO = "/sending-logo.png";

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
        width={2001}
        height={447}
        className={`h-10 w-auto ${invert ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}
