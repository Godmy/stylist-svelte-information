<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FilterPills from './index.svelte';

	let active = $state<string[]>([]);
</script>

<Story
	component={FilterPills}
	title="FilterPills"
	description="Pill group filter for enum/category columns."
>
	{#snippet children()}
		<FilterPills
			columnKey="role"
			label="Role"
			options={['Admin', 'Editor', 'Viewer', 'Guest']}
			{active}
			onToggle={(_, v) => {
				active = active.includes(v) ? active.filter((x) => x !== v) : [...active, v];
			}}
		/>
		<p style="margin-top:.5rem;font-size:12px;color:gray">Active: {active.join(', ') || '—'}</p>
	{/snippet}
</Story>
