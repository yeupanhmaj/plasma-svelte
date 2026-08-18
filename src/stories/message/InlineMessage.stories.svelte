<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import InlineMessage from "$lib/message/InlineMessage.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Feedback/InlineMessage",
    component: InlineMessage,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: { type: "select" },
        options: ["information", "positive", "neutral", "negative"],
      },
      title: {
        control: { type: "text" },
      },
      text: {
        control: { type: "text" },
      },
      closable: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      type: "information",
      title: "System Update Available",
      text: "A new version of KDE Plasma 6 is ready to install.",
      closable: true,
      style: "width: 480px;",
    },
  });
</script>

{#snippet MessageActions()}
  <Button variant="primary" size="sm">Update Now</Button>
{/snippet}

<Story
  name="Information"
  args={{
    type: "information",
    title: "Compositor Update",
    text: "Wayland display server is running with direct scanout enabled.",
    closable: true,
    style: "width: 480px;",
  }}
/>

<Story
  name="Positive (Success)"
  args={{
    type: "positive",
    title: "Profile Saved",
    text: "Your workspace settings have been synchronized successfully.",
    closable: true,
    style: "width: 480px;",
  }}
/>

<Story
  name="Neutral (Warning)"
  args={{
    type: "neutral",
    title: "High Memory Usage",
    text: "Application processes are consuming more than 85% of physical RAM.",
    closable: true,
    style: "width: 480px;",
  }}
/>

<Story
  name="Negative (Error)"
  args={{
    type: "negative",
    title: "Connection Failed",
    text: "Unable to reach the remote Plasma vault service. Please verify network credentials.",
    closable: true,
    style: "width: 480px;",
  }}
/>

<Story
  name="With Actions"
  args={{
    type: "information",
    title: "Restart Required",
    text: "Kernel changes will take effect after restarting the system.",
    closable: true,
    actions: MessageActions,
    style: "width: 520px;",
  }}
/>
