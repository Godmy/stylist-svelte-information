<script lang="ts">
	import type { RecipeImageCaption } from '$stylist/image/interface/recipe/image-caption';
	import { createImageCaptionState } from './state.svelte';

	let props: RecipeImageCaption = $props();
	const state = createImageCaptionState(() => props);
</script>

<div class={state.hostClasses} {...state.restProps}>
	<img
		src={props.imageSrc}
		alt={props.imageAlt ?? 'Image'}
		width={props.imageWidth ?? '100%'}
		height={props.imageHeight ?? 'auto'}
		loading={props.imageLoading ?? 'lazy'}
		class={state.imageClasses}
	/>
	{#if props.caption}
		<div class={state.captionClasses}>
			{props.caption}
		</div>
	{/if}
</div>

<style>
	.c-image-caption {
		display: inline-flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 0.375rem;
	}
	.c-image-caption--rounded {
		border-radius: 0.75rem;
	}
	.c-image-caption--bordered {
		border: 1px solid var(--color-border-primary);
	}
	.c-image-caption--shadow {
		box-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
	}
	.c-image-caption__image {
		display: block;
		width: 100%;
		object-fit: cover;
	}
	.c-image-caption__image--rounded {
		border-radius: 0.75rem;
	}
	.c-image-caption__caption {
		padding: 0.5rem 0.75rem;
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		background-color: var(--color-background-secondary);
	}
</style>
