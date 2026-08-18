<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import SpinBox from "$lib/spinbox/SpinBox.svelte";

  const { Story } = defineMeta({
    title: "Controls/SpinBox",
    component: SpinBox,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "number" },
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
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
      disabled: {
        control: { type: "boolean" },
      },
      readonly: {
        control: { type: "boolean" },
      },
      invalid: {
        control: { type: "boolean" },
      },
      prefix: {
        control: { type: "text" },
      },
      suffix: {
        control: { type: "text" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      value: 24,
      min: 0,
      max: 100,
      step: 1,
      size: "md",
      style: "width: 180px;",
    },
  });
</script>

<Story
  name="Default"
  args={{ value: 24, min: 0, max: 100, step: 1, style: "width: 180px;" }}
/>

<Story
  name="With Suffix (Pixels)"
  args={{ value: 16, suffix: "px", min: 8, max: 128, step: 2, style: "width: 180px;" }}
/>

<Story
  name="With Prefix (Currency)"
  args={{ value: 50, prefix: "$", min: 0, max: 1000, step: 5, style: "width: 180px;" }}
/>

<Story
  name="Small"
  args={{ value: 10, size: "sm", suffix: "%", style: "width: 150px;" }}
/>

<Story
  name="Large"
  args={{ value: 1024, size: "lg", suffix: "MB", min: 128, max: 8192, step: 128, style: "width: 220px;" }}
/>

<Story
  name="Disabled"
  args={{ value: 42, disabled: true, suffix: "Hz", style: "width: 180px;" }}
/>
