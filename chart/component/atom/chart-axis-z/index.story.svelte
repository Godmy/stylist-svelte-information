<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ChartAxisZ from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Z Axis' },
		{ name: 'color', type: 'color', defaultValue: '#64748b' },
		{ name: 'tickCount', type: 'number', defaultValue: 3, min: 0, max: 12, step: 1 },
		{ name: 'showArrow', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	{controls}
	component={ChartAxisZ}
	title="ChartAxisZ Component"
	description="Diagonal Z-axis projection for pseudo 3D charts"
	tags={['chart', 'axis', 'z']}
>
	{#snippet children(values: any)}
		<svg width="220" height="220" class="_c1">
			<ChartAxisZ
				startX={40}
				startY={180}
				endX={150}
				endY={60}
				tickCount={values.tickCount}
				label={values.label}
				showArrow={values.showArrow}
				color={values.color}
			/>
		</svg>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
	}
</style>
