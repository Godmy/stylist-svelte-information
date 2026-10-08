<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import ImageGallery from './index.svelte';

	let {
		id = '',
		title = '',
		description = '',
		controls = [
			{ name: 'showThumbnails', type: 'boolean', defaultValue: true },
			{ name: 'autoPlay', type: 'boolean', defaultValue: false },
			{ name: 'showCaptions', type: 'boolean', defaultValue: true }
		]
	} = $props<{
		id?: string;
		title?: string;
		description?: string;
		controls?: SlotStory[];
	}>();

	type ImageItem = {
		id: string;
		imageSrc: string;
		imageAlt: string;
		caption: string;
	};

	const images: ImageItem[] = [
		{
			id: '1',
			imageSrc: 'https://placehold.co/800x600/3b82f6/white?text=Image+1',
			imageAlt: 'First image',
			caption: 'Beautiful landscape image'
		},
		{
			id: '2',
			imageSrc: 'https://placehold.co/800x600/ef4444/white?text=Image+2',
			imageAlt: 'Second image',
			caption: 'Colorful sunset'
		},
		{
			id: '3',
			imageSrc: 'https://placehold.co/800x600/10b981/white?text=Image+3',
			imageAlt: 'Third image',
			caption: 'Mountain view'
		},
		{
			id: '4',
			imageSrc: 'https://placehold.co/800x600/f59e0b/white?text=Image+4',
			imageAlt: 'Fourth image',
			caption: 'Ocean waves'
		},
		{
			id: '5',
			imageSrc: 'https://placehold.co/800x600/8b5cf6/white?text=Image+5',
			imageAlt: 'Fifth image',
			caption: 'Forest trail'
		}
	];
</script>

<Story {id} {title} {description} component={ImageGallery} category="Organisms" {controls}>
	{#snippet children(values: any)}
		<section class="sb-organisms-image-gallery _c1">
			<div class="_c2">
				<p class="_c3">Primary Image Gallery Example</p>
				<p class="_c4">Interactive image gallery with customizable options.</p>

				<div class="_c5">
					<ImageGallery
						{images}
						showThumbnails={values.showThumbnails}
						autoPlay={values.autoPlay}
						showCaptions={values.showCaptions}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Image Gallery Variations</h3>
				<p class="_c8">Different image gallery configurations with various options.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Without Thumbnails</p>
						<div>
							<ImageGallery {images} showThumbnails={false} showCaptions={true} />
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Without Captions</p>
						<div>
							<ImageGallery {images} showThumbnails={true} showCaptions={false} />
						</div>
					</article>
				</div>
			</div>
		</section>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		width: 100%;
		gap: 2rem;
	}
	@media (min-width: 1024px) {
		._c1 {
			grid-template-columns: 1fr 1fr;
		}
	}
	._c10 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	._c11 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c2 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		color: var(--color-text-secondary);
		text-transform: uppercase;
	}
	._c4 {
		margin-top: 0.25rem;
		color: var(--color-text-primary);
	}
	._c5 {
		margin-top: 1.5rem;
	}
	._c6 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c7 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c8 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c9 {
		margin-top: 1.25rem;
	}
	._c9 > * + * {
		margin-top: 1rem;
	}
</style>
