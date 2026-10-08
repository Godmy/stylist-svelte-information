<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeCellIcon } from '$stylist/table/interface/recipe/cell-icon';
	import { createCellIconState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeCellIcon & HTMLAttributes<HTMLTableCellElement> = $props();
	const state = createCellIconState(() => props);
</script>

<td class="c-cell-icon {props.class ?? ''}" title={state.label || undefined}>
	<Icon
		name={state.icon}
		size={16}
		aria-label={state.label || undefined}
		class="c-cell-icon__svg"
	/>
</td>

<style>
	.c-cell-icon {
		padding: 0.25rem 0.75rem;
		border-bottom: 1px solid var(--color-border-primary);
		text-align: center;
		width: 2.5rem;
	}

	:global(.c-cell-icon__svg) {
		width: 1rem;
		height: 1rem;
		color: var(--color-text-secondary);
		display: block;
		margin: 0 auto;
	}
</style>
