import { useState } from "react";

const CITIES = ["New York", "London"];

export default function LocationPill() {
  const [city, setCity] = useState(CITIES[0]);

  return (
    <label className="relative inline-flex items-center rounded-full border border-black/10 bg-[#f5f5f5] px-5 py-3 text-lg text-neutral-900">
      <span aria-hidden className="mr-2">📍</span>
      <span>{city}</span>
      <span aria-hidden className="ml-3 text-sm">▾</span>
      <select
        aria-label="Choose location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
