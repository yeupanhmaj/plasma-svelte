<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import TimePicker from "$lib/timepicker/TimePicker.svelte";

  const { Story } = defineMeta({
    title: "Controls/TimePicker",
    component: TimePicker,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "text" },
      },
      placeholder: {
        control: { type: "text" },
      },
      minuteStep: {
        control: { type: "number" },
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
      docs: {
        story: {
          inline: true,
        },
      },
    },
    args: {
      placeholder: "Select time...",
      size: "md",
      style: "width: 200px;",
    },
  });
</script>

<Story
  name="Default (24h)"
  args={{ placeholder: "Select time...", style: "width: 200px;" }}
/>

<Story
  name="With Selected Time"
  args={{ value: "14:30", style: "width: 200px;" }}
/>

<Story
  name="Step Interval"
  args={{ value: "09:45", minuteStep: 5, style: "width: 200px;" }}
/>

<Story
  name="Small"
  args={{ value: "14:30", size: "sm", style: "width: 170px;" }}
/>

<Story
  name="Disabled"
  args={{ value: "14:30", disabled: true, style: "width: 200px;" }}
/>
