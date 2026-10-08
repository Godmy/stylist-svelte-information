<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ChartName from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'f(x) = x^2 + 2x + 1' },
		{ name: 'fill', type: 'color', defaultValue: '#2563eb' },
		{ name: 'stroke', type: 'color', defaultValue: '#ffffff' },
		{ name: 'strokeWidth', type: 'range', defaultValue: 0, min: 0, max: 4, step: 0.25 }
	];
</script>

<Story
	{controls}
	component={ChartName}
	title="ChartName Component"
	description="Chart title/series name text node"
	tags={['chart', 'name', 'label']}
>
	{#snippet children(values: any)}
		<svg width="460" height="70" class="_c1">
			<ChartName
				text={values.text}
				x={16}
				y={30}
				fill={String(values.fill || '#2563eb')}
				stroke={String(values.stroke || '#ffffff')}
				strokeWidth={Number(values.strokeWidth) || 0}
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
