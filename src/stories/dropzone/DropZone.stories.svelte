<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import DropZone from "$lib/dropzone/DropZone.svelte";

  const { Story } = defineMeta({
    title: "Data Entry/DropZone",
    component: DropZone,
    tags: ["autodocs"],
    argTypes: {
      accept: { control: { type: "text" } },
      multiple: { control: { type: "boolean" } },
      disabled: { control: { type: "boolean" } },
      loading: { control: { type: "boolean" } },
      title: { control: { type: "text" } },
      subtitle: { control: { type: "text" } },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      onfiles: fn(),
      onerror: fn(),
    },
  });
</script>

<Story
  name="Default"
  args={{
    title: "Drop EPUB or PDF files here, or browse",
    subtitle: "Supports files up to 500MB",
    accept: ".epub,.pdf",
  }}
/>

<Story
  name="MangaUpload"
  args={{
    title: "Drop CBZ or ZIP archives here, or browse",
    subtitle: "Supports .cbz and .zip formats",
    accept: ".cbz,.zip",
  }}
/>

<Story
  name="Loading"
  args={{
    loading: true,
  }}
/>

<Story
  name="Disabled"
  args={{
    disabled: true,
  }}
/>
