<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeComponent } from '$stylist/table/interface/recipe/component';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createComponentState } from './state.svelte';
	import type { PlaygroundComponentCatalogSortBy as ComponentSortBy } from '$stylist/table/type/alias/playground-component-catalog-sort-by';
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

	let props: RecipeComponent & HTMLAttributes<HTMLDivElement> = $props();
	const state = createComponentState(() => props);
</script>

<div class="pcc-wrap">
	<div class="pcc-inner">
		<div class="pcc-controls">
			<div class="pcc-top-row">
				<div class="pcc-search-wrap">
					<BaseIcon
						name={Search}
						size={20} style="position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); color: #fb923c"
					/>
					<input
						type="text"
						value={state.searchQuery}
						oninput={(event) =>
							state.onSearchQueryChange((event.currentTarget as HTMLInputElement).value)}
						placeholder="Search components... (try 'button', 'input', 'card')"
						class="pcc-search-input"
					/>
					{#if state.searchQuery}
						<button onclick={() => state.onSearchQueryChange('')} class="pcc-clear-btn">
							<BaseIcon name={X} size={16} />
						</button>
					{/if}
				</div>

				<div class="pcc-view-toggle">
					<button
						onclick={() => state.onViewModeChange('grid')}
						class="pcc-view-btn {state.viewMode === 'grid' ? 'pcc-view-btn--active' : ''}"
						title="Grid view"
					>
						<BaseIcon name={Grid} size={20} />
					</button>
					<button
						onclick={() => state.onViewModeChange('list')}
						class="pcc-view-btn {state.viewMode === 'list' ? 'pcc-view-btn--active' : ''}"
						title="List view"
					>
						<BaseIcon name={List} size={20} />
					</button>
				</div>

				<div class="pcc-sort-wrap">
					<select
						value={state.sortBy}
						onchange={(event) =>
							state.onSortByChange(
								(event.currentTarget as HTMLSelectElement).value as ComponentSortBy
							)}
						class="pcc-sort-select"
						style="color-scheme: light dark;"
					>
						<option value="name">Sort by Name</option>
						<option value="category">Sort by Category</option>
						<option value="recent">Recently Updated</option>
					</select>
					<div class="pcc-sort-icon">
						<BaseIcon name={SortAsc} size={16} style="color: #9ca3af" />
					</div>
				</div>

				<button
					onclick={state.onToggleFilters}
					class="pcc-filter-btn {state.showFilters ? 'pcc-filter-btn--active' : ''}"
					title={state.showFilters ? 'Hide filters' : 'Show filters'}
				>
					<BaseIcon name={Filter} size={20} />
				</button>
			</div>

			{#if state.showFilters}
				<div class="pcc-filter-panel">
					<div>
						<h3 class="pcc-filter-title">Categories</h3>
						<div class="pcc-categories">
							{#each state.categories as category}
								{@const colors = state.getCategoryColor(category)}
								{@const isSelected = state.selectedCategories.has(category)}
								<button
									onclick={() => state.onToggleCategory(category)}
									class="pcc-cat-btn {isSelected
										? 'pcc-cat-btn--active'
										: `${colors.bg} ${colors.text} ${colors.border}`}"
								>
									{category}
									<span class="pcc-cat-count" style="opacity:{isSelected ? 0.9 : 0.7}">
										({state.categoryCounts[category] ?? 0})
									</span>
								</button>
							{/each}
						</div>
					</div>

					<div>
						<h3 class="pcc-filter-title">Tags</h3>
						<div class="pcc-tags">
							{#each state.tags.slice(0, 20) as tag}
								{@const isSelected = state.selectedTags.has(tag)}
								<button
									onclick={() => state.onToggleTag(tag)}
									class="pcc-tag-btn {isSelected ? 'pcc-tag-btn--active' : ''}"
								>
									<BaseIcon name={Tag} size={14} />
									{tag}
								</button>
							{/each}
						</div>
					</div>

					{#if state.hasActiveFilters}
						<div class="pcc-filter-footer">
							<button onclick={state.onClearFilters} class="pcc-clear-all-btn">
								<BaseIcon name={X} size={16} />
								Clear all filters
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<div class="pcc-stats">
			Showing <span class="pcc-stats-highlight">{state.stats.filtered}</span>
			of <span class="pcc-stats-highlight">{state.stats.total}</span> components
		</div>

		{#if state.viewMode === 'grid'}
			<div class="pcc-grid">
				{#each state.stories as story}
					{@const colors = state.getCategoryColor(story.category)}
					<button onclick={() => state.onOpenStory(story.id)} class="pcc-card group">
						<div class="pcc-card-preview {colors.bg} {colors.border} _c1">
							<div class="pcc-card-preview-overlay"></div>
							<BaseIcon
								name={state.getCategoryIcon(story.category)}
								size={64} style="opacity: 0.3; transition: opacity 0.15s"
								class={colors.text}
							/>
							<div class="pcc-preview-label {colors.text}">Preview</div>
						</div>

						<div class="pcc-card-meta">
							<div class="pcc-card-icon-wrap {colors.bg} {colors.border} _c1">
								<BaseIcon
									name={state.getCategoryIcon(story.category)}
									size={20}
									class={colors.text}
								/>
							</div>
							<span class="pcc-cat-badge">{story.category}</span>
						</div>

						<h3 class="pcc-card-title">{story.componentName}</h3>
						<p class="pcc-card-desc">{state.getComponentDescription(story)}</p>

						<div class="pcc-card-tags">
							{#if story.subcategory}
								<div class="pcc-subcat-chip">
									<BaseIcon name={Tag} size={12} />
									<span style="text-transform:capitalize">{story.subcategory}</span>
								</div>
							{/if}
							<div class="pcc-ai-chip">
								<BaseIcon name={Sparkles} size={12} />
								AI-Generated
							</div>
						</div>

						<div class="pcc-card-footer">
							<span class="pcc-svelte-version">Svelte 5</span>
							<div class="pcc-open-link">
								<span>Open</span>
								<BaseIcon
									name={ArrowRight}
									size={16} style="transition: transform 0.15s"
								/>
							</div>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<div class="pcc-list">
				{#each state.stories as story}
					{@const colors = state.getCategoryColor(story.category)}
					<button onclick={() => state.onOpenStory(story.id)} class="pcc-list-card group">
						<div class="pcc-list-icon {colors.bg} {colors.border} _c1">
							<BaseIcon
								name={state.getCategoryIcon(story.category)}
								size={40}
								class={colors.text}
							/>
						</div>

						<div class="pcc-list-info">
							<h3 class="pcc-card-title">{story.componentName}</h3>
							<p class="pcc-card-desc" style="margin-bottom:0.75rem">
								{state.getComponentDescription(story)}
							</p>
							<div class="pcc-card-tags">
								<span class="pcc-cat-badge">{story.category}</span>
								{#if story.subcategory}
									<div class="pcc-subcat-chip">
										<BaseIcon name={Tag} size={12} />
										<span style="text-transform:capitalize">{story.subcategory}</span>
									</div>
								{/if}
								<div class="pcc-ai-chip">
									<BaseIcon name={Sparkles} size={12} />
									AI-Generated
								</div>
								<span style="margin-left:auto;font-size:0.75rem;color:#9ca3af">Svelte 5</span>
							</div>
						</div>

						<div class="pcc-list-arrow">
							<BaseIcon name={ArrowRight} size={32} />
						</div>
					</button>
				{/each}
			</div>
		{/if}

		{#if state.stories.length === 0}
			<div class="pcc-empty">
				<div class="pcc-empty-icon">
					<BaseIcon name={Search} size={48} style="color: #f97316" />
				</div>
				<h3 class="pcc-empty-title">No components found</h3>
				<p class="pcc-empty-text">Try adjusting your search or filters</p>
				<button onclick={state.onClearFilters} class="pcc-empty-btn">Clear all filters</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.pcc-color--atoms-bg {
		background-color: #eff6ff;
	}
	.pcc-color--atoms-text {
		color: #1d4ed8;
	}
	.pcc-color--atoms-border {
		border-color: #bfdbfe;
	}
	.pcc-color--molecules-bg {
		background-color: #faf5ff;
	}
	.pcc-color--molecules-text {
		color: #7e22ce;
	}
	.pcc-color--molecules-border {
		border-color: #e9d5ff;
	}
	.pcc-color--organisms-bg {
		background-color: #f0fdf4;
	}
	.pcc-color--organisms-text {
		color: #15803d;
	}
	.pcc-color--organisms-border {
		border-color: #bbf7d0;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-color--atoms-bg {
			background-color: rgba(30, 58, 138, 0.2);
		}
		.pcc-color--atoms-text {
			color: #93c5fd;
		}
		.pcc-color--atoms-border {
			border-color: #1e40af;
		}
		.pcc-color--molecules-bg {
			background-color: rgba(88, 28, 135, 0.2);
		}
		.pcc-color--molecules-text {
			color: #d8b4fe;
		}
		.pcc-color--molecules-border {
			border-color: #6b21a8;
		}
		.pcc-color--organisms-bg {
			background-color: rgba(20, 83, 45, 0.2);
		}
		.pcc-color--organisms-text {
			color: #86efac;
		}
		.pcc-color--organisms-border {
			border-color: #166534;
		}
	}
	.pcc-wrap {
		min-height: 100vh;
		background: linear-gradient(to bottom right, #f9fafb, white, #f3f4f6);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-wrap {
			background: linear-gradient(to bottom right, #111827, #1f2937, #111827);
		}
	}
	.pcc-inner {
		margin-left: auto;
		margin-right: auto;
		max-width: 112.5rem;
		padding: 2rem 1rem;
	}
	@media (min-width: 640px) {
		.pcc-inner {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
	}
	@media (min-width: 1024px) {
		.pcc-inner {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}
	.pcc-controls {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.pcc-top-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.pcc-search-wrap {
		position: relative;
		flex: 1;
	}
	.pcc-search-input {
		width: 100%;
		border-radius: 0.5rem;
		border: 2px solid #e5e7eb;
		background: white;
		padding: 0.75rem 1rem 0.75rem 3rem;
		color: #111827;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: all 0.15s;
		font-size: 0.875rem;
	}
	.pcc-search-input::placeholder {
		color: #9ca3af;
	}
	.pcc-search-input:focus {
		outline: none;
		border-color: #f97316;
		box-shadow: 0 0 0 2px #fed7aa;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-search-input {
			border-color: #374151;
			background: #1f2937;
			color: white;
		}
		.pcc-search-input:focus {
			border-color: #fb923c;
			box-shadow: 0 0 0 2px rgb(124 45 18 / 0.5);
		}
	}
	.pcc-clear-btn {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		border-radius: 9999px;
		padding: 0.375rem;
		color: #9ca3af;
		transition: all 0.15s;
		background: none;
		border: none;
		cursor: pointer;
	}
	.pcc-clear-btn:hover {
		background: #fee2e2;
		color: #dc2626;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-clear-btn:hover {
			background: rgb(153 27 27 / 0.3);
			color: #f87171;
		}
	}
	.pcc-view-toggle {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 0.5rem;
		border: 2px solid #fed7aa;
		background: linear-gradient(to right, #fff7ed, #fef2f2);
		padding: 0.375rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-view-toggle {
			border-color: #374151;
			background: linear-gradient(to right, #1f2937, #111827);
		}
	}
	.pcc-view-btn {
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
		color: #9ca3af;
		transition: all 0.15s;
		background: none;
		border: none;
		cursor: pointer;
	}
	.pcc-view-btn:hover {
		background: rgb(255 255 255 / 0.5);
		color: #ea580c;
	}
	.pcc-view-btn--active {
		background: linear-gradient(to right, #ea580c, #dc2626);
		color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-view-btn:hover {
			background: rgb(55 65 81 / 0.5);
			color: #fb923c;
		}
	}
	.pcc-sort-wrap {
		position: relative;
	}
	.pcc-sort-select {
		min-width: 11.25rem;
		cursor: pointer;
		appearance: none;
		border-radius: 0.5rem;
		border: 2px solid #e5e7eb;
		background: white;
		padding: 0.75rem 3rem 0.75rem 1rem;
		color: #111827;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: border-color 0.15s;
		font-size: 0.875rem;
	}
	.pcc-sort-select:hover {
		border-color: #fb923c;
	}
	.pcc-sort-select:focus {
		outline: none;
		border-color: #f97316;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-sort-select {
			border-color: #374151;
			background: #1f2937;
			color: white;
		}
		.pcc-sort-select:hover {
			border-color: #f97316;
		}
	}
	.pcc-sort-icon {
		pointer-events: none;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
	}
	.pcc-filter-btn {
		border-radius: 0.5rem;
		border: 2px solid #e5e7eb;
		background: white;
		padding: 0.75rem 1rem;
		color: #6b7280;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: all 0.15s;
		cursor: pointer;
	}
	.pcc-filter-btn:hover {
		border-color: #fb923c;
	}
	.pcc-filter-btn--active {
		border-color: #f97316;
		background: linear-gradient(to right, #ea580c, #dc2626);
		color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-filter-btn {
			border-color: #374151;
			background: #1f2937;
			color: #9ca3af;
		}
		.pcc-filter-btn:hover {
			border-color: #f97316;
		}
	}
	.pcc-filter-panel {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-radius: 0.75rem;
		border: 2px solid #fed7aa;
		background: white;
		padding: 1.5rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-filter-panel {
			border-color: #374151;
			background: #1f2937;
		}
	}
	.pcc-filter-title {
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #111827;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-filter-title {
			color: white;
		}
	}
	.pcc-categories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.pcc-cat-btn {
		border-radius: 0.75rem;
		border: 2px solid;
		padding: 0.625rem 1.25rem;
		font-size: 0.875rem;
		font-weight: 700;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: all 0.15s;
		cursor: pointer;
	}
	.pcc-cat-btn:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	.pcc-cat-btn--active {
		border-color: #f97316;
		background: linear-gradient(to right, #ea580c, #dc2626);
		color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		outline: 4px solid #fed7aa;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-cat-btn--active {
			outline-color: rgb(124 45 18 / 0.5);
		}
	}
	.pcc-cat-count {
		margin-left: 0.5rem;
		font-size: 0.75rem;
	}
	.pcc-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.pcc-tag-btn {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		border-radius: 0.5rem;
		border: 2px solid #d1d5db;
		background: #f3f4f6;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: #374151;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: all 0.15s;
		cursor: pointer;
	}
	.pcc-tag-btn:hover {
		transform: scale(1.05);
		border-color: #a855f7;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	.pcc-tag-btn--active {
		border-color: #a855f7;
		background: linear-gradient(to right, #9333ea, #db2777);
		color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		outline: 4px solid #e9d5ff;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-tag-btn {
			border-color: #4b5563;
			background: #374151;
			color: #d1d5db;
		}
		.pcc-tag-btn:hover {
			border-color: #a855f7;
		}
		.pcc-tag-btn--active {
			outline-color: rgb(88 28 135 / 0.5);
		}
	}
	.pcc-filter-footer {
		border-top: 1px solid #e5e7eb;
		padding-top: 1rem;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-filter-footer {
			border-color: #374151;
		}
	}
	.pcc-clear-all-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.75rem;
		border: 2px solid #f87171;
		background: linear-gradient(to right, #ef4444, #ec4899);
		padding: 0.75rem 1.25rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.15s;
		cursor: pointer;
	}
	.pcc-clear-all-btn:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
	}
	.pcc-stats {
		margin-bottom: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid #f97316;
		background: linear-gradient(to right, #fff7ed, #fef2f2);
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		color: #374151;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-stats {
			background: linear-gradient(to right, #1f2937, #111827);
			color: #d1d5db;
		}
	}
	.pcc-stats-highlight {
		font-weight: 700;
		color: #ea580c;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-stats-highlight {
			color: #fb923c;
		}
	}
	.pcc-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	@media (min-width: 768px) {
		.pcc-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 1024px) {
		.pcc-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	.pcc-card {
		position: relative;
		border-radius: 1rem;
		border: 2px solid #e5e7eb;
		background: white;
		padding: 1.5rem;
		text-align: left;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.15s;
		cursor: pointer;
	}
	.pcc-card:hover {
		transform: translateY(-0.5rem) scale(1.05);
		border-color: #fb923c;
		box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-card {
			border-color: #374151;
			background: #1f2937;
		}
		.pcc-card:hover {
			border-color: #f97316;
		}
	}
	.pcc-card-preview {
		margin-bottom: 1.5rem;
		position: relative;
		height: 8rem;
		width: 100%;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: transform 0.15s;
	}
	.pcc-card:hover .pcc-card-preview {
		transform: scale(1.05);
	}
	.pcc-card-preview-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom right, rgb(255 255 255 / 0.2), transparent);
	}
	.pcc-preview-label {
		position: absolute;
		right: 0.5rem;
		bottom: 0.5rem;
		border-radius: 0.25rem;
		background: rgb(255 255 255 / 0.9);
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-preview-label {
			background: rgb(17 24 39 / 0.9);
		}
	}
	.pcc-card-meta {
		margin-bottom: 0.75rem;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.pcc-card-icon-wrap {
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	.pcc-cat-badge {
		border-radius: 9999px;
		background: #f97316;
		padding: 0.25rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 700;
		color: white;
		text-transform: capitalize;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	.pcc-card-title {
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
		font-weight: 700;
		color: #111827;
		transition: color 0.15s;
	}
	.pcc-card:hover .pcc-card-title {
		color: #ea580c;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-card-title {
			color: white;
		}
		.pcc-card:hover .pcc-card-title {
			color: #fb923c;
		}
	}
	.pcc-card-desc {
		margin-bottom: 1rem;
		font-size: 0.875rem;
		color: #4b5563;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-card-desc {
			color: #9ca3af;
		}
	}
	.pcc-card-tags {
		margin-bottom: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.pcc-subcat-chip {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 0.375rem;
		background: #f3f4f6;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		color: #4b5563;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-subcat-chip {
			background: #374151;
			color: #d1d5db;
		}
	}
	.pcc-ai-chip {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 0.375rem;
		background: #dcfce7;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #15803d;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-ai-chip {
			background: rgb(20 83 45 / 0.3);
			color: #4ade80;
		}
	}
	.pcc-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 2px solid #f3f4f6;
		padding-top: 0.75rem;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-card-footer {
			border-color: #374151;
		}
	}
	.pcc-svelte-version {
		font-size: 0.75rem;
		color: #9ca3af;
	}
	.pcc-open-link {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #ea580c;
		opacity: 0;
		transition: opacity 0.15s;
	}
	.pcc-card:hover .pcc-open-link {
		opacity: 1;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-open-link {
			color: #fb923c;
		}
	}
	.pcc-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.pcc-list-card {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 1.5rem;
		border-radius: 1rem;
		border: 2px solid #e5e7eb;
		background: white;
		padding: 1.5rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.15s;
		cursor: pointer;
		text-align: left;
	}
	.pcc-list-card:hover {
		transform: translateY(-0.25rem) scale(1.02);
		border-color: #fb923c;
		box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-list-card {
			border-color: #374151;
			background: #1f2937;
		}
		.pcc-list-card:hover {
			border-color: #f97316;
		}
	}
	.pcc-list-icon {
		display: flex;
		height: 5rem;
		width: 5rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.15s;
	}
	.pcc-list-card:hover .pcc-list-icon {
		transform: scale(1.1);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	.pcc-list-info {
		flex: 1;
		text-align: left;
	}
	.pcc-list-arrow {
		flex-shrink: 0;
		color: #d1d5db;
		transition: all 0.15s;
	}
	.pcc-list-card:hover .pcc-list-arrow {
		transform: translateX(0.75rem);
		color: #ea580c;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-list-arrow {
			color: #4b5563;
		}
		.pcc-list-card:hover .pcc-list-arrow {
			color: #fb923c;
		}
	}
	.pcc-empty {
		border-radius: 1.5rem;
		border: 2px dashed #fdba74;
		background: linear-gradient(to bottom right, #fff7ed, #fef2f2);
		padding-top: 6rem;
		padding-bottom: 6rem;
		text-align: center;
		box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-empty {
			border-color: #374151;
			background: linear-gradient(to bottom right, #1f2937, #111827);
		}
	}
	.pcc-empty-icon {
		margin-bottom: 2rem;
		display: inline-flex;
		height: 6rem;
		width: 6rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: linear-gradient(to bottom right, #ffedd5, #fce7f3);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	@media (prefers-color-scheme: dark) {
		.pcc-empty-icon {
			background: #374151;
		}
	}
	.pcc-empty-title {
		margin-bottom: 0.75rem;
		font-size: 1.875rem;
		font-weight: 900;
		color: #111827;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-empty-title {
			color: white;
		}
	}
	.pcc-empty-text {
		margin-bottom: 2rem;
		font-size: 1.125rem;
		color: #4b5563;
	}
	@media (prefers-color-scheme: dark) {
		.pcc-empty-text {
			color: #9ca3af;
		}
	}
	.pcc-empty-btn {
		border-radius: 0.75rem;
		background: linear-gradient(to right, #ea580c, #dc2626);
		padding: 1rem 2rem;
		font-weight: 700;
		color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.15s;
		border: none;
		cursor: pointer;
	}
	.pcc-empty-btn:hover {
		transform: scale(1.05);
		box-shadow: 0 25px 50px -12px rgb(249 115 22 / 0.5);
	}

	._c1 {
		border-width: 2px;
		border-style: solid;
	}
</style>
