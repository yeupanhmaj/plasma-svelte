<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import SearchField from "$lib/searchfield/SearchField.svelte";

  const { Story } = defineMeta({
    title: "Controls/SearchField",
    component: SearchField,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "text" },
      },
      placeholder: {
        control: { type: "text" },
      },
      loading: {
        control: { type: "boolean" },
      },
      clearable: {
        control: { type: "boolean" },
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
      disabled: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      placeholder: "Search applications, widgets, settings...",
      size: "md",
      style: "width: 320px;",
    },
  });
</script>

<Story
  name="Default"
  args={{ placeholder: "Search settings...", style: "width: 320px;" }}
/>

<Story
  name="With Query (Clearable)"
  args={{ value: "Display Night Light", style: "width: 320px;" }}
/>

<Story
  name="Loading State"
  args={{ value: "Indexing files", loading: true, style: "width: 320px;" }}
/>

<Story
  name="Small"
  args={{ placeholder: "Filter items...", size: "sm", style: "width: 240px;" }}
/>

<Story
  name="Large"
  args={{ placeholder: "Discover apps and addons...", size: "lg", style: "width: 380px;" }}
/>

<Story
  name="Disabled"
  args={{ value: "Search unavailable offline", disabled: true, style: "width: 320px;" }}
/>
