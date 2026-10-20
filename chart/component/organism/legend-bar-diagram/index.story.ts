import LegendBarDiagram from './index.svelte';
import type { RecipeLegendBarDiagram } from '$stylist/chart/interface/recipe/legend-bar-diagram';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Domain file totals with displaced label cards. */
export default {
	component: LegendBarDiagram,
	title: 'LegendBarDiagram',
	description: 'Domain file totals with displaced label cards.',
	args: {
		width: 980,
		plotHeight: 220,
		labelAreaHeight: 160,
		color: '#2563eb',
		ariaLabel: 'Legend bar diagram story',
		items: [
			['ai', 65],
			['animation', 48],
			['calendar', 118],
			['chart', 156],
			['control', 142],
			['domain', 97],
			['layout', 128],
			['marketing', 86],
			['navigation', 132],
			['table', 72]
		]
	},
	controls: {
		width: { type: 'number', min: 640, max: 1280, step: 20 },
		plotHeight: { type: 'number', min: 160, max: 320, step: 10 },
		labelAreaHeight: { type: 'number', min: 100, max: 240, step: 10 }
	}
} satisfies ContractStory<RecipeLegendBarDiagram>;
