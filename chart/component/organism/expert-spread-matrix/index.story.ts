import ExpertSpreadMatrix from './index.svelte';
import type { RecipeExpertSpreadMatrix } from '$stylist/chart/interface/recipe/expert-spread-matrix';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Expert estimates by period; values are 920 + expert * 18 + period * 24, with one outlier. */
export default {
	component: ExpertSpreadMatrix,
	title: 'ExpertSpreadMatrix',
	description: 'Expert estimates across forecast periods with outlier highlighting.',
	args: {
		text: 'Expert spread matrix',
		description: 'Forecast values by expert and period.',
		cellSize: 38,
		experts: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Sigma'],
		periods: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
		values: [
			{ expert: 'Alpha', period: 'Q1', value: 920 },
			{ expert: 'Alpha', period: 'Q2', value: 944 },
			{ expert: 'Alpha', period: 'Q3', value: 968 },
			{ expert: 'Alpha', period: 'Q4', value: 992 },
			{ expert: 'Alpha', period: 'Q5', value: 1016 },
			{ expert: 'Alpha', period: 'Q6', value: 1040 },
			{ expert: 'Beta', period: 'Q1', value: 938 },
			{ expert: 'Beta', period: 'Q2', value: 962 },
			{ expert: 'Beta', period: 'Q3', value: 986 },
			{ expert: 'Beta', period: 'Q4', value: 1010 },
			{ expert: 'Beta', period: 'Q5', value: 1034 },
			{ expert: 'Beta', period: 'Q6', value: 1058 },
			{ expert: 'Gamma', period: 'Q1', value: 956 },
			{ expert: 'Gamma', period: 'Q2', value: 980 },
			{ expert: 'Gamma', period: 'Q3', value: 1004 },
			{ expert: 'Gamma', period: 'Q4', value: 1028 },
			{ expert: 'Gamma', period: 'Q5', value: 1052 },
			{ expert: 'Gamma', period: 'Q6', value: 1076 },
			{ expert: 'Delta', period: 'Q1', value: 974 },
			{ expert: 'Delta', period: 'Q2', value: 998 },
			{ expert: 'Delta', period: 'Q3', value: 1022 },
			{ expert: 'Delta', period: 'Q4', value: 1046 },
			{ expert: 'Delta', period: 'Q5', value: 1190, outlier: true },
			{ expert: 'Delta', period: 'Q6', value: 1094 },
			{ expert: 'Sigma', period: 'Q1', value: 992 },
			{ expert: 'Sigma', period: 'Q2', value: 1016 },
			{ expert: 'Sigma', period: 'Q3', value: 1040 },
			{ expert: 'Sigma', period: 'Q4', value: 1064 },
			{ expert: 'Sigma', period: 'Q5', value: 1088 },
			{ expert: 'Sigma', period: 'Q6', value: 1112 }
		]
	},
	controls: {
		cellSize: { type: 'number', min: 28, max: 54, step: 2 }
	}
} satisfies ContractStory<RecipeExpertSpreadMatrix>;
