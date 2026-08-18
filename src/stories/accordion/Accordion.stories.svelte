<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Accordion from "$lib/accordion/Accordion.svelte";
  import AccordionItem from "$lib/accordion/AccordionItem.svelte";

  const { Story } = defineMeta({
    title: "Surfaces/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    parameters: {
      layout: "centered",
    },
  });
</script>

{#snippet DisplayIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5V14h2a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
  </svg>
{/snippet}

{#snippet NetworkIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 4.582c.119-.36.257-.709.412-1.037.382-.81 1.05-1.464 1.839-1.748V4.5c-.754-.03-1.5-.12-2.251-.252z" />
  </svg>
{/snippet}

{#snippet AccordionSample()}
  <AccordionItem title="Display and Monitor Settings" icon={DisplayIcon} open>
    Configure primary display scaling, refresh rate (60Hz / 120Hz / 144Hz), and night light color temperature profiles.
  </AccordionItem>

  <AccordionItem title="Network Connections" icon={NetworkIcon}>
    Manage active Wi-Fi adapters, Ethernet static routing, VPN wireguard tunnels, and proxy network configurations.
  </AccordionItem>

  <AccordionItem title="Advanced Window Rules" disabled>
    Window placement rules for Wayland compositors (Unavailable in guest mode).
  </AccordionItem>
{/snippet}

<Story
  name="Default"
  args={{
    style: "width: 480px;",
    children: AccordionSample,
  }}
/>
