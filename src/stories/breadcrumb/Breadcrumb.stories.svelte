<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Breadcrumb from "$lib/breadcrumb/Breadcrumb.svelte";
  import BreadcrumbItem from "$lib/breadcrumb/BreadcrumbItem.svelte";

  const { Story } = defineMeta({
    title: "Navigation/Breadcrumb",
    component: Breadcrumb,
    tags: ["autodocs"],
    parameters: {
      layout: "centered",
    },
  });
</script>

{#snippet HomeIcon()}
  <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
    <path d="m8 3.293 6 6V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V9.293l6-6Z" />
  </svg>
{/snippet}

{#snippet DolphinPathSample()}
  <BreadcrumbItem icon={HomeIcon} label="Home" />
  <BreadcrumbItem label="Projects" />
  <BreadcrumbItem label="plasma-svelte" />
  <BreadcrumbItem label="src" />
  <BreadcrumbItem label="lib" active />
{/snippet}

<Story
  name="Dolphin Path Bar"
  args={{
    children: DolphinPathSample,
  }}
/>
