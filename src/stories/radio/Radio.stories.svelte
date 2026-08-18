<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Radio from "$lib/radio/Radio.svelte";

  const { Story } = defineMeta({
    title: "Controls/Radio",
    component: Radio,
    tags: ["autodocs"],
    argTypes: {
      checked: {
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
      label: "Breeze Dark Theme",
      name: "theme-choice",
    },
  });
</script>

<Story name="Unchecked" args={{ checked: false, label: "Breeze Light" }} />

<Story name="Checked" args={{ checked: true, label: "Breeze Dark" }} />

<Story
  name="Disabled Checked"
  args={{ disabled: true, checked: true, label: "System Default (Locked)" }}
/>

<Story
  name="Disabled Unchecked"
  args={{ disabled: true, checked: false, label: "Custom Theme (Unavailable)" }}
/>
