<script lang="ts">
	import MediaThumbnail from './index.svelte';
	import type { RecipeMediaThumbnail } from '$stylist/image/interface/recipe/media-thumbnail';

	// Render of index.story.ts: the remove action is a callback that hides the thumbnail.
	let { removable = true, ...args }: RecipeMediaThumbnail & { removable?: boolean } = $props();

	let removed = $state(false);
</script>

{#if removed}
	<p>Удалено (демо). <button type="button" onclick={() => (removed = false)}>Вернуть</button></p>
{:else}
	<MediaThumbnail {...args} onRemove={removable ? () => (removed = true) : undefined} />
{/if}
