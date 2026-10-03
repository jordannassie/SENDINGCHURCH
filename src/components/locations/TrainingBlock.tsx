import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatTimeRange, type SendingLocation } from "@/lib/locations";

export function TrainingBlock({ location }: { location: SendingLocation }) {
  return (
    <div className="flex h-full flex-col px-6 py-7 sm:px-8">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--sending-orange)]">
        Training
      </p>
      <p className="mt-3 text-sm font-medium text-[var(--sending-orange)]">
        {formatTimeRange(location.training_start_time, location.training_end_time)}
      </p>
      <h4 className="mt-2 text-2xl font-semibold tracking-tight">
        12-Week Sending Training
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-[#666]">
        Get trained for ministry, learn the Sending model, and be equipped to be
        sent.
      </p>
      <p className="mt-5 text-lg font-semibold tracking-tight text-[#111]">
        ${location.training_price}
      </p>
      <div className="mt-6">
        <Button
          href={location.join_training_url}
          className="w-full sm:w-auto"
        >
          Join Training
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
