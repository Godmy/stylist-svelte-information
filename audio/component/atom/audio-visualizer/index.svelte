<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeAudioVisualizer } from '$stylist/audio/interface/recipe/audio-visualizer';
	import { createAudioVisualizerState } from './state.svelte';

	let props: RecipeAudioVisualizer & HTMLAttributes<HTMLDivElement> = $props();
	const state = createAudioVisualizerState(() => props);
</script>

<div class={`av-wrap ${state.className}`}>
	{#if state.src}
		<img src={state.src} alt={state.alt} class="av-artwork" />
	{/if}
	<div class="av-info">
		<h4 class="av-title">{state.title}</h4>
		<p class="av-author">{state.author}</p>
	</div>
	<div class="av-duration">{state.duration}</div>
	<button onclick={() => state.togglePlay()} class="av-play-btn">
		{#if state.isPlaying}
			<svg
				style="width:1.25rem;height:1.25rem"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
		{:else}
			<svg
				style="width:1.25rem;height:1.25rem"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
					clip-rule="evenodd"
				></path>
			</svg>
		{/if}
	</button>
</div>

<style>
	.av-wrap {
		display: flex;
		align-items: center;
		border-radius: 0.5rem;
		background-color: var(--color-background-primary);
		padding: 1rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.av-artwork {
		margin-right: 1rem;
		width: 4rem;
		height: 4rem;
		border-radius: 0.375rem;
		object-fit: cover;
	}
	.av-info {
		min-width: 0;
		flex: 1;
	}
	.av-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
	}
	.av-author {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	.av-duration {
		margin-right: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.av-play-btn {
		display: flex;
		width: 2.5rem;
		height: 2.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background-color: var(--color-primary-500);
		color: var(--color-text-inverse);
	}

	.av-play-btn:hover {
		background-color: var(--color-primary-600);
	}
</style>
