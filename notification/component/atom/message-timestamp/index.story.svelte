<script lang="ts">
	import MessageTimestamp from '$stylist/notification/component/atom/message-timestamp/index.svelte';
	import type { RecipeMessageTimestamp } from '$stylist/notification/interface/recipe/message-timestamp';

	// Render of index.story.ts: the timestamp is a Date computed from the minutesAgo knob.
	let { minutesAgo = 5, ...args }: RecipeMessageTimestamp & { minutesAgo?: number } = $props();

	const timestamp = $derived(new Date(Date.now() - (minutesAgo || 0) * 60_000));
</script>

<MessageTimestamp {...args} {timestamp} />
