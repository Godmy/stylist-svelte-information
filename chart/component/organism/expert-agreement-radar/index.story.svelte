<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ExpertAgreementRadar from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 520, min: 360, max: 720, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 520, min: 360, max: 720, step: 20 }
	];
	const axes = [
		{ text: 'Price', value: 82, target: 76 },
		{ text: 'Schedule', value: 68, target: 74 },
		{ text: 'Availability', value: 74, target: 72 },
		{ text: 'Quality', value: 88, target: 80 },
		{ text: 'Logistics', value: 61, target: 70 },
		{ text: 'Contract', value: 79, target: 73 }
	];
</script>

<Story
	title="ExpertAgreementRadar"
	description="Agreement strength across expert criteria."
	{controls}
>
	{#snippet children(values: any)}
		<ExpertAgreementRadar
			text="Expert agreement radar"
			description="Blue shows agreement, amber shows target threshold."
			{axes}
			width={values.width}
			height={values.height}
		/>
	{/snippet}
</Story>
