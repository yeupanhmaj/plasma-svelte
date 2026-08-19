<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Flex from "$lib/layout/Flex.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Layout/Flex",
    component: Flex,
    tags: ["autodocs"],
    argTypes: {
      vertical: {
        control: { type: "boolean" },
      },
      justify: {
        control: { type: "select" },
        options: ["start", "center", "end", "between", "around", "evenly"],
      },
      align: {
        control: { type: "select" },
        options: ["start", "center", "end", "baseline", "stretch"],
      },
      gap: {
        control: { type: "select" },
        options: ["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
      },
      wrap: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "padded",
    },
  });
</script>

{#snippet HorizontalButtons()}
  <Button variant="primary">Action 1</Button>
  <Button variant="default">Action 2</Button>
  <Button variant="default">Action 3</Button>
{/snippet}

{#snippet VerticalCards()}
  <div style="padding: 12px; background: var(--plasma-color-surface); border: 1px solid var(--plasma-color-border); border-radius: 6px;">
    Panel Section A
  </div>
  <div style="padding: 12px; background: var(--plasma-color-surface); border: 1px solid var(--plasma-color-border); border-radius: 6px;">
    Panel Section B
  </div>
{/snippet}

<Story
  name="Horizontal Flex (Default)"
  args={{
    gap: "md",
    children: HorizontalButtons,
  }}
/>

<Story
  name="Vertical Flex"
  args={{
    vertical: true,
    gap: "sm",
    children: VerticalCards,
  }}
/>

<Story
  name="Space Between"
  args={{
    justify: "between",
    align: "center",
    children: HorizontalButtons,
    style: "width: 100%; border: 1px dashed var(--plasma-color-border); padding: 12px;",
  }}
/>
