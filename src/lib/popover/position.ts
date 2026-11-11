export type Side = "top" | "right" | "bottom" | "left";
export type Align = "start" | "center" | "end";
export type Placement = Side | `${Side}-start` | `${Side}-end`;

export interface Box {
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

export interface Size {
	width: number;
	height: number;
}

/** Anything that can report a viewport rect: an element, or a virtual point (e.g. a context-menu click). */
export interface AnchorLike {
	getBoundingClientRect(): Box;
}

export interface PositionOptions {
	placement: Placement;
	/** Gap between anchor and floating element, px. */
	offset: number;
	/** Minimum distance kept from the viewport edges, px. */
	padding: number;
	/** Flip to the opposite side when the preferred side doesn't fit. */
	flip: boolean;
}

export interface PositionResult {
	x: number;
	y: number;
	side: Side;
	align: Align;
	/** Room left on the chosen side; use as max-height so tall content scrolls instead of overflowing. */
	maxHeight: number;
}

const OPPOSITE: Record<Side, Side> = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left",
};

export function parsePlacement(placement: Placement): {
	side: Side;
	align: Align;
} {
	const [side, align] = placement.split("-") as [Side, Align | undefined];
	return { side, align: align ?? "center" };
}

/** A zero-size anchor at a viewport point. */
export function pointAnchor(x: number, y: number): AnchorLike {
	return {
		getBoundingClientRect: () => ({
			left: x,
			top: y,
			right: x,
			bottom: y,
			width: 0,
			height: 0,
		}),
	};
}

function clamp(value: number, min: number, max: number) {
	// min wins when the floating element is larger than the viewport.
	return Math.max(min, Math.min(value, max));
}

export function computePosition(
	anchor: Box,
	floating: Size,
	viewport: Size,
	{ placement, offset, padding, flip }: PositionOptions,
): PositionResult {
	const { align } = parsePlacement(placement);
	let { side } = parsePlacement(placement);

	const space: Record<Side, number> = {
		top: anchor.top - offset - padding,
		bottom: viewport.height - anchor.bottom - offset - padding,
		left: anchor.left - offset - padding,
		right: viewport.width - anchor.right - offset - padding,
	};

	const vertical = side === "top" || side === "bottom";
	const needed = vertical ? floating.height : floating.width;
	if (flip && needed > space[side] && space[OPPOSITE[side]] > space[side]) {
		side = OPPOSITE[side];
	}

	const isVertical = side === "top" || side === "bottom";
	const maxHeight = Math.max(
		0,
		isVertical ? space[side] : viewport.height - 2 * padding,
	);
	const width = floating.width;
	const height = Math.min(floating.height, maxHeight);

	let x: number;
	let y: number;

	if (isVertical) {
		y = side === "top" ? anchor.top - height - offset : anchor.bottom + offset;
		x =
			align === "start"
				? anchor.left
				: align === "end"
					? anchor.right - width
					: anchor.left + anchor.width / 2 - width / 2;
		x = clamp(x, padding, viewport.width - padding - width);
	} else {
		x = side === "left" ? anchor.left - width - offset : anchor.right + offset;
		y =
			align === "start"
				? anchor.top
				: align === "end"
					? anchor.bottom - height
					: anchor.top + anchor.height / 2 - height / 2;
		y = clamp(y, padding, viewport.height - padding - height);
	}

	return { x, y, side, align, maxHeight };
}
