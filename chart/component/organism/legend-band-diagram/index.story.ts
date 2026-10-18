import LegendBandDiagram from './index.svelte';
import type { RecipeLegendBandDiagram } from '$stylist/chart/interface/recipe/legend-band-diagram';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Component composition bands by domain. */
export default {
	component: LegendBandDiagram,
	title: 'LegendBandDiagram',
	description: 'Component composition bands by domain.',
	args: {
		width: 980,
		plotHeight: 220,
		labelAreaHeight: 160,
		color: '#2563eb',
		ariaLabel: 'Legend band diagram story',
		items: [
			{ text: 'ai', atom: 0, molecule: 2, organism: 6, template: 0, page: 0 },
			{ text: 'animation', atom: 8, molecule: 1, organism: 0, template: 0, page: 0 },
			{ text: 'calendar', atom: 4, molecule: 9, organism: 5, template: 1, page: 0 },
			{ text: 'chart', atom: 14, molecule: 10, organism: 8, template: 0, page: 0 },
			{ text: 'control', atom: 18, molecule: 9, organism: 2, template: 0, page: 0 },
			{ text: 'domain', atom: 2, molecule: 7, organism: 12, template: 2, page: 1 },
			{ text: 'layout', atom: 9, molecule: 11, organism: 2, template: 0, page: 0 },
			{ text: 'navigation', atom: 12, molecule: 7, organism: 5, template: 1, page: 0 }
		]
	},
	controls: {
		width: { type: 'number', min: 640, max: 1280, step: 20 },
		plotHeight: { type: 'number', min: 160, max: 320, step: 10 },
		labelAreaHeight: { type: 'number', min: 100, max: 240, step: 10 }
	}
} satisfies ContractStory<RecipeLegendBandDiagram>;
