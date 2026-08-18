<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Checkbox from "$lib/checkbox/Checkbox.svelte";

  const { Story } = defineMeta({
    title: "Controls/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    argTypes: {
      checked: {
        control: { type: "boolean" },
        description: "Checked state",
      },
      indeterminate: {
        control: { type: "boolean" },
        description: "Partially checked / Tri-state",
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
      label: "Enable desktop effects",
      checked: false,
    },
  });
</script>

<Story name="Unchecked" args={{ checked: false, label: "Enable desktop effects" }} />

<Story name="Checked" args={{ checked: true, label: "Enable desktop effects" }} />

<Story
  name="Indeterminate"
  args={{ indeterminate: true, label: "Select all features (partial)" }}
/>

<Story name="Disabled Checked" args={{ disabled: true, checked: true, label: "System setting (locked)" }} />

<Story name="Disabled Unchecked" args={{ disabled: true, checked: false, label: "Unavailable feature" }} />
