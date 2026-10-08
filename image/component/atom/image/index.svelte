<script lang="ts">
	import type { RecipeImage } from '$stylist/image/interface/recipe/image';
	import { createImageState } from './state.svelte';

	let props: RecipeImage = $props();
	const state = createImageState(() => props);
</script>

<div class={state.containerClass}>
	{#if !state.isLoaded && !state.hasError}
		<div class="c-image__skeleton" aria-hidden="true"></div>
	{/if}

	{#if state.content && !state.isLoaded && !state.hasError}
		<div class={state.wrapperClass}>
			{@render state.content()}
		</div>
	{/if}

	<img
		src={state.imageSource}
		alt={props.imageAlt ?? ''}
		loading={state.loadingProp}
		width={state.imageWidth}
		height={state.imageHeight}
		class={state.imageClasses}
		onerror={() => state.handleError()}
		onload={() => state.handleLoad()}
	/>
</div>

<style>
	.c-image {
		position: relative;
		display: inline-block;
		max-width: 100%;
		overflow: hidden;
		background-color: var(--image-background, var(--color-background-secondary));
		border-radius: var(--image-radius, 0.375rem);
	}
	.c-image__skeleton {
		position: absolute;
		inset: 0;
		z-index: 0;
		border-radius: inherit;
		background:
			linear-gradient(
				90deg,
				transparent,
				color-mix(in srgb, var(--image-skeleton-highlight, #ffffff) 32%, transparent),
				transparent
			),
			var(
				--image-skeleton-background,
				color-mix(in srgb, var(--color-text-primary, #ffffff) 10%, transparent)
			);
		background-size: 220% 100%;
		animation: c-image-skeleton-shimmer 1.35s ease-in-out infinite;
	}
	.c-image__placeholder {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 6.25rem;
		color: var(--color-text-secondary);
	}
	.c-image__img {
		position: relative;
		z-index: 1;
		display: block;
		max-width: 100%;
		width: var(--image-width, auto);
		height: var(--image-height, auto);
		object-fit: var(--image-object-fit, cover);
		opacity: 0;
		transition: opacity var(--duration-200, 200ms) var(--easing-smooth, ease-in-out);
	}
	.c-image__img--loaded {
		opacity: 1;
	}
	.c-image__img--sm {
		max-width: 12.5rem;
	}
	.c-image__img--md {
		max-width: 25rem;
	}
	.c-image__img--lg {
		max-width: 37.5rem;
	}
	.c-image__img--xl {
		max-width: 100%;
	}

	@keyframes c-image-skeleton-shimmer {
		to {
			background-position: -220% 0;
		}
	}
</style>
