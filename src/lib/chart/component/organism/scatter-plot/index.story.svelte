<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ScatterPlot from './index.svelte';
	const data = [
		{ id: 'a', x: 12, y: 30, name: 'A', color: '#3b82f6' },
		{ id: 'b', x: 40, y: 70, name: 'B', color: '#10b981' },
		{ id: 'c', x: 70, y: 40, name: 'C', color: '#f59e0b' }
	];
	type Props = { showGrid: boolean; showAxis: boolean; showLabels: boolean };
	const controls: SlotStory[] = [
		{ name: 'showGrid', type: 'boolean', defaultValue: true },
		{ name: 'showAxis', type: 'boolean', defaultValue: true },
		{ name: 'showLabels', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="organisms-scatter-plot"
	title="Organisms / Interaction / Controls / Scatter Plot"
	component={ScatterPlot}
	category="Organisms/Interaction/Controls"
	{controls}
>
	{#snippet children(values: any)}
		{@const typedProps = values as Props}
		<div class="sb-organisms-scatter-plot _c1">
			<ScatterPlot
				{data}
				showGrid={typedProps.showGrid}
				showAxis={typedProps.showAxis}
				showLabels={typedProps.showLabels}
			/>
		</div>
	{/snippet}</Story
>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
