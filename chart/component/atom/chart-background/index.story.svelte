<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ChartBackground from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 420, min: 240, max: 800, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 220, min: 120, max: 500, step: 20 },
		{ name: 'fill', type: 'text', defaultValue: '#f8fafc' },
		{ name: 'stroke', type: 'text', defaultValue: '#cbd5e1' }
	];
</script>

<Story
	{controls}
	component={ChartBackground}
	title="ChartBackground Component"
	description="Background panel for SVG chart surfaces"
	tags={['chart', 'background']}
>
	{#snippet children(values: any)}
		<svg width={values.width + 10} height={values.height + 10}>
			<g transform="translate(5 5)">
				<ChartBackground
					width={values.width}
					height={values.height}
					fill={values.fill}
					stroke={values.stroke}
				/>
			</g>
		</svg>
	{/snippet}
</Story>
