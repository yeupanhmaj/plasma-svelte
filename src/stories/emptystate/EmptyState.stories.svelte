<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import EmptyState from "$lib/emptystate/EmptyState.svelte";
  import Button from "$lib/button/Button.svelte";

  const { Story } = defineMeta({
    title: "Data Display/EmptyState",
    component: EmptyState,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["default", "card", "dashed", "subtle"],
      },
      compact: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "centered",
    },
  });
</script>

{#snippet ActionsSnippet()}
  <Button primary label="Create Item" />
  <Button label="Learn More" />
{/snippet}

<Story
  name="Default"
  args={{
    title: "Your Library is Empty",
    description: "Upload files or explore catalogs to start reading your favorite books.",
    actions: ActionsSnippet,
  }}
/>

<Story
  name="Dashed"
  args={{
    variant: "dashed",
    title: "This collection is empty",
    description: "Add books or manga from your library to populate this group.",
    actions: ActionsSnippet,
  }}
/>

<Story
  name="Card"
  args={{
    variant: "card",
    title: "No Results Found",
    description: "Try adjusting your search filters or queries.",
  }}
/>
