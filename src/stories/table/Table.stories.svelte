<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Table from "$lib/table/Table.svelte";
  import Badge from "$lib/badge/Badge.svelte";


  const { Story } = defineMeta({
    title: "Data/Table",
    component: Table,
    tags: ["autodocs"],
    argTypes: {
      striped: {
        control: { type: "boolean" },
      },
      bordered: {
        control: { type: "boolean" },
      },
      hoverable: {
        control: { type: "boolean" },
      },
      density: {
        control: { type: "select" },
        options: ["compact", "default", "spacious"],
      },
    },
    parameters: {
      layout: "padded",
    },
  });

  const sampleData = [
    { id: 1, name: "kwin_wayland", pid: 1420, memory: "184 MB", cpu: "2.4%", status: "running" },
    { id: 2, name: "plasmashell", pid: 1582, memory: "312 MB", cpu: "1.1%", status: "running" },
    { id: 3, name: "dolphin", pid: 2840, memory: "96 MB", cpu: "0.0%", status: "idle" },
    { id: 4, name: "kate", pid: 3104, memory: "78 MB", cpu: "0.2%", status: "idle" },
    { id: 5, name: "systemsettings", pid: 4512, memory: "112 MB", cpu: "0.5%", status: "running" },
  ];
</script>

<script lang="ts">
</script>


{#snippet StatusBadge(row: any)}
  {#if row.status === "running"}

    <Badge variant="highlight">Running</Badge>
  {:else}
    <Badge variant="neutral">Idle</Badge>
  {/if}
{/snippet}

<Story
  name="Process Monitor Table"
  args={{
    columns: [
      { key: "pid", title: "PID", width: "90px", sortable: true },
      { key: "name", title: "Process Name", sortable: true },
      { key: "memory", title: "Memory", width: "120px", sortable: true },
      { key: "cpu", title: "CPU %", width: "100px", sortable: true, align: "right" },
      { key: "status", title: "Status", width: "110px", render: StatusBadge },
    ],
    data: sampleData,
    selectedId: 2,
    density: "default",
    striped: true,
  }}
/>

<Story
  name="Compact Density"
  args={{
    columns: [
      { key: "pid", title: "PID", width: "80px" },
      { key: "name", title: "Name" },
      { key: "memory", title: "Memory" },
      { key: "cpu", title: "CPU" },
    ],
    data: sampleData,
    density: "compact",
    striped: true,
  }}
/>

<Story
  name="Bordered Grid"
  args={{
    columns: [
      { key: "pid", title: "PID", width: "80px" },
      { key: "name", title: "Name" },
      { key: "memory", title: "Memory" },
      { key: "cpu", title: "CPU" },
    ],
    data: sampleData,
    bordered: true,
    striped: false,
  }}
/>
