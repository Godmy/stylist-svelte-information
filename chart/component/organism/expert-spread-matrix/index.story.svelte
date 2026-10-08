<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ExpertSpreadMatrix from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'cellSize', type: 'number', defaultValue: 38, min: 28, max: 54, step: 2 }
	];
	const experts = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Sigma'];
	const periods = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
	const values = experts.flatMap((expert, expertIndex) =>
		periods.map((period, periodIndex) => ({
			expert,
			period,
			value:
				920 +
				expertIndex * 18 +
				periodIndex * 24 +
				(expertIndex === 3 && periodIndex === 4 ? 120 : 0),
			outlier: expertIndex === 3 && periodIndex === 4
		}))
	);
</script>

<Story
	title="ExpertSpreadMatrix"
	description="Expert estimates across forecast periods with outlier highlighting."
	{controls}
>
	{#snippet children(valuesControl: any)}
		<ExpertSpreadMatrix
			text="Expert spread matrix"
			description="Forecast values by expert and period."
			{experts}
			{periods}
			{values}
			cellSize={valuesControl.cellSize}
		/>
	{/snippet}
</Story>
