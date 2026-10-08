<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FilterBar from './index.svelte';

	let search = $state('');
	let active = $state<string[]>([]);
</script>

<Story
	component={FilterBar}
	title="FilterBar"
	description="Composed filter bar: text search + pill group filters."
>
	{#snippet children()}
		<FilterBar
			searchValue={search}
			searchPlaceholder="Search..."
			pillGroups={[
				{
					columnKey: 'status',
					label: 'Status',
					options: ['Active', 'Inactive', 'Pending'],
					active
				}
			]}
			onSearch={(v) => {
				search = v;
			}}
			onTogglePill={(_, v) => {
				active = active.includes(v) ? active.filter((x) => x !== v) : [...active, v];
			}}
		/>
	{/snippet}
</Story>
