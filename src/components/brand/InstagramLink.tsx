import { Instagram } from "lucide-react";

export const INSTAGRAM_URL = "https://www.instagram.com/sending_churches";

type InstagramLinkProps = {
  size?: number;
  className?: string;
};

export function InstagramLink({
  size = 22,
  className = "",
}: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Sending Churches on Instagram"
      className={`inline-flex items-center justify-center transition-opacity hover:opacity-80 ${className}`}
    >
      <Instagram size={size} strokeWidth={1.75} />
    </a>
  );
}
