/**
 * A photo with its caption and a form to change it: the caption is previewed over the
 * photo while typing; «Save» posts the form, «Cancel» drops the draft, «Restore» posts
 * to `resetAction`. The form posts to the consumer's endpoint (e.g. a SvelteKit action).
 */
export interface RecipeImageCaptionEditorCard {
	src: string;
	alt?: string;
	/** Position badge in the corner of the photo (1-based). */
	number?: number;
	/** The saved caption; a new value drops the unsaved draft. */
	caption: string;
	maxLength?: number;
	/** Name of the caption field in the posted form; defaults to `caption`. */
	name?: string;
	/** Hidden inputs posted with the form (e.g. the photo key). */
	fields?: Record<string, string>;
	saveAction?: string;
	/** When set, the card offers «Restore» posting to this action. */
	resetAction?: string;
	/** The caption differs from the original one; highlights the card. */
	edited?: boolean;
	/** Small print under the form (who changed it, the original text). */
	note?: string;
	/** Result of the last post for this card. */
	message?: { ok?: string; error?: string } | null;
	/** Progressive enhancement of the form, e.g. SvelteKit `enhance` bound to a callback. */
	enhance?: (form: HTMLFormElement) => void | { destroy?: () => void };
	fieldLabel?: string;
	saveLabel?: string;
	cancelLabel?: string;
	resetLabel?: string;
	class?: string;
}
