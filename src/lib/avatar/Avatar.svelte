<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
  type AvatarShape = "circle" | "rounded";
  type AvatarStatus = "online" | "away" | "busy" | "offline";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    initials?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    status?: AvatarStatus;
  }

  let {
    src,
    alt = "Avatar",
    name = "",
    initials = "",
    size = "md",
    shape = "circle",
    status,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  let hasImageError = $state(false);

  const displayInitials = $derived(
    initials
      ? initials
      : name
        ? name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "",
  );
</script>

<div
  class="plasma-avatar plasma-avatar--{size} plasma-avatar--{shape} {customClass}"
  {...restProps}
>
  {#if src && !hasImageError}
    <img
      {src}
      {alt}
      onerror={() => (hasImageError = true)}
      class="plasma-avatar-img"
    />
  {:else if displayInitials}
    <span class="plasma-avatar-initials">{displayInitials}</span>
  {:else}
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="60%"
      height="60%"
      fill="currentColor"
      class="plasma-avatar-fallback-icon"
    >
      <path
        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
      />
    </svg>
  {/if}

  {#if status}
    <span class="plasma-avatar-status plasma-avatar-status--{status}"></span>
  {/if}
</div>

<style>
  .plasma-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--plasma-color-highlight-soft);
    color: var(--plasma-color-highlight);
    border: 1px solid var(--plasma-color-border-subtle);
    font-family: var(--plasma-font-sans);
    font-weight: var(--plasma-font-weight-bold);
    user-select: none;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .plasma-avatar--circle {
    border-radius: var(--plasma-radius-full);
  }

  .plasma-avatar--rounded {
    border-radius: var(--plasma-radius-md);
  }

  .plasma-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }

  .plasma-avatar-initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .plasma-avatar-fallback-icon {
    opacity: 0.8;
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-avatar--xs {
    width: 24px;
    height: 24px;
    font-size: 10px;
  }
  .plasma-avatar--sm {
    width: 32px;
    height: 32px;
    font-size: var(--plasma-font-size-xs);
  }
  .plasma-avatar--md {
    width: 40px;
    height: 40px;
    font-size: var(--plasma-font-size-sm);
  }
  .plasma-avatar--lg {
    width: 48px;
    height: 48px;
    font-size: var(--plasma-font-size-base);
  }
  .plasma-avatar--xl {
    width: 64px;
    height: 64px;
    font-size: var(--plasma-font-size-lg);
  }

  /* --------------------------------------------------------------------------
     Status Dot Badge
     -------------------------------------------------------------------------- */
  .plasma-avatar-status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 26%;
    height: 26%;
    min-width: 8px;
    min-height: 8px;
    max-width: 14px;
    max-height: 14px;
    border-radius: var(--plasma-radius-full);
    border: 2px solid var(--plasma-color-surface);
    box-sizing: content-box;
  }

  .plasma-avatar-status--online {
    background-color: var(--plasma-color-positive);
  }
  .plasma-avatar-status--away {
    background-color: var(--plasma-color-neutral);
  }
  .plasma-avatar-status--busy {
    background-color: var(--plasma-color-negative);
  }
  .plasma-avatar-status--offline {
    background-color: var(--plasma-color-text-muted);
  }
</style>
