<script lang="ts">
	// Render of index.story.ts: the catalog needs Set selections and its required callbacks.
	import ComponentCatalog from '$stylist/table/component/organism/component/index.svelte';
	import type { RecipeComponent } from '$stylist/table/interface/recipe/component';

	let args: Partial<RecipeComponent> = $props();
	const noop = () => {};
</script>

<ComponentCatalog
	{...args}
	stories={args.stories ?? []}
	categories={args.categories ?? []}
	categoryCounts={args.categoryCounts ?? {}}
	tags={args.tags ?? []}
	searchQuery={args.searchQuery ?? ''}
	selectedCategories={new Set()}
	selectedTags={new Set()}
	viewMode={args.viewMode ?? 'grid'}
	sortBy={args.sortBy ?? 'name'}
	showFilters={args.showFilters ?? true}
	stats={args.stats ?? { total: 0, filtered: 0 }}
	onSearchQueryChange={noop}
	onToggleCategory={noop}
	onToggleTag={noop}
	onViewModeChange={noop}
	onSortByChange={noop}
	onToggleFilters={noop}
	onClearFilters={noop}
	onOpenStory={noop}
/>
