<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeCellText } from '$stylist/table/interface/recipe/cell-text';
	import { createCellTextState } from './state.svelte';

	let props: RecipeCellText & HTMLAttributes<HTMLTableCellElement> = $props();
	const state = createCellTextState(() => props);
</script>

<td
	class="c-cell-text {state.alignClass} {props.truncate
		? 'c-cell-text--truncate'
		: ''} {props.class ?? ''}"
>
	{state.displayValue}
</td>

<style>
	.c-cell-text {
		padding: 0.4rem 0.75rem;
		font-size: 13px;
		border-bottom: 1px solid var(--color-border-primary);
		color: var(--color-text-primary);
		white-space: nowrap;
	}

	.c-cell-text--truncate {
		max-width: 16rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
