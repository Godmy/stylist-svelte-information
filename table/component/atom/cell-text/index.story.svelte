<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CellText from './index.svelte';
</script>

<Story
	component={CellText}
	title="CellText"
	description="Table cell for text/number values with optional truncation."
>
	{#snippet children()}
		<table>
			<tbody>
				<tr>
					<CellText value="Hello world" />
					<CellText value={42} align="right" />
				</tr>
				<tr>
					<CellText
						value="A very long text that gets truncated when it overflows the cell boundary"
						truncate
					/>
				</tr>
				<tr><CellText value={null} /></tr>
			</tbody>
		</table>
	{/snippet}
</Story>
