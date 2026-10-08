<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import Table from './index.svelte';
	import Row from '../row/index.svelte';
	import Cell from '../cell/index.svelte';

	const controls: SlotStory[] = [
		{ name: 'caption', type: 'text', defaultValue: 'Example table' },
		{ name: 'striped', type: 'boolean', defaultValue: false },
		{ name: 'bordered', type: 'boolean', defaultValue: false },
		{ name: 'hoverable', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	id="atoms-table"
	title="Table"
	component={Table}
	category="Atoms"
	description="A table component for displaying tabular data."
	{controls}
>
	{#snippet children(values: any)}
		<section class="_c1">
			<div class="_c2">
				<p class="_c3">Primary Table Example</p>
				<p class="_c4">A table component for displaying tabular data.</p>
				<p class="_c5">
					striped: {values.striped ? 'on' : 'off'} | bordered: {values.bordered ? 'on' : 'off'} | hoverable:
					{values.hoverable ? 'on' : 'off'}
				</p>

				<div class="_c6">
					<Table {...values}>
						{#snippet content()}
							<thead>
								<Row>
									{#snippet content()}
										<Cell variant="header">Name</Cell>
										<Cell variant="header">Value</Cell>
									{/snippet}
								</Row>
							</thead>
							<tbody>
								<Row striped={values.striped}>
									{#snippet content()}
										<Cell>Alpha</Cell>
										<Cell>123</Cell>
									{/snippet}
								</Row>
								<Row striped={values.striped}>
									{#snippet content()}
										<Cell>Beta</Cell>
										<Cell>456</Cell>
									{/snippet}
								</Row>
							</tbody>
						{/snippet}
					</Table>
				</div>
			</div>

			<div class="_c7">
				<h3 class="_c8">Table Variations</h3>
				<p class="_c9">Different table configurations with various properties.</p>

				<div class="_c10">
					<article class="_c11">
						<p class="_c12">Striped Table</p>
						<div class="_c13">
							<Table caption="Striped example" striped={true}>
								{#snippet content()}
									<thead>
										<Row>
											{#snippet content()}
												<Cell variant="header">Product</Cell>
												<Cell variant="header">Price</Cell>
											{/snippet}
										</Row>
									</thead>
									<tbody>
										<Row striped>
											{#snippet content()}
												<Cell>Item 1</Cell>
												<Cell>$10.00</Cell>
											{/snippet}
										</Row>
										<Row striped>
											{#snippet content()}
												<Cell>Item 2</Cell>
												<Cell>$20.00</Cell>
											{/snippet}
										</Row>
									</tbody>
								{/snippet}
							</Table>
						</div>
					</article>

					<article class="_c11">
						<p class="_c12">Bordered Table</p>
						<div class="_c13">
							<Table caption="Bordered example" bordered={true}>
								{#snippet content()}
									<thead>
										<Row>
											{#snippet content()}
												<Cell variant="header">ID</Cell>
												<Cell variant="header">Status</Cell>
											{/snippet}
										</Row>
									</thead>
									<tbody>
										<Row>
											{#snippet content()}
												<Cell>#001</Cell>
												<Cell>Active</Cell>
											{/snippet}
										</Row>
										<Row>
											{#snippet content()}
												<Cell>#002</Cell>
												<Cell>Inactive</Cell>
											{/snippet}
										</Row>
									</tbody>
								{/snippet}
							</Table>
						</div>
					</article>
				</div>
			</div>
		</section>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		width: 100%;
		gap: 2rem;
	}
	@media (min-width: 1024px) {
		._c1 {
			grid-template-columns: 1fr 1fr;
		}
	}
	._c10 {
		margin-top: 1.25rem;
	}
	._c10 > * + * {
		margin-top: 1rem;
	}
	._c11 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	._c12 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c13 {
		overflow-x: auto;
	}
	._c2 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		color: var(--color-text-secondary);
		text-transform: uppercase;
	}
	._c4 {
		margin-top: 0.25rem;
		color: var(--color-text-primary);
	}
	._c5 {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-secondary);
	}
	._c6 {
		margin-top: 1.5rem;
		overflow-x: auto;
	}
	._c7 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c8 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c9 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
