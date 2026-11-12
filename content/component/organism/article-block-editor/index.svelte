<script lang="ts">
	import type { RecipeArticleBlockEditor } from '$stylist/content/interface/recipe/article-block-editor';
	import { createArticleBlockEditorState } from '$stylist/content/component/organism/article-block-editor/state.svelte';
	let { value = $bindable([]), ...props }: RecipeArticleBlockEditor = $props();
	const state = createArticleBlockEditorState(
		() => props,
		() => value
	);
</script>

<fieldset class="blocks" use:state.connect>
	<legend>Текст статьи</legend>
	{#snippet adder(index: number)}
		<div class="adder" class:adder--open={state.adding === index}>
			{#if state.adding === index}
				<span>Добавить:</span>
				{#each state.types as item (item.type)}
					<button type="button" onclick={() => state.insert(index, item.type)}>{item.label}</button>
				{/each}
				<button type="button" class="quiet" onclick={() => (state.adding = null)}>Отмена</button>
			{:else}
				<button
					type="button"
					class="plus"
					onclick={() => (state.adding = index)}
					aria-label="Добавить блок здесь"
					title="Добавить блок здесь">+</button
				>
			{/if}
		</div>
	{/snippet}
	<div class="outline">
		<small>
			{state.blockCount(value.length)}, {state.sections.length}
			{state.plural(state.sections.length, 'раздел', 'раздела', 'разделов')}. Нажмите на раздел,
			чтобы открыть его.
		</small>
		<span class="tools">
			<button
				type="button"
				onclick={() => state.sections.forEach((section) => state.open.add(section.key))}
				>Развернуть все</button
			>
			<button type="button" onclick={() => state.open.clear()}>Свернуть все</button>
		</span>
	</div>
	{#if !value.length}{@render adder(0)}{/if}
	{#each state.sections as section (section.key)}
		{@const expanded = state.open.has(section.key)}
		<section class="part" class:part--sub={section.heading?.level === 3}>
			<button
				type="button"
				class="part-toggle"
				aria-expanded={expanded}
				onclick={() => state.toggle(section.key)}
			>
				<span class="chevron" aria-hidden="true">{expanded ? '▾' : '▸'}</span>
				<span class="part-title">
					{section.heading
						? section.heading.text.trim() || 'Заголовок без текста'
						: 'Начало статьи'}
				</span>
				<small>{state.blockCount(section.end - section.start)}</small>
			</button>
			{#if !expanded}
				{@const text = state.preview(section)}
				{#if text}<p class="part-preview">{text}</p>{/if}
			{:else}
				{#if section.start === 0}{@render adder(0)}{/if}
				{#each state.runs(section) as run (value[run.start])}
					{@const index = run.start}
					{@const block = value[index]}
					{@const count = run.end - run.start}
					<div class="block block--{block.type}" id={state.blockId(index)} data-block-index={index}>
						<header>
							<strong>
								{index + 1}{count > 1 ? `–${run.end}` : ''}.
								{block.type === 'paragraph' ? 'Текст' : state.typeLabel(block.type)}
							</strong>
							{#if block.type === 'heading'}<code>#{block.id}</code>{/if}
							{#if block.type === 'paragraph'}<small>{state.paragraphs(count)}</small>{/if}
							<span class="tools">
								<button
									type="button"
									disabled={index === 0}
									onclick={() => state.move(run, -1)}
									aria-label="Выше">↑</button
								>
								<button
									type="button"
									disabled={run.end === value.length}
									onclick={() => state.move(run, 1)}
									aria-label="Ниже">↓</button
								>
								<button type="button" onclick={() => state.remove(run)} aria-label="Удалить блок"
									>✕</button
								>
							</span>
						</header>
						{#if block.type === 'heading'}
							<div class="row">
								<select bind:value={block.level} aria-label="Уровень">
									<option value={2}>Раздел (H2)</option>
									<option value={3}>Подраздел (H3)</option>
								</select>
								<input bind:value={block.text} aria-label="Заголовок" maxlength="200" />
							</div>
							<label>
								Пункт «В этой статье»
								<input
									bind:value={block.contents}
									maxlength="120"
									placeholder="пусто — не показывать"
								/>
							</label>
						{:else if block.type === 'paragraph'}
							<textarea
								rows="3"
								aria-label="Текст, абзацы разделяются пустой строкой"
								value={state.runHtml(run)}
								use:state.autosize
								oninput={(event) => state.typeText(run, event.currentTarget.value)}
								onchange={(event) => state.setText(run, event.currentTarget.value)}></textarea>
							<small>Пустая строка — новый абзац.</small>
						{:else if block.type === 'list'}
							<label class="check"
								><input type="checkbox" bind:checked={block.ordered} /> Нумерованный</label
							>
							<textarea
								rows="3"
								aria-label="Пункты списка, по одному в строке"
								value={block.items.join('\n')}
								use:state.autosize
								onchange={(event) => (block.items = state.lines(event.currentTarget.value))}
							></textarea>
							<small>Один пункт — одна строка.</small>
						{:else if block.type === 'note'}
							<label class="check">
								<input type="checkbox" bind:checked={block.emergency} /> Экстренные номера
							</label>
							<textarea
								bind:value={block.html}
								rows="3"
								aria-label="Текст врезки"
								use:state.autosize></textarea>
							<small>Можно &lt;p&gt;, &lt;ul&gt;/&lt;li&gt; и ссылки.</small>
						{:else if block.type === 'table'}
							<textarea
								rows="3"
								aria-label="Таблица"
								value={state.tableText(block)}
								use:state.autosize
								onchange={(event) => state.setTable(block, event.currentTarget.value)}></textarea>
							<small>Первая строка — шапка, ячейки разделяются «|».</small>
						{:else if block.type === 'comparison'}
							<div class="comparison">
								{#each block.columns as column, n (n)}
									<div class="comparison-column">
										<div class="row">
											<input
												bind:value={column.title}
												aria-label="Заголовок колонки {n + 1}"
												maxlength="80"
											/>
											<select bind:value={column.tone} aria-label="Цвет колонки {n + 1}">
												<option value="positive">Зелёный (плюсы)</option>
												<option value="negative">Красный (минусы)</option>
												<option value="neutral">Нейтральный</option>
											</select>
											{#if block.columns.length > 2}
												<button
													type="button"
													onclick={() => block.columns.splice(n, 1)}
													aria-label="Убрать колонку {n + 1}">✕</button
												>
											{/if}
										</div>
										<textarea
											rows="3"
											aria-label="Пункты колонки {n + 1}, по одному в строке"
											value={column.items.join('\n')}
											use:state.autosize
											onchange={(event) => (column.items = state.lines(event.currentTarget.value))}
										></textarea>
									</div>
								{/each}
							</div>
							<small>Один пункт — одна строка, без «;» в конце.</small>
							{#if block.columns.length < 4}
								<button
									type="button"
									onclick={() => block.columns.push({ title: '', tone: 'neutral', items: [] })}
									>+ Колонка</button
								>
							{/if}
						{:else if block.type === 'photos'}
							<select bind:value={block.variant} aria-label="Вид">
								<option value="photo">Фото (два и больше — в ряд)</option>
								<option value="hero">Широкое фото над текстом (первым блоком)</option>
								<option value="illustration">Иллюстрация-обложка</option>
								<option value="infographic">Инфографика</option>
							</select>
							<ul class="photos">
								{#each block.photos as item, n (item.src)}
									<li>
										<img
											src={item.src}
											alt=""
											width={item.width}
											height={item.height}
											loading="lazy"
										/>
										<input
											bind:value={item.alt}
											maxlength="300"
											aria-label="Описание фото для поиска и экранного диктора"
											placeholder="Описание (не показывается на странице)"
										/>
										<span class="tools">
											<button
												type="button"
												disabled={n === 0}
												onclick={() => state.movePhoto(block.photos, n, -1)}
												aria-label="Левее">←</button
											>
											<button
												type="button"
												disabled={n === block.photos.length - 1}
												onclick={() => state.movePhoto(block.photos, n, 1)}
												aria-label="Правее">→</button
											>
											<button
												type="button"
												onclick={() => block.photos.splice(n, 1)}
												aria-label="Убрать фото">✕</button
											>
										</span>
									</li>
								{/each}
							</ul>
							<div class="row">
								{#if props.uploadImage}<label class="file">
										Загрузить фото
										<input
											type="file"
											accept="image/jpeg,image/png,image/webp"
											multiple
											disabled={state.busy}
											onchange={(event) => state.upload(block, event.currentTarget)}
										/>
									</label>{/if}
								<input
									placeholder="Адрес опубликованного фото"
									disabled={!props.resolveImage}
									aria-label="Путь к опубликованному фото"
									onkeydown={(event) => {
										if (event.key === 'Enter') {
											event.preventDefault();
											state.addByPath(block, event.currentTarget);
										}
									}}
								/>
							</div>
							{#if state.uploadError?.block === block}
								<p class="alert" role="alert">{state.uploadError.text}</p>
							{/if}
						{/if}
					</div>
					{@render adder(run.end)}
				{/each}
			{/if}
		</section>
	{/each}
</fieldset>

<style>
	.guide-editor {
		display: grid;
		gap: 1rem;
		min-width: 0;
		max-width: 64rem;
	}
	p {
		margin: 0;
	}

	.lead,
	small {
		color: var(--text-muted);
		font-size: var(--step--1);
	}
	.alert,
	.ok {
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius);
	}
	.alert {
		background: #fdecea;
		color: #8a1c12;
	}
	.ok {
		background: #e8f4ec;
		color: #1d5631;
	}
	.offer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: var(--radius);
		background: #fff6e0;
		color: #5c4300;
	}
	.offer p {
		flex: 1 1 16rem;
	}
	fieldset {
		display: grid;
		gap: 0.75rem;
		min-width: 0;
		margin: 0;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}
	legend {
		padding: 0 0.25rem;
		font-weight: 600;
	}
	label {
		display: grid;
		gap: 0.25rem;
	}
	label.check {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	input:not([type='checkbox']),
	select,
	textarea {
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		min-height: 2.75rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font: inherit;
	}
	textarea {
		resize: vertical;
		line-height: 1.5;
	}
	.path {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.cover {
		width: min(100%, 24rem);
		border-radius: var(--radius);
	}
	button {
		min-height: 2.75rem;
		padding: 0 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface, #fff);
		font: inherit;
		cursor: pointer;
	}
	button:disabled {
		opacity: 0.5;
		cursor: default;
	}
	.primary {
		border-color: var(--accent, #173f35);
		background: var(--accent, #173f35);
		color: #fff;
	}

	.outline {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.part {
		display: grid;
		gap: 0.5rem;
		min-width: 0;
	}
	.part--sub {
		margin-left: 1.25rem;
	}
	.part-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		text-align: left;
		background: var(--surface-muted, #f5f3ee);
	}
	.part--sub .part-toggle {
		background: var(--surface, #fff);
	}
	.part-title {
		flex: 1;
		min-width: 0;
		font-weight: 600;
		overflow-wrap: anywhere;
	}
	.part-preview {
		margin: -0.25rem 0 0.25rem 2rem;
		color: var(--text-muted);
		font-size: var(--step--1);
	}
	.adder {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
	}
	.adder .plus {
		width: 100%;
		min-height: 1.5rem;
		padding: 0;
		border-style: dashed;
		border-color: transparent;
		background: none;
		color: var(--text-muted);
		line-height: 1;
	}
	.adder .plus:hover,
	.adder .plus:focus-visible {
		border-color: var(--border);
	}
	.adder--open {
		padding: 0.5rem;
		border: 1px dashed var(--border);
		border-radius: var(--radius);
	}
	.adder--open button {
		min-height: 2.25rem;
		padding: 0 0.5rem;
		font-size: var(--step--1);
	}
	.adder .quiet {
		border-color: transparent;
		background: none;
		color: var(--text-muted);
	}
	.block {
		display: grid;
		gap: 0.5rem;
		padding: 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface, #fff);
		scroll-margin: 6rem 0 12rem;
	}
	.block--heading {
		border-left: 4px solid #b99b62;
	}
	.block header,
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.row > input,
	.row > select {
		flex: 1 1 12rem;
		width: auto;
	}
	.tools {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-left: auto;
	}
	.photos {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 1fr));
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.photos li {
		display: grid;
		gap: 0.25rem;
	}
	.photos img {
		width: 100%;
		height: 8rem;
		object-fit: cover;
		border-radius: var(--radius);
	}
	.comparison {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
		gap: 0.75rem;
	}
	.comparison-column {
		display: grid;
		align-content: start;
		gap: 0.5rem;
	}
	.file input {
		min-height: auto;
		border: 0;
		padding: 0;
	}
	.actions {
		position: sticky;
		bottom: 0;
		display: grid;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-top: 1px solid var(--border);
		background: var(--bg, #fff);
	}
	.problems {
		display: grid;
		gap: 0.25rem;
		max-height: 40vh;
		overflow: auto;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius);
		background: #fdecea;
		color: #8a1c12;
	}
	.problems ul {
		margin: 0;
		padding-left: 1.25rem;
	}
	.buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.state {
		margin-right: auto;
		color: var(--text-muted);
		font-size: var(--step--1);
	}
	.state--dirty {
		color: #8a5a00;
		font-weight: 600;
	}
</style>
