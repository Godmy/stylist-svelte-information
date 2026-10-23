<script lang="ts">
	import type { RecipeImageCaptionEditorCard } from '$stylist/image/interface/recipe/image-caption-editor-card';

	let {
		src,
		alt = '',
		number,
		caption,
		maxLength = 300,
		name = 'caption',
		fields = {},
		saveAction = '',
		resetAction,
		edited = false,
		note,
		message = null,
		enhance = () => {},
		fieldLabel = 'Caption',
		saveLabel = 'Save',
		cancelLabel = 'Cancel',
		resetLabel = 'Restore original',
		class: className = ''
	}: RecipeImageCaptionEditorCard = $props();

	// Unsaved text; a saved (or restored) caption from the consumer drops it.
	let draft = $derived.by<string | null>(() => {
		void caption;
		return null;
	});
	const text = $derived(draft ?? caption);
	const changed = $derived(text !== caption);
</script>

<article class="c-image-caption-editor-card {className}" class:edited>
	<figure>
		<img {src} {alt} loading="lazy" />
		{#if number !== undefined}<span class="c-image-caption-editor-card__number">{number}</span>{/if}
		{#if text.trim()}<figcaption>{text}</figcaption>{/if}
	</figure>

	<form method="POST" action={saveAction} use:enhance>
		{#each Object.entries(fields) as [key, value] (key)}
			<input type="hidden" name={key} {value} />
		{/each}
		<textarea
			{name}
			rows="3"
			maxlength={maxLength}
			aria-label={fieldLabel}
			value={text}
			oninput={(event) => (draft = event.currentTarget.value)}></textarea>
		<div class="c-image-caption-editor-card__actions">
			<button type="submit" class="primary" disabled={!changed}>{saveLabel}</button>
			{#if changed}
				<button type="button" onclick={() => (draft = null)}>{cancelLabel}</button>
			{/if}
			{#if resetAction && edited}
				<button type="submit" formaction={resetAction}>{resetLabel}</button>
			{/if}
			<span class="c-image-caption-editor-card__count">{text.length}/{maxLength}</span>
		</div>
		{#if message?.error}<p class="c-image-caption-editor-card__alert error" role="alert">
				{message.error}
			</p>{/if}
		{#if message?.ok}<p class="c-image-caption-editor-card__alert ok" role="status">
				{message.ok}
			</p>{/if}
		{#if note}<p class="c-image-caption-editor-card__note">{note}</p>{/if}
	</form>
</article>

<style>
	.c-image-caption-editor-card {
		display: grid;
		align-content: start;
		overflow: hidden;
		border: 1px solid var(--color-border-primary, rgb(35 32 29 / 0.12));
		border-radius: 0.875rem;
		background: var(--color-background-primary, #fff);
	}
	.c-image-caption-editor-card.edited {
		border-color: var(--color-primary-600, #147270);
	}
	figure {
		position: relative;
		margin: 0;
	}
	img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}
	.c-image-caption-editor-card__number {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		background: rgb(0 0 0 / 0.55);
		color: #fff;
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
	}
	figcaption {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 0.4rem 0.75rem;
		background: rgb(14 23 20 / 0.58);
		color: #fff;
		font-size: 0.875rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		line-height: 1.35;
		text-transform: uppercase;
	}
	form {
		display: grid;
		gap: 0.5rem;
		padding: 0.75rem;
	}
	textarea {
		width: 100%;
		box-sizing: border-box;
		min-height: 5rem;
		padding: 0.6rem 0.75rem;
		border: 1px solid var(--color-border-primary, rgb(35 32 29 / 0.12));
		border-radius: 0.5rem;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, #17140f);
		font: inherit;
		font-size: 1rem;
		resize: vertical;
	}
	.c-image-caption-editor-card__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	button {
		min-height: 2.75rem;
		padding: 0 1rem;
		border: 1px solid var(--color-border-primary, rgb(35 32 29 / 0.12));
		border-radius: 0.5rem;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, #17140f);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	button.primary {
		border-color: var(--color-primary-600, #147270);
		background: var(--color-primary-600, #147270);
		color: var(--color-text-inverse, #fff);
	}
	button:disabled {
		opacity: 0.5;
		cursor: default;
	}
	.c-image-caption-editor-card__count {
		margin-left: auto;
		color: var(--color-text-secondary, #7a6f62);
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
	}
	.c-image-caption-editor-card__alert {
		margin: 0;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
	}
	.c-image-caption-editor-card__alert.error {
		background: var(--color-danger-50, #fdecea);
		color: var(--color-danger-700, #8a1c12);
	}
	.c-image-caption-editor-card__alert.ok {
		background: var(--color-primary-50, #eefdfb);
		color: var(--color-primary-700, #155b5a);
	}
	.c-image-caption-editor-card__note {
		margin: 0;
		color: var(--color-text-secondary, #7a6f62);
		font-size: 0.875rem;
	}
</style>
