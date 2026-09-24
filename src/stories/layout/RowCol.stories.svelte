<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Row from "$lib/layout/Row.svelte";
  import Col from "$lib/layout/Col.svelte";

  const { Story } = defineMeta({
    title: "Layout/Row & Col (24 Grid)",
    component: Row,
    tags: ["autodocs"],
    argTypes: {
      align: {
        control: { type: "select" },
        options: ["top", "middle", "bottom", "stretch"],
      },
      justify: {
        control: { type: "select" },
        options: ["start", "center", "end", "space-around", "space-between", "space-evenly"],
      },
      gutter: {
        control: { type: "object" },
      },
      wrap: {
        control: { type: "boolean" },
      },
    },
    parameters: {
      layout: "padded",
    },
  });
</script>

<style>
  :global(.grid-demo-col) {
    background: color-mix(in srgb, var(--plasma-color-highlight) 25%, var(--plasma-color-surface));
    border: 1px solid var(--plasma-color-highlight);
    border-radius: var(--plasma-radius-sm);
    color: var(--plasma-color-text);
    text-align: center;
    padding: 16px 0;
    font-size: var(--plasma-font-size-sm);
    font-weight: 500;
  }
  :global(.grid-demo-col-alt) {
    background: color-mix(in srgb, var(--plasma-color-highlight) 40%, var(--plasma-color-surface));
  }
  :global(.grid-demo-col-tall) {
    padding: 36px 0;
  }
</style>

<!-- 1. Basic 24 Grid -->
{#snippet BasicGrid()}
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <Row>
      <Col span={24}><div class="grid-demo-col">col-24 (100%)</div></Col>
    </Row>
    <Row>
      <Col span={12}><div class="grid-demo-col">col-12 (50%)</div></Col>
      <Col span={12}><div class="grid-demo-col grid-demo-col-alt">col-12 (50%)</div></Col>
    </Row>
    <Row>
      <Col span={8}><div class="grid-demo-col">col-8 (33.33%)</div></Col>
      <Col span={8}><div class="grid-demo-col grid-demo-col-alt">col-8 (33.33%)</div></Col>
      <Col span={8}><div class="grid-demo-col">col-8 (33.33%)</div></Col>
    </Row>
    <Row>
      <Col span={6}><div class="grid-demo-col">col-6 (25%)</div></Col>
      <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6 (25%)</div></Col>
      <Col span={6}><div class="grid-demo-col">col-6 (25%)</div></Col>
      <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6 (25%)</div></Col>
    </Row>
  </div>
{/snippet}

<Story
  name="Basic 24 Grid"
  args={{
    children: BasicGrid,
  }}
/>

<!-- 2. Gutter Spacing -->
{#snippet GutterGrid()}
  <div style="display: flex; flex-direction: column; gap: 24px; width: 100%;">
    <div>
      <h4 style="margin: 0 0 8px 0; color: var(--plasma-color-text-muted);">Horizontal Gutter: 16px</h4>
      <Row gutter={16}>
        <Col span={6}><div class="grid-demo-col">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6</div></Col>
      </Row>
    </div>

    <div>
      <h4 style="margin: 0 0 8px 0; color: var(--plasma-color-text-muted);">Horizontal & Vertical Gutter: [16, 24]</h4>
      <Row gutter={[16, 24]}>
        <Col span={6}><div class="grid-demo-col">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col">col-6</div></Col>
        <Col span={6}><div class="grid-demo-col grid-demo-col-alt">col-6</div></Col>
      </Row>
    </div>
  </div>
{/snippet}

<Story
  name="Column Gutters"
  args={{
    children: GutterGrid,
  }}
/>

<!-- 3. Column Offset -->
{#snippet OffsetGrid()}
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <Row>
      <Col span={8}><div class="grid-demo-col">col-8</div></Col>
      <Col span={8} offset={8}><div class="grid-demo-col grid-demo-col-alt">col-8 offset-8</div></Col>
    </Row>
    <Row>
      <Col span={6} offset={6}><div class="grid-demo-col">col-6 offset-6</div></Col>
      <Col span={6} offset={6}><div class="grid-demo-col grid-demo-col-alt">col-6 offset-6</div></Col>
    </Row>
    <Row>
      <Col span={12} offset={6}><div class="grid-demo-col">col-12 offset-6 (Centered)</div></Col>
    </Row>
  </div>
{/snippet}

<Story
  name="Column Offset"
  args={{
    children: OffsetGrid,
  }}
/>

<!-- 4. Flex Alignment & Justify -->
{#snippet AlignmentGrid()}
  <div style="display: flex; flex-direction: column; gap: 24px; width: 100%;">
    <div>
      <h4 style="margin: 0 0 8px 0; color: var(--plasma-color-text-muted);">align="middle" justify="center"</h4>
      <Row align="middle" justify="center" gutter={16} style="background: var(--plasma-color-surface-sunken); padding: 16px; border-radius: 8px;">
        <Col span={4}><div class="grid-demo-col">col-4</div></Col>
        <Col span={4}><div class="grid-demo-col grid-demo-col-tall">col-4 (tall)</div></Col>
        <Col span={4}><div class="grid-demo-col">col-4</div></Col>
      </Row>
    </div>

    <div>
      <h4 style="margin: 0 0 8px 0; color: var(--plasma-color-text-muted);">justify="space-between"</h4>
      <Row justify="space-between" style="background: var(--plasma-color-surface-sunken); padding: 16px; border-radius: 8px;">
        <Col span={4}><div class="grid-demo-col">col-4</div></Col>
        <Col span={4}><div class="grid-demo-col grid-demo-col-alt">col-4</div></Col>
        <Col span={4}><div class="grid-demo-col">col-4</div></Col>
      </Row>
    </div>
  </div>
{/snippet}

<Story
  name="Alignment and Justify"
  args={{
    children: AlignmentGrid,
  }}
/>

<!-- 5. Flex Layout (Auto & Fixed) -->
{#snippet FlexGrid()}
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <Row gutter={16}>
      <Col flex="100px"><div class="grid-demo-col">100px</div></Col>
      <Col flex="auto"><div class="grid-demo-col grid-demo-col-alt">flex="auto" (Fill Remaining)</div></Col>
    </Row>
    <Row gutter={16}>
      <Col flex={2}><div class="grid-demo-col">flex: 2 / 5</div></Col>
      <Col flex={3}><div class="grid-demo-col grid-demo-col-alt">flex: 3 / 5</div></Col>
    </Row>
    <Row gutter={16}>
      <Col flex="none"><div class="grid-demo-col" style="padding: 16px 24px;">flex="none" (Fits content)</div></Col>
      <Col flex="auto"><div class="grid-demo-col grid-demo-col-alt">flex="auto"</div></Col>
    </Row>
  </div>
{/snippet}

<Story
  name="Flex Properties"
  args={{
    children: FlexGrid,
  }}
/>

<!-- 6. Responsive Breakpoints -->
{#snippet ResponsiveGrid()}
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div class="grid-demo-col">xs:24 sm:12 md:8 lg:6</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div class="grid-demo-col grid-demo-col-alt">xs:24 sm:12 md:8 lg:6</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div class="grid-demo-col">xs:24 sm:12 md:8 lg:6</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div class="grid-demo-col grid-demo-col-alt">xs:24 sm:12 md:8 lg:6</div>
    </Col>
  </Row>
{/snippet}

<Story
  name="Responsive Breakpoints"
  args={{
    children: ResponsiveGrid,
  }}
/>
