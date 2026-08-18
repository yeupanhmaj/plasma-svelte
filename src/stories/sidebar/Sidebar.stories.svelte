<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Sidebar from "$lib/sidebar/Sidebar.svelte";
  import SidebarItem from "$lib/sidebar/SidebarItem.svelte";
  import SidebarGroup from "$lib/sidebar/SidebarGroup.svelte";
  import Avatar from "$lib/avatar/Avatar.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    parameters: {
      layout: "centered",
    },
    args: {
      width: "260px",
      header: SidebarHeader,
      children: SidebarMenu,
      footer: SidebarFooter,
      style: "height: 480px; border: 1px solid var(--plasma-color-border); border-radius: var(--plasma-radius-lg); overflow: hidden;",
    },
  });
</script>

{#snippet SettingsIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
  </svg>
{/snippet}

{#snippet DisplayIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5V14h2a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
  </svg>
{/snippet}

{#snippet AppearanceIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
  </svg>
{/snippet}

{#snippet AppsIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
  </svg>
{/snippet}

{#snippet SidebarHeader()}
  <div style="display: flex; align-items: center; gap: 0.75rem;">
    <Avatar name="KDE User" initials="KU" size="sm" status="online" />
    <div style="display: flex; flex-direction: column; overflow: hidden;">
      <span style="font-weight: 600; font-size: 13px; color: var(--plasma-color-text); text-overflow: ellipsis; white-space: nowrap;">KDE Plasma 6</span>
      <span style="font-size: 11px; color: var(--plasma-color-text-muted);">System Settings</span>
    </div>
  </div>
{/snippet}

{#snippet SidebarMenu()}
  <SidebarGroup title="Appearance">
    <SidebarItem label="Colors & Themes" icon={AppearanceIcon} active />
    <SidebarItem label="Display and Monitor" icon={DisplayIcon} />
    <SidebarItem label="Icons and Cursors" />
  </SidebarGroup>

  <SidebarGroup title="Workspace & Apps">
    <SidebarItem label="Applications" icon={AppsIcon} badge={4} />
    <SidebarItem label="Window Management" />
    <SidebarItem label="Shortcuts" />
  </SidebarGroup>

  <SidebarGroup title="System">
    <SidebarItem label="System Information" icon={SettingsIcon} />
    <SidebarItem label="Users & Accounts" />
  </SidebarGroup>
{/snippet}

{#snippet SidebarFooter()}
  <div style="font-size: 11px; color: var(--plasma-color-text-muted); text-align: center;">
    Plasma Version 6.2.0
  </div>
{/snippet}

<Story
  name="System Settings Style"
  args={{
    width: "260px",
    header: SidebarHeader,
    children: SidebarMenu,
    footer: SidebarFooter,
  }}
/>
