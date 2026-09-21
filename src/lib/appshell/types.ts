import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

export type AppShellLayout = "viewport" | "page";
export type AppShellPadding =
	| "none"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| string;
export type AppShellContainer = "fluid" | "sm" | "md" | "lg" | "xl";

export interface AppShellContextValue {
	readonly layout: AppShellLayout;
	readonly isMobile: boolean;
	readonly breakpoint: number;
	navbarOpen: boolean;
	navbarCollapsed: boolean;
	asideOpen: boolean;
	asideCollapsed: boolean;
	toggleNavbar: () => void;
	toggleNavbarCollapse: () => void;
	toggleAside: () => void;
	toggleAsideCollapse: () => void;
	closeMobile: () => void;
}

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
	layout?: AppShellLayout;
	breakpoint?: number;
	navbarOpen?: boolean;
	navbarCollapsed?: boolean;
	asideOpen?: boolean;
	asideCollapsed?: boolean;
	header?: Snippet;
	navbar?: Snippet;
	aside?: Snippet;
	footer?: Snippet;
	children?: Snippet;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
	height?: string;
	sticky?: boolean;
	bordered?: boolean;
	blur?: boolean;
	children?: Snippet;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
	width?: string;
	collapsedWidth?: string;
	collapsible?: boolean;
	bordered?: boolean;
	children?: Snippet;
}

export interface AsideProps extends HTMLAttributes<HTMLElement> {
	width?: string;
	collapsedWidth?: string;
	collapsible?: boolean;
	bordered?: boolean;
	children?: Snippet;
}

export interface MainProps extends HTMLAttributes<HTMLElement> {
	padding?: AppShellPadding;
	container?: AppShellContainer;
	children?: Snippet;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
	height?: string;
	bordered?: boolean;
	sticky?: boolean;
	children?: Snippet;
}

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	grow?: boolean;
	scrollable?: boolean;
	hideOnCollapse?: boolean;
	children?: Snippet;
}

export interface BurgerProps extends HTMLButtonAttributes {
	opened?: boolean;
	size?: "sm" | "md" | "lg";
	target?: "navbar" | "aside";
	color?: string;
	transitionDuration?: string;
	onclick?: (e: MouseEvent) => void;
}

export interface StatusbarProps extends HTMLAttributes<HTMLElement> {
	status?: "ready" | "working" | "success" | "warning" | "error" | "none";
	statusText?: string;
	bordered?: boolean;
	left?: Snippet;
	center?: Snippet;
	right?: Snippet;
	children?: Snippet;
}
