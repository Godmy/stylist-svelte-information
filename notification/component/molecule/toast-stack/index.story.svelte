<script lang="ts">
	import ToastStack from '$stylist/notification/component/molecule/toast-stack/index.svelte';
	import type { RecipeToastStack } from '$stylist/notification/interface/recipe/toast-stack';
	import type { RecipeToast } from '$stylist/notification/interface/recipe/toast';

	// Render of index.story.ts: the toast list is local state with dismiss and action callbacks.
	let args: RecipeToastStack = $props();

	const labels = {
		success: 'Deployment complete',
		warning: 'Review required',
		error: 'Sync failed',
		info: 'New activity'
	} as const;

	let seed = $state(4);
	let toasts = $state<RecipeToast[]>(createInitialToasts());

	function createInitialToasts(): RecipeToast[] {
		return [
			{
				id: '1',
				text: labels.success,
				message: 'The production environment is now running the latest version.',
				type: 'success',
				onDismiss: () => removeToast('1')
			},
			{
				id: '2',
				text: labels.warning,
				message: 'Three generated exports have warnings that need confirmation.',
				type: 'warning',
				onDismiss: () => removeToast('2')
			},
			{
				id: '3',
				text: labels.error,
				message: 'The workspace could not reach the persistence service.',
				type: 'error',
				onDismiss: () => removeToast('3'),
				actions: [{ label: 'Retry', onClick: () => addToast('info') }]
			}
		];
	}

	function removeToast(id: string) {
		toasts = toasts.filter((toast) => toast.id !== id);
	}

	function clearToasts() {
		toasts = [];
	}

	function resetToasts() {
		seed = 4;
		toasts = createInitialToasts();
	}

	function addToast(type: keyof typeof labels) {
		const id = String(seed);
		seed += 1;
		toasts = [
			...toasts,
			{
				id,
				text: labels[type],
				message: `Notification ${id} was queued for the current workspace.`,
				type,
				onDismiss: () => removeToast(id)
			}
		];
	}
</script>

<div class="_c1">
	<div class="_c2">
		<button type="button" class="_c3" onclick={() => addToast('success')}>Success</button>
		<button type="button" class="_c3" onclick={() => addToast('warning')}>Warning</button>
		<button type="button" class="_c3" onclick={() => addToast('error')}>Error</button>
		<button type="button" class="_c4" onclick={resetToasts}>Reset</button>
	</div>
	<div class="_c5">Active toasts: {toasts.length}</div>
	<ToastStack {...args} {toasts} onDismissAll={clearToasts} />
</div>

<style>
	._c1 {
		min-height: 22rem;
	}

	._c2 {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	._c3,
	._c4 {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		cursor: pointer;
		font-weight: 650;
		padding: 0.5rem 0.75rem;
	}

	._c3 {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
	}

	._c4 {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
	}

	._c5 {
		margin-top: 0.75rem;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}
</style>
