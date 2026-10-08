<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FilterText from './index.svelte';

	let value = $state('');
</script>

<Story
	component={FilterText}
	title="FilterText"
	description="Text search input for table filtering."
>
	{#snippet children()}
		<FilterText
			placeholder="Search users..."
			{value}
			onSearch={(v) => {
				value = v;
			}}
		/>
		<p style="margin-top:.5rem;font-size:12px;color:gray">Value: {value}</p>
	{/snippet}
</Story>
