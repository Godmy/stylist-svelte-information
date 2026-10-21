import ComparisonTable from './index.svelte';
import type { RecipeComparisonTable } from '$stylist/table/interface/recipe/comparison-table';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table component for comparing product features. */
export default {
	component: ComparisonTable,
	title: 'ComparisonTable',
	description: 'Table component for comparing product features',
	args: {
		featureColumnLabel: 'Features',
		showHeader: true,
		showDescription: false,
		features: [
			{ id: 'storage', name: 'Storage', description: 'Amount of storage space' },
			{ id: 'ram', name: 'RAM', description: 'Memory capacity' },
			{ id: 'cpu', name: 'CPU', description: 'Processor performance' },
			{ id: 'gpu', name: 'GPU', description: 'Graphics processing unit' },
			{ id: 'os', name: 'Operating System', description: 'Pre-installed OS' },
			{ id: 'warranty', name: 'Warranty', description: 'Standard warranty period' },
			{ id: 'price', name: 'Price', description: 'List price' }
		],
		products: [
			{
				id: 'laptop1',
				name: 'Laptop A',
				description: 'Budget option',
				features: {
					storage: '256GB SSD',
					ram: '8GB',
					cpu: 'Intel i5',
					gpu: 'Integrated',
					os: 'Windows 11',
					warranty: '1 year',
					price: '$799'
				},
				primary: false
			},
			{
				id: 'laptop2',
				name: 'Laptop B',
				description: 'Mid-range option',
				features: {
					storage: '512GB SSD',
					ram: '16GB',
					cpu: 'Intel i7',
					gpu: 'NVIDIA RTX 3050',
					os: 'Windows 11',
					warranty: '2 years',
					price: '$1299'
				},
				primary: true
			},
			{
				id: 'laptop3',
				name: 'Laptop C',
				description: 'Premium option',
				features: {
					storage: '1TB SSD',
					ram: '32GB',
					cpu: 'Intel i9',
					gpu: 'NVIDIA RTX 4070',
					os: 'Windows 11',
					warranty: '3 years',
					price: '$2199'
				},
				primary: false
			}
		]
	},
	controls: {
		featureColumnLabel: { type: 'text' },
		showHeader: { type: 'boolean', description: 'Whether to show the table header' },
		showDescription: { type: 'boolean', description: 'Whether to show feature descriptions' }
	},
	presets: { Descriptions: { showDescription: true } }
} satisfies ContractStory<RecipeComparisonTable>;
