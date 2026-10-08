<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Cell from './index.svelte';
</script>

<Story
	component={Cell}
	title="Cell"
	description="Base table cell — renders td or th based on variant."
>
	{#snippet children()}
		<table>
			<thead
				><tr>
					<Cell variant="header">Name</Cell>
					<Cell variant="header" align="right">Count</Cell>
				</tr></thead
			>
			<tbody>
				<tr><Cell>Alpha</Cell><Cell align="right">42</Cell></tr>
				<tr><Cell>Beta</Cell><Cell align="right">7</Cell></tr>
			</tbody>
		</table>
	{/snippet}
</Story>
