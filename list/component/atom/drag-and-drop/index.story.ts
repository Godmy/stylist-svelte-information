import DragAndDrop from '$stylist/list/component/atom/drag-and-drop/index.svelte';
import type { RecipeDragAndDrop } from '$stylist/list/interface/recipe/drag-and-drop';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Atom for draggable items and drop zones; index.story.svelte pairs a source with a zone. */
export default {
	component: DragAndDrop,
	title: 'Drag-and-Drop',
	description: 'Атом для перетаскивания элементов и зон сброса',
	args: {
		draggable: true,
		dropzone: false,
		disabled: false,
		showDragHandle: true,
		dragPreview: false,
		dragCursor: 'grab',
		variant: 'default'
	},
	controls: {
		draggable: { type: 'boolean' },
		dropzone: { type: 'boolean' },
		disabled: { type: 'boolean' },
		showDragHandle: { type: 'boolean' },
		dragPreview: { type: 'boolean' },
		dragCursor: { type: 'select', options: ['grab', 'grabbing', 'move', 'default'] },
		variant: { type: 'select', options: TOKEN_COLOR_TONE }
	}
} satisfies ContractStory<RecipeDragAndDrop>;
