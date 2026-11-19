import { useState } from "react";
import LocationPill from "@/components/LocationPill";
<LocationPill />

const CITIES = ["New York", "London"] as const;
type City = (typeof CITIES)[number];

export default function LocationPill() {
  const [city, setCity] = useState<City>("New York");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border bg-[#f5f5f5] px-5 py-3 text-lg"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden>📍</span>
        {city}
        <span aria-hidden className="text-sm">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 z-50 mt-2 min-w-full overflow-hidden rounded-2xl border bg-white shadow-lg"
        >
          {CITIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                role="option"
                aria-selected={c === city}
                onClick={() => { setCity(c); setOpen(false); }}
                className="block w-full px-5 py-3 text-left hover:bg-neutral-100"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
