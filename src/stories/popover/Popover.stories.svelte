<script lang="ts" module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Popover from "$lib/popover/Popover.svelte";
  import { pointAnchor } from "$lib/popover/position.js";
  import type { PopoverTriggerProps } from "$lib/popover/Popover.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Overlays/Popover",
    component: Popover,
    tags: ["autodocs"],
    argTypes: {
      placement: {
        control: { type: "select" },
        options: [
          "top", "top-start", "top-end",
          "bottom", "bottom-start", "bottom-end",
          "left", "left-start", "left-end",
          "right", "right-start", "right-end",
        ],
      },
      offset: { control: { type: "number" } },
      flip: { control: { type: "boolean" } },
      matchWidth: { control: { type: "boolean" } },
      surface: { control: { type: "boolean" } },
    },
    parameters: {
      layout: "centered",
      docs: { story: { inline: false, iframeHeight: 320 } },
    },
    args: { placement: "bottom-start", offset: 4, flip: true },
  });
</script>

<script lang="ts">
  import type { AnchorLike } from "$lib/popover/position.js";

  let contextOpen = $state(false);
  let contextAnchor = $state<AnchorLike | null>(null);

  function onContextMenu(e: MouseEvent) {
    e.preventDefault();
    contextAnchor = pointAnchor(e.clientX, e.clientY);
    contextOpen = true;
  }
</script>

{#snippet Body()}
  <div style="padding: 12px; width: 220px; font-size: 13px;">
    <strong>Popover content</strong>
    <p style="margin: 4px 0 0;">Rendered in the top layer, so it is never clipped by an overflow: hidden parent.</p>
  </div>
{/snippet}

{#snippet Trigger(props: PopoverTriggerProps)}
  <Button {...props}>Toggle popover</Button>
{/snippet}

<Story name="Default" args={{ trigger: Trigger, children: Body }} />

<Story name="Match anchor width" args={{ trigger: Trigger, children: Body, matchWidth: true }} />

<Story name="Placement: right" args={{ trigger: Trigger, children: Body, placement: "right-start" }} />

<Story name="Inside clipped container (no clipping)">
  {#snippet template(args)}
    <div style="overflow: hidden; width: 160px; height: 56px; border: 1px dashed var(--plasma-color-border); padding: 8px;">
      <Popover {...args} trigger={Trigger} children={Body} />
    </div>
  {/snippet}
</Story>

<Story name="Flips near viewport edge" parameters={{ layout: "fullscreen" }}>
  {#snippet template(args)}
    <div style="display: flex; align-items: flex-end; justify-content: flex-end; height: 100vh; padding: 12px;">
      <Popover {...args} placement="bottom-end" trigger={Trigger} children={Body} />
    </div>
  {/snippet}
</Story>

<Story name="Virtual anchor (context menu)" parameters={{ layout: "fullscreen" }}>
  {#snippet template(args)}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- biome-ignore lint/a11y/noStaticElementInteractions: demo surface -->
    <div
      oncontextmenu={onContextMenu}
      style="height: 100vh; display: grid; place-items: center; color: var(--plasma-color-text-muted);"
    >
      Right-click anywhere
    </div>
    <Popover {...args} bind:open={contextOpen} anchor={contextAnchor} placement="bottom-start" offset={0} children={Body} />
  {/snippet}
</Story>
