<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Slider from "$lib/slider/Slider.svelte";

  const { Story } = defineMeta({
    title: "Controls/Slider",
    component: Slider,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "range", min: 0, max: 100, step: 1 },
      },
      min: {
        control: { type: "number" },
      },
      max: {
        control: { type: "number" },
      },
      step: {
        control: { type: "number" },
      },
      showValue: {
        control: { type: "boolean" },
      },
      disabled: {
        control: { type: "boolean" },
      },
      label: {
        control: { type: "text" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      label: "Audio Volume",
      value: 65,
      min: 0,
      max: 100,
      showValue: true,
      style: "width: 300px;",
    },
  });
</script>

<Story
  name="Default"
  args={{
    label: "Display Brightness",
    value: 75,
    showValue: true,
    style: "width: 300px;",
  }}
/>

<Story
  name="Volume Range"
  args={{
    label: "Volume Output",
    value: 40,
    showValue: true,
    min: 0,
    max: 100,
    style: "width: 300px;",
  }}
/>

<Story
  name="Steps"
  args={{
    label: "Snap steps (10)",
    value: 50,
    step: 10,
    min: 0,
    max: 100,
    showValue: true,
    style: "width: 300px;",
  }}
/>

<Story
  name="Disabled"
  args={{
    label: "Locked Level",
    value: 30,
    disabled: true,
    showValue: true,
    style: "width: 300px;",
  }}
/>
