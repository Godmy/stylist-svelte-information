<script lang="ts">
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeTranscriber } from '$stylist/audio/interface/recipe/transcriber';
	import { createTranscriberState } from './state.svelte';

	let props: RecipeTranscriber = $props();
	const state = createTranscriberState(props);
</script>

<section class={`c-transcriber ${state.className}`} {...state.restProps}>
	<div class="c-transcriber__toolbar">
		<button
			type="button"
			class="c-transcriber__record"
			disabled={!state.canRecord}
			onclick={state.toggleRecording}
			aria-pressed={state.isRecording}
			aria-label={state.actionLabel}
			data-recording={state.isRecording || undefined}
		>
			<BaseIcon name={state.isRecording ? 'square' : 'mic'} size={16} aria-hidden="true" />
		</button>

		<Button
			variant="outline"
			size="sm"
			disabled={!state.canCopy}
			onclick={() => void state.copyTranscript()}
		>
			<BaseIcon name="copy" size={16} aria-hidden="true" />
			<span>{state.copyLabel}</span>
		</Button>
	</div>

	<div class="c-transcriber__status">
		<span>{state.statusLabel}</span>
		<span>{state.progress}%</span>
	</div>
	<div class="c-transcriber__progress" aria-label="Transcription progress">
		<span style={`width:${state.progress}%`}></span>
	</div>

	{#if state.recording}
		<audio class="c-transcriber__audio" src={state.recording.url} controls></audio>
	{/if}

	<div class="c-transcriber__result">
		{#if state.transcription?.text}
			<p>{state.transcription.text}</p>
		{:else if state.errorMessage}
			<p class="c-transcriber__error">{state.errorMessage}</p>
		{:else}
			<p class="c-transcriber__empty">Transcript will appear here.</p>
		{/if}
	</div>
</section>

<style>
	.c-transcriber {
		display: grid;
		gap: 0.85rem;
		width: 100%;
		min-width: 0;
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}

	.c-transcriber__toolbar,
	.c-transcriber__status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-width: 0;
	}

	.c-transcriber__record {
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

	.c-transcriber__record:hover:not(:disabled) {
		background: var(--color-primary-700);
		transform: translateY(-1px);
	}

	.c-transcriber__record:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-transcriber__record[data-recording] {
		background: var(--color-danger-600);
	}

	.c-transcriber__record[data-recording]:hover:not(:disabled) {
		background: var(--color-danger-700, var(--color-danger-600));
	}

	.c-transcriber__record:disabled {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-transcriber__status {
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.c-transcriber__progress {
		overflow: hidden;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--color-background-secondary);
	}

	.c-transcriber__progress span {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: var(--color-primary-600);
		transition: width 180ms ease;
	}

	.c-transcriber__audio {
		width: 100%;
		min-width: 0;
	}

	.c-transcriber__result {
		min-height: 7rem;
		padding: 0.85rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
	}

	.c-transcriber__result p {
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		line-height: 1.5;
	}

	.c-transcriber__empty {
		color: var(--color-text-secondary);
	}

	.c-transcriber__error {
		color: var(--color-danger-600);
	}

	@media (max-width: 520px) {
		.c-transcriber__toolbar {
			align-items: stretch;
			flex-direction: column;
		}
	}
</style>
