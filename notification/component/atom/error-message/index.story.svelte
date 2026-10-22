<script lang="ts">
	import ErrorMessage from '$stylist/notification/component/atom/error-message/index.svelte';
	import type { RecipeErrorMessage } from '$stylist/notification/interface/recipe/error-message';

	// Render of index.story.ts: the retry button appears only with an onRetry callback.
	let args: RecipeErrorMessage = $props();
	let retryCount = $state(0);
</script>

<div class="_c1">
	<ErrorMessage {...args} onRetry={() => (retryCount += 1)} />
	<div class="_c2">
		<span>Retry attempts</span>
		<strong>{retryCount}</strong>
	</div>
</div>

<style>
	._c1 {
		display: grid;
		gap: 0.875rem;
		max-width: 34rem;
	}

	._c2 {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		background: var(--color-background-primary);
		color: var(--color-text-secondary);
		font-size: 0.8125rem;
		padding: 0.375rem 0.625rem;
	}
</style>
