type VehicleType = "sedan" | "suv" | "van" | "luxury";

const bodies: Record<VehicleType, string> = {
  sedan:
    "M22 82 C22 72 30 65 41 64 L56 64 C61 50 75 42 92 42 L138 42 C154 42 167 50 172 64 L187 64 C198 65 206 73 206 82 L206 86 C206 90 203 93 199 93 L29 93 C25 93 22 90 22 86 Z",
  suv: "M14 82 C14 68 24 58 38 58 L46 58 C50 40 66 28 86 28 L144 28 C162 28 176 40 180 58 L194 58 C206 58 216 68 216 80 L216 86 C216 90 213 93 209 93 L21 93 C17 93 14 90 14 86 Z M40 58 L44 44 L60 44 L60 58 M156 58 L156 44 L172 44 L176 58",
  van: "M10 82 C10 66 22 54 38 54 L46 54 L46 34 C46 28 51 24 57 24 L173 24 C183 24 191 32 191 42 L191 54 L200 54 C212 54 222 66 222 79 L222 86 C222 90 218 93 214 93 L18 93 C14 93 10 90 10 86 Z",
  luxury:
    "M4 84 C4 75 11 68 21 67 L54 65 C59 53 73 46 90 46 L150 46 C167 46 180 54 187 66 L206 67 C216 68 228 75 228 83 L228 87 C228 91 225 93 221 93 L11 93 C7 93 4 90 4 86 Z",
};

const windows: Record<VehicleType, string> = {
  sedan: "M94 44 L100 62 L134 62 L140 44 Z",
  suv: "M50 56 L54 42 L84 42 L84 56 Z M92 56 L92 42 L146 42 L152 56 Z",
  van: "M50 52 L50 34 L98 34 L98 52 Z M104 52 L104 34 L158 34 L158 52 Z M164 52 L164 34 L187 34 L187 52 Z",
  luxury: "M92 48 L97 63 L143 63 L148 48 Z",
};

const wheelPositions: Record<VehicleType, [number, number]> = {
  sedan: [52, 176],
  suv: [46, 184],
  van: [44, 190],
  luxury: [42, 190],
};

export default function VehicleIllustration({ type }: { type: VehicleType }) {
  const [wheelA, wheelB] = wheelPositions[type];
  const wheelRadius = type === "suv" || type === "van" ? 12.5 : 11;

  return (
    <svg viewBox="0 0 236 100" className="h-16 w-40" aria-hidden="true">
      <path d={bodies[type]} fill="#ffffff" fillOpacity="0.92" />
      <path d={windows[type]} fill="#052014" fillOpacity="0.55" />
      {type === "suv" && (
        <rect x="70" y="24" width="46" height="4" rx="2" fill="#ffffff" fillOpacity="0.5" />
      )}
      {type === "luxury" && (
        <circle cx="8" cy="80" r="2" fill="#ffffff" fillOpacity="0.9" />
      )}
      <circle cx={wheelA} cy="88" r={wheelRadius} fill="#052014" />
      <circle cx={wheelA} cy="88" r={wheelRadius - 6} fill="#ffffff" fillOpacity="0.7" />
      <circle cx={wheelB} cy="88" r={wheelRadius} fill="#052014" />
      <circle cx={wheelB} cy="88" r={wheelRadius - 6} fill="#ffffff" fillOpacity="0.7" />
    </svg>
  );
}
