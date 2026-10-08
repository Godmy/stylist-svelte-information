<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CellHeader from './index.svelte';

	let sortKey = $state('name');
	let sortDir = $state<'asc' | 'desc' | 'none'>('asc');
</script>

<Story
	component={CellHeader}
	title="CellHeader"
	description="Sortable table header cell with sort-direction icon."
>
	{#snippet children()}
		<table>
			<thead
				><tr>
					<CellHeader
						title="Name"
						sortKey="name"
						currentSortKey={sortKey}
						currentSortDirection={sortDir}
						onValueChange={(k) => {
							sortKey = k;
							sortDir = sortDir === 'asc' ? 'desc' : 'asc';
						}}
					/>
					<CellHeader
						title="Email"
						sortKey="email"
						currentSortKey={sortKey}
						currentSortDirection={sortDir}
						onValueChange={(k) => {
							sortKey = k;
							sortDir = 'asc';
						}}
					/>
					<CellHeader title="Role" />
				</tr></thead
			>
		</table>
	{/snippet}
</Story>
