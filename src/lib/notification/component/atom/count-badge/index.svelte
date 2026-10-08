<script lang="ts">
	import createCountBadgeState from './state.svelte';
	import type { RecipeCountBadge } from '$stylist/notification/interface/recipe/count-badge';

	let props: RecipeCountBadge = $props();

	const state = createCountBadgeState(() => props);

	const restProps = $derived(
		(() => {
			const { class: _class, count: _count, max: _max, showZero: _showZero, ...rest } = props;
			return rest;
		})()
	);
</script>

{#if state.showZero || state.count > 0}
	<span class={state.classes} {...restProps}>
		{state.displayCount}
	</span>
{/if}

<style>
	.count-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.375rem;
		border-radius: 999px;
		background: var(--color-danger-600, #dc2626);
		color: var(--color-text-inverse, #ffffff);
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
</style>
