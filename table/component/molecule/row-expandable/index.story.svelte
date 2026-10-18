<script lang="ts">
	// Render of index.story.ts: rowContent and expandableContent are required snippets.
	import RowExpandable from './index.svelte';
	import type { RecipeRowExpandable } from '$stylist/table/interface/recipe/row-expandable';

	let args: Partial<RecipeRowExpandable> = $props();
	const users = ['Alice Johnson', 'Bob Smith', 'Charlie Brown'];
</script>

<table>
	<tbody>
		{#each users as name (name)}
			<RowExpandable {...args}>
				{#snippet rowContent()}
					<td class="row-expandable-story__cell">{name}</td>
					<td class="row-expandable-story__cell row-expandable-story__cell--muted">
						user@example.com
					</td>
				{/snippet}
				{#snippet expandableContent()}
					<div class="row-expandable-story__detail">
						<strong>Details for {name}:</strong> joined 2024, last active today.
					</div>
				{/snippet}
			</RowExpandable>
		{/each}
	</tbody>
</table>

<style>
	.row-expandable-story__cell {
		padding: 0.4rem 0.75rem;
		font-size: 13px;
	}
	.row-expandable-story__cell--muted {
		color: var(--color-text-secondary);
	}
	.row-expandable-story__detail {
		padding: 0.5rem;
	}
</style>
