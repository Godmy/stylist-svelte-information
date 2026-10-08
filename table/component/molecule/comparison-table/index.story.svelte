<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ComparisonTable from './index.svelte';

	const controls = [
		{
			name: 'showHeader',
			type: 'boolean',
			defaultValue: true,
			description: 'Whether to show the table header'
		},
		{
			name: 'showDescription',
			type: 'boolean',
			defaultValue: false,
			description: 'Whether to show feature descriptions'
		}
	];

	const features = [
		{ id: 'storage', name: 'Storage', description: 'Amount of storage space' },
		{ id: 'ram', name: 'RAM', description: 'Memory capacity' },
		{ id: 'cpu', name: 'CPU', description: 'Processor performance' },
		{ id: 'gpu', name: 'GPU', description: 'Graphics processing unit' },
		{ id: 'os', name: 'Operating System', description: 'Pre-installed OS' },
		{ id: 'warranty', name: 'Warranty', description: 'Standard warranty period' },
		{ id: 'price', name: 'Price', description: 'List price' }
	];

	const products = [
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
	];
</script>

<Story
	{controls}
	title="ComparisonTable Component"
	description="Table component for comparing product features"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<ComparisonTable
				{features}
				{products}
				showHeader={controlValues.showHeader}
				showDescription={controlValues.showDescription}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		overflow-x: auto;
		padding: 1rem;
	}
</style>
