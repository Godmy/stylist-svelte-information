<script lang="ts">
	import type { RecipeFilterText } from '$stylist/table/interface/recipe/filter-text';
	import { createFilterTextState } from './state.svelte';

	let props: RecipeFilterText = $props();
	const state = createFilterTextState(() => props);
</script>

<div class="c-filter-text {props.class ?? ''}">
	<input
		class="c-filter-text__input"
		type="search"
		placeholder={props.placeholder ?? 'Search...'}
		value={state.value}
		oninput={state.handleInput}
	/>
</div>

<style>
	.c-filter-text {
		display: flex;
		align-items: center;
	}

	.c-filter-text__input {
		width: 100%;
		height: 32px;
		padding: 0 0.65rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 6px;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		font-size: 13px;
		outline: none;
	}

	.c-filter-text__input:focus {
		border-color: var(--color-primary-500);
	}
</style>
