<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MessageTimestamp from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'formatStyle',
			type: 'select',
			defaultValue: 'datetime',
			options: ['datetime', 'time', 'date']
		},
		{ name: 'showRelative', type: 'boolean', defaultValue: false },
		{ name: 'minutesAgo', type: 'number', defaultValue: 5, min: 0, max: 180 }
	];
</script>

<Story
	{controls}
	component={MessageTimestamp}
	title="MessageTimestamp"
	category="Atoms/Information/Notification"
	description="Formatted message timestamp with optional relative mode"
>
	{#snippet children(values: any)}
		<MessageTimestamp
			timestamp={new Date(Date.now() - (Number(values.minutesAgo) || 0) * 60_000)}
			formatStyle={values.formatStyle as 'datetime' | 'time' | 'date'}
			showRelative={values.showRelative as boolean}
		/>
	{/snippet}
</Story>
