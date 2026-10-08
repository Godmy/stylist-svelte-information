<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	const GripVertical = 'grip-vertical';
	const MoreHorizontal = 'more-horizontal';

	import type { RecipeSortableList } from '$stylist/list/interface/recipe/sortable-list';
	import createSortableListState from './state.svelte';

	let {
		items = [],
		class: className = '',
		onItemsChange,
		onItemAction,
		disabled = false,
		showHandle = true,
		showActions = true,
		variant = 'card',
		...restProps
	}: RecipeSortableList = $props();

	const state = createSortableListState({
		items,
		class: className,
		onItemsChange,
		onItemAction,
		disabled,
		showHandle,
		showActions,
		variant,
		...restProps
	});
</script>

<div class={state.rootClass} {...restProps}>
	<div class="c-sortable-list__items" role="list">
		{#each items as item, index}
			<div
				class="c-sortable-list__item"
				data-variant={variant}
				data-over={state.overIndex === index || undefined}
				role="listitem"
				draggable={!disabled}
				ondragstart={() => state.start(item)}
				ondragover={(e) => {
					e.preventDefault();
					state.handleDragOver(index);
				}}
				ondrop={() => state.drop(index)}
				ondragend={() => state.endDrag()}
			>
				<div class="c-sortable-list__item-inner">
					<div class="c-sortable-list__item-left">
						{#if showHandle}
							<BaseIcon name={GripVertical} size={16} />
						{/if}
						<div class="c-sortable-list__item-content">
							<div class="c-sortable-list__item-title">{item.title}</div>
							{#if item.description}
								<div class="c-sortable-list__item-desc">{item.description}</div>
							{/if}
						</div>
					</div>
					{#if showActions}
						<button
							type="button"
							class="c-sortable-list__item-action"
							onclick={() => onItemAction?.(item, 'menu')}
						>
							<BaseIcon name={MoreHorizontal} size={16} />
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.c-sortable-list__items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.c-sortable-list__item {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		transition: border-color var(--duration-120, 120ms);
		cursor: grab;
	}
	.c-sortable-list__item[data-over] {
		border-color: var(--color-primary-500);
	}
	.c-sortable-list__item[data-variant='compact'] {
		padding: 0.5rem;
	}
	.c-sortable-list__item:not([data-variant='compact']) {
		padding: 0.75rem;
	}
	.c-sortable-list__item-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		min-width: 0;
	}
	.c-sortable-list__item-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
	}
	.c-sortable-list__item-content {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.c-sortable-list__item-title {
		overflow-wrap: anywhere;
		font-size: 0.875rem;
		font-weight: 500;
	}
	.c-sortable-list__item-desc {
		overflow-wrap: anywhere;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
	.c-sortable-list__item-action {
		background: none;
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		border-radius: 0.25rem;
		color: var(--color-text-secondary);
	}
	.c-sortable-list__item-action:hover {
		background: var(--color-background-secondary);
	}
</style>
