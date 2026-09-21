import AppShellComponent from "./AppShell.svelte";
import Aside from "./Aside.svelte";
import Burger from "./Burger.svelte";
import Footer from "./Footer.svelte";
import Header from "./Header.svelte";
import Main from "./Main.svelte";
import Navbar from "./Navbar.svelte";
import Section from "./Section.svelte";
import Statusbar from "./Statusbar.svelte";

export { default as AppShell } from "./AppShell.svelte";
export { default as Header } from "./Header.svelte";
export { default as Navbar } from "./Navbar.svelte";
export { default as Aside } from "./Aside.svelte";
export { default as Main } from "./Main.svelte";
export { default as Footer } from "./Footer.svelte";
export { default as Section } from "./Section.svelte";
export { default as Burger } from "./Burger.svelte";
export { default as Statusbar } from "./Statusbar.svelte";

export {
	AppShellState,
	getAppShellContext,
	setAppShellContext,
} from "./context.svelte.js";

export type * from "./types.js";

export const Shell = Object.assign(AppShellComponent, {
	Header,
	Navbar,
	Aside,
	Main,
	Footer,
	Section,
	Burger,
	Statusbar,
});
