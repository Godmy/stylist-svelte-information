import RangeBarsChart from '$stylist/chart/component/molecule/range-bars-chart/index.svelte';
import type { RecipeRangeBarsChart } from '$stylist/chart/interface/recipe/range-bars-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Range chart; the legacy per-range sliders became static items plus a preset. */
export default {
	component: RangeBarsChart,
	title: 'RangeBarsChart',
	description: 'Generic range chart renderer with start, marker, and end positions.',
	args: {
		scaleMinLabel: '0d',
		scaleMaxLabel: '100d',
		labelWidth: '8rem',
		valueWidth: '6rem',
		items: [
			{
				id: 'a',
				label: 'Integration',
				startPercent: 10,
				markerPercent: 42,
				endPercent: 75,
				valueLabel: '10-42-75d'
			},
			{
				id: 'b',
				label: 'Migration',
				startPercent: 25,
				markerPercent: 54,
				endPercent: 90,
				valueLabel: '25-54-90d'
			}
		]
	},
	controls: {
		scaleMinLabel: { type: 'text' },
		scaleMaxLabel: { type: 'text' },
		labelWidth: { type: 'text' },
		valueWidth: { type: 'text' }
	},
	presets: {
		'Narrow ranges': {
			items: [
				{
					id: 'a',
					label: 'Integration',
					startPercent: 30,
					markerPercent: 38,
					endPercent: 45,
					valueLabel: '30-38-45d'
				},
				{
					id: 'b',
					label: 'Migration',
					startPercent: 60,
					markerPercent: 66,
					endPercent: 72,
					valueLabel: '60-66-72d'
				}
			]
		}
	}
} satisfies ContractStory<RecipeRangeBarsChart>;
