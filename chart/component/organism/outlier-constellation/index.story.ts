import OutlierConstellation from './index.svelte';
import type { RecipeOutlierConstellation } from '$stylist/chart/interface/recipe/outlier-constellation';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Expert estimates around consensus with outliers emphasized. */
export default {
	component: OutlierConstellation,
	title: 'OutlierConstellation',
	description: 'Expert estimates around consensus with outliers emphasized.',
	args: {
		text: 'Outlier constellation',
		description: 'Distance from center shows deviation from consensus.',
		width: 760,
		height: 440,
		points: [
			{ id: 'a', text: 'Alpha', x: -0.18, y: 0.12, confidence: 0.82 },
			{ id: 'b', text: 'Beta', x: 0.08, y: -0.14, confidence: 0.68 },
			{ id: 'c', text: 'Gamma', x: 0.22, y: 0.18, confidence: 0.76 },
			{ id: 'd', text: 'Delta', x: -0.12, y: -0.22, confidence: 0.61 },
			{ id: 'e', text: 'Sigma', x: 0.72, y: 0.62, confidence: 0.88, outlier: true },
			{ id: 'f', text: 'Omega', x: -0.66, y: 0.52, confidence: 0.58, outlier: true }
		]
	},
	controls: {
		width: { type: 'number', min: 560, max: 1040, step: 20 },
		height: { type: 'number', min: 320, max: 620, step: 20 }
	}
} satisfies ContractStory<RecipeOutlierConstellation>;
