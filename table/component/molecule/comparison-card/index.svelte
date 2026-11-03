<script lang="ts">
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlUl from '$stylist/html/component/molecule/ul/index.svelte';
	import HtmlLi from '$stylist/html/component/organism/li/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlStrong from '$stylist/html/component/atom/strong/index.svelte';
	import Heading from '$stylist/typography/component/atom/heading/index.svelte';
	import type { RecipeComparisonCard } from '$stylist/table/interface/recipe/comparison-card';
	import createComparisonCardState from '$stylist/table/component/molecule/comparison-card/state.svelte';

	let props: RecipeComparisonCard = $props();
	const state = createComparisonCardState(() => props);
</script>

<HtmlDiv {...state.restProps} class={state.rootClass}>
	{#if props.title}
		<Heading level={state.headingLevel} text={props.title} class="table-comparison-card__title" />
	{/if}
	<HtmlDiv class="table-comparison-card__columns">
		{#each props.columns as column, columnIndex (columnIndex)}
			<HtmlDiv
				class="table-comparison-card__column table-comparison-card__column--{column.tone ??
					'neutral'}"
			>
				<Heading
					level={state.columnLevel}
					text={column.title}
					class="table-comparison-card__column-title"
				/>
				<HtmlUl class="table-comparison-card__list">
					{#each column.items as entry, index (index)}
						<HtmlLi
							class={[
								'table-comparison-card__item',
								entry.value && !props.item && 'table-comparison-card__item--pair'
							]
								.filter(Boolean)
								.join(' ')}
						>
							{#if props.item}
								{@render props.item(entry, column)}
							{:else}
								<HtmlSpan class="table-comparison-card__label">{entry.label}</HtmlSpan>
								{#if entry.value}
									<HtmlStrong class="table-comparison-card__value">{entry.value}</HtmlStrong>
								{/if}
							{/if}
						</HtmlLi>
					{/each}
				</HtmlUl>
			</HtmlDiv>
		{/each}
	</HtmlDiv>
</HtmlDiv>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer layout {
		:global {
			/* Columns are tinted panels in their tone; text size, font and line height come from the
			   html skin. --comparison-card-* hooks restyle the card, the tone colours fall back to
			   the theme's success/danger. */
			:where(.table-comparison-card) {
				container-type: inline-size;
				display: grid;
				gap: calc(var(--space-3, 0.75rem) * var(--density-scale, 1));
				margin: var(--comparison-card-margin, 0);
			}
			:where(.table-comparison-card__title) {
				margin: 0;
			}
			:where(.table-comparison-card__columns) {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
				gap: var(--comparison-card-gap, calc(var(--space-3, 0.75rem) * var(--density-scale, 1)));
			}
			:where(.table-comparison-card__column) {
				--comparison-card-tone: var(--comparison-card-neutral, currentColor);
				display: flex;
				flex-direction: column;
				min-width: 0;
				padding: var(
					--comparison-card-padding,
					calc(var(--space-4, 1rem) * var(--density-scale, 1))
						calc(var(--space-5, 1.25rem) * var(--density-scale, 1))
				);
				border: 1px solid
					var(
						--comparison-card-border,
						color-mix(in srgb, var(--comparison-card-tone) 22%, transparent)
					);
				border-radius: var(--comparison-card-radius, var(--radius-3, 0.75rem));
				background: var(
					--comparison-card-surface,
					color-mix(in srgb, var(--comparison-card-tone) 6%, transparent)
				);
			}
			:where(.table-comparison-card__column--positive) {
				--comparison-card-tone: var(--comparison-card-positive, var(--color-success-600, #2f6b45));
				--comparison-card-surface: var(--comparison-card-positive-surface);
			}
			:where(.table-comparison-card__column--negative) {
				--comparison-card-tone: var(--comparison-card-negative, var(--color-danger-600, #a4442f));
				--comparison-card-surface: var(--comparison-card-negative-surface);
			}
			:where(.table-comparison-card__column-title) {
				--typography-color: var(--comparison-card-tone);
				margin: 0 0
					var(
						--comparison-card-column-title-offset,
						calc(var(--space-1, 0.25rem) * var(--density-scale, 1))
					);
				padding-bottom: var(
					--comparison-card-column-title-gap,
					calc(var(--space-3, 0.75rem) * var(--density-scale, 1))
				);
				border-bottom: 2px solid color-mix(in srgb, var(--comparison-card-tone) 35%, transparent);
				color: var(--comparison-card-tone);
				font-size: var(--comparison-card-column-title-size, 0.8em);
				letter-spacing: var(--comparison-card-column-title-spacing, 0.12em);
				text-align: var(--comparison-card-column-title-align, center);
				text-transform: var(--comparison-card-column-title-transform, uppercase);
			}
			/* Rows without markers, split by hairlines in the column tone. */
			:where(.table-comparison-card__list) {
				margin: 0;
				padding: 0;
				list-style: none;
			}
			:where(.table-comparison-card__item) {
				margin: 0;
				padding: calc(var(--space-2, 0.5rem) * var(--density-scale, 1)) 0;
			}
			/* A label with a value: the value aligns to the end of the row. */
			:where(.table-comparison-card__item--pair) {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				gap: 0 calc(var(--space-3, 0.75rem) * var(--density-scale, 1));
			}
			:where(.table-comparison-card__item + .table-comparison-card__item) {
				border-top: 1px solid
					var(
						--comparison-card-item-divider,
						color-mix(in srgb, var(--comparison-card-tone) 16%, transparent)
					);
			}
			:where(.table-comparison-card__value) {
				color: var(--comparison-card-tone);
			}
		}
	}
</style>
