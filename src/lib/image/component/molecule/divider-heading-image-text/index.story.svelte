<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import DividerHeadingImageText from './index.svelte';

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

	const controls: SlotStory[] = [
		{ name: 'dividerLabel', label: 'Divider label', type: 'text', defaultValue: 'Definition' },
		{
			name: 'dividerAlign',
			label: 'Divider text align',
			type: 'select',
			options: ['left', 'center', 'right'],
			defaultValue: 'left'
		},
		{
			name: 'text',
			type: 'text',
			defaultValue: 'Expert consensus without pretending uncertainty disappeared'
		},
		{
			name: 'body',
			type: 'text',
			defaultValue:
				'The section explains the concept in direct language, with enough detail to make the offer concrete.'
		},
		{
			name: 'assetId',
			label: 'Preset image',
			type: 'select',
			options: IMAGE_STORY_GALLERY.map((asset) => asset.id),
			defaultValue: DEFAULT_ASSET_ID
		}
	];

	function findAsset(id: string) {
		return IMAGE_STORY_GALLERY.find((asset) => asset.id === id) ?? IMAGE_STORY_GALLERY[0];
	}
</script>

<Story
	id="molecules-divider-heading-image-text"
	title="Divider Heading Image Text"
	component={DividerHeadingImageText}
	category="Molecules"
	description="Three text slots only: a labelled divider, a 1:1 heading/image block, and one full-width text block below."
	{controls}
>
	{#snippet children(values: any)}
		{@const active = findAsset(values.assetId)}
		<DividerHeadingImageText
			ariaLabel={values.text}
			dividerLabel={values.dividerLabel}
			dividerAlign={values.dividerAlign}
			text={values.text}
			body={values.body}
			imageSrc={active.src}
			imageAlt={active.label}
		/>
	{/snippet}
</Story>
