<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DatePicker from "$lib/datepicker/DatePicker.svelte";

  const { Story } = defineMeta({
    title: "Controls/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
    argTypes: {
      value: {
        control: { type: "text" },
      },
      placeholder: {
        control: { type: "text" },
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
          height: "400px",
        },
      },
    },

    args: {
      placeholder: "Select date...",
      size: "md",
      style: "width: 280px;",
    },
  });
</script>

<Story name="Default" args={{ placeholder: "Select date..." }} />

<Story name="With Selected Date" args={{ value: "2026-08-19" }} />

<Story name="Small" args={{ value: "2026-08-19", size: "sm" }} />

<Story name="Large" args={{ value: "2026-08-19", size: "lg" }} />

<Story name="Disabled" args={{ value: "2026-08-19", disabled: true }} />
