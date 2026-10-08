<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import PieChart from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 260, min: 180, max: 420, step: 10 },
		{ name: 'height', type: 'number', defaultValue: 260, min: 180, max: 420, step: 10 }
	];

	const data = [
		{ label: 'Desktop', value: 52 },
		{ label: 'Mobile', value: 34 },
		{ label: 'Tablet', value: 14 }
	];
</script>

<Story
	component={PieChart}
	title="PieChart"
	description="Simple pie chart with legend list."
	{controls}
>
	{#snippet children(values: any)}
		<PieChart {data} width={values.width} height={values.height} />
	{/snippet}
</Story>
