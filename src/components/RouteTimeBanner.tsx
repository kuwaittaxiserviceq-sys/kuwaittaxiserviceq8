import { Car, Clock3, MapPin } from "lucide-react";

export default function RouteTimeBanner({
  duration,
  distanceKm,
  fareFrom,
  fromLabel = "Kuwait City",
}: {
  duration: string;
  distanceKm: number;
  fareFrom: number;
  fromLabel?: string;
}) {
  return (
    <section className="border-y border-brand-green/15 bg-brand-green-light/60">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-center">
        <div className="flex items-center gap-2 text-zinc-800">
          <Clock3 className="h-5 w-5 text-brand-green" />
          <span className="text-lg font-bold text-zinc-900">{duration}</span>
          <span className="text-sm text-zinc-600">journey</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-800">
          <MapPin className="h-5 w-5 text-brand-green" />
          <span className="text-lg font-bold text-zinc-900">{distanceKm} km</span>
          <span className="text-sm text-zinc-600">from {fromLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-800">
          <Car className="h-5 w-5 text-brand-green" />
          <span className="text-lg font-bold text-zinc-900">KD {fareFrom}</span>
          <span className="text-sm text-zinc-600">fixed fare, from</span>
        </div>
      </div>
    </section>
  );
}
