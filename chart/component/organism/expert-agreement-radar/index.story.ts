import ExpertAgreementRadar from './index.svelte';
import type { RecipeExpertAgreementRadar } from '$stylist/chart/interface/recipe/expert-agreement-radar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Agreement strength across expert criteria. */
export default {
	component: ExpertAgreementRadar,
	title: 'ExpertAgreementRadar',
	description: 'Agreement strength across expert criteria.',
	args: {
		text: 'Expert agreement radar',
		description: 'Blue shows agreement, amber shows target threshold.',
		width: 520,
		height: 520,
		axes: [
			{ text: 'Price', value: 82, target: 76 },
			{ text: 'Schedule', value: 68, target: 74 },
			{ text: 'Availability', value: 74, target: 72 },
			{ text: 'Quality', value: 88, target: 80 },
			{ text: 'Logistics', value: 61, target: 70 },
			{ text: 'Contract', value: 79, target: 73 }
		]
	},
	controls: {
		width: { type: 'number', min: 360, max: 720, step: 20 },
		height: { type: 'number', min: 360, max: 720, step: 20 }
	}
} satisfies ContractStory<RecipeExpertAgreementRadar>;
