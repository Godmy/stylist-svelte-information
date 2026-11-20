<script lang="ts">
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import ColumnManager from '$stylist/table/component/molecule/column-manager/index.svelte';
	import type { RecipeCatalog } from '$stylist/tree/interface/recipe/catalog';
	import type { CatalogTreeNode } from '$stylist/tree/type/object/catalog-tree-node';
	import createCatalogState from './state.svelte';
	import { prettyJson } from '$stylist/tree/function/script/pretty-json';
	import { TREE_CATALOG_MESSAGE } from '$stylist/tree/const/record/catalog-message';
	import { useMessage } from '$stylist/localization/function/hook/use-message';

	let props: RecipeCatalog = $props();
	const state = createCatalogState(() => props);
	const t = useMessage('catalog', TREE_CATALOG_MESSAGE);
	const uid = $props.id();

	const restProps = $derived.by(() => {
		const {
			rows: _rows,
			fields: _fields,
			idKey: _idKey,
			parentKey: _parentKey,
			labelKey: _labelKey,
			badgeKey: _badgeKey,
			activeKey: _activeKey,
			title: _title,
			selectedId: _selectedId,
			onSave: _onSave,
			readonly: _readonly,
			storageKey: _storageKey,
			class: _class,
			...rest
		} = props;
		return rest;
	});
</script>

{#snippet branch(list: CatalogTreeNode[], depth: number)}
	{#each list as node (node.id)}
		{@const open = node.children.length > 0 && state.isOpen(node, depth)}
		<li
			class="c-catalog__item"
			role="treeitem"
			aria-level={depth + 1}
			aria-selected={node.id === state.selectedId}
			aria-expanded={node.children.length ? open : undefined}
		>
			<div
				class="c-catalog__row"
				class:c-catalog__row--selected={node.id === state.selectedId}
				class:c-catalog__row--inactive={state.inactive(node)}
			>
				{#if node.children.length}
					<button
						type="button"
						class="c-catalog__toggle"
						aria-label={open ? t('collapse') : t('expand')}
						onclick={() => state.toggle(node, depth)}
					>
						<Icon name={open ? 'chevron-down' : 'chevron-right'} size="sm" />
					</button>
				{:else}
					<span class="c-catalog__toggle c-catalog__toggle--leaf" aria-hidden="true"></span>
				{/if}
				<button type="button" class="c-catalog__node" onclick={() => state.select(node.id)}>
					<span class="c-catalog__icon" class:c-catalog__icon--branch={node.children.length > 0}>
						<Icon
							name={node.children.length ? (open ? 'folder-open' : 'folder') : 'file-text'}
							size="sm"
						/>
					</span>
					<span class="c-catalog__label">{node.label}</span>
					{#if state.badge(node)}
						<span class="c-catalog__badge">{state.badge(node)}</span>
					{/if}
					{#each state.chipFields as field (field.key)}
						{@const text = state.display(field, node.row[field.key])}
						{#if text}
							<span class="c-catalog__chip" title="{field.header}: {String(node.row[field.key])}">
								<span class="c-catalog__chip-key">{field.header}</span>{text}
							</span>
						{/if}
					{/each}
					{#if node.descendants}
						<span class="c-catalog__count" title={t('children', { count: node.descendants })}
							>{node.descendants}</span
						>
					{/if}
				</button>
				{#if state.activeKey !== undefined}
					{@const hidden = state.inactive(node)}
					{#if state.readonly}
						<span
							class={['c-catalog__eye', { 'c-catalog__eye--off': hidden }]}
							role="img"
							aria-label={t(hidden ? 'hidden' : 'shown')}
							><Icon name={hidden ? 'eye-off' : 'eye'} size="sm" /></span
						>
					{:else}
						<button
							type="button"
							class={['c-catalog__eye', { 'c-catalog__eye--off': hidden }]}
							aria-pressed={!hidden}
							aria-label={t(hidden ? 'show' : 'hide', { name: node.label })}
							title={t(hidden ? 'show' : 'hide', { name: node.label })}
							disabled={state.toggling !== null}
							onclick={() => state.toggleActive(node)}
							><Icon name={hidden ? 'eye-off' : 'eye'} size="sm" /></button
						>
					{/if}
				{/if}
			</div>
			{#if open}
				<ul class="c-catalog__children" role="group">
					{@render branch(node.children, depth + 1)}
				</ul>
			{/if}
		</li>
	{/each}
{/snippet}

<section class="c-catalog {props.class ?? ''}" {...restProps}>
	<header class="c-catalog__header">
		<div class="c-catalog__heading">
			<h2 class="c-catalog__title">{props.title ?? t('title')}</h2>
			<span class="c-catalog__total">{t('records', { count: state.total })}</span>
		</div>
		<label class="c-catalog__search">
			<span class="c-catalog__sr">{t('search')}</span>
			<Icon name="search" size="sm" />
			<input
				type="search"
				placeholder={t('searchPlaceholder')}
				value={state.query}
				oninput={(event) => (state.query = event.currentTarget.value)}
			/>
		</label>
		<div class="c-catalog__actions">
			<button
				type="button"
				class="c-catalog__button c-catalog__button--toggle"
				aria-pressed={state.labelsOpen}
				aria-controls="{uid}-labels"
				title={state.labelsOpen ? t('hideLabels') : t('showLabels')}
				onclick={state.toggleLabels}
			>
				<Icon name="labels" size="sm" />{t('fields')}
			</button>
			<button type="button" class="c-catalog__button" onclick={() => state.setAll(true)}>
				<Icon name="plus" size="xs" />{t('expandAll')}
			</button>
			<button type="button" class="c-catalog__button" onclick={() => state.setAll(false)}>
				<Icon name="minus" size="xs" />{t('collapseAll')}
			</button>
		</div>
	</header>

	<div class="c-catalog__body" class:c-catalog__body--labels={state.labelsOpen}>
		{#if state.labelsOpen}
			<aside class="c-catalog__fields" id="{uid}-labels">
				<ColumnManager
					columns={state.columns}
					title={t('fields')}
					resetLabel={t('reset')}
					onColumnsChange={state.setColumns}
				/>
			</aside>
		{/if}

		<div class="c-catalog__tree">
			{#if !state.tree.length}
				<p class="c-catalog__empty">{t('empty')}</p>
			{:else if !state.visibleTree.length}
				<p class="c-catalog__empty">{t('notFound')}</p>
			{:else}
				<ul class="c-catalog__list" role="tree" aria-label={props.title ?? t('title')}>
					{@render branch(state.visibleTree, 0)}
				</ul>
			{/if}
		</div>

		<aside class="c-catalog__editor" aria-label={t('editor')}>
			{#if state.selected}
				<form
					class="c-catalog__form"
					onsubmit={(event) => {
						event.preventDefault();
						void state.save({ required: (name) => t('required', { name }), saved: t('saved') });
					}}
				>
					<div class="c-catalog__editor-head">
						<div class="c-catalog__editor-title">
							<span class="c-catalog__editor-kicker">{t('editor')}</span>
							<strong>{state.selected.label}</strong>
						</div>
						<button
							type="button"
							class="c-catalog__close"
							aria-label={t('close')}
							onclick={() => state.select('')}
						>
							<Icon name="x" size="sm" />
						</button>
					</div>

					{#each state.fields as field (field.key)}
						{@const value = state.draft[field.key]}
						{@const id = `${uid}-${field.key}`}
						<div
							class="c-catalog__field"
							class:c-catalog__field--changed={state.changedKeys.includes(field.key)}
						>
							<label class="c-catalog__field-label" for={id}>
								{field.header}
								{#if field.required && state.editable(field)}<span aria-hidden="true">*</span>{/if}
								<code>{field.key}</code>
								{#if !state.editable(field)}<em>{t('readOnly')}</em>{/if}
							</label>
							{#if !state.editable(field)}
								{#if field.kind === 'json'}
									<pre {id} class="c-catalog__readonly c-catalog__readonly--code">{prettyJson(
											value
										)}</pre>
								{:else if field.kind === 'boolean'}
									<output {id} class="c-catalog__readonly"
										>{value === null ? '—' : value ? t('yes') : t('no')}</output
									>
								{:else if field.kind === 'reference'}
									<output {id} class="c-catalog__readonly"
										>{state.display(field, value) || '—'}</output
									>
								{:else}
									<output {id} class="c-catalog__readonly">{value || '—'}</output>
								{/if}
							{:else if field.kind === 'boolean' && field.nullable}
								<select
									{id}
									value={value === null ? '' : value ? '1' : '0'}
									onchange={(event) =>
										state.setValue(
											field.key,
											event.currentTarget.value === '' ? null : event.currentTarget.value === '1'
										)}
								>
									<option value="">{t('none')}</option>
									<option value="1">{t('yes')}</option>
									<option value="0">{t('no')}</option>
								</select>
							{:else if field.kind === 'boolean'}
								<span class="c-catalog__switch">
									<input
										{id}
										type="checkbox"
										checked={value === true}
										onchange={(event) => state.setValue(field.key, event.currentTarget.checked)}
									/>
									<span>{value ? t('yes') : t('no')}</span>
								</span>
							{:else if field.kind === 'reference'}
								<select
									{id}
									value={value ?? ''}
									onchange={(event) => state.setValue(field.key, event.currentTarget.value)}
								>
									<option value="">{t('none')}</option>
									{#each state.options(field) as option (option.node.id)}
										<option value={option.node.id}
											>{'  '.repeat(option.depth)}{option.node.label}</option
										>
									{/each}
								</select>
							{:else if field.kind === 'textarea' || field.kind === 'json'}
								<textarea
									{id}
									class:c-catalog__code={field.kind === 'json'}
									rows={field.kind === 'json' ? 6 : 3}
									value={String(value ?? '')}
									oninput={(event) => state.setValue(field.key, event.currentTarget.value)}
								></textarea>
							{:else}
								<input
									{id}
									type="text"
									value={String(value ?? '')}
									oninput={(event) => state.setValue(field.key, event.currentTarget.value)}
								/>
							{/if}
						</div>
					{/each}

					{#if !state.readonly}
						<div class="c-catalog__footer">
							{#if state.status}
								<p
									class="c-catalog__status c-catalog__status--{state.status.tone}"
									role={state.status.tone === 'error' ? 'alert' : 'status'}
								>
									{state.status.text}
								</p>
							{/if}
							<div class="c-catalog__footer-actions">
								<button
									type="button"
									class="c-catalog__button"
									disabled={!state.changedKeys.length || state.saving}
									onclick={state.discard}>{t('cancel')}</button
								>
								<button
									type="submit"
									class="c-catalog__button c-catalog__button--primary"
									disabled={!state.changedKeys.length || state.saving}
								>
									<Icon name="save" size="xs" />{state.saving ? t('saving') : t('save')}
								</button>
							</div>
						</div>
					{/if}
				</form>
			{:else}
				<div class="c-catalog__placeholder">
					<Icon name="edit" size="lg" />
					<p>{t('select')}</p>
				</div>
			{/if}
		</aside>
	</div>
</section>

<style>
	.c-catalog {
		--c-catalog-accent: var(--color-primary-600, #4f46e5);
		--c-catalog-accent-soft: color-mix(in srgb, var(--c-catalog-accent) 12%, transparent);
		--c-catalog-line: var(--color-border-primary, #d8dbe3);
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
		border: 1px solid var(--c-catalog-line);
		border-radius: 0.75rem;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, inherit);
		overflow: hidden;
	}
	.c-catalog__header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1rem;
		padding: 0.85rem 1rem;
		border-bottom: 1px solid var(--c-catalog-line);
		background: linear-gradient(180deg, var(--c-catalog-accent-soft), transparent);
	}
	.c-catalog__heading {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
	}
	.c-catalog__title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 650;
	}
	.c-catalog__total {
		color: var(--color-text-secondary);
		font-size: 0.8rem;
	}
	.c-catalog__search {
		display: flex;
		flex: 1 1 16rem;
		align-items: center;
		gap: 0.4rem;
		min-width: 0;
		padding: 0 0.6rem;
		border: 1px solid var(--c-catalog-line);
		border-radius: 999px;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-secondary);
	}
	.c-catalog__search:focus-within {
		border-color: var(--c-catalog-accent);
		box-shadow: 0 0 0 3px var(--c-catalog-accent-soft);
	}
	.c-catalog__search input {
		flex: 1;
		min-width: 0;
		padding: 0.45rem 0;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--color-text-primary, inherit);
		font: inherit;
	}
	.c-catalog__sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.c-catalog__actions,
	.c-catalog__footer-actions {
		display: flex;
		gap: 0.4rem;
	}
	.c-catalog__button {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--c-catalog-line);
		border-radius: 0.5rem;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, inherit);
		font: inherit;
		font-size: 0.8rem;
		cursor: pointer;
		white-space: nowrap;
	}
	.c-catalog__button:hover:not(:disabled) {
		border-color: var(--c-catalog-accent);
		color: var(--c-catalog-accent);
	}
	.c-catalog__button:disabled {
		opacity: 0.45;
		cursor: default;
	}
	.c-catalog__button--primary {
		border-color: var(--c-catalog-accent);
		background: var(--c-catalog-accent);
		color: #fff;
	}
	.c-catalog__button--primary:hover:not(:disabled) {
		color: #fff;
		filter: brightness(1.08);
	}
	.c-catalog__body {
		display: grid;
		flex: 1;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
		min-height: 0;
	}
	.c-catalog__body--labels {
		grid-template-columns: minmax(11rem, 13rem) minmax(0, 1fr) minmax(18rem, 24rem);
	}
	.c-catalog__button--toggle[aria-pressed='true'] {
		border-color: var(--c-catalog-accent);
		background: var(--c-catalog-accent-soft);
		color: var(--c-catalog-accent);
	}
	.c-catalog__fields {
		border-right: 1px solid var(--c-catalog-line);
		overflow: auto;
	}
	.c-catalog__tree {
		min-width: 0;
		padding: 0.5rem 0.75rem 1rem;
		overflow: auto;
	}
	.c-catalog__list,
	.c-catalog__children {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.c-catalog__children {
		position: relative;
		margin-left: 0.95rem;
		padding-left: 0.65rem;
		border-left: 1px dashed color-mix(in srgb, var(--c-catalog-line) 80%, var(--c-catalog-accent));
	}
	.c-catalog__item {
		position: relative;
	}
	.c-catalog__children > .c-catalog__item::before {
		content: '';
		position: absolute;
		top: 1.05rem;
		left: -0.65rem;
		width: 0.55rem;
		border-top: 1px dashed color-mix(in srgb, var(--c-catalog-line) 80%, var(--c-catalog-accent));
	}
	.c-catalog__row {
		display: flex;
		align-items: flex-start;
		gap: 0.15rem;
		margin: 1px 0;
		border-radius: 0.5rem;
		transition: background-color 120ms;
	}
	.c-catalog__row:hover {
		background: var(--color-background-secondary, #f4f5f8);
	}
	.c-catalog__row--selected,
	.c-catalog__row--selected:hover {
		background: var(--c-catalog-accent-soft);
		box-shadow: inset 3px 0 0 var(--c-catalog-accent);
	}
	.c-catalog__row--inactive .c-catalog__label {
		opacity: 0.65;
	}
	.c-catalog__toggle {
		display: inline-flex;
		flex: 0 0 1.6rem;
		align-items: center;
		justify-content: center;
		height: 2.1rem;
		padding: 0;
		border: 0;
		border-radius: 0.4rem;
		background: transparent;
		color: var(--color-text-secondary);
		cursor: pointer;
	}
	.c-catalog__toggle:hover {
		color: var(--c-catalog-accent);
	}
	.c-catalog__toggle--leaf {
		cursor: default;
	}
	.c-catalog__node {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 0.45rem;
		min-width: 0;
		min-height: 2.1rem;
		padding: 0.3rem 0.5rem 0.3rem 0.1rem;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.c-catalog__toggle:focus-visible,
	.c-catalog__node:focus-visible,
	.c-catalog__button:focus-visible,
	.c-catalog__close:focus-visible {
		outline: 2px solid var(--c-catalog-accent);
		outline-offset: -2px;
		border-radius: 0.4rem;
	}
	.c-catalog__eye {
		display: inline-flex;
		flex: 0 0 1.8rem;
		align-items: center;
		justify-content: center;
		height: 1.8rem;
		padding: 0;
		border: 0;
		border-radius: 0.4rem;
		background: transparent;
		color: var(--c-catalog-accent);
	}
	button.c-catalog__eye {
		cursor: pointer;
	}
	button.c-catalog__eye:hover:not(:disabled),
	button.c-catalog__eye:focus-visible {
		background: var(--c-catalog-accent-soft);
	}
	button.c-catalog__eye:disabled {
		cursor: wait;
	}
	.c-catalog__eye--off {
		color: var(--color-text-secondary);
	}
	.c-catalog__icon {
		display: inline-flex;
		color: var(--color-text-secondary);
	}
	.c-catalog__icon--branch {
		color: #d79b28;
	}
	.c-catalog__label {
		font-weight: 550;
		overflow-wrap: anywhere;
	}
	.c-catalog__badge,
	.c-catalog__chip,
	.c-catalog__count {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		max-width: 100%;
		padding: 0.05rem 0.5rem;
		border-radius: 999px;
		font-size: 0.72rem;
		line-height: 1.5;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.c-catalog__badge {
		background: var(--c-catalog-accent-soft);
		color: var(--c-catalog-accent);
		font-weight: 600;
	}
	.c-catalog__chip {
		border: 1px solid var(--c-catalog-line);
		color: var(--color-text-secondary);
	}
	.c-catalog__chip-key {
		opacity: 0.7;
	}
	.c-catalog__chip-key::after {
		content: ':';
	}
	.c-catalog__count {
		margin-left: auto;
		background: var(--color-background-secondary, #f0f1f5);
		color: var(--color-text-secondary);
		font-variant-numeric: tabular-nums;
	}
	.c-catalog__empty {
		margin: 2rem 0;
		color: var(--color-text-secondary);
		text-align: center;
	}
	.c-catalog__editor {
		min-width: 0;
		border-left: 1px solid var(--c-catalog-line);
		background: var(--color-background-secondary, #f8f9fb);
		overflow: auto;
	}
	.c-catalog__form {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 1rem;
	}
	.c-catalog__editor-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
	}
	.c-catalog__editor-title {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.c-catalog__editor-kicker {
		color: var(--color-text-secondary);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.c-catalog__close {
		display: inline-flex;
		padding: 0.25rem;
		border: 0;
		border-radius: 0.4rem;
		background: transparent;
		color: var(--color-text-secondary);
		cursor: pointer;
	}
	.c-catalog__field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding-left: 0.6rem;
		border-left: 2px solid transparent;
	}
	.c-catalog__field--changed {
		border-left-color: var(--c-catalog-accent);
	}
	.c-catalog__field-label {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem;
		font-size: 0.8rem;
		font-weight: 600;
	}
	.c-catalog__field-label code {
		color: var(--color-text-secondary);
		font-size: 0.7rem;
		font-weight: 400;
	}
	.c-catalog__field-label em {
		color: var(--color-text-secondary);
		font-size: 0.7rem;
		font-weight: 400;
	}
	.c-catalog__field input[type='text'],
	.c-catalog__field select,
	.c-catalog__field textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 0.45rem 0.6rem;
		border: 1px solid var(--c-catalog-line);
		border-radius: 0.45rem;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, inherit);
		font: inherit;
		font-size: 0.85rem;
	}
	.c-catalog__field textarea {
		resize: vertical;
	}
	.c-catalog__field :is(input, select, textarea):focus {
		border-color: var(--c-catalog-accent);
		outline: 0;
		box-shadow: 0 0 0 3px var(--c-catalog-accent-soft);
	}
	.c-catalog__code,
	.c-catalog__readonly--code {
		font-family: var(--font-family-mono, ui-monospace, monospace);
		font-size: 0.75rem !important;
	}
	.c-catalog__readonly {
		display: block;
		margin: 0;
		padding: 0.4rem 0.6rem;
		border-radius: 0.45rem;
		background: color-mix(in srgb, var(--c-catalog-line) 35%, transparent);
		color: var(--color-text-secondary);
		font-size: 0.85rem;
		overflow-wrap: anywhere;
	}
	.c-catalog__readonly--code {
		max-height: 16rem;
		overflow: auto;
		white-space: pre;
	}
	.c-catalog__switch {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
	}
	.c-catalog__switch input {
		width: 1rem;
		height: 1rem;
		accent-color: var(--c-catalog-accent);
	}
	.c-catalog__footer {
		position: sticky;
		bottom: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0 -1rem -1rem;
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--c-catalog-line);
		background: var(--color-background-secondary, #f8f9fb);
	}
	.c-catalog__footer-actions {
		justify-content: flex-end;
	}
	.c-catalog__status {
		margin: 0;
		font-size: 0.8rem;
	}
	.c-catalog__status--error {
		color: var(--color-danger-600, #c62828);
	}
	.c-catalog__status--success {
		color: var(--color-success-600, #2e7d32);
	}
	.c-catalog__placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 3rem 1.5rem;
		color: var(--color-text-secondary);
		text-align: center;
		font-size: 0.85rem;
	}
	@media (max-width: 1100px) {
		.c-catalog__body {
			grid-template-columns: minmax(0, 1fr);
		}
		.c-catalog__body--labels {
			grid-template-columns: minmax(10rem, 12rem) minmax(0, 1fr);
		}
		.c-catalog__editor {
			grid-column: 1 / -1;
			border-top: 1px solid var(--c-catalog-line);
			border-left: 0;
		}
	}
	@media (max-width: 700px) {
		.c-catalog__body,
		.c-catalog__body--labels {
			grid-template-columns: minmax(0, 1fr);
		}
		.c-catalog__fields {
			border-right: 0;
			border-bottom: 1px solid var(--c-catalog-line);
		}
	}
</style>
