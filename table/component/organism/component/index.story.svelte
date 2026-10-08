<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RecipeComponent from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'viewMode', type: 'select', defaultValue: 'grid', options: ['grid', 'list'] },
		{ name: 'showFilters', type: 'boolean', defaultValue: true }
	];

	const stories = [
		{ id: 'button-story', componentName: 'Button', category: 'Atoms', subcategory: 'button' },
		{ id: 'input-story', componentName: 'Text Field', category: 'Atoms', subcategory: 'input' },
		{ id: 'card-story', componentName: 'Metric Card', category: 'Molecules', subcategory: 'card' },
		{
			id: 'table-story',
			componentName: 'Data Table',
			category: 'Organisms',
			subcategory: 'table'
		}
	];

	const categories = ['Atoms', 'Molecules', 'Organisms'];
	const categoryCounts = { Atoms: 2, Molecules: 1, Organisms: 1 };
	const tags = ['button', 'input', 'card', 'table', 'analytics'];
</script>

<Story
	component={RecipeComponent}
	title="Component Catalog"
	description="Searchable table-domain catalog for browsing component stories by category, tags, and view mode."
	{controls}
>
	{#snippet children(values: any)}
		<RecipeComponent
			{stories}
			{categories}
			{categoryCounts}
			{tags}
			searchQuery=""
			selectedCategories={new Set()}
			selectedTags={new Set()}
			viewMode={values.viewMode}
			sortBy="name"
			showFilters={values.showFilters}
			stats={{ total: stories.length, filtered: stories.length }}
			onSearchQueryChange={() => {}}
			onToggleCategory={() => {}}
			onToggleTag={() => {}}
			onViewModeChange={() => {}}
			onSortByChange={() => {}}
			onToggleFilters={() => {}}
			onClearFilters={() => {}}
			onOpenStory={() => {}}
		/>
	{/snippet}
</Story>
