<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CellPill from './index.svelte';
</script>

<Story
	component={CellPill}
	title="CellPill"
	description="Table cell displaying a pill/badge for enum/category values."
>
	{#snippet children()}
		<table>
			<tbody
				><tr>
					<CellPill value="Active" variant="success" />
					<CellPill value="Pending" variant="warning" />
					<CellPill value="Inactive" variant="danger" />
					<CellPill value="Draft" variant="default" />
					<CellPill value="Primary" variant="primary" />
				</tr></tbody
			>
		</table>
	{/snippet}
</Story>
