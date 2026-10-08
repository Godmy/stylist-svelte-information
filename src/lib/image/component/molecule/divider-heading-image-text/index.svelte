<script lang="ts">
	import Divider from '$stylist/layout/component/atom/divider/index.svelte';
	import Heading from '$stylist/typography/component/atom/heading/index.svelte';
	import Paragraph from '$stylist/typography/component/molecule/paragraph/index.svelte';
	import Image from '$stylist/image/component/atom/image/index.svelte';
	import type { RecipeDividerHeadingImageText } from '$stylist/image/interface/recipe/divider-heading-image-text';

	let {
		id,
		ariaLabel,
		dividerClass,
		dividerLabel,
		dividerOrientation,
		dividerAlign = 'left',
		dividerDashed,
		text,
		level = 2,
		imageSrc,
		imageAlt,
		imageLoading = 'lazy',
		body,
		paragraphs,
		class: className = ''
	}: RecipeDividerHeadingImageText = $props();

	const resolvedParagraphs = $derived(paragraphs?.length ? paragraphs : [body]);
</script>

<section {id} class="divider-heading-image-text {className}" aria-label={ariaLabel}>
	<Divider
		label={dividerLabel}
		align={dividerAlign}
		orientation={dividerOrientation}
		dashed={dividerDashed}
		class="divider-heading-image-text__divider {dividerClass ?? ''}"
	/>

	<div class="divider-heading-image-text__block-one">
		<Heading {level} {text} class="divider-heading-image-text__title" />
		<figure class="divider-heading-image-text__media">
			<Image
				{imageSrc}
				{imageAlt}
				size="xl"
				{imageLoading}
				class="divider-heading-image-text__image"
			/>
		</figure>
	</div>

	<div class="divider-heading-image-text__content">
		<div class="divider-heading-image-text__paragraphs">
			{#each resolvedParagraphs as paragraph}
				<Paragraph text={paragraph} class="divider-heading-image-text__text" />
			{/each}
		</div>
	</div>
</section>

<style>
	.divider-heading-image-text {
		display: grid;
		gap: var(--divider-heading-image-text-gap, 2.5rem);
	}

	:global(.divider-heading-image-text__divider) {
		--color-border-secondary: var(--divider-heading-image-text-border, currentColor);
	}

	.divider-heading-image-text__block-one {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: var(--divider-heading-image-text-gap, 2.5rem);
		align-items: center;
	}

	:global(.divider-heading-image-text__title) {
		margin: 0;
		--typography-color: var(--divider-heading-image-text-heading, currentColor);
		--typography-font-size: var(--divider-heading-image-text-title-size, clamp(2rem, 4cqw, 3.5rem));
		--typography-line-height: 1.05;
	}

	.divider-heading-image-text__media {
		aspect-ratio: var(--divider-heading-image-text-media-ratio, 4 / 3);
		margin: 0;
		overflow: hidden;
		border: 1px solid var(--divider-heading-image-text-border, currentColor);
		border-radius: 0.5rem;
		background: var(--divider-heading-image-text-media-bg, transparent);
		box-shadow: var(--divider-heading-image-text-media-shadow, none);
	}

	:global(.divider-heading-image-text__image) {
		display: block;
		width: 100%;
		height: 100%;
		--image-width: 100%;
		--image-height: 100%;
		--image-radius: 0;
		--image-background: transparent;
	}

	.divider-heading-image-text__content {
		display: grid;
		gap: 2rem;
		max-width: var(--divider-heading-image-text-text-max-width, 54rem);
	}

	.divider-heading-image-text__paragraphs {
		display: grid;
		gap: 1.125rem;
	}

	:global(.divider-heading-image-text__text) {
		margin: 0;
		--typography-color: var(--divider-heading-image-text-text, currentColor);
	}

	@container (max-width: 920px) {
		.divider-heading-image-text__block-one {
			grid-template-columns: 1fr;
		}
	}

	@container (max-width: 680px) {
		:global(.divider-heading-image-text__title) {
			--divider-heading-image-text-title-size: 2.35rem;
		}
	}
</style>
