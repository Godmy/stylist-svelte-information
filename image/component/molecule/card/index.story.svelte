<script lang="ts">
	import Card from './index.svelte';
	import type { RecipeCard } from '$stylist/image/interface/recipe/card';

	// Render of index.story.ts: the header, body and footer are snippet props.
	let args: RecipeCard = $props();
</script>

<Card {...args}>
	<p class="_c1">Card body content goes here.</p>
	{#snippet header()}
		<div class="_c2">
			<h3 class="_c3">Card Title</h3>
			<p class="_c4">Subtitle or description</p>
		</div>
	{/snippet}
	{#snippet footer()}
		<div class="_c5">
			<span class="_c6">Action area</span>
		</div>
	{/snippet}
</Card>

<style>
	._c1 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c2 {
		margin-bottom: 0.75rem;
	}
	._c3 {
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c4 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-tertiary);
	}
	._c5 {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
	._c6 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-secondary);
	}
</style>
