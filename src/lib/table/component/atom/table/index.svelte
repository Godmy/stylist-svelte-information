<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RecipeTable } from '$stylist/table/interface/recipe/table';
	import { ObjectManagerTable } from '$stylist/table/class/manager/table';

	let props: RecipeTable & { children?: Snippet } = $props();
	const restProps = $derived(ObjectManagerTable.getTableRestProps(props));
	const content = $derived(props.content ?? props.children);
</script>

<table
	class="c-table {props.striped ? 'c-table--striped' : ''} {props.bordered
		? 'c-table--bordered'
		: ''} {props.hoverable ? 'c-table--hoverable' : ''} {props.class ?? ''}"
	{...restProps}
>
	{#if content}{@render content()}{/if}
</table>

<style>
	.c-table {
		width: 100%;
		border-collapse: collapse;
	}

	.c-table--bordered {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		overflow: hidden;
	}
</style>
