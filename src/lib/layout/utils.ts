export type PlasmaSpacing =
  | "none"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | number
  | string;

export function resolveSpacing(val?: PlasmaSpacing): string | undefined {
  if (val === undefined) return undefined;
  if (val === "none" || val === 0) return "0px";
  if (
    val === "2xs" ||
    val === "xs" ||
    val === "sm" ||
    val === "md" ||
    val === "lg" ||
    val === "xl" ||
    val === "2xl"
  ) {
    return `var(--plasma-space-${val})`;
  }
  if (typeof val === "number") {
    return `${val}px`;
  }
  return val;
}
