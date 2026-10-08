<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import LegendBandDiagram from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 980, min: 640, max: 1280, step: 20 },
		{ name: 'plotHeight', type: 'number', defaultValue: 220, min: 160, max: 320, step: 10 },
		{ name: 'labelAreaHeight', type: 'number', defaultValue: 160, min: 100, max: 240, step: 10 }
	];

	const items = [
		{ text: 'ai', atom: 0, molecule: 2, organism: 6, template: 0, page: 0 },
		{ text: 'animation', atom: 8, molecule: 1, organism: 0, template: 0, page: 0 },
		{ text: 'calendar', atom: 4, molecule: 9, organism: 5, template: 1, page: 0 },
		{ text: 'chart', atom: 14, molecule: 10, organism: 8, template: 0, page: 0 },
		{ text: 'control', atom: 18, molecule: 9, organism: 2, template: 0, page: 0 },
		{ text: 'domain', atom: 2, molecule: 7, organism: 12, template: 2, page: 1 },
		{ text: 'layout', atom: 9, molecule: 11, organism: 2, template: 0, page: 0 },
		{ text: 'navigation', atom: 12, molecule: 7, organism: 5, template: 1, page: 0 }
	];
</script>

<Story title="LegendBandDiagram" description="Component composition bands by domain." {controls}>
	{#snippet children(values: any)}
		<LegendBandDiagram
			{items}
			width={values.width}
			plotHeight={values.plotHeight}
			labelAreaHeight={values.labelAreaHeight}
			color="#2563eb"
			ariaLabel="Legend band diagram story"
		/>
	{/snippet}
</Story>
