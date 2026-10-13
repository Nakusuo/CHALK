import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { cx } from "./ui";

const SRC = "./arte/hero.png";

/** Espacio para la ilustración propia del proyecto. Si `public/arte/hero.png` no existe, queda un marco vacío. */
export default function ArtSlot({ className, alt = "" }: { className?: string; alt?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing)
    return (
      <div
        className={cx(
          "grid place-items-center rounded-card border-2 border-dashed border-line bg-muted p-6 text-center",
          className,
        )}
      >
        <div>
          <ImagePlus size={22} className="mx-auto text-accent-ink" aria-hidden />
          <div className="mt-2 text-sm font-semibold">Tu ilustración aquí</div>
          <div className="mt-0.5 text-xs text-sub">
            Agrega <code className="rounded bg-surface px-1 py-0.5 text-[11px]">public/arte/hero.png</code>
          </div>
        </div>
      </div>
    );
  return <img src={SRC} alt={alt} onError={() => setMissing(true)} className={cx("rounded-card object-cover", className)} />;
}
