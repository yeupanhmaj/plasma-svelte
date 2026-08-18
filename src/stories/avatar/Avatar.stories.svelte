<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Avatar from "$lib/avatar/Avatar.svelte";

  const { Story } = defineMeta({
    title: "Data Display/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    argTypes: {
      name: {
        control: { type: "text" },
      },
      initials: {
        control: { type: "text" },
      },
      size: {
        control: { type: "select" },
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      shape: {
        control: { type: "select" },
        options: ["circle", "rounded"],
      },
      status: {
        control: { type: "select" },
        options: ["online", "away", "busy", "offline"],
      },
    },
    parameters: {
      layout: "centered",
    },
    args: {
      name: "Konqi KDE",
      size: "md",
      status: "online",
    },
  });
</script>

<Story
  name="With Initials"
  args={{ name: "Konqi Dragon", initials: "KD", size: "md", status: "online" }}
/>

<Story
  name="With Image"
  args={{
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face",
    alt: "User Photo",
    size: "lg",
    status: "online",
  }}
/>

<Story
  name="Fallback Silhouette"
  args={{ size: "md" }}
/>

<Story
  name="Rounded Shape"
  args={{ name: "Plasma Desktop", shape: "rounded", size: "lg", status: "busy" }}
/>

<Story
  name="Sizes Collection"
  args={{ name: "Kate Editor", size: "xl", status: "away" }}
/>
