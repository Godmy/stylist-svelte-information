<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MetricBar from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Completion' },
		{ name: 'percentage', type: 'range', defaultValue: 68, min: 0, max: 100, step: 1 },
		{ name: 'valueLabel', type: 'text', defaultValue: '68%' },
		{ name: 'color', type: 'color', defaultValue: '#2563eb' },
		{ name: 'trackColor', type: 'color', defaultValue: '#e5e7eb' }
	];

	const examples = [
		{ label: 'Design', percentage: 86, valueLabel: '86%', color: '#16a34a' },
		{ label: 'Development', percentage: 64, valueLabel: '64%', color: '#2563eb' },
		{ label: 'Review', percentage: 32, valueLabel: '32%', color: '#d97706' }
	];
</script>

<Story
	id="atoms-metric-bar"
	title="MetricBar"
	component={MetricBar}
	category="Atoms"
	description="Single labeled progress row for compact metrics."
	tags={['metric', 'progress', 'chart']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MetricBar
				text={String(values.text || 'Completion')}
				percentage={Number(values.percentage) || 0}
				valueLabel={String(values.valueLabel || `${Number(values.percentage) || 0}%`)}
				color={String(values.color || '#2563eb')}
				trackColor={String(values.trackColor || '#e5e7eb')}
			/>

			<div class="_c2">
				{#each examples as example}
					<MetricBar
						text={example.label}
						percentage={example.percentage}
						valueLabel={example.valueLabel}
						color={example.color}
					/>
				{/each}
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 1.5rem;
		max-width: 34rem;
	}

	._c2 {
		display: grid;
		gap: 1rem;
	}
</style>
