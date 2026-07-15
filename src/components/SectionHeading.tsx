export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      className={`flex max-w-2xl flex-col gap-3 ${
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"
      }`}
    >
      <span className="text-sm font-bold tracking-wide text-brand-red uppercase">
        {eyebrow}
      </span>
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-zinc-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={dark ? "text-zinc-300" : "text-zinc-600"}>
          {description}
        </p>
      )}
    </div>
  );
}
