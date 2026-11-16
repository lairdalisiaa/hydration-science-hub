// TEWL (trans-epidermal water loss) in g/m²/h. Lower is better.
// Bands follow the mockups: healthy skin sits at 5–15 g/m²/h.
export type TewlBand = "Very healthy" | "Healthy" | "Normal" | "Strained";

export const TEWL_BANDS: { label: TewlBand; min: number; max: number }[] = [
  { label: "Very healthy", min: 0, max: 5 },
  { label: "Healthy", min: 5, max: 15 },
  { label: "Normal", min: 15, max: 25 },
  { label: "Strained", min: 25, max: 35 },
];

export function classifyTewl(value: number): TewlBand {
  const band = TEWL_BANDS.find((b) => value < b.max);
  return band ? band.label : "Strained";
}

/** Marker position (0–1) on a scale drawn as four equal-width segments. */
export function tewlMarkerPosition(value: number): number {
  const clamped = Math.min(Math.max(value, 0), 35);
  let index = TEWL_BANDS.findIndex((b) => clamped < b.max);
  if (index === -1) index = TEWL_BANDS.length - 1;
  const band = TEWL_BANDS[index] ?? TEWL_BANDS[TEWL_BANDS.length - 1]!;
  const within = (clamped - band.min) / (band.max - band.min);
  return (index + within) / TEWL_BANDS.length;
}
