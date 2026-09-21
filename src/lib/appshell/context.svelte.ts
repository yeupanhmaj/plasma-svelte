import { getContext, setContext } from "svelte";
import type { AppShellContextValue, AppShellLayout } from "./types.js";

const APP_SHELL_KEY = Symbol("PLASMA_APP_SHELL");

export class AppShellState implements AppShellContextValue {
	#getLayout: () => AppShellLayout;
	#getBreakpoint: () => number;
	#getNavbarOpen: () => boolean;
	#setNavbarOpen: (val: boolean) => void;
	#getNavbarCollapsed: () => boolean;
	#setNavbarCollapsed: (val: boolean) => void;
	#getAsideOpen: () => boolean;
	#setAsideOpen: (val: boolean) => void;
	#getAsideCollapsed: () => boolean;
	#setAsideCollapsed: (val: boolean) => void;

	isMobile = $state<boolean>(false);

	constructor(accessors: {
		getLayout: () => AppShellLayout;
		getBreakpoint: () => number;
		getNavbarOpen: () => boolean;
		setNavbarOpen: (val: boolean) => void;
		getNavbarCollapsed: () => boolean;
		setNavbarCollapsed: (val: boolean) => void;
		getAsideOpen: () => boolean;
		setAsideOpen: (val: boolean) => void;
		getAsideCollapsed: () => boolean;
		setAsideCollapsed: (val: boolean) => void;
	}) {
		this.#getLayout = accessors.getLayout;
		this.#getBreakpoint = accessors.getBreakpoint;
		this.#getNavbarOpen = accessors.getNavbarOpen;
		this.#setNavbarOpen = accessors.setNavbarOpen;
		this.#getNavbarCollapsed = accessors.getNavbarCollapsed;
		this.#setNavbarCollapsed = accessors.setNavbarCollapsed;
		this.#getAsideOpen = accessors.getAsideOpen;
		this.#setAsideOpen = accessors.setAsideOpen;
		this.#getAsideCollapsed = accessors.getAsideCollapsed;
		this.#setAsideCollapsed = accessors.setAsideCollapsed;
	}

	get layout(): AppShellLayout {
		return this.#getLayout();
	}

	get breakpoint(): number {
		return this.#getBreakpoint();
	}

	get navbarOpen(): boolean {
		return this.#getNavbarOpen();
	}
	set navbarOpen(val: boolean) {
		this.#setNavbarOpen(val);
	}

	get navbarCollapsed(): boolean {
		return this.#getNavbarCollapsed();
	}
	set navbarCollapsed(val: boolean) {
		this.#setNavbarCollapsed(val);
	}

	get asideOpen(): boolean {
		return this.#getAsideOpen();
	}
	set asideOpen(val: boolean) {
		this.#setAsideOpen(val);
	}

	get asideCollapsed(): boolean {
		return this.#getAsideCollapsed();
	}
	set asideCollapsed(val: boolean) {
		this.#setAsideCollapsed(val);
	}

	toggleNavbar = () => {
		this.navbarOpen = !this.navbarOpen;
	};

	toggleNavbarCollapse = () => {
		this.navbarCollapsed = !this.navbarCollapsed;
	};

	toggleAside = () => {
		this.asideOpen = !this.asideOpen;
	};

	toggleAsideCollapse = () => {
		this.asideCollapsed = !this.asideCollapsed;
	};

	closeMobile = () => {
		this.navbarOpen = false;
		this.asideOpen = false;
	};
}

export function setAppShellContext(state: AppShellState): AppShellState {
	return setContext(APP_SHELL_KEY, state);
}

export function getAppShellContext(): AppShellState | undefined {
	return getContext<AppShellState>(APP_SHELL_KEY);
}
