<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RiskImpactMap from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 760, min: 560, max: 1040, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 440, min: 320, max: 620, step: 20 }
	];
	const risks = [
		{ id: 'fx', text: 'FX', probability: 0.74, impact: 0.7, exposure: 92, critical: true },
		{ id: 'freight', text: 'Freight', probability: 0.62, impact: 0.55, exposure: 66 },
		{
			id: 'supplier',
			text: 'Supplier',
			probability: 0.44,
			impact: 0.82,
			exposure: 78,
			critical: true
		},
		{ id: 'quality', text: 'Quality', probability: 0.28, impact: 0.48, exposure: 34 },
		{ id: 'permit', text: 'Permit', probability: 0.36, impact: 0.64, exposure: 48 }
	];
</script>

<Story
	title="RiskImpactMap"
	description="Probability, impact, and exposure map for forecast risks."
	{controls}
>
	{#snippet children(values: any)}
		<RiskImpactMap
			text="Risk impact map"
			description="Bubble size represents exposure."
			{risks}
			width={values.width}
			height={values.height}
		/>
	{/snippet}
</Story>
