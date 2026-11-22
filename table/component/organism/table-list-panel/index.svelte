<script lang="ts">
	import type { RecipeTableListPanel } from '$stylist/table/interface/recipe/table-list-panel';
	import createTableListPanelState from '$stylist/table/component/organism/table-list-panel/state.svelte';
	let props: RecipeTableListPanel = $props();
	const state = createTableListPanelState(() => props);
</script>

<div class="c-table-list-panel {props.class ?? ''}">
	<div class="c-table-list-panel__header">
		{#if props.showMetadata !== false}<div class="c-table-list-panel__meta">
				<div class="c-table-list-panel__icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><ellipse cx="12" cy="5" rx="9" ry="3" /><path
							d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
						/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg
					>
				</div>
				<div>
					<h2 class="c-table-list-panel__title">{state.t('title')}</h2>
					<p class="c-table-list-panel__count">
						{state.t('tables', { count: props.items.length })}
					</p>
				</div>
			</div>
		{/if}
		<div class="c-table-list-panel__search">
			<span class="c-table-list-panel__search-icon"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg
				></span
			>
			<input
				type="text"
				bind:value={state.searchQuery}
				placeholder={state.t('search')}
				aria-label={state.t('search')}
				class="c-table-list-panel__search-input"
			/>
		</div>
	</div>

	<div class="c-table-list-panel__body">
		{#if state.filteredItems.length === 0}
			<div class="c-table-list-panel__empty">
				<p>{state.t('empty')}</p>
			</div>
		{:else}
			{#each state.sections as group (group.label)}
				<div class="c-table-list-panel__group">
					{#if group.label}<h3 class="c-table-list-panel__group-title">{group.label}</h3>{/if}
					<div class="c-table-list-panel__items">
						{#each group.items as item (item.name)}
							<button
								type="button"
								onclick={() => props.onSelect(item.name)}
								ondblclick={() => props.onOpen?.(item.name)}
								onkeydown={(event) => state.openWithKeyboard(event, item.name)}
								aria-current={props.selectedName === item.name ? 'true' : undefined}
								class="c-table-list-panel__item {props.selectedName === item.name
									? 'c-table-list-panel__item--active'
									: ''}"
							>
								<div class="c-table-list-panel__item-left">
									<div class="c-table-list-panel__item-row">
										<span class="c-table-list-panel__item-name">{item.name}</span>
										{#if item.hasSoftDelete}
											<span class="c-table-list-panel__item-badge">{state.t('softDelete')}</span>
										{/if}
									</div>
									<p class="c-table-list-panel__item-count">
										{state.t('rows', { count: item.rowCount })}
									</p>
								</div>
								{#if props.selectedName === item.name}
									<div class="c-table-list-panel__item-dot"></div>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.c-table-list-panel__group + .c-table-list-panel__group {
		margin-top: 1rem;
	}
	.c-table-list-panel__group-title {
		margin: 0;
		padding: 0.6rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.5;
		color: var(--color-text-secondary, #6b7280);
	}

	.c-table-list-panel {
		box-sizing: border-box;
		min-width: 0;
		display: flex;
		flex-direction: column;
		min-height: 0;
		height: 100%;
		background: var(--color-background-primary, #fff);
		border-radius: var(--radius-3, 0.75rem);
		border: 1px solid var(--color-border-primary, #e5e7eb);
		box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
		overflow: hidden;
	}
	.c-table-list-panel__header {
		flex-shrink: 0;
		border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
		padding: 1rem;
	}
	.c-table-list-panel__meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}
	.c-table-list-panel__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-1-5, 0.375rem);
		background: var(--color-primary-50, #eef2ff);
		color: var(--color-primary-600, #4f46e5);
		flex-shrink: 0;
	}
	.c-table-list-panel__title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-primary, #111827);
		margin: 0;
	}
	.c-table-list-panel__count {
		font-size: 0.75rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0;
	}
	.c-table-list-panel__search {
		position: relative;
	}
	.c-table-list-panel__search-icon {
		position: absolute;
		left: 0.625rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-tertiary, #9ca3af);
		display: flex;
		pointer-events: none;
	}
	.c-table-list-panel__search-input {
		width: 100%;
		border: 1px solid var(--color-border-primary, #d1d5db);
		border-radius: var(--radius-1-5, 0.375rem);
		padding: 0.4rem 0.75rem 0.4rem 2rem;
		font-size: 0.875rem;
		color: var(--color-text-primary, #111827);
		background: var(--color-background-primary, #fff);
		box-sizing: border-box;
	}
	.c-table-list-panel__search-input:focus {
		outline: none;
		border-color: var(--color-primary-500, #6366f1);
		box-shadow: 0 0 0 2px rgb(99 102 241 / 0.15);
	}
	.c-table-list-panel__body {
		min-height: 0;
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}
	.c-table-list-panel__empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font-size: 0.875rem;
		color: var(--color-text-secondary, #6b7280);
	}
	.c-table-list-panel__items {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}
	.c-table-list-panel__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-1-5, 0.375rem);
		border: none;
		background: transparent;
		text-align: left;
		cursor: pointer;
		color: var(--color-text-secondary, #374151);
		transition: background 0.12s;
	}
	.c-table-list-panel__item:hover {
		background: var(--color-background-secondary, #f9fafb);
	}
	.c-table-list-panel__item--active {
		background: var(--color-primary-50, #eef2ff);
		color: var(--color-primary-900, #1e1b4b);
		box-shadow: 0 0 0 1px var(--color-primary-200, #c7d2fe);
	}
	.c-table-list-panel__item-left {
		flex: 1;
	}
	.c-table-list-panel__item-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.c-table-list-panel__item-name {
		font-size: 0.875rem;
		font-weight: 500;
	}
	.c-table-list-panel__item-badge {
		font-size: 0.6875rem;
		font-weight: 500;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		background: #dcfce7;
		color: #15803d;
	}
	.c-table-list-panel__item-count {
		margin: 0.125rem 0 0;
		font-size: 0.75rem;
		color: var(--color-text-tertiary, #9ca3af);
	}
	.c-table-list-panel__item-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--color-primary-600, #4f46e5);
		flex-shrink: 0;
	}
</style>
