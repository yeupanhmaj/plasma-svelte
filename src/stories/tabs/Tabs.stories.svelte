<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tabs from "$lib/tabs/Tabs.svelte";

  const sampleTabs = [
    { id: "general", label: "General" },
    { id: "appearance", label: "Appearance", badge: "New" },
    { id: "shortcuts", label: "Shortcuts" },
    { id: "advanced", label: "Advanced", disabled: true },
  ];

  const { Story } = defineMeta({
    title: "Navigation/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["line", "pill"],
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      items: sampleTabs,
      activeId: "general",
      variant: "line",
      size: "md",
    },
  });
</script>

<Story
  name="Line (Underline)"
  args={{ items: sampleTabs, activeId: "general", variant: "line" }}
/>

<Story
  name="Pill (Segmented)"
  args={{ items: sampleTabs, activeId: "general", variant: "pill" }}
/>

<Story
  name="Small Pill"
  args={{ items: sampleTabs, activeId: "appearance", variant: "pill", size: "sm" }}
/>

<Story
  name="Large Line"
  args={{ items: sampleTabs, activeId: "shortcuts", variant: "line", size: "lg" }}
/>
