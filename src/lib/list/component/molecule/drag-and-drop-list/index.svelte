<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import BaseCard from '$stylist/list/component/molecule/base-card/index.svelte';
	import type { RecipeDragAndDropList } from '$stylist/list/interface/recipe/drag-and-drop-list';
	import createDragAndDropListState from './state.svelte';

	const GripVertical = 'grip-vertical';

	let props: RecipeDragAndDropList = $props();
	const state = createDragAndDropListState(() => props);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			items: _items,
			itemClass: _itemClass,
			headerClass: _headerClass,
			bodyClass: _bodyClass,
			onItemsChange: _onItemsChange,
			onItemDragStart: _onItemDragStart,
			onItemDragEnd: _onItemDragEnd,
			disabled: _disabled,
			variant: _variant,
			...rest
		} = props;
		return rest;
	});
</script>

<div
	class={['c-dnd-list', state.hostClass].filter(Boolean).join(' ')}
	data-variant={state.variant ?? 'default'}
	{...restProps}
>
	<div class="c-dnd-list__items">
		{#each state.items as item, index}
			<div
				draggable={!state.disabled}
				role="listitem"
				class={[
					'c-dnd-list__item',
					state.isDragging && state.draggedItem?.id === item.id ? 'c-dnd-list__item--dragging' : '',
					state.draggedOverIndex === index && state.draggedItem && state.draggedItem.id !== item.id
						? 'c-dnd-list__item--over'
						: ''
				]
					.filter(Boolean)
					.join(' ')}
				data-variant={state.variant ?? 'default'}
				ondragstart={(e) => state.handleDragStart(e, item, index)}
				ondragover={(e) => state.handleDragOver(e, index)}
				ondragleave={() => state.handleDragLeave()}
				ondrop={(e) => state.handleDrop(e, index)}
				ondragend={() => state.handleDragEnd(item)}
			>
				{#if state.variant === 'card'}
					<BaseCard
						title={item.title}
						description={item.content}
						class="c-dnd-list__card"
						bodyClass={state.bodyClass}
						headerClass={state.headerClass}
					>
						<div class="c-dnd-list__card-header">
							<div class="c-dnd-list__card-title">
								<span class="c-dnd-list__grip">
									<BaseIcon name={GripVertical} size={16} />
								</span>
								{item.title}
							</div>
							<div class="c-dnd-list__card-actions">
								<!-- Item-specific actions could go here -->
							</div>
						</div>
					</BaseCard>
				{:else}
					<div class="c-dnd-list__simple-item">
						<span class="c-dnd-list__grip">
							<BaseIcon name={GripVertical} size={16} />
						</span>
						<span class={['c-dnd-list__label', state.bodyClass].filter(Boolean).join(' ')}>
							{item.title}
						</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.c-dnd-list {
		display: block;
		min-width: 0;
	}

	.c-dnd-list__items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.c-dnd-list__item {
		position: relative;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		opacity: 1;
		transition: opacity var(--duration-120, 120ms);
	}

	.c-dnd-list__item[data-variant='card'] {
		background: var(--color-background-primary);
	}

	.c-dnd-list__item--dragging {
		opacity: var(--opacity-50, 0.5);
	}

	.c-dnd-list__item--over {
		border-top: 2px solid var(--color-primary-500);
		border-color: var(--color-primary-500);
	}

	.c-dnd-list__card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-width: 0;
	}

	.c-dnd-list__card-title {
		display: flex;
		align-items: center;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.c-dnd-list__card-actions {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.c-dnd-list__grip {
		display: inline-flex;
		align-items: center;
		margin-right: 0.5rem;
		cursor: move;
		color: var(--color-text-tertiary);
	}

	.c-dnd-list__simple-item {
		display: flex;
		align-items: center;
		min-width: 0;
		padding: 0.75rem;
	}

	.c-dnd-list__label {
		flex: 1;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	:global(.c-dnd-list__card) {
		border: none;
		box-shadow: none;
	}
</style>
