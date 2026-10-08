<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import WidebandDelphiDiagram from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 980, min: 640, max: 1280, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 420, min: 320, max: 620, step: 20 },
		{ name: 'timeLabelStep', type: 'number', defaultValue: 3, min: 1, max: 6, step: 1 }
	];

	const points = [
		{
			time: 'Jan 26',
			min: 820,
			low: 880,
			consensus: 930,
			high: 990,
			max: 1060,
			market: 960,
			procurement: 910
		},
		{
			time: 'Feb 26',
			min: 835,
			low: 895,
			consensus: 952,
			high: 1018,
			max: 1090,
			market: 980,
			procurement: 925
		},
		{
			time: 'Mar 26',
			min: 850,
			low: 910,
			consensus: 974,
			high: 1046,
			max: 1120,
			market: 1000,
			procurement: 940
		},
		{
			time: 'Apr 26',
			min: 865,
			low: 925,
			consensus: 996,
			high: 1074,
			max: 1150,
			market: 1020,
			procurement: 955
		},
		{
			time: 'May 26',
			min: 858,
			low: 920,
			consensus: 990,
			high: 1066,
			max: 1142,
			market: 1018,
			procurement: 952
		},
		{
			time: 'Jun 26',
			min: 850,
			low: 915,
			consensus: 984,
			high: 1058,
			max: 1134,
			market: 1016,
			procurement: 949
		},
		{
			time: 'Jul 26',
			min: 843,
			low: 910,
			consensus: 978,
			high: 1050,
			max: 1126,
			market: 1014,
			procurement: 946
		},
		{
			time: 'Aug 26',
			min: 835,
			low: 905,
			consensus: 972,
			high: 1042,
			max: 1118,
			market: 1012,
			procurement: 943
		},
		{
			time: 'Sep 26',
			min: 855,
			low: 925,
			consensus: 997,
			high: 1070,
			max: 1158,
			market: 1035,
			procurement: 965
		},
		{
			time: 'Oct 26',
			min: 875,
			low: 945,
			consensus: 1022,
			high: 1098,
			max: 1198,
			market: 1058,
			procurement: 987
		},
		{
			time: 'Nov 26',
			min: 895,
			low: 965,
			consensus: 1047,
			high: 1126,
			max: 1238,
			market: 1081,
			procurement: 1009
		},
		{
			time: 'Dec 26',
			min: 915,
			low: 985,
			consensus: 1072,
			high: 1154,
			max: 1278,
			market: 1104,
			procurement: 1031
		},
		{
			time: 'Jan 27',
			min: 905,
			low: 978,
			consensus: 1064,
			high: 1145,
			max: 1268,
			market: 1096,
			procurement: 1027
		},
		{
			time: 'Feb 27',
			min: 895,
			low: 971,
			consensus: 1056,
			high: 1136,
			max: 1258,
			market: 1088,
			procurement: 1023
		},
		{
			time: 'Mar 27',
			min: 885,
			low: 964,
			consensus: 1048,
			high: 1127,
			max: 1248,
			market: 1080,
			procurement: 1019
		},
		{
			time: 'Apr 27',
			min: 875,
			low: 957,
			consensus: 1040,
			high: 1118,
			max: 1238,
			market: 1072,
			procurement: 1015
		},
		{
			time: 'May 27',
			min: 890,
			low: 970,
			consensus: 1058,
			high: 1140,
			max: 1260,
			market: 1086,
			procurement: 1027
		},
		{
			time: 'Jun 27',
			min: 905,
			low: 983,
			consensus: 1076,
			high: 1162,
			max: 1282,
			market: 1100,
			procurement: 1039
		},
		{
			time: 'Jul 27',
			min: 920,
			low: 996,
			consensus: 1094,
			high: 1184,
			max: 1304,
			market: 1114,
			procurement: 1051
		},
		{
			time: 'Aug 27',
			min: 935,
			low: 1009,
			consensus: 1112,
			high: 1206,
			max: 1326,
			market: 1128,
			procurement: 1063
		},
		{
			time: 'Sep 27',
			min: 930,
			low: 1004,
			consensus: 1106,
			high: 1196,
			max: 1318,
			market: 1120,
			procurement: 1058
		},
		{
			time: 'Oct 27',
			min: 925,
			low: 999,
			consensus: 1100,
			high: 1186,
			max: 1310,
			market: 1112,
			procurement: 1053
		},
		{
			time: 'Nov 27',
			min: 920,
			low: 994,
			consensus: 1094,
			high: 1176,
			max: 1302,
			market: 1104,
			procurement: 1048
		},
		{
			time: 'Dec 27',
			min: 915,
			low: 989,
			consensus: 1088,
			high: 1166,
			max: 1294,
			market: 1096,
			procurement: 1043
		}
	];
</script>

<Story
	title="WidebandDelphiDiagram"
	description="Wideband Delphi forecast for material procurement price."
	{controls}
>
	{#snippet children(values: any)}
		<WidebandDelphiDiagram
			text="Wideband Delphi procurement forecast"
			description="Material purchase price, consensus range, market signal, and procurement target."
			{points}
			width={values.width}
			height={values.height}
			timeLabelStep={values.timeLabelStep}
			currency="$"
		/>
	{/snippet}
</Story>
