<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RecipeRow } from '$stylist/table/interface/recipe/row';
	import { createRowState } from './state.svelte';

	let props: RecipeRow & HTMLAttributes<HTMLTableRowElement> & { children?: Snippet } = $props();
	const state = createRowState(() => props);
	const content = $derived(props.content ?? props.children);
</script>

<tr
	class="c-row {state.striped ? 'c-row--striped' : ''} {state.active
		? 'c-row--active'
		: ''} {state.hoverable ? 'c-row--hoverable' : ''} {props.class ?? ''}"
	{...state.restProps}
>
	{#if content}{@render content()}{/if}
</tr>

<style>
	.c-row--striped:nth-child(even) {
		background: var(--color-background-secondary);
	}

	.c-row--active {
		background: var(--color-primary-50);
	}

	.c-row--hoverable:hover {
		background: var(--color-background-secondary);
		cursor: pointer;
	}
</style>
