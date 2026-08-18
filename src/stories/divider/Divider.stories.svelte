<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "$lib/button/Button.svelte";
  import Divider from "$lib/divider/Divider.svelte";

  const { Story } = defineMeta({
    title: "Layout/Divider",
    component: Divider,
    tags: ["autodocs"],
    argTypes: {
      orientation: {
        control: { type: "select" },
        options: ["horizontal", "vertical"],
      },
      align: {
        control: { type: "select" },
        options: ["left", "center", "right"],
      },
      label: {
        control: { type: "text" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      style: "width: 360px;",
    },
  });
</script>

{#snippet VerticalGroup()}
  <div style="display: flex; align-items: center; height: 32px;">
    <Button variant="flat" size="sm">Edit</Button>
    <Divider orientation="vertical" />
    <Button variant="flat" size="sm">View</Button>
    <Divider orientation="vertical" />
    <Button variant="flat" size="sm">Help</Button>
  </div>
{/snippet}

<Story
  name="Horizontal Line"
  args={{ orientation: "horizontal", style: "width: 360px;" }}
/>

<Story
  name="Labeled Center"
  args={{ label: "OR CONTINUE WITH", align: "center", style: "width: 360px;" }}
/>

<Story
  name="Labeled Left"
  args={{
    label: "ADVANCED CONFIGURATION",
    align: "left",
    style: "width: 360px;",
  }}
/>

<Story name="Vertical Toolbar Divider" args={{ children: VerticalGroup }} />
