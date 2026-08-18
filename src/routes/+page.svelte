<script lang="ts">
  import Accordion from "$lib/accordion/Accordion.svelte";
  import AccordionItem from "$lib/accordion/AccordionItem.svelte";
  import Avatar from "$lib/avatar/Avatar.svelte";
  import Badge from "$lib/badge/Badge.svelte";
  import Breadcrumb from "$lib/breadcrumb/Breadcrumb.svelte";
  import BreadcrumbItem from "$lib/breadcrumb/BreadcrumbItem.svelte";
  import Button from "$lib/button/Button.svelte";
  import Card from "$lib/card/Card.svelte";
  import Checkbox from "$lib/checkbox/Checkbox.svelte";
  import Divider from "$lib/divider/Divider.svelte";
  import HeaderBar from "$lib/headerbar/HeaderBar.svelte";
  import Input from "$lib/input/Input.svelte";
  import Menu from "$lib/menu/Menu.svelte";
  import MenuDivider from "$lib/menu/MenuDivider.svelte";
  import MenuItem from "$lib/menu/MenuItem.svelte";
  import InlineMessage from "$lib/message/InlineMessage.svelte";
  import Modal from "$lib/modal/Modal.svelte";
  import ProgressBar from "$lib/progress/ProgressBar.svelte";
  import Radio from "$lib/radio/Radio.svelte";
  import SearchField from "$lib/searchfield/SearchField.svelte";
  import Select from "$lib/select/Select.svelte";
  import Sidebar from "$lib/sidebar/Sidebar.svelte";
  import SidebarGroup from "$lib/sidebar/SidebarGroup.svelte";
  import SidebarItem from "$lib/sidebar/SidebarItem.svelte";
  import Slider from "$lib/slider/Slider.svelte";
  import SpinBox from "$lib/spinbox/SpinBox.svelte";
  import Switch from "$lib/switch/Switch.svelte";
  import Tabs from "$lib/tabs/Tabs.svelte";
  import TextArea from "$lib/textarea/TextArea.svelte";
  import Tooltip from "$lib/tooltip/Tooltip.svelte";

  let searchQuery = $state("Display & Monitor");


  let theme = $state<"dark" | "light">("dark");
  let demoText = $state("Breeze Search");
  let chkEffects = $state(true);
  let chkAnimations = $state(false);
  let chkPartial = $state(true);
  let selectedStyle = $state("breeze");
  let switchNightLight = $state(true);
  let switchNotifications = $state(false);
  let sliderVolume = $state(65);
  let sliderBrightness = $state(80);
  let activeTab = $state("overview");
  let isModalOpen = $state(false);
  let selectedTheme = $state("breeze-dark");
  let progressValue = $state(72);
  let textAreaVal = $state("KDE Plasma desktop workspace configuration notes.");
  let spinFontSize = $state(14);
  let spinScale = $state(100);

  const themeDropdownOptions = [
    { value: "breeze-dark", label: "Breeze Dark (Default)" },
    { value: "breeze-light", label: "Breeze Light" },
    { value: "breeze-twilight", label: "Breeze Twilight" },
    { value: "oxygen", label: "Oxygen Classic" },
  ];

  const demoTabs = [
    { id: "overview", label: "Overview" },
    { id: "settings", label: "Settings", badge: 3 },
    { id: "logs", label: "System Logs" },
  ];

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  const colorTokens = [
    {
      category: "Highlights & Accents",
      items: [
        { name: "--plasma-color-highlight", desc: "Highlight / Accent" },
        { name: "--plasma-color-highlight-hover", desc: "Highlight Hover" },
        { name: "--plasma-color-highlight-active", desc: "Highlight Active" },
        { name: "--plasma-color-positive", desc: "Positive / Success" },
        { name: "--plasma-color-neutral", desc: "Neutral / Warning" },
        { name: "--plasma-color-negative", desc: "Negative / Danger" },
      ],
    },
    {
      category: "Surfaces & Backgrounds",
      items: [
        { name: "--plasma-color-window-bg", desc: "Window Background" },
        { name: "--plasma-color-view-bg", desc: "View / Input Background" },
        { name: "--plasma-color-surface", desc: "Button / Card Surface" },
        { name: "--plasma-color-surface-hover", desc: "Surface Hover" },
        { name: "--plasma-color-surface-active", desc: "Surface Active" },
        { name: "--plasma-color-tooltip-bg", desc: "Tooltip Surface" },
      ],
    },
    {
      category: "Borders & States",
      items: [
        { name: "--plasma-color-border", desc: "Standard Frame Border" },
        { name: "--plasma-color-border-subtle", desc: "Subtle Separator" },
        { name: "--plasma-color-border-hover", desc: "Hover Highlight Border" },
        { name: "--plasma-color-text", desc: "Primary Text" },
        { name: "--plasma-color-text-muted", desc: "Muted / Inactive Text" },
        { name: "--plasma-color-text-link", desc: "Link Text" },
      ],
    },
  ];

  const radii = [
    { name: "--plasma-radius-xs", value: "2px", desc: "Indicators" },
    { name: "--plasma-radius-sm", value: "4px", desc: "Small items" },
    { name: "--plasma-radius-md", value: "5px", desc: "Controls (Plasma 6)" },
    { name: "--plasma-radius-lg", value: "8px", desc: "Cards / Popups" },
    { name: "--plasma-radius-xl", value: "12px", desc: "Sheets / Dialogs" },
    { name: "--plasma-radius-full", value: "9999px", desc: "Pills / Switches" },
  ];
</script>

<svelte:head>
  <title>KDE Plasma / Breeze Design Tokens</title>
</svelte:head>

<div class="container" data-theme={theme}>
  <header class="header">
    <div>
      <h1>KDE Plasma / Breeze Tokens</h1>
      <p class="subtitle">
        Design tokens based on KDE Breeze, Plasma 6, and Kirigami
        specifications.
      </p>
    </div>
    <button type="button" class="theme-toggle-btn" onclick={toggleTheme}>
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  </header>

  <main class="content">
    <section class="section">
      <h2>Interactive Controls: Button</h2>
      <div class="group-card">
        <h3>Variants & States</h3>
        <div class="btn-row">
          <Button variant="default">Default Button</Button>
          <Button variant="primary">Primary Action</Button>
          <Button variant="flat">Flat / Tool</Button>
          <Button variant="danger">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
        <h3 style="margin-top: 1.5rem;">Sizes</h3>
        <div class="btn-row">
          <Button size="sm">Small (24px)</Button>
          <Button size="md">Medium (32px)</Button>
          <Button size="lg">Large (40px)</Button>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Interactive Controls: Input & TextField</h2>
      <div
        class="group-card"
        style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;"
      >
        <div>
          <label
            for="input-1"
            style="display: block; font-size: var(--plasma-font-size-sm); margin-bottom: 0.25rem;"
            >Standard Input with Clear</label
          >
          <Input
            id="input-1"
            placeholder="Enter something..."
            bind:value={demoText}
            clearable
          />
        </div>
        <div>
          <label
            for="input-2"
            style="display: block; font-size: var(--plasma-font-size-sm); margin-bottom: 0.25rem;"
            >Invalid / Error State</label
          >
          <Input
            id="input-2"
            placeholder="Invalid email..."
            value="wrong-input"
            invalid
          />
        </div>
        <div>
          <label
            for="input-3"
            style="display: block; font-size: var(--plasma-font-size-sm); margin-bottom: 0.25rem;"
            >Disabled</label
          >
          <Input
            id="input-3 "
            placeholder="Cannot edit this"
            disabled
            value="Disabled content"
          />
        </div>
        <div>
          <span
            style="display: block; font-size: var(--plasma-font-size-sm); margin-bottom: 0.25rem;"
            >Small & Large Sizing</span
          >
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <Input size="sm" placeholder="Small (24px)" />
            <Input size="lg" placeholder="Large (40px)" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Interactive Controls: Checkbox & Radio</h2>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;"
      >
        <div class="group-card">
          <h3>Checkboxes</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Checkbox
              bind:checked={chkEffects}
              label="Desktop effects enabled"
            />
            <Checkbox bind:checked={chkAnimations} label="Window animations" />
            <Checkbox
              bind:indeterminate={chkPartial}
              label="Select all widgets (tri-state)"
            />
            <Checkbox disabled checked label="Hardware acceleration (Locked)" />
            <Checkbox disabled label="Legacy compositing (Disabled)" />
          </div>
        </div>

        <div class="group-card">
          <h3>Radio Group (Selected: {selectedStyle})</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio
              bind:group={selectedStyle}
              value="breeze"
              label="KDE Breeze (Default)"
            />
            <Radio
              bind:group={selectedStyle}
              value="oxygen"
              label="Oxygen Classic"
            />
            <Radio
              bind:group={selectedStyle}
              value="fusion"
              label="Qt Fusion"
            />
            <Radio disabled checked label="System Palette (Locked)" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Interactive Controls: Switch & Slider</h2>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;"
      >
        <div class="group-card">
          <h3>Switches (Toggles)</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <Switch
              bind:checked={switchNightLight}
              label="Night Light (Warm temperature)"
            />
            <Switch bind:checked={switchNotifications} label="Do Not Disturb" />
            <div style="display: flex; gap: 1rem; align-items: center;">
              <Switch size="sm" checked label="Small" />
              <Switch size="md" checked label="Medium" />
              <Switch size="lg" checked label="Large" />
            </div>
            <Switch disabled checked label="Core Daemon (Locked)" />
          </div>
        </div>

        <div class="group-card">
          <h3>Sliders (Range Controls)</h3>
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <Slider
              bind:value={sliderVolume}
              label="Audio Volume"
              showValue
              min={0}
              max={100}
            />
            <Slider
              bind:value={sliderBrightness}
              label="Display Brightness"
              showValue
              min={0}
              max={100}
            />
            <Slider value={30} label="Disabled Slider" showValue disabled />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Surfaces & Navigation: Card, Tabs, Badge & Tooltip</h2>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3>Navigation Tabs (Line & Segmented Pill)</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <Tabs items={demoTabs} bind:activeId={activeTab} variant="line" />
            <div style="display: flex; align-items: center; gap: 1rem;">
              <Tabs
                items={demoTabs}
                bind:activeId={activeTab}
                variant="pill"
                size="sm"
              />
              <span
                style="font-size: var(--plasma-font-size-xs); color: var(--plasma-color-text-muted);"
              >
                Active tab: <b>{activeTab}</b>
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3>Status Badges</h3>
          <div
            style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;"
          >
            <Badge variant="primary" label="Plasma 6.2" />
            <Badge variant="positive" dot label="Compositor Active" />
            <Badge variant="neutral" dot label="Warning: High Load" />
            <Badge variant="negative" dot label="Offline" />
            <Badge variant="default" label="Default Surface" />
            <Badge variant="positive" shape="pill" dot label="Online Pill" />
          </div>
        </div>

        <div>
          <h3>Tooltips</h3>
          <div
            style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;"
          >
            <Tooltip text="Click to save configuration" position="top">
              <Button variant="primary" size="sm">Hover me (Top Tooltip)</Button
              >
            </Tooltip>
            <Tooltip text="Discard all changes" position="bottom">
              <Button variant="danger" size="sm">Bottom Tooltip</Button>
            </Tooltip>
            <Tooltip text="Context menu information" position="right">
              <Button variant="flat" size="sm">Right Tooltip</Button>
            </Tooltip>
          </div>
        </div>

        <div>
          <h3>Cards</h3>
          <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem;"
          >
            <Card variant="default">
              {#snippet header()}
                <span>System Monitor</span>
              {/snippet}
              <p style="margin: 0; color: var(--plasma-color-text-muted);">
                CPU, Memory, and GPU hardware metrics with realtime KDE Breeze
                instrumentation.
              </p>
              {#snippet footer()}
                <Button variant="flat" size="sm">Details</Button>
                <Button variant="primary" size="sm">Inspect</Button>
              {/snippet}
            </Card>

            <Card variant="floating" hoverable>
              {#snippet header()}
                <span>Floating Interactive Card</span>
              {/snippet}
              <p style="margin: 0; color: var(--plasma-color-text-muted);">
                Elevated KDE dialog styling with subtle hover animation and
                large corner radius.
              </p>
            </Card>
          </div>
        </div>

        <div>
          <h3>Modal & Dialog</h3>
          <Button variant="primary" onclick={() => (isModalOpen = true)}>
            Open KDE Breeze Modal Dialog
          </Button>

          <Modal
            bind:open={isModalOpen}
            title="KDE Plasma Configuration"
            size="md"
          >
            <p style="margin: 0 0 1rem 0; color: var(--plasma-color-text);">
              KDE Plasma Breeze modal dialog with backdrop blur, keyboard ESC
              dismissal, and focus management.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <Input
                placeholder="Profile name..."
                value="Default Desktop Profile"
              />
              <Switch checked label="Automatically apply on boot" />
            </div>

            {#snippet footer()}
              <Button variant="flat" onclick={() => (isModalOpen = false)}
                >Cancel</Button
              >
              <Button variant="primary" onclick={() => (isModalOpen = false)}
                >Save & Apply</Button
              >
            {/snippet}
          </Modal>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Advanced Controls: Select, Progress, Messages & TextArea</h2>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;"
      >
        <div class="group-card">
          <h3>Select / ComboBox</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <label
              style="display: flex; flex-direction: column; gap: 0.25rem; font-size: var(--plasma-font-size-sm);"
            >
              <span>Desktop Color Scheme</span>
              <Select
                options={themeDropdownOptions}
                bind:value={selectedTheme}
              />
            </label>
            <span
              style="font-size: var(--plasma-font-size-xs); color: var(--plasma-color-text-muted);"
            >
              Selected: <b>{selectedTheme}</b>
            </span>
          </div>
        </div>

        <div class="group-card">
          <h3>Progress Bars</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ProgressBar
              value={progressValue}
              showValue
              label="System Package Synchronization"
            />
            <ProgressBar
              indeterminate
              label="Searching KDE Discover repositories..."
            />
            <ProgressBar
              value={100}
              variant="positive"
              showValue
              label="Sync Completed"
            />
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>Inline Messages (KMessageWidget)</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <InlineMessage
              type="information"
              title="KDE Wayland Session"
              text="Direct scanout is active for fullscreen OpenGL applications."
              closable
            />
            <InlineMessage
              type="positive"
              title="Settings Applied"
              text="Display layout was updated without restarting the session."
              closable
            />
            <InlineMessage
              type="neutral"
              title="Battery Optimization"
              text="Performance profile switched to balanced power consumption."
              closable
            />
            <InlineMessage
              type="negative"
              title="Authentication Warning"
              text="Invalid cryptographic key presented to vault daemon."
              closable
            />
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>Multi-line TextArea</h3>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label
              style="display: flex; flex-direction: column; gap: 0.25rem; font-size: var(--plasma-font-size-sm);"
            >
              <span>Application Configuration</span>
              <TextArea
                bind:value={textAreaVal}
                rows={3}
                placeholder="Write config..."
              />
            </label>
          </div>
        </div>

        <div class="group-card">
          <h3>SpinBox (Numeric Stepper)</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <label
              style="display: flex; flex-direction: column; gap: 0.25rem; font-size: var(--plasma-font-size-sm);"
            >
              <span>Default Font Size</span>
              <SpinBox bind:value={spinFontSize} suffix="pt" min={6} max={72} />
            </label>
            <label
              style="display: flex; flex-direction: column; gap: 0.25rem; font-size: var(--plasma-font-size-sm);"
            >
              <span>Display Scaling</span>
              <SpinBox
                bind:value={spinScale}
                suffix="%"
                min={50}
                max={300}
                step={25}
              />
            </label>
          </div>
        </div>

        <div class="group-card">
          <h3>Popup Menu (QMenu)</h3>
          <div
            style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;"
          >
            <Menu>
              {#snippet trigger()}
                <Button variant="primary">Context Actions ▼</Button>
              {/snippet}
              <MenuItem label="Configure Desktop..." shortcut="Alt+D" />
              <MenuItem label="Add Widgets..." shortcut="Alt+W" />
              <MenuItem label="Display Settings..." />
              <MenuDivider />
              <MenuItem label="Lock Screen" shortcut="Meta+L" />
              <MenuItem label="Leave..." shortcut="Ctrl+Alt+Del" danger />
            </Menu>
            <span
              style="font-size: var(--plasma-font-size-xs); color: var(--plasma-color-text-muted);"
            >
              Click button to open Breeze popup menu with keyboard shortcuts.
            </span>
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>Avatars & User Profiles</h3>
          <div
            style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;"
          >
            <Avatar
              name="Konqi Dragon"
              initials="KD"
              size="lg"
              status="online"
            />
            <Avatar
              name="Kate Developer"
              initials="KT"
              size="md"
              status="away"
            />
            <Avatar
              name="Plasma System"
              initials="PS"
              size="sm"
              status="busy"
            />
            <Avatar size="md" status="offline" />
            <Avatar
              name="Rounded User"
              shape="rounded"
              size="lg"
              status="online"
            />
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>Accordion (Expandable Panels)</h3>
          <Accordion>
            <AccordionItem title="Hardware Acceleration (GPU)" open>
              OpenGL 3.1 compositing backend is enabled with direct buffer
              rendering and zero tearing.
            </AccordionItem>
            <AccordionItem title="Audio Routing & Output Streams">
              PipeWire multimedia engine managing ALSA streams and low-latency
              Bluetooth LDAC codecs.
            </AccordionItem>
            <AccordionItem title="KDE Wallet Security Subsystem">
              Encrypted credential storage using GnuPG asymmetric keys and
              Argon2id key derivation.
            </AccordionItem>
          </Accordion>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>Dividers & Separators</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Divider label="GENERAL SETTINGS" align="left" />
            <div
              style="display: flex; align-items: center; gap: 0.5rem; height: 32px;"
            >
              <Button variant="flat" size="sm">Cut</Button>
              <Divider orientation="vertical" />
              <Button variant="flat" size="sm">Copy</Button>
              <Divider orientation="vertical" />
              <Button variant="flat" size="sm">Paste</Button>
            </div>
            <Divider label="OR CONTINUE WITH" align="center" />
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>Dolphin Breadcrumb Navigation</h3>
          <Breadcrumb>
            <BreadcrumbItem label="Home" />
            <BreadcrumbItem label="Projects" />
            <BreadcrumbItem label="plasma-svelte" />
            <BreadcrumbItem label="src" />
            <BreadcrumbItem label="lib" active />
          </Breadcrumb>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>System Settings Sidebar</h3>
          <div
            style="max-width: 300px; border: 1px solid var(--plasma-color-border); border-radius: var(--plasma-radius-lg); overflow: hidden;"
          >
            <Sidebar width="100%">
              {#snippet header()}
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <Avatar
                    name="KDE Plasma"
                    initials="KP"
                    size="sm"
                    status="online"
                  />
                  <span style="font-weight: 600; font-size: 13px;"
                    >System Settings</span
                  >
                </div>
              {/snippet}
              <SidebarGroup title="Appearance">
                <SidebarItem label="Colors & Themes" active />
                <SidebarItem label="Display & Monitor" />
              </SidebarGroup>
              <SidebarGroup title="Workspace">
                <SidebarItem label="Applications" badge={3} />
                <SidebarItem label="Shortcuts" />
              </SidebarGroup>
            </Sidebar>
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1;">
          <h3>SearchField (Search Box with Clear Action)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <div style="width: 280px;">
              <SearchField bind:value={searchQuery} />
            </div>
            <div style="width: 240px;">
              <SearchField placeholder="Loading search..." loading size="sm" />
            </div>
            <div style="width: 320px;">
              <SearchField placeholder="Large search bar..." size="lg" />
            </div>
          </div>
        </div>

        <div class="group-card" style="grid-column: 1 / -1; padding: 0; overflow: hidden;">
          <h3 style="padding: var(--plasma-space-md) var(--plasma-space-lg); margin: 0; border-bottom: 1px solid var(--plasma-color-border-subtle);">
            HeaderBar / ToolBar (Application Top Bar)
          </h3>
          <HeaderBar
            title="Dolphin"
            subtitle="File Manager - /home/konqi/Projects"
            windowControls
          >
            {#snippet center()}
              <div style="width: 280px;">
                <SearchField placeholder="Filter current folder..." size="sm" />
              </div>
            {/snippet}
            {#snippet right()}
              <Button variant="flat" size="sm">View</Button>
              <Button variant="flat" size="sm">Tools</Button>
            {/snippet}
          </HeaderBar>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Color Tokens</h2>
      <div class="token-groups">
        {#each colorTokens as group}
          <div class="group-card">
            <h3>{group.category}</h3>
            <div class="swatches">
              {#each group.items as token}
                <div class="swatch-row">
                  <div
                    class="swatch-preview"
                    style="background-color: var({token.name});"
                  ></div>
                  <div class="swatch-info">
                    <span class="token-name">{token.name}</span>
                    <span class="token-desc">{token.desc}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <section class="section">
      <h2>Corner Radii (Geometry)</h2>
      <div class="radius-grid">
        {#each radii as r}
          <div class="radius-card">
            <div class="radius-box" style="border-radius: var({r.name});"></div>
            <div class="radius-info">
              <span class="token-name">{r.name}</span>
              <span class="token-desc">{r.desc} ({r.value})</span>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    color: var(--plasma-color-text);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0 0 0.5rem 0;
    font-size: var(--plasma-font-size-2xl);
    font-weight: var(--plasma-font-weight-bold);
  }

  .subtitle {
    margin: 0;
    color: var(--plasma-color-text-muted);
    font-size: var(--plasma-font-size-base);
  }

  .theme-toggle-btn {
    padding: 0.5rem 1rem;
    border-radius: var(--plasma-radius-md);
    border: 1px solid var(--plasma-color-border);
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    cursor: pointer;
    font-size: var(--plasma-font-size-sm);
    font-weight: var(--plasma-font-weight-medium);
    transition: var(--plasma-transition-fast);
  }

  .theme-toggle-btn:hover {
    border-color: var(--plasma-color-border-hover);
    background-color: var(--plasma-color-surface-hover);
  }

  .section {
    margin-bottom: 3rem;
  }

  .section h2 {
    font-size: var(--plasma-font-size-xl);
    margin-bottom: 1rem;
  }

  .token-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .group-card {
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-lg);
    padding: 1.25rem;
    box-shadow: var(--plasma-shadow-xs);
  }

  .group-card h3 {
    margin: 0 0 1rem 0;
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .swatches {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .swatch-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.4rem;
    border-radius: var(--plasma-radius-sm);
    background: var(--plasma-color-surface-sunken);
  }

  .swatch-preview {
    width: 36px;
    height: 36px;
    border-radius: var(--plasma-radius-sm);
    border: 1px solid var(--plasma-color-border);
    flex-shrink: 0;
  }

  .swatch-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    overflow: hidden;
  }

  .token-name {
    font-family: var(--plasma-font-mono);
    font-size: var(--plasma-font-size-xs);
    font-weight: 500;
  }

  .token-desc {
    font-size: var(--plasma-font-size-xs);
    color: var(--plasma-color-text-muted);
  }

  .btn-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }

  .radius-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }

  .radius-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-lg);
    padding: 1.25rem;
    gap: 0.75rem;
  }

  .radius-box {
    width: 56px;
    height: 56px;
    background-color: var(--plasma-color-highlight-soft);
    border: 2px solid var(--plasma-color-highlight);
  }

  .radius-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
</style>
