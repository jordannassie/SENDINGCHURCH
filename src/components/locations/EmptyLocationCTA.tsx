import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyLocationCTA() {
  return (
    <div className="mt-10 text-center">
      <p className="text-base text-[#666]">Don’t see a location near you?</p>
      <div className="mt-4">
        <Button href="/login" variant="secondary">
          Start a Sending Church
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
