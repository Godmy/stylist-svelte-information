<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import LegendBarDiagram from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 980, min: 640, max: 1280, step: 20 },
		{ name: 'plotHeight', type: 'number', defaultValue: 220, min: 160, max: 320, step: 10 },
		{ name: 'labelAreaHeight', type: 'number', defaultValue: 160, min: 100, max: 240, step: 10 }
	];

	const items: [string, number][] = [
		['ai', 65],
		['animation', 48],
		['calendar', 118],
		['chart', 156],
		['control', 142],
		['domain', 97],
		['layout', 128],
		['marketing', 86],
		['navigation', 132],
		['table', 72]
	];
</script>

<Story
	title="LegendBarDiagram"
	description="Domain file totals with displaced label cards."
	{controls}
>
	{#snippet children(values: any)}
		<LegendBarDiagram
			{items}
			width={values.width}
			plotHeight={values.plotHeight}
			labelAreaHeight={values.labelAreaHeight}
			color="#2563eb"
			ariaLabel="Legend bar diagram story"
		/>
	{/snippet}
</Story>
