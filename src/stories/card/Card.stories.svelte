<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Card from "$lib/card/Card.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Card",
    component: Card,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["default", "flat", "sunken", "floating"],
      },
      padding: {
        control: { type: "select" },
        options: ["none", "sm", "md", "lg"],
      },
      hoverable: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      variant: "default",
      padding: "md",
      children: CardContent,
      header: CardHeader,
      footer: CardFooter,
      style: "width: 360px;",
    },
  });
</script>

{#snippet CardHeader()}
  <span>Display Settings</span>
{/snippet}

{#snippet CardContent()}
  <p style="margin: 0; color: var(--plasma-color-text-muted);">
    Configure resolution, refresh rate, and display scaling for connected monitors.
  </p>
{/snippet}

{#snippet CardFooter()}
  <Button variant="flat" size="sm">Cancel</Button>
  <Button variant="primary" size="sm">Apply</Button>
{/snippet}

<Story
  name="Default"
  args={{
    header: CardHeader,
    children: CardContent,
    footer: CardFooter,
    style: "width: 360px;",
  }}
/>

<Story
  name="Hoverable"
  args={{
    hoverable: true,
    header: CardHeader,
    children: CardContent,
    style: "width: 360px;",
  }}
/>

<Story
  name="Sunken"
  args={{
    variant: "sunken",
    header: CardHeader,
    children: CardContent,
    style: "width: 360px;",
  }}
/>

<Story
  name="Floating"
  args={{
    variant: "floating",
    header: CardHeader,
    children: CardContent,
    footer: CardFooter,
    style: "width: 360px;",
  }}
/>
