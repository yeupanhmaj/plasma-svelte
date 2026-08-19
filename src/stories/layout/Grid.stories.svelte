<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Grid from "$lib/layout/Grid.svelte";
  import Card from "$lib/card/Card.svelte";

  const { Story } = defineMeta({
    title: "Layout/Grid",
    component: Grid,
    tags: ["autodocs"],
    argTypes: {
      cols: {
        control: { type: "number" },
      },
      gap: {
        control: { type: "select" },
        options: ["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
      },
    },
    parameters: {
      layout: "padded",
    },
  });
</script>

{#snippet GridCards()}
  <Card title="Card 1">Content 1</Card>
  <Card title="Card 2">Content 2</Card>
  <Card title="Card 3">Content 3</Card>
  <Card title="Card 4">Content 4</Card>
  <Card title="Card 5">Content 5</Card>
  <Card title="Card 6">Content 6</Card>
{/snippet}

<Story
  name="Three Columns (3-Col Grid)"
  args={{
    cols: 3,
    gap: "md",
    children: GridCards,
  }}
/>

<Story
  name="Auto-Fit Responsive Grid"
  args={{
    cols: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "lg",
    children: GridCards,
  }}
/>
