<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeColumnManager } from '$stylist/table/interface/recipe/column-manager';
	import { createColumnManagerState } from './state.svelte';

	let props: RecipeColumnManager & HTMLAttributes<HTMLDivElement> = $props();
	const state = createColumnManagerState(() => props);
</script>

<div class="c-column-manager {props.class ?? ''}">
	<div class="c-column-manager__header">
		<span class="c-column-manager__label">Columns</span>
		<button type="button" class="c-column-manager__reset" onclick={state.reset}>Reset</button>
	</div>
	<ul class="c-column-manager__list">
		{#each state.localColumns as col, i}
			<li class="c-column-manager__item">
				<label class="c-column-manager__row">
					<input
						type="checkbox"
						class="c-column-manager__check"
						checked={col.visible}
						onchange={() => state.toggle(i)}
					/>
					<span class="c-column-manager__name">{col.header}</span>
				</label>
			</li>
		{/each}
	</ul>
</div>

<style>
	.c-column-manager {
		padding: 0.5rem;
	}

	.c-column-manager__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.35rem;
	}

	.c-column-manager__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--color-text-secondary);
	}

	.c-column-manager__reset {
		background: none;
		border: none;
		font-size: 11px;
		color: var(--color-primary-600);
		cursor: pointer;
		padding: 0;
	}

	.c-column-manager__reset:hover {
		text-decoration: underline;
	}

	.c-column-manager__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.c-column-manager__row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		cursor: pointer;
		padding: 0.2rem 0.25rem;
		border-radius: 4px;
	}

	.c-column-manager__row:hover {
		background: var(--color-background-secondary);
	}

	.c-column-manager__check {
		width: 13px;
		height: 13px;
		cursor: pointer;
	}

	.c-column-manager__name {
		font-size: 12px;
		color: var(--color-text-primary);
	}
</style>
