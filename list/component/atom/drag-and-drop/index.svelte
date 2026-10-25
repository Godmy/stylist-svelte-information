<script lang="ts">
	import type { RecipeDragAndDrop } from '$stylist/list/interface/recipe/drag-and-drop';
	import createDragAndDropState from '$stylist/list/component/atom/drag-and-drop/state.svelte';

	let props: RecipeDragAndDrop = $props();
	const state = createDragAndDropState(() => props);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				draggable,
				dropzone,
				dragData,
				onDragStart,
				onDrag,
				onDragEnd,
				onDragEnter,
				onDragLeave,
				onDragOver,
				onDrop,
				disabled,
				variant,
				showDragHandle,
				dragPreview,
				dragCursor,
				...rest
			} = props;
			return rest;
		})()
	);

	function handleDragStart(event: DragEvent) {
		if (state.disabled || !state.draggable) return;
		state.startDragging();
		state.attachPreview(event);
		if (props.dragData) {
			event.dataTransfer?.setData('application/json', JSON.stringify(props.dragData));
		}
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
		}
		props.onDragStart?.(event);
	}

	function handleDrag(event: DragEvent) {
		if (state.disabled) return;
		props.onDrag?.(event);
	}

	function handleDragEnd(event: DragEvent) {
		state.stopDragging();
		props.onDragEnd?.(event);
	}

	function handleDragEnter(event: DragEvent) {
		if (state.disabled || !state.dropzone) return;
		event.preventDefault();
		state.enterDropZone();
		props.onDragEnter?.(event);
	}

	function handleDragLeave(event: DragEvent) {
		if (state.disabled || !state.dropzone) return;
		state.leaveDropZone();
		props.onDragLeave?.(event);
	}

	function handleDragOver(event: DragEvent) {
		if (state.disabled || !state.dropzone) return;
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
		props.onDragOver?.(event);
	}

	function handleDrop(event: DragEvent) {
		if (state.disabled || !state.dropzone) return;
		event.preventDefault();
		state.leaveDropZone();
		const data = event.dataTransfer?.getData('application/json');
		if (data) {
			(event as any).dragData = JSON.parse(data);
		}
		props.onDrop?.(event);
	}

	function getDraggableAttr() {
		if (state.disabled) return undefined;
		return state.draggable ? true : undefined;
	}
</script>

<div
	class={state.classes}
	data-variant={state.variant}
	style:cursor={state.cursor}
	{...restProps}
	draggable={getDraggableAttr()}
	ondragstart={handleDragStart}
	ondrag={handleDrag}
	ondragend={handleDragEnd}
	ondragenter={handleDragEnter}
	ondragleave={handleDragLeave}
	ondragover={handleDragOver}
	ondrop={handleDrop}
>
	{#if state.showDragHandle && state.draggable && !state.disabled}
		<div class="drag-handle-icon">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<circle cx="4" cy="4" r="1.5" />
				<circle cx="4" cy="8" r="1.5" />
				<circle cx="4" cy="12" r="1.5" />
				<circle cx="8" cy="4" r="1.5" />
				<circle cx="8" cy="8" r="1.5" />
				<circle cx="8" cy="12" r="1.5" />
			</svg>
		</div>
	{/if}
	{#if props.children}{@render props.children()}{/if}
</div>

<style>
	.c-drag-and-drop {
		--dnd-accent: var(--color-primary-500);
		position: relative;
		transition: all var(--duration-200, 200ms) var(--easing-smooth, ease-in-out);
	}

	.c-drag-and-drop[data-variant='neutral'] {
		--dnd-accent: var(--color-neutral-500);
	}
	.c-drag-and-drop[data-variant='secondary'] {
		--dnd-accent: var(--color-secondary-500);
	}
	.c-drag-and-drop[data-variant='tertiary'] {
		--dnd-accent: var(--color-neutral-400);
	}
	.c-drag-and-drop[data-variant='success'] {
		--dnd-accent: var(--color-success-500);
	}
	.c-drag-and-drop[data-variant='info'] {
		--dnd-accent: var(--color-info-500);
	}
	.c-drag-and-drop[data-variant='warning'] {
		--dnd-accent: var(--color-warning-500);
	}
	.c-drag-and-drop[data-variant='danger'],
	.c-drag-and-drop[data-variant='error'] {
		--dnd-accent: var(--color-danger-500);
	}

	.c-drag-and-drop--handle {
		padding-right: var(--space-7);
	}

	.c-drag-and-drop--dragging {
		opacity: 0.5;
	}

	.c-drag-and-drop--dropzone.c-drag-and-drop--drop-active {
		box-shadow: 0 0 0 2px var(--dnd-accent);
		background: color-mix(in srgb, var(--dnd-accent) 5%, transparent);
	}

	.c-drag-and-drop--disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.drag-handle-icon {
		position: absolute;
		top: var(--space-2);
		right: var(--space-2);
		opacity: 0.5;
		pointer-events: none;
	}
</style>
