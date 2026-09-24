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

export function resolveGutterStyles(gutter?: any): string[] {
	if (gutter === undefined || gutter === null) return [];
	const rules: string[] = [];

	const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;

	function applyGutterAxis(axis: "x" | "y", val: any) {
		if (val === undefined || val === null) return;
		if (typeof val === "number" || typeof val === "string") {
			const resolved = resolveSpacing(val);
			if (resolved) {
				rules.push(`--plasma-row-gutter-${axis}-base: ${resolved};`);
			}
		} else if (typeof val === "object") {
			for (const bp of breakpoints) {
				if (val[bp] !== undefined) {
					const resolved = resolveSpacing(val[bp]);
					if (resolved) {
						rules.push(`--plasma-row-gutter-${axis}-${bp}: ${resolved};`);
					}
				}
			}
		}
	}

	if (Array.isArray(gutter)) {
		applyGutterAxis("x", gutter[0]);
		applyGutterAxis("y", gutter[1]);
	} else if (typeof gutter === "object" && gutter !== null) {
		applyGutterAxis("x", gutter);
	} else {
		applyGutterAxis("x", gutter);
	}

	return rules;
}
