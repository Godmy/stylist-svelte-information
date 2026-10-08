<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import ImageCaption from './index.svelte';

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

	const IMAGE_CAPTION_STORY_PRESETS = [
		{
			id: 'consensus-rounded',
			label: 'Consensus - rounded',
			src:
				IMAGE_STORY_GALLERY.find((asset) => asset.id === '1-hero-consensus-decision-room')?.src ??
				'',
			alt: 'Facilitators aligning the room before a consensus vote',
			caption: 'Consensus decision room - rounded, bordered, with shadow',
			rounded: true,
			bordered: true,
			shadow: true
		},
		{
			id: 'about-flush',
			label: 'About - flush',
			src: IMAGE_STORY_GALLERY.find((asset) => asset.id === '2-section-about')?.src ?? '',
			alt: 'About section illustration',
			caption: 'About section - flush edges, no border, no shadow',
			rounded: false,
			bordered: false,
			shadow: false
		},
		{
			id: 'wideband-delphi-bordered',
			label: 'Wideband Delphi - bordered',
			src: IMAGE_STORY_GALLERY.find((asset) => asset.id === '3-section-wideband-delphi')?.src ?? '',
			alt: 'Wideband Delphi estimation session',
			caption: 'Wideband Delphi - square corners, bordered, no shadow',
			rounded: false,
			bordered: true,
			shadow: false
		},
		{
			id: 'history-shadow',
			label: 'History - shadow',
			src: IMAGE_STORY_GALLERY.find((asset) => asset.id === '4-section-history')?.src ?? '',
			alt: 'History section illustration',
			caption: 'History section - rounded, no border, with shadow',
			rounded: true,
			bordered: false,
			shadow: true
		}
	];

	const controls: SlotStory[] = [
		{
			name: 'preset',
			label: 'Preset',
			type: 'select',
			options: IMAGE_CAPTION_STORY_PRESETS.map((preset) => preset.id),
			defaultValue: IMAGE_CAPTION_STORY_PRESETS[0].id
		}
	];

	function findPreset(id: string) {
		return (
			IMAGE_CAPTION_STORY_PRESETS.find((preset) => preset.id === id) ??
			IMAGE_CAPTION_STORY_PRESETS[0]
		);
	}
</script>

<Story
	id="atoms-image-caption"
	title="Image Caption"
	component={ImageCaption}
	category="Atoms"
	description="Изображение с подписью. Переключайте пресеты, чтобы увидеть готовые сочетания rounded/bordered/shadow на реальных ассетах домена."
	{controls}
>
	{#snippet children(values: any)}
		{@const preset = findPreset(values.preset)}
		<ImageCaption
			imageSrc={preset.src}
			imageAlt={preset.alt}
			caption={preset.caption}
			rounded={preset.rounded}
			bordered={preset.bordered}
			shadow={preset.shadow}
		/>
	{/snippet}
</Story>
