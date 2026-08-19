<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Drawer from "$lib/drawer/Drawer.svelte";
  import Button from "$lib/button/Button.svelte";
  import Input from "$lib/input/Input.svelte";
  import Switch from "$lib/switch/Switch.svelte";

  const { Story } = defineMeta({
    title: "Overlays/Drawer",
    component: Drawer,
    tags: ["autodocs"],
    argTypes: {
      open: {
        control: { type: "boolean" },
      },
      inline: {
        control: { type: "boolean" },
      },
      placement: {
        control: { type: "select" },
        options: ["left", "right", "top", "bottom"],
      },
      width: {
        control: { type: "text" },
      },
    },
    parameters: {
      layout: "centered",
      docs: {
        story: {
          inline: true,
          height: "380px",
        },
      },
    },
    args: {
      inline: true,
      open: true,
      placement: "right",
      title: "Inspector Panel",
      subtitle: "Widget & App Properties",
      width: "360px",
      children: DrawerBodyContent,
      footer: DrawerFooterContent,
    },
  });
</script>

{#snippet DrawerBodyContent()}
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <p style="margin: 0; color: var(--plasma-color-text-muted); font-size: var(--plasma-font-size-sm);">
      Inspect and fine-tune desktop widget parameters and hardware rendering pipelines.
    </p>
    <Input placeholder="Widget title..." value="System Monitor Graph" />
    <Switch checked label="Enable GPU telemetry" />
    <Switch label="Show border shadow" />
  </div>
{/snippet}

{#snippet DrawerFooterContent()}
  <Button variant="flat" size="sm">Reset</Button>
  <Button variant="primary" size="sm">Apply Changes</Button>
{/snippet}

<Story
  name="Right Panel (Inspector)"
  args={{
    inline: true,
    placement: "right",
    title: "Inspector Panel",
    subtitle: "Widget Properties",
    width: "360px",
    children: DrawerBodyContent,
    footer: DrawerFooterContent,
  }}
/>

<Story
  name="Left Panel (Drawer)"
  args={{
    inline: true,
    placement: "left",
    title: "Discover Repositories",
    subtitle: "Flatpak & Arch Packages",
    width: "360px",
    children: DrawerBodyContent,
    footer: DrawerFooterContent,
  }}
/>
