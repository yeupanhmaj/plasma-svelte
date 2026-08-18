<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import HeaderBar from "$lib/headerbar/HeaderBar.svelte";
  import Button from "$lib/button/Button.svelte";
  import Tabs from "$lib/tabs/Tabs.svelte";
  import Input from "$lib/input/Input.svelte";

  const { Story } = defineMeta({
    title: "Layout/HeaderBar",
    component: HeaderBar,
    tags: ["autodocs"],
    parameters: {
      layout: "fullscreen",
    },
  });
</script>

{#snippet AppIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5V14h2a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
  </svg>
{/snippet}

{#snippet CenterSearch()}
  <div style="width: 320px;">
    <Input placeholder="Search settings or apps..." clearable size="sm" />
  </div>
{/snippet}

{#snippet CenterTabs()}
  <Tabs
    size="sm"
    variant="pill"
    items={[
      { id: "editor", label: "Editor" },
      { id: "preview", label: "Live Preview" },
      { id: "terminal", label: "Terminal" },
    ]}
  />
{/snippet}

{#snippet RightActions()}
  <Button variant="flat" size="sm">Help</Button>
  <Button variant="primary" size="sm">Apply</Button>
{/snippet}

<Story
  name="Default with Search & Controls"
  args={{
    title: "System Settings",
    subtitle: "KDE Plasma 6.2",
    icon: AppIcon,
    center: CenterSearch,
    right: RightActions,
    windowControls: true,
  }}
/>

<Story
  name="With View Switcher Tabs"
  args={{
    title: "Kate Text Editor",
    icon: AppIcon,
    center: CenterTabs,
    right: RightActions,
    windowControls: true,
  }}
/>
