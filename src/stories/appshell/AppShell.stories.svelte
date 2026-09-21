<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import AppShell from "$lib/appshell/AppShell.svelte";
  import Aside from "$lib/appshell/Aside.svelte";
  import Burger from "$lib/appshell/Burger.svelte";
  import Footer from "$lib/appshell/Footer.svelte";
  import Header from "$lib/appshell/Header.svelte";
  import Main from "$lib/appshell/Main.svelte";
  import Navbar from "$lib/appshell/Navbar.svelte";
  import Section from "$lib/appshell/Section.svelte";
  import Statusbar from "$lib/appshell/Statusbar.svelte";
  import Avatar from "$lib/avatar/Avatar.svelte";
  import Badge from "$lib/badge/Badge.svelte";
  import Button from "$lib/button/Button.svelte";
  import Card from "$lib/card/Card.svelte";
  import Input from "$lib/input/Input.svelte";
  import SidebarGroup from "$lib/sidebar/SidebarGroup.svelte";
  import SidebarItem from "$lib/sidebar/SidebarItem.svelte";
  import Switch from "$lib/switch/Switch.svelte";

  const { Story } = defineMeta({
    title: "Layout/AppShell",
    component: AppShell,
    tags: ["autodocs"],
    parameters: {
      layout: "fullscreen",
    },
  });
</script>

<!-- Icons -->
{#snippet HomeIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l1.293.647a.5.5 0 0 0 .708-.708L8.707 1.5Z"/>
  </svg>
{/snippet}

{#snippet AnalyticsIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-4Zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2Z"/>
  </svg>
{/snippet}

{#snippet SettingsIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
  </svg>
{/snippet}

<Story name="Standard Application Shell">
  <div style="height: 580px; width: 100%; border: 1px solid var(--plasma-color-border); border-radius: var(--plasma-radius-lg); overflow: hidden;">
    <AppShell>
      <Header height="50px">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <Burger />
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-weight: 700; font-size: 15px; color: var(--plasma-color-highlight);">Plasma</span>
              <Badge variant="neutral" size="sm">Workspace</Badge>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <Button size="sm" variant="default">Documentation</Button>
            <Avatar name="KDE User" initials="KU" size="sm" status="online" />
          </div>
        </div>
      </Header>

      <Navbar width="240px">
        <Section grow scrollable style="padding: 0.5rem;">
          <SidebarGroup title="Platform">
            <SidebarItem active label="Dashboard" icon={HomeIcon} />
            <SidebarItem label="Analytics" icon={AnalyticsIcon} badge="New" />
            <SidebarItem label="Preferences" icon={SettingsIcon} />
          </SidebarGroup>
        </Section>
        <Section style="padding: 0.75rem; border-top: 1px solid var(--plasma-color-border-subtle);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <Avatar name="Alex" size="xs" />
            <div class="plasma-appshell-hide-on-collapse" style="display: flex; flex-direction: column; overflow: hidden; font-size: 11px;">
              <span style="font-weight: 600; color: var(--plasma-color-text);">alex@plasma.org</span>
              <span style="color: var(--plasma-color-text-muted);">Admin</span>
            </div>
          </div>
        </Section>
      </Navbar>

      <Main padding="lg">
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 900px;">
          <div>
            <h2 style="margin: 0 0 0.25rem 0; font-size: 1.25rem;">Application Dashboard</h2>
            <p style="margin: 0; color: var(--plasma-color-text-muted); font-size: 0.875rem;">
              Fast application scaffolding using Plasma AppShell.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <Card title="Active Services">
              <span style="font-size: 1.75rem; font-weight: 700; color: var(--plasma-color-highlight);">14 / 16</span>
              <p style="margin: 0.25rem 0 0; font-size: 0.75rem; color: var(--plasma-color-text-muted);">All clusters healthy</p>
            </Card>
            <Card title="Compute Load">
              <span style="font-size: 1.75rem; font-weight: 700; color: var(--plasma-color-positive);">34%</span>
              <p style="margin: 0.25rem 0 0; font-size: 0.75rem; color: var(--plasma-color-text-muted);">Avg across 8 nodes</p>
            </Card>
            <Card title="Pending Tasks">
              <span style="font-size: 1.75rem; font-weight: 700; color: var(--plasma-color-neutral);">3</span>
              <p style="margin: 0.25rem 0 0; font-size: 0.75rem; color: var(--plasma-color-text-muted);">Sync scheduled in 4m</p>
            </Card>
          </div>

          <Card title="Getting Started">
            <p style="font-size: 0.875rem; line-height: 1.6; margin: 0 0 0.75rem 0;">
              Initialize your Plasma applications with a cohesive Header, Navbar, scrollable Main viewport, and Statusbar in seconds.
            </p>
            <Button variant="primary" size="sm">Create New Deployment</Button>
          </Card>
        </div>
      </Main>

      <Footer>
        <Statusbar status="ready" statusText="Ready - Connected to cluster eu-west-1">
          {#snippet right()}
            <span>UTF-8</span>
            <span>Plasma 6.0</span>
          {/snippet}
        </Statusbar>
      </Footer>
    </AppShell>
  </div>
</Story>

<Story name="Desktop Workspace with Inspector Aside">
  <div style="height: 600px; width: 100%; border: 1px solid var(--plasma-color-border); border-radius: var(--plasma-radius-lg); overflow: hidden;">
    <AppShell>
      <Header height="44px">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <Burger />
            <span style="font-weight: 600; font-size: 13px;">Studio IDE</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <Button size="sm" variant="default">Run</Button>
            <Button size="sm" variant="primary">Deploy</Button>
          </div>
        </div>
      </Header>

      <Navbar width="200px" collapsedWidth="50px">
        <Section grow scrollable style="padding: 0.5rem;">
          <SidebarGroup title="Explorer">
            <SidebarItem active label="src/App.svelte" />
            <SidebarItem label="src/lib/types.ts" />
            <SidebarItem label="package.json" />
          </SidebarGroup>
        </Section>
      </Navbar>

      <Main padding="md">
        <div style="height: 100%; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="background: var(--plasma-color-surface); border: 1px solid var(--plasma-color-border-subtle); border-radius: var(--plasma-radius-md); padding: 1rem; flex: 1;">
            <h3 style="margin-top: 0; font-size: 14px;">Editor Canvas</h3>
            <p style="color: var(--plasma-color-text-muted); font-size: 13px;">
              Primary working surface. The AppShell guarantees that central main content area independently scrolls while sidebars and header stay anchored.
            </p>
          </div>
        </div>
      </Main>

      <Aside width="240px">
        <div style="padding: 0.75rem; border-bottom: 1px solid var(--plasma-color-border-subtle); font-weight: 600; font-size: 12px; text-transform: uppercase; color: var(--plasma-color-text-muted);">
          Inspector
        </div>
        <Section grow scrollable style="padding: 0.75rem; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 12px; font-weight: 500;" for="component-name">Component Name</label>
            <Input id="component-name" value="DataGrid" />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 12px;">Live Reload</span>
            <Switch checked />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 12px;">Telemetry</span>
            <Switch />
          </div>
        </Section>
      </Aside>

      <Footer>
        <Statusbar status="working" statusText="Indexing workspace...">
          {#snippet right()}
            <span>Ln 42, Col 18</span>
            <span>TypeScript 5.8</span>
          {/snippet}
        </Statusbar>
      </Footer>
    </AppShell>
  </div>
</Story>

<Story name="Collapsible Rail Mode">
  <div style="height: 520px; width: 100%; border: 1px solid var(--plasma-color-border); border-radius: var(--plasma-radius-lg); overflow: hidden;">
    <AppShell navbarCollapsed={true}>
      <Header height="48px">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <Burger />
          <span style="font-weight: 600;">Rail Mode Shell</span>
        </div>
      </Header>

      <Navbar width="220px" collapsedWidth="58px">
        <Section grow scrollable style="padding: 0.5rem;">
          <SidebarGroup title="Platform">
            <SidebarItem active label="Dashboard" icon={HomeIcon} />
            <SidebarItem label="Analytics" icon={AnalyticsIcon} badge="New" />
            <SidebarItem label="Preferences" icon={SettingsIcon} />
          </SidebarGroup>
        </Section>
      </Navbar>

      <Main padding="lg">
        <h3>Compact Icon Navigation</h3>
        <p style="color: var(--plasma-color-text-muted); font-size: 0.875rem;">
          Clicking the hamburger button smoothly animates the navigation drawer between collapsed rail mode and full width.
        </p>
      </Main>
    </AppShell>
  </div>
</Story>
