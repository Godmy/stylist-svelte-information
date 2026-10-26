<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import createCanvasImageEditorState from '$stylist/image/component/organism/canvas-image-editor/state.svelte';
	import type { RecipeCanvasImageEditor } from '$stylist/image/interface/recipe/canvas-image-editor';

	import { IMAGE_CANVAS_IMAGE_EDITOR_MESSAGE } from '$stylist/image/const/record/canvas-image-editor-message';
	import { useMessage } from '$stylist/localization/function/hook/use-message';

	let props: RecipeCanvasImageEditor & HTMLAttributes<HTMLCanvasElement> = $props();
	const state = createCanvasImageEditorState(() => props);
	const t = useMessage('canvas-image-editor', IMAGE_CANVAS_IMAGE_EDITOR_MESSAGE);
</script>

<canvas
	bind:this={state.canvasRef}
	width={state.width}
	height={state.height}
	class="canvas-image-editor__canvas"
	{...state.restProps}
	aria-label={t('label')}
></canvas>
