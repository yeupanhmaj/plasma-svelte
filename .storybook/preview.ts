import type { Preview } from "@storybook/sveltekit";
import "../src/lib/style/index.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			disable: true,
		},
		a11y: {
			test: "todo",
		},
	},

	globalTypes: {
		theme: {
			name: "Theme",
			description: "KDE Plasma Theme (Breeze Light / Dark)",
			defaultValue: "dark",
			toolbar: {
				icon: "mirror",
				items: [
					{ value: "dark", icon: "moon", title: "Breeze Dark" },
					{ value: "light", icon: "sun", title: "Breeze Light" },
				],
				dynamicTitle: true,
			},
		},
	},

	decorators: [
		(storyFn, context) => {
			const theme = context.globals.theme || "dark";
			if (typeof document !== "undefined") {
				document.documentElement.setAttribute("data-theme", theme);
				document.body.style.backgroundColor = "var(--plasma-color-window-bg)";
				document.body.style.color = "var(--plasma-color-text)";
				document.body.style.fontFamily = "var(--plasma-font-sans)";
				document.body.style.transition =
					"background-color 0.15s ease, color 0.15s ease";
			}
			return storyFn();
		},
	],
};

export default preview;
