<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import ProgressBar from "$lib/progress/ProgressBar.svelte";

  const { Story } = defineMeta({
    title: "Feedback/ProgressBar",
    component: ProgressBar,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "range", min: 0, max: 100, step: 1 },
      },
      indeterminate: {
        control: { type: "boolean" },
        description: "Continuous shimmer mode for unknown duration",
      },
      variant: {
        control: { type: "select" },
        options: ["primary", "positive", "neutral", "negative"],
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
      showValue: {
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
      value: 65,
      variant: "primary",
      size: "md",
      showValue: true,
      label: "Downloading system updates",
      style: "width: 320px;",
    },
  });
</script>

<Story
  name="Default (Determinate)"
  args={{ value: 65, showValue: true, label: "System Sync", style: "width: 320px;" }}
/>

<Story
  name="Indeterminate Shimmer"
  args={{ indeterminate: true, label: "Indexing files...", style: "width: 320px;" }}
/>

<Story
  name="Positive (Success)"
  args={{ value: 100, variant: "positive", showValue: true, label: "Download Complete", style: "width: 320px;" }}
/>

<Story
  name="Neutral (Warning)"
  args={{ value: 85, variant: "neutral", showValue: true, label: "Storage Limit Approaching", style: "width: 320px;" }}
/>

<Story
  name="Negative (Error)"
  args={{ value: 45, variant: "negative", showValue: true, label: "Transfer Interrupted", style: "width: 320px;" }}
/>

<Story
  name="Large"
  args={{ value: 70, size: "lg", showValue: true, label: "Battery Level", style: "width: 320px;" }}
/>
