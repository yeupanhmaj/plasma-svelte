<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Switch from "$lib/switch/Switch.svelte";

  const { Story } = defineMeta({
    title: "Controls/Switch",
    component: Switch,
    tags: ["autodocs"],
    argTypes: {
      checked: {
        control: { type: "boolean" },
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
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
      label: "Night Light Mode",
      checked: false,
      size: "md",
    },
  });
</script>

<Story name="Off" args={{ checked: false, label: "Night Light" }} />

<Story name="On" args={{ checked: true, label: "Night Light" }} />

<Story
  name="Small"
  args={{ size: "sm", checked: true, label: "Compact toggle (sm)" }}
/>

<Story
  name="Large"
  args={{ size: "lg", checked: true, label: "Touch toggle (lg)" }}
/>

<Story
  name="Disabled Off"
  args={{ disabled: true, checked: false, label: "Feature unavailable" }}
/>

<Story
  name="Disabled On"
  args={{ disabled: true, checked: true, label: "System setting (locked)" }}
/>
