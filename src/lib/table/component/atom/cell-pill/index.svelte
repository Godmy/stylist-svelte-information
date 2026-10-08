<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeCellPill } from '$stylist/table/interface/recipe/cell-pill';
	import { createCellPillState } from './state.svelte';

	let props: RecipeCellPill & HTMLAttributes<HTMLTableCellElement> = $props();
	const state = createCellPillState(() => props);
</script>

<td class="c-cell-pill {props.class ?? ''}">
	{#if state.value}
		<span class="c-cell-pill__badge c-cell-pill__badge--{state.variant}">{state.value}</span>
	{/if}
</td>

<style>
	.c-cell-pill {
		padding: 0.3rem 0.75rem;
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-cell-pill__badge {
		display: inline-block;
		padding: 0.15rem 0.55rem;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 500;
		white-space: nowrap;
	}

	.c-cell-pill__badge--default {
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
	}
	.c-cell-pill__badge--primary {
		background: var(--color-primary-100);
		color: var(--color-primary-700);
	}
	.c-cell-pill__badge--success {
		background: #dcfce7;
		color: #15803d;
	}
	.c-cell-pill__badge--warning {
		background: #fef9c3;
		color: #a16207;
	}
	.c-cell-pill__badge--danger {
		background: #fee2e2;
		color: #b91c1c;
	}
</style>
