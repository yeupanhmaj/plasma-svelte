<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Select from "$lib/select/Select.svelte";

  const themeOptions = [
    { value: "breeze-dark", label: "Breeze Dark (Default)" },
    { value: "breeze-light", label: "Breeze Light" },
    { value: "breeze-twilight", label: "Breeze Twilight" },
    { value: "oxygen", label: "Oxygen Classic" },
    { value: "custom", label: "Custom Theme (Disabled)", disabled: true },
  ];

  const { Story } = defineMeta({
    title: "Controls/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "text" },
      },
      placeholder: {
        control: { type: "text" },
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
      disabled: {
        control: { type: "boolean" },
      },
      invalid: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
      docs: {
        story: {
          inline: true,
          height: "250px",
        },
      },
    },
    args: {
      options: themeOptions,
      placeholder: "Choose a desktop theme...",
      size: "md",
      style: "width: 280px;",
    },
  });
</script>

<Story
  name="Default"
  args={{
    options: themeOptions,
    placeholder: "Choose a desktop theme...",
    value: "breeze-dark",
    style: "width: 280px;",
  }}
/>

<Story
  name="Placeholder State"
  args={{
    options: themeOptions,
    placeholder: "Select workspace...",
    value: "",
    style: "width: 280px;",
  }}
/>

<Story
  name="Small"
  args={{
    options: themeOptions,
    value: "breeze-dark",
    size: "sm",
    style: "width: 240px;",
  }}
/>

<Story
  name="Large"
  args={{
    options: themeOptions,
    value: "breeze-light",
    size: "lg",
    style: "width: 320px;",
  }}
/>

<Story
  name="Invalid"
  args={{
    options: themeOptions,
    value: "",
    invalid: true,
    placeholder: "Selection required...",
    style: "width: 280px;",
  }}
/>

<Story
  name="Disabled"
  args={{
    options: themeOptions,
    value: "breeze-dark",
    disabled: true,
    style: "width: 280px;",
  }}
/>
