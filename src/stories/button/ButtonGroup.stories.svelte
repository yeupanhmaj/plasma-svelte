<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import ButtonGroup from "$lib/button/ButtonGroup.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Controls/ButtonGroup",
    component: ButtonGroup,
    tags: ["autodocs"],
    argTypes: {
      orientation: {
        control: { type: "select" },
        options: ["horizontal", "vertical"],
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
    },
    parameters: {
      layout: "centered",
    },
  });
</script>

{#snippet AlignButtons()}
  <Button variant="default">Left</Button>
  <Button variant="primary">Center</Button>
  <Button variant="default">Right</Button>
  <Button variant="default">Justify</Button>
{/snippet}

{#snippet ViewButtons()}
  <Button variant="primary" size="sm">Grid</Button>
  <Button variant="default" size="sm">List</Button>
  <Button variant="default" size="sm">Compact</Button>
{/snippet}

{#snippet VerticalTools()}
  <Button variant="default">Zoom In</Button>
  <Button variant="default">100%</Button>
  <Button variant="default">Zoom Out</Button>
{/snippet}

<Story
  name="Horizontal Segmented Group"
  args={{
    orientation: "horizontal",
    children: AlignButtons,
  }}
/>

<Story
  name="Small Toolbar Switcher"
  args={{
    orientation: "horizontal",
    size: "sm",
    children: ViewButtons,
  }}
/>

<Story
  name="Vertical Group"
  args={{
    orientation: "vertical",
    children: VerticalTools,
  }}
/>
