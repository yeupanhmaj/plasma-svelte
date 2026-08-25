<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Spinner from "$lib/spinner/Spinner.svelte";

  const { Story } = defineMeta({
    title: "Feedback/Spinner",
    component: Spinner,
    tags: ["autodocs"],
    argTypes: {
      size: {
        control: { type: "select" },
        options: ["sm", "md", "lg", "xl"],
        description: "Spinner size",
      },
      variant: {
        control: { type: "select" },
        options: ["primary", "current", "white", "muted"],
        description: "Color styling",
      },
    },
    parameters: {
      layout: "centered",
    },
  });
</script>

<Story name="Default" args={{ size: "md", variant: "primary" }} />

<Story name="Small" args={{ size: "sm", variant: "primary" }} />

<Story name="Large" args={{ size: "lg", variant: "primary" }} />

<Story name="ExtraLarge" args={{ size: "xl", variant: "primary" }} />

<Story name="Muted" args={{ size: "md", variant: "muted" }} />
