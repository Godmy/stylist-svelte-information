<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeCell } from '$stylist/table/interface/recipe/cell';
	import { createCellState } from './state.svelte';

	let props: RecipeCell & HTMLAttributes<HTMLTableCellElement> & { children?: Snippet } = $props();
	const state = createCellState(() => props);
	const content = $derived(props.content ?? props.children);
</script>

{#if state.variant === 'header'}
	<th class="c-cell c-cell--header {state.alignClass} {props.class ?? ''}">
		{#if content}{@render content()}{/if}
	</th>
{:else}
	<td class="c-cell {state.alignClass} {props.class ?? ''}">
		{#if content}{@render content()}{/if}
	</td>
{/if}

<style>
	.c-cell {
		padding: 0.4rem 0.75rem;
		font-size: 13px;
		border-bottom: 1px solid var(--color-border-primary);
		white-space: nowrap;
	}

	.c-cell--header {
		font-weight: 600;
		font-size: 11px;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		background: var(--color-background-secondary);
	}
</style>
