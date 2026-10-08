<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeAudioRecordButton } from '$stylist/audio/interface/recipe/audio-record-button';
	import { createAudioRecordButtonState } from './state.svelte';

	let props: RecipeAudioRecordButton = $props();
	const state = createAudioRecordButtonState(() => props);
</script>

<div class={`c-audio-record-button ${state.className}`} aria-live="polite">
	<button
		type="button"
		{...state.restProps}
		class="c-audio-record-button__toggle"
		disabled={state.isDisabled}
		onclick={state.toggleRecording}
		aria-pressed={state.isRecording}
		aria-label={state.buttonLabel}
		data-recording={state.isRecording || undefined}
	>
		<BaseIcon name={state.iconName} size={16} aria-hidden="true" />
	</button>
	{#if state.statusLabel}
		<span class="c-audio-record-button__status">{state.statusLabel}</span>
	{/if}
	{#if state.errorMessage}
		<span class="c-audio-record-button__error">{state.errorMessage}</span>
	{/if}
</div>

<style>
	.c-audio-record-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
	}

	.c-audio-record-button__toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		min-width: 2.75rem;
		min-height: 2.75rem;
		padding: 0;
		border-radius: 999px;
		border: 1px solid transparent;
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		cursor: pointer;
		transition:
			background-color var(--duration-120, 120ms) ease,
			transform var(--duration-120, 120ms) ease;
	}

	.c-audio-record-button__toggle:hover:not(:disabled) {
		background: var(--color-primary-700);
		transform: translateY(-1px);
	}

	.c-audio-record-button__toggle:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-audio-record-button__toggle[data-recording] {
		background: var(--color-danger-600);
	}

	.c-audio-record-button__toggle[data-recording]:hover:not(:disabled) {
		background: var(--color-danger-700, var(--color-danger-600));
	}

	.c-audio-record-button__toggle:disabled {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-audio-record-button__status,
	.c-audio-record-button__error {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.8125rem;
	}

	.c-audio-record-button__status {
		color: var(--color-text-secondary);
	}

	.c-audio-record-button__error {
		color: var(--color-danger-600);
	}
</style>
