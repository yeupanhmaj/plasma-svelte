<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "$lib/button/Button.svelte";
  import Modal from "$lib/modal/Modal.svelte";

  const { Story } = defineMeta({
    title: "Overlays/Modal",
    component: Modal,
    tags: ["autodocs"],
    argTypes: {
      open: {
        control: { type: "boolean" },
        description: "Visible / Open state",
      },
      inline: {
        control: { type: "boolean" },
        description:
          "Render inline in container without full-screen fixed backdrop",
      },
      title: {
        control: { type: "text" },
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg", "fullscreen"],
      },
      closeOnEsc: {
        control: { type: "boolean" },
      },
      closeOnBackdrop: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
      docs: {
        story: {
          inline: true,
          height: "360px",
        },
      },
    },

    args: {
      open: true,
      inline: true,
      title: "System Settings",
      size: "md",
      children: ModalContent,
      footer: ModalFooter,
    },
  });
</script>

{#snippet ModalContent()}
  <p style="margin: 0 0 1rem 0; color: var(--plasma-color-text);">
    Are you sure you want to apply these system changes? This will restart the
    compositor.
  </p>
  <div
    style="background: var(--plasma-color-surface-sunken); padding: 0.75rem; border-radius: var(--plasma-radius-sm); font-size: var(--plasma-font-size-xs); color: var(--plasma-color-text-muted);"
  >
    <b>Notice:</b> Unsaved work in active applications will remain preserved.
  </div>
{/snippet}

{#snippet ModalFooter()}
  <Button variant="flat">Cancel</Button>
  <Button variant="primary">Confirm & Restart</Button>
{/snippet}

<Story
  name="Default"
  args={{
    open: true,
    inline: true,
    title: "Confirmation Required",
    size: "md",
    children: ModalContent,
    footer: ModalFooter,
  }}
/>

<Story
  name="Small"
  args={{
    open: true,
    inline: true,
    title: "Quick Action",
    size: "sm",
    children: ModalContent,
    footer: ModalFooter,
  }}
/>

<Story
  name="Large"
  args={{
    open: true,
    inline: true,
    title: "Display Configuration",
    size: "lg",
    children: ModalContent,
    footer: ModalFooter,
  }}
/>
