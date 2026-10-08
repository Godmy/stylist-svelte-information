<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import RowExpandable from './index.svelte';
</script>

<Story
	component={RowExpandable}
	title="RowExpandable"
	description="Table row that expands to reveal additional detail content."
>
	{#snippet children()}
		<table>
			<tbody>
				{#each ['Alice Johnson', 'Bob Smith', 'Charlie Brown'] as name}
					<RowExpandable>
						{#snippet rowContent()}
							<td style="padding:.4rem .75rem;font-size:13px;">{name}</td>
							<td style="padding:.4rem .75rem;font-size:13px;color:gray">user@example.com</td>
						{/snippet}
						{#snippet expandableContent()}
							<div style="padding:.5rem">
								<strong>Details for {name}:</strong> joined 2024, last active today.
							</div>
						{/snippet}
					</RowExpandable>
				{/each}
			</tbody>
		</table>
	{/snippet}
</Story>
