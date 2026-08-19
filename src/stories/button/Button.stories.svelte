<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Controls/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["default", "primary", "flat", "danger"],
        description: "KDE Breeze visual style variant",
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
        description: "Button dimensions",
      },
      disabled: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      onclick: fn(),
      children: DefaultLabel,
    },
  });
</script>

{#snippet DefaultLabel()}
  Push Button
{/snippet}

{#snippet PrimaryLabel()}
  Highlight Action
{/snippet}

{#snippet FlatLabel()}
  Toolbar Action
{/snippet}

{#snippet DangerLabel()}
  Delete / Discard
{/snippet}

<Story name="Default" args={{ variant: "default", children: DefaultLabel }} />

<Story name="Primary" args={{ variant: "primary", children: PrimaryLabel }} />

<Story name="Flat" args={{ variant: "flat", children: FlatLabel }} />

<Story name="Danger" args={{ variant: "danger", children: DangerLabel }} />

<Story name="Small" args={{ size: "sm", children: DefaultLabel }} />

<Story name="Large" args={{ size: "lg", children: DefaultLabel }} />

<Story name="Disabled" args={{ disabled: true, children: DefaultLabel }} />

<Story name="Loading" args={{ loading: true, children: DefaultLabel }} />

<Story name="Link" args={{ href: "https://kde.org", target: "_blank", children: PrimaryLabel }} />

