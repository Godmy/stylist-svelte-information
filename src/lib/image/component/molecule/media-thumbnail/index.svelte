<script lang="ts">
	import CloseButton from '$stylist/button/component/atom/close-button/index.svelte';
	import type { RecipeMediaThumbnail } from '$stylist/image/interface/recipe/media-thumbnail';

	let props: RecipeMediaThumbnail = $props();
</script>

<figure class="media-thumbnail {props.class ?? ''}">
	<img src={props.src} alt={props.alt ?? ''} loading="lazy" />
	{#if props.onRemove}
		<CloseButton
			class="media-thumbnail__remove"
			size="sm"
			variant="default"
			ariaLabel="Удалить изображение"
			onclick={props.onRemove}
		/>
	{/if}
	{#if props.alt}
		<figcaption>{props.alt}</figcaption>
	{/if}
</figure>

<style>
	.media-thumbnail {
		position: relative;
		margin: 0;
		width: 9rem;
	}
	.media-thumbnail img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
	}
	.media-thumbnail :global(.media-thumbnail__remove) {
		position: absolute;
		top: 0.35rem;
		right: 0.35rem;
		background: var(--color-background-primary);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
	}
	figcaption {
		margin-top: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
