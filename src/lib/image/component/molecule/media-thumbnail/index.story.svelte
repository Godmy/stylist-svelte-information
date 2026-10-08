<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import MediaThumbnail from './index.svelte';

	let removed = $state(false);

	const controls = [
		{ name: 'alt', type: 'text', defaultValue: 'Сигирия.jpg' },
		{ name: 'removable', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	{controls}
	title="MediaThumbnail"
	category="Image/Molecules"
	description="Generic image thumbnail with an optional remove action. Domain-neutral: no product/gallery knowledge."
>
	{#snippet children(values: any)}
		{#if removed}
			<p>Удалено (демо). <button type="button" onclick={() => (removed = false)}>Вернуть</button></p>
		{:else}
			<MediaThumbnail
				src="https://placehold.co/400x300"
				alt={values.alt as string}
				onRemove={values.removable ? () => (removed = true) : undefined}
			/>
		{/if}
	{/snippet}
</Story>
