<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Pagination from "$lib/pagination/Pagination.svelte";

  const { Story } = defineMeta({
    title: "Data/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    argTypes: {
      current: {
        control: { type: "number" },
      },
      total: {
        control: { type: "number" },
      },
      pageSize: {
        control: { type: "number" },
      },
      showTotal: {
        control: { type: "boolean" },
      },
      showSizeChanger: {
        control: { type: "boolean" },
      },
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
      disabled: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
  });
</script>

<Story
  name="Default"
  args={{
    current: 1,
    total: 85,
    pageSize: 10,
  }}
/>

<Story
  name="With Many Pages (Ellipsis)"
  args={{
    current: 6,
    total: 250,
    pageSize: 10,
  }}
/>

<Story
  name="With Page Size Selector"
  args={{
    current: 1,
    total: 120,
    pageSize: 20,
    showSizeChanger: true,
  }}
/>

<Story
  name="Small"
  args={{
    current: 2,
    total: 50,
    size: "sm",
  }}
/>

<Story
  name="Disabled"
  args={{
    current: 1,
    total: 50,
    disabled: true,
  }}
/>
