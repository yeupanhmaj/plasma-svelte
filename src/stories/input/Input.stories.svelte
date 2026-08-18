<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Input from "$lib/input/Input.svelte";

  const { Story } = defineMeta({
    title: "Controls/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
        description: "Control height and typography",
      },
      type: {
        control: { type: "select" },
        options: ["text", "password", "search", "email", "number"],
      },
      placeholder: {
        control: { type: "text" },
      },
      disabled: {
        control: { type: "boolean" },
      },
      readonly: {
        control: { type: "boolean" },
      },
      invalid: {
        control: { type: "boolean" },
        description: "Error / Validation failed state",
      },
      clearable: {
        control: { type: "boolean" },
        description: "Show quick clear button when text is present",
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      placeholder: "Type something...",
      size: "md",
    },
  });
</script>

{#snippet SearchIcon()}
  <!-- biome-ignore lint/a11y/noSvgWithoutTitle: SVG is only for icon design -->
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="currentColor"
    style="margin-right: 2px;"
  >
    <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
    />
  </svg>
{/snippet}

{#snippet SuffixBadge()}
  <span
    style="font-size: 11px; opacity: 0.7; padding: 2px 4px; border-radius: 3px; background: var(--plasma-color-surface);"
  >
    ⌘K
  </span>
{/snippet}

<Story name="Default" args={{ placeholder: "Enter text..." }} />

<Story
  name="With Pre-filled Value"
  args={{ value: "Plasma Svelte", clearable: true }}
/>

<Story
  name="With Search Icon"
  args={{
    placeholder: "Search applications or files...",
    clearable: true,
    prefix: SearchIcon,
    suffix: SuffixBadge,
  }}
/>

<Story
  name="Password"
  args={{ type: "password", placeholder: "Enter password..." }}
/>

<Story
  name="Invalid / Error"
  args={{ invalid: true, value: "invalid@email" }}
/>

<Story name="Small" args={{ size: "sm", placeholder: "Small input (24px)" }} />

<Story name="Large" args={{ size: "lg", placeholder: "Large input (40px)" }} />

<Story
  name="Disabled"
  args={{ disabled: true, value: "Disabled text input" }}
/>
