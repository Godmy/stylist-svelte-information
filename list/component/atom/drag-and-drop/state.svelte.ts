import type { RecipeDragAndDrop } from '$stylist/list/interface/recipe/drag-and-drop';

export function createDragAndDropState(getProps: () => RecipeDragAndDrop) {
	const props = $derived(getProps());
	const draggable = $derived(props.draggable ?? false);
	const dropzone = $derived(props.dropzone ?? false);
	const disabled = $derived(props.disabled ?? false);
	const variant = $derived(props.variant ?? 'default');
	const showDragHandle = $derived(props.showDragHandle ?? false);
	const dragCursor = $derived(props.dragCursor ?? 'grab');
	const dragPreview = $derived(props.dragPreview ?? false);
	let previewElement: HTMLElement | null = null;

	const state = $state({
		isDragging: false,
		isOverDropZone: false
	});

	const classes = $derived(
		[
			'c-drag-and-drop',
			draggable && !disabled ? 'c-drag-and-drop--draggable' : '',
			showDragHandle && draggable && !disabled ? 'c-drag-and-drop--handle' : '',
			dropzone && !disabled ? 'c-drag-and-drop--dropzone' : '',
			state.isOverDropZone ? 'c-drag-and-drop--drop-active' : '',
			state.isDragging ? 'c-drag-and-drop--dragging' : '',
			disabled ? 'c-drag-and-drop--disabled' : '',
			props.class ?? ''
		]
			.filter(Boolean)
			.join(' ')
	);

	function startDragging() {
		if (!disabled && draggable) state.isDragging = true;
	}

	function stopDragging() {
		state.isDragging = false;
		removePreview();
	}

	function copyComputedStyles(source: HTMLElement, target: HTMLElement) {
		const sourceStyle = window.getComputedStyle(source);
		for (const propertyName of sourceStyle) {
			target.style.setProperty(
				propertyName,
				sourceStyle.getPropertyValue(propertyName),
				sourceStyle.getPropertyPriority(propertyName)
			);
		}
		const targetChildren = Array.from(target.children);
		Array.from(source.children).forEach((sourceChild, index) => {
			const targetChild = targetChildren[index];
			if (sourceChild instanceof HTMLElement && targetChild instanceof HTMLElement) {
				copyComputedStyles(sourceChild, targetChild);
			}
		});
	}

	/** Uses a styled copy of the content (without the handle) as the drag image. */
	function attachPreview(event: DragEvent) {
		const source = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
		if (!dragPreview || !source || !event.dataTransfer) return;
		const candidate = Array.from(source.children).find(
			(child) => child instanceof HTMLElement && !child.classList.contains('drag-handle-icon')
		);
		const previewSource = candidate instanceof HTMLElement ? candidate : source;
		const preview = previewSource.cloneNode(true) as HTMLElement;
		copyComputedStyles(previewSource, preview);
		Object.assign(preview.style, {
			position: 'fixed',
			top: '0',
			left: '0',
			pointerEvents: 'none',
			margin: '0',
			width: `${previewSource.offsetWidth}px`,
			height: `${previewSource.offsetHeight}px`,
			opacity: '1',
			transform: 'translate(-200vw, -200vh)',
			boxShadow: '0 18px 48px rgba(15, 23, 42, 0.18)',
			zIndex: '2147483647'
		});
		document.body.appendChild(preview);
		previewElement = preview;
		const rect = previewSource.getBoundingClientRect();
		event.dataTransfer.setDragImage(preview, event.clientX - rect.left, event.clientY - rect.top);
	}

	function removePreview() {
		previewElement?.remove();
		previewElement = null;
	}

	function enterDropZone() {
		if (!disabled && dropzone) state.isOverDropZone = true;
	}

	function leaveDropZone() {
		state.isOverDropZone = false;
	}

	return {
		get draggable() {
			return draggable;
		},
		get dropzone() {
			return dropzone;
		},
		get disabled() {
			return disabled;
		},
		get variant() {
			return variant;
		},
		get showDragHandle() {
			return showDragHandle;
		},
		get cursor() {
			if (disabled) return 'not-allowed';
			if (draggable) return state.isDragging ? 'grabbing' : dragCursor;
			return undefined;
		},
		get classes() {
			return classes;
		},
		get isDragging() {
			return state.isDragging;
		},
		get isOverDropZone() {
			return state.isOverDropZone;
		},
		startDragging,
		stopDragging,
		attachPreview,
		enterDropZone,
		leaveDropZone
	};
}

export default createDragAndDropState;
