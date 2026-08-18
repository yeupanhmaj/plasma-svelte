<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import TextArea from "$lib/textarea/TextArea.svelte";

  const { Story } = defineMeta({
    title: "Controls/TextArea",
    component: TextArea,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "text" },
      },
      placeholder: {
        control: { type: "text" },
      },
      rows: {
        control: { type: "number" },
      },
      resize: {
        control: { type: "select" },
        options: ["none", "vertical", "horizontal", "both"],
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
    },
    parameters: {
      layout: "centered",
    },
    args: {
      placeholder: "Enter multi-line text or description...",
      rows: 4,
      resize: "vertical",
      style: "width: 380px;",
    },
  });
</script>

<Story
  name="Default"
  args={{
    placeholder: "Write description here...",
    rows: 4,
    style: "width: 380px;",
  }}
/>

<Story
  name="With Content"
  args={{
    value: "KDE Plasma is a graphical workspaces environment created by KDE primarily for Linux systems.",
    rows: 4,
    style: "width: 380px;",
  }}
/>

<Story
  name="Invalid"
  args={{
    value: "Error in config syntax",
    invalid: true,
    rows: 4,
    style: "width: 380px;",
  }}
/>

<Story
  name="Disabled"
  args={{
    value: "Read-only system information generated automatically.",
    disabled: true,
    rows: 4,
    style: "width: 380px;",
  }}
/>
