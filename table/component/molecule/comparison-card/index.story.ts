import ComparisonCard from '$stylist/table/component/molecule/comparison-card/index.svelte';
import type { RecipeComparisonCard } from '$stylist/table/interface/recipe/comparison-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Columns compared side by side: pros and cons, before and after. */
export default {
	component: ComparisonCard,
	title: 'ComparisonCard',
	description:
		'Card with two or more compared columns; text items or label–value pairs, toned column titles.',
	args: {
		title: '',
		headingLevel: 3,
		columns: [
			{
				title: 'Cons',
				tone: 'negative',
				items: [{ label: 'few restaurants' }, { label: 'hard to get around without transport' }]
			},
			{
				title: 'Pros',
				tone: 'positive',
				items: [
					{ label: 'long and spacious beach' },
					{ label: 'quiet atmosphere' },
					{ label: 'good snorkelling nearby' }
				]
			}
		]
	},
	controls: {
		title: {
			type: 'text',
			label: 'Title',
			description: 'Heading over the columns; empty hides it.'
		},
		headingLevel: {
			type: 'range',
			label: 'Heading level',
			description: 'Level of the title; column titles are one level lower.',
			min: 2,
			max: 5,
			step: 1
		},
		columns: {
			type: 'json',
			label: 'Columns',
			description: 'Title, tone (positive | negative | neutral) and items with label and value.',
			example: [{ title: '', tone: 'neutral', items: [{ label: '', value: '' }] }]
		},
		class: { type: 'text', label: 'Class', description: 'Extra classes on the root element.' }
	},
	presets: {
		'Before and after': {
			title: 'Before vs after',
			columns: [
				{
					title: 'Legacy system',
					tone: 'negative',
					items: [
						{ label: 'Load time', value: '5.2s' },
						{ label: 'Memory usage', value: '240MB' },
						{ label: 'Errors', value: '12/hour' }
					]
				},
				{
					title: 'Optimized system',
					tone: 'positive',
					items: [
						{ label: 'Load time', value: '1.8s' },
						{ label: 'Memory usage', value: '120MB' },
						{ label: 'Errors', value: '2/hour' }
					]
				}
			]
		},
		'Three options': {
			title: 'Where to stay',
			columns: [
				{ title: 'South coast', items: [{ label: 'November to April' }] },
				{ title: 'East coast', items: [{ label: 'May to September' }] },
				{ title: 'North', items: [{ label: 'Quiet, few tourists' }] }
			]
		}
	}
} satisfies ContractStory<RecipeComparisonCard>;
