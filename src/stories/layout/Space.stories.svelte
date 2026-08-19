<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Space from "$lib/layout/Space.svelte";
  import Button from "$lib/button/Button.svelte";
  import Badge from "$lib/badge/Badge.svelte";

  const { Story } = defineMeta({
    title: "Layout/Space",
    component: Space,
    tags: ["autodocs"],
    argTypes: {
      direction: {
        control: { type: "select" },
        options: ["horizontal", "vertical"],
      },
      size: {
        control: { type: "select" },
        options: ["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
      },
      wrap: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
  });
</script>

{#snippet SpaceButtons()}
  <Button variant="primary">Button 1</Button>
  <Button variant="default">Button 2</Button>
  <Button variant="flat">Button 3</Button>
  <Badge variant="highlight">New</Badge>
{/snippet}

<Story
  name="Horizontal Space (Default)"
  args={{
    size: "md",
    children: SpaceButtons,
  }}
/>

<Story
  name="Vertical Space"
  args={{
    direction: "vertical",
    size: "sm",
    children: SpaceButtons,
  }}
/>

<Story
  name="Compact Space (2xs)"
  args={{
    size: "2xs",
    children: SpaceButtons,
  }}
/>
