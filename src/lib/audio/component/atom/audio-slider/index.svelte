<script lang="ts">
	import type { RecipeAudioSlider } from '$stylist/audio/interface/recipe/audio-slider';
	import { createAudioSliderState } from './state.svelte';

	let props: RecipeAudioSlider = $props();
	const state = createAudioSliderState(() => props);
</script>

<div class={`as-wrap ${state.className}`} {...state.restProps}>
	<div class="as-row">
		{#if state.label}
			<label for="audio-slider" class="as-label">{state.label}</label>
		{/if}
		<input
			id="audio-slider"
			type="range"
			min={state.min}
			max={state.max}
			step={state.step}
			bind:value={state.value}
			class="as-range"
		/>
		{#if state.showValue}
			<span class="as-value">{state.value}</span>
		{/if}
	</div>
</div>

<style>
	.as-wrap {
		width: 100%;
	}
	.as-row {
		display: flex;
		align-items: center;
	}
	.as-label {
		margin-bottom: 0.25rem;
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.as-range {
		height: 0.5rem;
		width: 100%;
		cursor: pointer;
		appearance: none;
		border-radius: 0.5rem;
		background-color: var(--color-background-tertiary);
		accent-color: #3b82f6;
	}
	.as-value {
		margin-left: 1rem;
		width: 3rem;
		text-align: center;
		font-weight: 500;
	}
</style>
