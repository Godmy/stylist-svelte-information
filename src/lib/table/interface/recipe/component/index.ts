import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/theme/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { PlaygroundComponentCatalogViewMode } from '$stylist/table/type/alias/playground-component-catalog-view-mode';
import type { PlaygroundComponentCatalogSortBy } from '$stylist/table/type/alias/playground-component-catalog-sort-by';
import type { ComponentStory } from '$stylist/table/type/object/component-story';
export interface RecipeComponent extends ComputeIntersectAll<[SlotThemeBorder, SlotTypography]> {
	stories: ComponentStory[];
	categories: string[];
	categoryCounts: Record<string, number>;
	tags: string[];
	searchQuery: string;
	selectedCategories: Set<string>;
	selectedTags: Set<string>;
	viewMode: PlaygroundComponentCatalogViewMode;
	sortBy: PlaygroundComponentCatalogSortBy;
	showFilters: boolean;
	stats: {
		total: number;
		filtered: number;
	};
	onSearchQueryChange: (value: string) => void;
	onToggleCategory: (category: string) => void;
	onToggleTag: (tag: string) => void;
	onViewModeChange: (mode: PlaygroundComponentCatalogViewMode) => void;
	onSortByChange: (sortBy: PlaygroundComponentCatalogSortBy) => void;
	onToggleFilters: () => void;
	onClearFilters: () => void;
	onOpenStory: (storyId: string) => void;

	class?: string;
}
