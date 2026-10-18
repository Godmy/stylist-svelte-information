import RiskImpactMap from './index.svelte';
import type { RecipeRiskImpactMap } from '$stylist/chart/interface/recipe/risk-impact-map';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Probability, impact, and exposure map for forecast risks. */
export default {
	component: RiskImpactMap,
	title: 'RiskImpactMap',
	description: 'Probability, impact, and exposure map for forecast risks.',
	args: {
		text: 'Risk impact map',
		description: 'Bubble size represents exposure.',
		width: 760,
		height: 440,
		risks: [
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
		]
	},
	controls: {
		width: { type: 'number', min: 560, max: 1040, step: 20 },
		height: { type: 'number', min: 320, max: 620, step: 20 }
	}
} satisfies ContractStory<RecipeRiskImpactMap>;
