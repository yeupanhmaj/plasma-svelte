<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tooltip from "$lib/tooltip/Tooltip.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Overlays/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    argTypes: {
      position: {
        control: { type: "select" },
        options: ["top", "bottom", "left", "right"],
      },
      text: {
        control: { type: "text" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      text: "KDE Breeze Tooltip information",
      position: "top",
      children: TriggerButton,
    },
  });
</script>

{#snippet TriggerButton()}
  <Button variant="default">Hover or Focus me</Button>
{/snippet}

<Story name="Top" args={{ position: "top", text: "Top tooltip message", children: TriggerButton }} />

<Story name="Bottom" args={{ position: "bottom", text: "Bottom tooltip message", children: TriggerButton }} />

<Story name="Left" args={{ position: "left", text: "Left tooltip message", children: TriggerButton }} />

<Story name="Right" args={{ position: "right", text: "Right tooltip message", children: TriggerButton }} />
