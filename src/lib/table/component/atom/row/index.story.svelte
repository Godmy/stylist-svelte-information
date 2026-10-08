<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Row from './index.svelte';
	import Cell from '$stylist/table/component/atom/cell/index.svelte';
</script>

<Story
	component={Row}
	title="Row"
	description="Table row with striped, active, and hoverable states."
>
	{#snippet children()}
		<table>
			<tbody>
				{#each ['Alpha', 'Beta', 'Gamma', 'Delta'] as name, i}
					<Row striped hoverable>
						{#snippet content()}
							<Cell>{name}</Cell>
							<Cell align="right">{i + 1}</Cell>
						{/snippet}
					</Row>
				{/each}
			</tbody>
		</table>
	{/snippet}
</Story>
