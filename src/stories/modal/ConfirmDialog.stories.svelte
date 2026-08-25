<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import ConfirmDialog from "$lib/modal/ConfirmDialog.svelte";

  const { Story } = defineMeta({
    title: "Overlays/ConfirmDialog",
    component: ConfirmDialog,
    tags: ["autodocs"],
    argTypes: {
      open: { control: { type: "boolean" } },
      title: { control: { type: "text" } },
      message: { control: { type: "text" } },
      confirmText: { control: { type: "text" } },
      cancelText: { control: { type: "text" } },
      confirmVariant: {
        control: { type: "select" },
        options: ["primary", "danger", "default"],
      },
      loading: { control: { type: "boolean" } },
    },
    args: {
      onconfirm: fn(),
      oncancel: fn(),
    },
  });
</script>

<Story
  name="DangerConfirm"
  args={{
    open: true,
    title: "Delete Book",
    message: "Are you sure you want to permanently remove this title from your library?",
    confirmText: "Delete",
    confirmVariant: "danger",
  }}
/>

<Story
  name="PrimaryConfirm"
  args={{
    open: true,
    title: "Publish Collection",
    message: "This will make your collection visible to all readers.",
    confirmText: "Publish",
    confirmVariant: "primary",
  }}
/>
