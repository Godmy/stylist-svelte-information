import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeComponent } from '$stylist/table/interface/recipe/component';
import type { ComponentStory } from '$stylist/table/type/object/component-story';
const Search = 'search';
const Filter = 'filter';
const Grid = 'grid';
const List = 'list';
const SortAsc = 'sort-asc';
const X = 'x';
const Tag = 'tag';
const Code = 'code';
const Layers = 'layers';
const Package = 'package';
const ArrowRight = 'arrow-right';
const Sparkles = 'sparkles';

export function createComponentState(getProps: () => RecipeComponent & HTMLAttributes<HTMLDivElement>) {
	const props = $derived(getProps());
	const stories = $derived(props.stories);
	const categories = $derived(props.categories);
	const categoryCounts = $derived(props.categoryCounts);
	const tags = $derived(props.tags);
	const searchQuery = $derived(props.searchQuery);
	const selectedCategories = $derived(props.selectedCategories);
	const selectedTags = $derived(props.selectedTags);
	const viewMode = $derived(props.viewMode);
	const sortBy = $derived(props.sortBy);
	const showFilters = $derived(props.showFilters);
	const stats = $derived(props.stats);
	const onSearchQueryChange = $derived(props.onSearchQueryChange);
	const onToggleCategory = $derived(props.onToggleCategory);
	const onToggleTag = $derived(props.onToggleTag);
	const onViewModeChange = $derived(props.onViewModeChange);
	const onSortByChange = $derived(props.onSortByChange);
	const onToggleFilters = $derived(props.onToggleFilters);
	const onClearFilters = $derived(props.onClearFilters);
	const onOpenStory = $derived(props.onOpenStory);

	const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
		atoms: {
			bg: 'pcc-color--atoms-bg',
			text: 'pcc-color--atoms-text',
			border: 'pcc-color--atoms-border'
		},
		molecules: {
			bg: 'pcc-color--molecules-bg',
			text: 'pcc-color--molecules-text',
			border: 'pcc-color--molecules-border'
		},
		organisms: {
			bg: 'pcc-color--organisms-bg',
			text: 'pcc-color--organisms-text',
			border: 'pcc-color--organisms-border'
		}
	};

	function getCategoryColor(category: string) {
		return categoryColors[category.toLowerCase()] || categoryColors.atoms;
	}

	function getCategoryIcon(category: string) {
		const cat = category.toLowerCase();
		if (cat === 'atoms') return Code;
		if (cat === 'molecules') return Layers;
		if (cat === 'organisms') return Package;
		return Sparkles;
	}

	function getComponentDescription(story: ComponentStory) {
		const category = story.category.toLowerCase();
		const subcategory = story.subcategory || '';

		if (subcategory.includes('button')) return 'Interactive button component with variants';
		if (subcategory.includes('input')) return 'Form input with validation';
		if (subcategory.includes('card')) return 'Flexible card container';
		if (subcategory.includes('modal')) return 'Modal dialog overlay';
		if (subcategory.includes('toggle')) return 'Toggle switch control';
		if (subcategory.includes('select')) return 'Dropdown selection';
		if (subcategory.includes('slider')) return 'Range slider control';
		if (subcategory.includes('table')) return 'Structured data table with rows and controls';

		if (category === 'atoms') return 'Basic UI building block';
		if (category === 'molecules') return 'Composite UI component';
		if (category === 'organisms') return 'Complex UI section';

		return 'Svelte 5 component';
	}

	const hasActiveFilters = $derived(
		selectedCategories.size > 0 || selectedTags.size > 0 || !!searchQuery
	);

	return {
		get stories() {
			return stories;
		},
		get categories() {
			return categories;
		},
		get categoryCounts() {
			return categoryCounts;
		},
		get tags() {
			return tags;
		},
		get searchQuery() {
			return searchQuery;
		},
		get selectedCategories() {
			return selectedCategories;
		},
		get selectedTags() {
			return selectedTags;
		},
		get viewMode() {
			return viewMode;
		},
		get sortBy() {
			return sortBy;
		},
		get showFilters() {
			return showFilters;
		},
		get stats() {
			return stats;
		},
		get hasActiveFilters() {
			return hasActiveFilters;
		},
		getCategoryColor,
		getCategoryIcon,
		getComponentDescription,
		get onSearchQueryChange() {
			return onSearchQueryChange;
		},
		get onToggleCategory() {
			return onToggleCategory;
		},
		get onToggleTag() {
			return onToggleTag;
		},
		get onViewModeChange() {
			return onViewModeChange;
		},
		get onSortByChange() {
			return onSortByChange;
		},
		get onToggleFilters() {
			return onToggleFilters;
		},
		get onClearFilters() {
			return onClearFilters;
		},
		get onOpenStory() {
			return onOpenStory;
		}
	};
}
