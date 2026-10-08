<script lang="ts">
	import type { RecipeImageGallery } from '$stylist/image/interface/recipe/image-gallery';
	import { createImageGalleryState } from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeImageGallery = $props();
	const state = createImageGalleryState(() => props);
</script>

<div class={state.containerClass} {...state.restProps}>
	{#if state.images.length > 0}
		<div class="ig-main">
			<!-- Main image display -->
			<div
				class={state.imageContainerClasses}
				onclick={() => state.openFullscreen(state.currentIndex)}
				onkeydown={(e) =>
					(e.key === 'Enter' || e.key === ' ') && state.openFullscreen(state.currentIndex)}
				role="button"
				tabindex="0"
			>
				<img
					src={state.images[state.currentIndex].imageSrc}
					alt={state.images[state.currentIndex].imageAlt ||
						`Gallery image ${state.currentIndex + 1}`}
					loading={state.images[state.currentIndex].imageLoading ?? 'lazy'}
					width={state.images[state.currentIndex].imageWidth}
					height={state.images[state.currentIndex].imageHeight}
					class={state.imageClasses}
				/>

				<!-- Navigation arrows -->
				{#if state.images.length > 1}
					<button
						type="button"
						class={state.navigationButtonClasses}
						onclick={() => state.prevImage()}
						aria-label="Previous image"
					>
						<BaseIcon name="chevron-left" size={24} />
					</button>

					<button
						type="button"
						class={state.navigationButtonClasses}
						onclick={() => state.nextImage()}
						aria-label="Next image"
					>
						<BaseIcon name="chevron-right" size={24} />
					</button>
				{/if}

				<!-- Image counter -->
				<div class="image-gallery__image-counter">
					{state.currentIndex + 1} / {state.images.length}
				</div>
			</div>

			<!-- Caption -->
			{#if state.showCaptions && state.images[state.currentIndex].caption}
				<div class={state.captionClasses}>
					{state.images[state.currentIndex].caption}
				</div>
			{/if}

			<!-- Thumbnails -->
			{#if state.showThumbnails && state.images.length > 1}
				<div class="image-gallery__thumbnails-container">
					{#each state.images as img, index}
						<div
							class={state.getThumbnailClasses(index)}
							onclick={() => state.goToImage(index)}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && state.goToImage(index)}
							role="button"
							tabindex="0"
						>
							<img
								src={img.imageSrc}
								alt={img.imageAlt || `Thumbnail ${index + 1}`}
								loading={img.imageLoading ?? 'lazy'}
								width={img.imageWidth}
								height={img.imageHeight}
								class="image-gallery__thumbnail-image"
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Fullscreen overlay -->
	{#if state.isFullscreen}
		<div class="image-gallery__fullscreen-overlay">
			<button
				type="button"
				class="image-gallery__fullscreen-close-button"
				onclick={() => state.closeFullscreen()}
				aria-label="Close fullscreen"
			>
				<BaseIcon name="x" size={24} />
			</button>

			<button
				type="button"
				class="image-gallery__fullscreen-left-button"
				onclick={() => state.prevImage()}
				aria-label="Previous image"
			>
				<BaseIcon name="chevron-left" size={32} />
			</button>

			<div class="image-gallery__fullscreen-image-container">
				<img
					src={state.images[state.currentIndex].imageSrc}
					alt={state.images[state.currentIndex].imageAlt ||
						`Fullscreen image ${state.currentIndex + 1}`}
					loading={state.images[state.currentIndex].imageLoading ?? 'lazy'}
					width={state.images[state.currentIndex].imageWidth}
					height={state.images[state.currentIndex].imageHeight}
					class="image-gallery__fullscreen-image"
				/>

				{#if state.showCaptions && state.images[state.currentIndex].caption}
					<div class={state.fullscreenCaptionClasses}>
						{state.images[state.currentIndex].caption}
					</div>
				{/if}

				<div class="image-gallery__fullscreen-counter">
					{state.currentIndex + 1} / {state.images.length}
				</div>
			</div>

			<button
				type="button"
				class="image-gallery__fullscreen-right-button"
				onclick={() => state.nextImage()}
				aria-label="Next image"
			>
				<BaseIcon name="chevron-right" size={32} />
			</button>
		</div>
	{/if}
</div>

<style>
	.ig-main {
		position: relative;
	}

	.image-gallery__image-container {
		position: relative;
		cursor: pointer;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.image-gallery__image {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	.image-gallery__nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 9999px;
		padding: 0.5rem;
		background-color: color-mix(in srgb, var(--color-neutral-900) 40%, transparent);
		color: var(--color-text-inverse);
		cursor: pointer;
	}
	.image-gallery__nav-button:first-of-type {
		left: 0.75rem;
	}
	.image-gallery__nav-button:last-of-type {
		right: 0.75rem;
	}
	.image-gallery__nav-button:hover {
		background-color: color-mix(in srgb, var(--color-neutral-900) 60%, transparent);
	}

	.image-gallery__caption {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.image-gallery__fullscreen-caption {
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-inverse);
		text-align: center;
	}

	.image-gallery__image-counter {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--color-background-tertiary);
		color: var(--color-text-inverse);
		font-size: 0.875rem;
		line-height: 1.25rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		border-radius: 9999px;
	}

	.image-gallery__thumbnails-container {
		display: flex;
		overflow-x: auto;
		margin-top: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.image-gallery__thumbnails-container > * + * {
		margin-left: 0.5rem;
	}

	.image-gallery__thumbnail {
		flex-shrink: 0;
		cursor: pointer;
		border-radius: 0.375rem;
		overflow: hidden;
		border-width: 2px;
		border-style: solid;
		border-color: transparent;
	}
	.image-gallery__thumbnail--active {
		border-color: var(--color-primary-500);
	}

	.image-gallery__thumbnail-image {
		width: 4rem;
		height: 4rem;
		object-fit: cover;
	}

	.image-gallery__fullscreen-overlay {
		position: fixed;
		inset: 0;
		background-color: var(--color-background-tertiary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-gallery__fullscreen-close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		color: var(--color-text-inverse);
		padding: 0.5rem;
		border-radius: 9999px;
	}
	.image-gallery__fullscreen-close-button:hover {
		background-color: var(--color-background-secondary);
	}

	.image-gallery__fullscreen-left-button {
		position: absolute;
		left: 1rem;
		color: var(--color-text-inverse);
		padding: 0.5rem;
		border-radius: 9999px;
	}
	.image-gallery__fullscreen-left-button:hover {
		background-color: var(--color-background-secondary);
	}

	.image-gallery__fullscreen-right-button {
		position: absolute;
		right: 1rem;
		color: var(--color-text-inverse);
		padding: 0.5rem;
		border-radius: 9999px;
	}
	.image-gallery__fullscreen-right-button:hover {
		background-color: var(--color-background-secondary);
	}

	.image-gallery__fullscreen-image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 56rem;
		max-height: 100%;
	}

	.image-gallery__fullscreen-image {
		max-height: 80vh;
		object-fit: contain;
	}

	.image-gallery__fullscreen-counter {
		margin-top: 1rem;
		color: var(--color-text-inverse);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
