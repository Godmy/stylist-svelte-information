<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CellIcon from './index.svelte';
</script>

<Story component={CellIcon} title="CellIcon" description="Table cell displaying an SVG icon.">
	{#snippet children()}
		<table>
			<tbody
				><tr>
					<CellIcon icon="user" label="User" />
					<CellIcon icon="check-circle" label="Active" />
					<CellIcon icon="x-circle" label="Inactive" />
				</tr></tbody
			>
		</table>
	{/snippet}
</Story>
