<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ExchangeOracleForecast from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 1040, min: 760, max: 1320, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 440, min: 320, max: 620, step: 20 },
		{ name: 'timeLabelStep', type: 'number', defaultValue: 3, min: 1, max: 6, step: 1 }
	];
	const history = [
		{ time: 'Jan', value: 920 },
		{ time: 'Feb', value: 948 },
		{ time: 'Mar', value: 982 },
		{ time: 'Apr', value: 960 },
		{ time: 'May', value: 1012 },
		{ time: 'Jun', value: 1046 },
		{ time: 'Jul', value: 1028 },
		{ time: 'Aug', value: 1084 },
		{ time: 'Sep', value: 1118 },
		{ time: 'Oct', value: 1096 },
		{ time: 'Nov', value: 1140 },
		{ time: 'Dec', value: 1168 }
	];
	const forecast = [
		{ time: 'Jan+', min: 1085, low: 1140, consensus: 1190, high: 1250, max: 1320 },
		{ time: 'Feb+', min: 1060, low: 1128, consensus: 1208, high: 1280, max: 1370 },
		{ time: 'Mar+', min: 1045, low: 1120, consensus: 1220, high: 1308, max: 1410 },
		{ time: 'Apr+', min: 1030, low: 1110, consensus: 1212, high: 1316, max: 1440 },
		{ time: 'May+', min: 1015, low: 1096, consensus: 1198, high: 1305, max: 1435 },
		{ time: 'Jun+', min: 1000, low: 1088, consensus: 1184, high: 1288, max: 1420 }
	];
</script>

<Story
	title="ExchangeOracleForecast"
	description="Exchange quote history stops, then wideband oracle forecast continues."
	{controls}
>
	{#snippet children(values: any)}
		<ExchangeOracleForecast
			text="Exchange quote to wideband oracle"
			description="Market quotation stops at the split; expert corridor continues the forecast."
			{history}
			{forecast}
			width={values.width}
			height={values.height}
			timeLabelStep={values.timeLabelStep}
			currency="$"
		/>
	{/snippet}
</Story>
