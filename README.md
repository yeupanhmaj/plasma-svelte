# ⚡ plasma-svelte

A sleek, lightweight, and modern Svelte 5 UI component library built for rapid UI development and fluid design systems.

> [!WARNING]
> **✨ Vibe Code Notice**
> This library is vibe-coded! It is experimental, rapidly evolving, and built with pure vibes and speed in mind. Use it as your will, adapt it to your needs, fork it, or hack away on it freely.

---

## Features

- 🚀 **Svelte 5 Ready**: Built natively with Svelte 5 runes and modern component patterns.
- 🎨 **Design Tokens & Themeable**: Powered by a robust CSS variable token system (`token.css` + `base.css`).
- 🧩 **Extensive Component Suite**: Buttons, Cards, Badges, Modals, Drawers, Date/Time Pickers, Tables, Tabs, and layout primitives.
- 📖 **Storybook Integrated**: Interactive documentation and component exploration out of the box.
- 📦 **Zero-Config Export**: Full TypeScript types (`.d.ts`) and modern ESM module exports.

---

## Quick Start

### 1. Install

```bash
npm install plasma-svelte
# or
pnpm add plasma-svelte
# or
yarn add plasma-svelte
```

### 2. Import Styles

Include the library's design tokens and base stylesheet in your root layout (`+layout.svelte`) or entry point (`app.ts` / `main.ts`):

```svelte
<script lang="ts">
  import "plasma-svelte/style.css";
</script>

<slot />
```

> **Note**: You can also import individual sub-styles if you manage your own reset:
> ```ts
> import "plasma-svelte/style/token.css";
> import "plasma-svelte/style/base.css";
> ```

### 3. Use Components

```svelte
<script lang="ts">
  import { Button, Badge, Card } from 'plasma-svelte';
</script>

<Card hoverable={true} padding="lg">
  <Badge variant="primary" dot={true}>Active</Badge>
  <h2>Welcome to Plasma</h2>
  <p>Streamlined UI components for Svelte 5.</p>
  <Button variant="primary">Get Started</Button>
</Card>
```

---

## Development & Storybook

### Start Storybook

Explore and interact with components in isolated stories:

```bash
npm run storybook
```

### Run Dev Server

```bash
npm run dev
```

### Build & Package

Package the library for distribution (generates types & compiles to `./dist`):

```bash
npm run prepack
# or full build
npm run build
```

---

## License

Use as your will! Distributed under the MIT License or your choice of terms.

