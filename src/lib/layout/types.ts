import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { PlasmaSpacing } from "./utils.js";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type RowAlign =
	| "top"
	| "middle"
	| "bottom"
	| "stretch"
	| "baseline"
	| "start"
	| "center"
	| "end";

export type RowJustify =
	| "start"
	| "end"
	| "center"
	| "space-around"
	| "space-between"
	| "space-evenly";

export type ResponsiveGutter = Partial<
	Record<Breakpoint, number | PlasmaSpacing>
>;

export type Gutter =
	| number
	| PlasmaSpacing
	| ResponsiveGutter
	| [
			number | PlasmaSpacing | ResponsiveGutter,
			number | PlasmaSpacing | ResponsiveGutter,
	  ];

export interface ColBreakpointConfig {
	span?: number;
	offset?: number;
	order?: number;
	pull?: number;
	push?: number;
}

export type ColBreakpointProp = number | ColBreakpointConfig;

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
	align?: RowAlign;
	justify?: RowJustify;
	gutter?: Gutter;
	wrap?: boolean;
	children?: Snippet;
	class?: string;
	style?: string;
}

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
	span?: number;
	offset?: number;
	order?: number;
	pull?: number;
	push?: number;
	flex?: number | string;
	xs?: ColBreakpointProp;
	sm?: ColBreakpointProp;
	md?: ColBreakpointProp;
	lg?: ColBreakpointProp;
	xl?: ColBreakpointProp;
	xxl?: ColBreakpointProp;
	children?: Snippet;
	class?: string;
	style?: string;
}
