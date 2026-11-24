import { IMAGE_IMAGE_CAPTION_EDITOR_CARD_MESSAGE } from '$stylist/image/const/record/image-caption-editor-card-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeImageCaptionEditorCard } from '$stylist/image/interface/recipe/image-caption-editor-card';
/** Reactive behavior of image-caption-editor-card; props are read lazily when needed. */
export function createImageCaptionEditorCardComponentState(
	getProps: () => Pick<RecipeImageCaptionEditorCard, 'caption'>
) {
	const props = $derived(getProps());
	const t = useMessage('image-caption-editor-card', IMAGE_IMAGE_CAPTION_EDITOR_CARD_MESSAGE);
	// Unsaved text; a saved (or restored) caption from the consumer drops it.
	let draft = $derived.by<string | null>(() => {
		void props['caption'];
		return null;
	});
	const text = $derived(draft ?? props['caption']);
	const changed = $derived(text !== props['caption']);
	return {
		get t(): typeof t {
			return t;
		},
		get draft(): typeof draft {
			return draft;
		},
		set draft(__nextValue: typeof draft) {
			draft = __nextValue;
		},
		get text(): typeof text {
			return text;
		},
		get changed(): typeof changed {
			return changed;
		}
	};
}
export default createImageCaptionEditorCardComponentState;
