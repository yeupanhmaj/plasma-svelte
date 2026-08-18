<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Badge from "$lib/badge/Badge.svelte";

  const { Story } = defineMeta({
    title: "Data Display/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: [
          "default",
          "primary",
          "positive",
          "neutral",
          "negative",
        ],
      },
      shape: {
        control: { type: "select" },
        options: ["rounded", "pill"],
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md"],
      },
      dot: {
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
      label: "Plasma 6",
      variant: "primary",
      shape: "rounded",
      size: "md",
      dot: false,
    },
  });
</script>

<Story name="Primary" args={{ variant: "primary", label: "Plasma 6.2" }} />

<Story name="Positive (Success)" args={{ variant: "positive", dot: true, label: "Active" }} />

<Story name="Neutral (Warning)" args={{ variant: "neutral", dot: true, label: "Pending" }} />

<Story name="Negative (Danger)" args={{ variant: "negative", dot: true, label: "Disconnected" }} />

<Story name="Default Surface" args={{ variant: "default", label: "v2.5.0" }} />

<Story name="Pill with Dot" args={{ variant: "positive", shape: "pill", dot: true, label: "Online" }} />
