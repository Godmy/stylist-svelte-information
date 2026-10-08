<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import Image from './index.svelte';

	const IMAGE_STORY_GALLERY = Object.entries(
		(import.meta as any).glob('/src/lib/image/data/png/*.png', {
			eager: true,
			query: '?url',
			import: 'default'
		}) as Record<string, string>
	)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([path, src]) => {
			const fileName = path.split('/').pop() ?? path;
			const id = fileName.replace(/\.png$/i, '');
			const label = id.replace(/^\d+-/, '').split('-').join(' ');
			return { id, label: label.charAt(0).toUpperCase() + label.slice(1), src };
		});

	const DEFAULT_ASSET_ID = '2-section-about';
	const BROKEN_SRC = 'https://invalid-url-for-testing.local/broken.png';
	const SIZE_TOKENS = ['sm', 'md', 'lg', 'xl'] as const;

	const controls: SlotStory[] = [
		{
			name: 'assetId',
			label: 'Preset image',
			type: 'select',
			options: IMAGE_STORY_GALLERY.map((asset) => asset.id),
			defaultValue: DEFAULT_ASSET_ID
		},
		{ name: 'imageAlt', type: 'text', defaultValue: 'Landing section preview' },
		{ name: 'size', type: 'select', options: SIZE_TOKENS, defaultValue: 'lg' },
		{ name: 'imageLoading', type: 'select', options: ['lazy', 'eager'], defaultValue: 'lazy' },
		{
			name: 'simulateError',
			label: 'Simulate broken src',
			description: 'Points src at an unreachable URL to demonstrate the automatic fallback swap.',
			type: 'boolean',
			defaultValue: false
		}
	];

	function findAsset(id: string) {
		return IMAGE_STORY_GALLERY.find((asset) => asset.id === id) ?? IMAGE_STORY_GALLERY[0];
	}
</script>

<Story
	id="atoms-image"
	title="Image"
	component={Image}
	category="Atoms"
	description="Изображение с состоянием загрузки (fade-in), автоматическим fallback при ошибке и токенами размера."
	{controls}
>
	{#snippet children(values: any)}
		{@const active = findAsset(values.assetId)}
		<div class="image-story">
			<figure class="image-story__preview">
				<Image
					imageSrc={values.simulateError ? BROKEN_SRC : active.src}
					imageFallback={active.src}
					imageAlt={values.imageAlt}
					size={values.size}
					imageLoading={values.imageLoading}
				/>
				<figcaption class="image-story__caption">
					<span>{active.label}</span>
					{#if values.simulateError}
						<span class="image-story__badge">fallback active</span>
					{/if}
				</figcaption>
			</figure>

			<div class="image-story__sizes">
				<p class="image-story__sizes-title">Токены размера (`size`)</p>
				<div class="image-story__sizes-row">
					{#each SIZE_TOKENS as sizeToken (sizeToken)}
						<div class="image-story__size-item">
							<Image imageSrc={active.src} imageAlt={active.label} size={sizeToken} />
							<span class="image-story__size-label">{sizeToken}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	.image-story {
		display: grid;
		gap: 2rem;
		width: 100%;
	}

	.image-story__preview {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		margin: 0;
	}

	.image-story__caption {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--color-text-secondary);
	}

	.image-story__badge {
		padding: 0.15rem 0.55rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-warning-500, orange) 20%, transparent);
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-primary);
	}

	.image-story__sizes {
		border-top: 1px solid color-mix(in srgb, var(--color-border-primary) 80%, transparent);
		padding-top: 1.5rem;
	}

	.image-story__sizes-title {
		margin: 0 0 1rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.image-story__sizes-row {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-end;
		gap: 1.5rem;
		overflow-x: auto;
		padding-bottom: 0.5rem;
	}

	.image-story__size-item {
		display: flex;
		flex: none;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
	}

	.image-story__size-label {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
</style>
