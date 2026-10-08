<script lang="ts">
	import type { RecipeComparisonTable } from '$stylist/table/interface/recipe/comparison-table';
	import { createComparisonTableState } from './state.svelte';

	let props: RecipeComparisonTable = $props();
	const state = createComparisonTableState(() => props);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			headerClass: _headerClass,
			featureClass: _featureClass,
			productClass: _productClass,
			valueClass: _valueClass,
			primaryProductClass: _primaryProductClass,
			showHeader: _showHeader,
			showDescription: _showDescription,
			featureColumnLabel: _featureColumnLabel,
			features: _features,
			products: _products,
			...rest
		} = props;
		return rest;
	});
</script>

<div class={state.containerClass} {...restProps}>
	<table class="c-comparison-table__table">
		<thead class={state.headerClass}>
			<tr>
				<th class="c-comparison-table__th c-comparison-table__th--feature"
					>{state.featureColumnLabel}</th
				>
				{#each state.products as product}
					<th
						class={[
							'c-comparison-table__th',
							product.primary ? 'c-comparison-table__th--primary' : ''
						]
							.filter(Boolean)
							.join(' ')}
					>
						<div class="c-comparison-table__product-header">
							<span>{product.name}</span>
							{#if state.showDescription && product.description}
								<span class="c-comparison-table__product-desc">{product.description}</span>
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="c-comparison-table__body">
			{#each state.features as feature}
				<tr class="c-comparison-table__row">
					<td class="c-comparison-table__feature-cell">
						<div>
							<div class="c-comparison-table__feature-name">{feature.name}</div>
							{#if state.showDescription && feature.description}
								<div class="c-comparison-table__feature-desc">{feature.description}</div>
							{/if}
						</div>
					</td>
					{#each state.products as product}
						<td
							class={[
								'c-comparison-table__value-cell',
								product.primary ? 'c-comparison-table__value-cell--primary' : ''
							]
								.filter(Boolean)
								.join(' ')}
						>
							{#if typeof product.features[feature.id] === 'boolean'}
								{#if product.features[feature.id]}
									<span class="c-comparison-table__badge c-comparison-table__badge--yes">
										&#10003;
									</span>
								{:else}
									<span class="c-comparison-table__badge c-comparison-table__badge--no">
										&#8212;
									</span>
								{/if}
							{:else if typeof product.features[feature.id] === 'string' || typeof product.features[feature.id] === 'number'}
								{product.features[feature.id]}
							{:else}
								-
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.c-comparison-table {
		overflow-x: auto;
	}

	.c-comparison-table__table {
		min-width: 100%;
		border-collapse: collapse;
	}

	.c-comparison-table__head {
		border-bottom: 2px solid var(--color-border-primary);
	}

	.c-comparison-table__th {
		padding: 0.75rem 1.5rem;
		text-align: center;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		background: var(--color-background-secondary);
	}

	.c-comparison-table__th--feature {
		text-align: left;
	}

	.c-comparison-table__th--primary {
		background: color-mix(
			in srgb,
			var(--color-primary-500, currentColor) 18%,
			var(--color-background-secondary, transparent)
		);
		color: var(--color-text-primary, currentColor);
		outline: 2px solid var(--color-primary-500);
		outline-offset: -2px;
	}

	.c-comparison-table__product-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.c-comparison-table__product-desc {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	.c-comparison-table__body {
		background: var(--color-background-primary);
	}

	.c-comparison-table__row {
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-comparison-table__feature-cell {
		padding: 1rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
		color: var(--color-text-primary);
	}

	.c-comparison-table__feature-name {
		font-weight: 500;
	}

	.c-comparison-table__feature-desc {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin-top: 0.125rem;
	}

	.c-comparison-table__value-cell {
		padding: 1rem 1.5rem;
		text-align: center;
		font-size: 0.875rem;
		white-space: nowrap;
		color: var(--color-text-secondary);
	}

	.c-comparison-table__value-cell--primary {
		background: color-mix(
			in srgb,
			var(--color-primary-500, currentColor) 12%,
			var(--color-background-primary, transparent)
		);
		color: var(--color-text-primary, currentColor);
	}

	.c-comparison-table__badge {
		display: inline-flex;
		width: 1.5rem;
		height: 1.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		font-size: 0.875rem;
	}

	.c-comparison-table__badge--yes {
		background: var(--color-success-100);
		color: var(--color-success-800);
	}

	.c-comparison-table__badge--no {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
	}
</style>
