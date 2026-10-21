import ComponentCatalog from './index.svelte';
import type { RecipeComponent } from '$stylist/table/interface/recipe/component';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { PLAYGROUND_COMPONENT_CATALOG_VIEW_MODE } from '$stylist/table/const/array/playground-component-catalog-view-mode';
import { PLAYGROUND_COMPONENT_CATALOG_SORT_BY } from '$stylist/table/const/array/playground-component-catalog-sort-by';

const stories = [
	{ id: 'button-story', componentName: 'Button', category: 'Atoms', subcategory: 'button' },
	{ id: 'input-story', componentName: 'Text Field', category: 'Atoms', subcategory: 'input' },
	{ id: 'card-story', componentName: 'Metric Card', category: 'Molecules', subcategory: 'card' },
	{ id: 'table-story', componentName: 'Data Table', category: 'Organisms', subcategory: 'table' }
];

/** Component catalog; index.story.svelte supplies the selection sets and the required callbacks. */
export default {
	component: ComponentCatalog,
	title: 'Component Catalog',
	description:
		'Searchable table-domain catalog for browsing component stories by category, tags, and view mode.',
	args: {
		stories,
		categories: ['Atoms', 'Molecules', 'Organisms'],
		categoryCounts: { Atoms: 2, Molecules: 1, Organisms: 1 },
		tags: ['button', 'input', 'card', 'table', 'analytics'],
		searchQuery: '',
		viewMode: 'grid',
		sortBy: 'name',
		showFilters: true,
		stats: { total: stories.length, filtered: stories.length }
	},
	controls: {
		searchQuery: { type: 'text' },
		viewMode: { type: 'select', options: PLAYGROUND_COMPONENT_CATALOG_VIEW_MODE },
		sortBy: { type: 'select', options: PLAYGROUND_COMPONENT_CATALOG_SORT_BY },
		showFilters: { type: 'boolean' }
	},
	presets: { List: { viewMode: 'list' } }
} satisfies ContractStory<RecipeComponent>;
