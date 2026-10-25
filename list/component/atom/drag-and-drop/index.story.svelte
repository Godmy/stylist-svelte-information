<script lang="ts">
	import DragAndDrop from '$stylist/list/component/atom/drag-and-drop/index.svelte';
	import type { RecipeDragAndDrop } from '$stylist/list/interface/recipe/drag-and-drop';

	// Render of index.story.ts: a drag source and a drop zone work together and log their events.
	let args: RecipeDragAndDrop = $props();
	let dragEvents = $state<string[]>([]);
	let droppedData = $state<unknown>(null);

	function logEvent(name: string, data?: unknown) {
		const timestamp = new Date().toLocaleTimeString();
		dragEvents = [
			`${timestamp} - ${name}${data ? ': ' + JSON.stringify(data) : ''}`,
			...dragEvents
		].slice(0, 10);
	}
</script>

<div class="_c1">
	<div class="_c2">
		<!-- Draggable item -->
		<DragAndDrop
			{...args}
			dropzone={false}
			class="_c3"
			dragData={{ source: 'draggable-item', timestamp: Date.now() }}
			onDragStart={() => logEvent('dragStart')}
			onDragEnd={() => logEvent('dragEnd')}
		>
			<div class="_c4">
				<p class="_c5">📦 Перетащи меня</p>
				<p class="_c6 _c-muted">Drag me to the drop zone</p>
			</div>
		</DragAndDrop>

		<!-- Drop zone -->
		<DragAndDrop
			{...args}
			draggable={false}
			dropzone={true}
			class="_c7"
			onDrop={(event: DragEvent & { dragData?: unknown }) => {
				droppedData = event.dragData;
				logEvent('drop', event.dragData);
			}}
			onDragEnter={() => logEvent('dragEnter')}
			onDragLeave={() => logEvent('dragLeave')}
		>
			<div class="_c4">
				<p class="_c5">📥 Зона сброса</p>
				{#if droppedData}
					<p class="_c8 _c-muted">
						Последние данные: {JSON.stringify(droppedData)}
					</p>
				{/if}
			</div>
		</DragAndDrop>
	</div>

	<!-- Event log -->
	<div class="_c9">
		<p class="_c10">События:</p>
		<ul class="_c11 _c-muted">
			{#each dragEvents as event, index (index)}
				<li>{event}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	._c1 {
		width: 100%;
		border-radius: 0.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	._c10 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
	}
	._c11 {
		font-size: 0.75rem;
		line-height: 1rem;
	}
	._c11 > * + * {
		margin-top: 0.25rem;
	}
	._c2 {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}
	._c2 > :global(._c3) {
		border-radius: 0.5rem;
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
	}
	._c4 {
		text-align: center;
	}
	._c5 {
		font-weight: 500;
	}
	._c6 {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}
	._c2 > :global(._c7) {
		border-radius: 0.5rem;
		border-width: 2px;
		border-style: dashed;
		border-color: var(--color-border-secondary);
		background-color: var(--color-background-tertiary);
		padding: 1.5rem;
	}
	._c8 {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}
	._c9 {
		margin-top: 1rem;
		border-radius: 0.5rem;
		background-color: var(--color-background-tertiary);
		padding: 1rem;
	}
	._c-muted {
		color: var(--color-text-secondary);
	}
</style>
