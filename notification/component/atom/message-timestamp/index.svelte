<script lang="ts">
	import createMessageTimestampState from './state.svelte';
	import type { RecipeMessageTimestamp } from '$stylist/notification/interface/recipe/message-timestamp';

	let props: RecipeMessageTimestamp = $props();

	const state = createMessageTimestampState(() => props);
</script>

<time class={state.classes} datetime={state.formattedDateTime}>
	{state.formattedTime}
</time>

<style>
</style>
