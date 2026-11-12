<script lang="ts">
	import type { RecipeArticleReader } from '$stylist/content/interface/recipe/article-reader';
	import type { CreditedImage } from '$stylist/image/type/object/credited-image';
	import ComparisonCard from '$stylist/table/component/molecule/comparison-card/index.svelte';
	import { normalizeArticleHtml } from '$stylist/content/function/transform/article-html';
	import { createArticleReaderState } from '$stylist/content/component/organism/article-reader/state.svelte';
	let props: RecipeArticleReader = $props();
	const state = createArticleReaderState(() => props);
</script>

{#snippet photo(item: CreditedImage, eager: boolean, classes: string[] = [])}
	<figure class={['article-photo', ...classes]}>
		<a
			href={item.src}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={item.alt ? `Открыть изображение: ${item.alt}` : 'Открыть изображение'}
		>
			<img
				src={item.src}
				alt={item.alt}
				width={item.width}
				height={item.height}
				decoding="async"
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : undefined}
			/>
		</a>
		{#if item.credit}
			<!-- The attribution a free licence requires (TASL); archive photos have no caption. -->
			<figcaption class="article-photo__credit">
				Фото: <a href={item.credit.source} target="_blank" rel="noopener noreferrer"
					>«{item.credit.title}»</a
				>, автор {item.credit.author},
				<a href={item.credit.licenseUrl} target="_blank" rel="noopener noreferrer license"
					>{item.credit.license}</a
				>
			</figcaption>
		{/if}
	</figure>
{/snippet}

<article
	class={['article-reader article-reader--editorial', props.class]}
	style={props.style}
	class:article-reader--compact={props.article.compact}
>
	<header class="article-header">
		{@render props.beforeTitle?.()}
		{#if props.eyebrow}<p class="article-header__eyebrow">{props.eyebrow}</p>{/if}
		<h1 class="article-header__title" id="section-1">{props.article.headline}</h1>
		<p class="article-header__lead">{@html normalizeArticleHtml(props.article.lead)}</p>
	</header>
	{#if state.wide}
		{@render photo(state.wide, true, ['article-photo--hero'])}
	{/if}
	<div class="article-reader__reading-layout" use:state.contentsAction={state.contentsKey}>
		<nav class="article-reader__contents" aria-label={props.contentsLabel ?? 'Содержание статьи'}>
			<details class="article-contents">
				<summary class="article-reader__contents-title"
					>{props.contentsLabel ?? 'В этой статье'}</summary
				>
				<ul>
					{#each state.contents as entry (entry.id)}
						<li><a href={`#${entry.id}`}>{entry.label}</a></li>
					{/each}
				</ul>
			</details>
		</nav>
		<div class="article-reader__prose">
			{#each props.article.blocks as block, index (index)}
				{#if block.type === 'heading'}
					{#if block.level === 2}
						<h2 id={block.id}>{block.text}</h2>
					{:else}
						<h3 id={block.id}>{block.text}</h3>
					{/if}
				{:else if block.type === 'paragraph'}
					<p>{@html normalizeArticleHtml(block.html)}</p>
				{:else if block.type === 'list'}
					{#if block.ordered}
						<ol>
							{#each block.items as item, n (n)}<li>{@html normalizeArticleHtml(item)}</li>{/each}
						</ol>
					{:else}
						<ul>
							{#each block.items as item, n (n)}<li>{@html normalizeArticleHtml(item)}</li>{/each}
						</ul>
					{/if}
				{:else if block.type === 'photos'}
					{#if index === 0 && state.wide}
						<!-- shown above the reading column -->
					{:else if block.photos.length === 1}
						{@render photo(block.photos[0], index === state.firstPhoto && index < 2, [
							...(block.variant === 'hero' || block.variant === 'illustration'
								? ['article-photo--hero']
								: []),
							...(block.variant === 'illustration' ? ['article-photo--illustration'] : []),
							...(block.variant === 'infographic' ? ['article-photo--infographic'] : [])
						])}
					{:else}
						<div
							class="article-gallery"
							class:article-gallery--three={block.photos.length % 3 === 0}
						>
							{#each block.photos as item (item.src)}
								{@render photo(item, false)}
							{/each}
						</div>
					{/if}
				{:else if block.type === 'note'}
					<div class="article-note" class:article-note--emergency={block.emergency}>
						{@html normalizeArticleHtml(block.html, { block: true })}
					</div>
				{:else if block.type === 'comparison'}
					<!-- Column titles are h4 under the article's h3 subsections. -->
					<ComparisonCard
						class="article-comparison"
						headingLevel={3}
						columns={block.columns.map((column) => ({
							title: column.title,
							tone: column.tone,
							items: column.items.map((label) => ({ label }))
						}))}
					>
						<!-- Items are the server-normalized inline HTML of list items. -->
						{#snippet item(entry)}{@html normalizeArticleHtml(entry.label)}{/snippet}
					</ComparisonCard>
				{:else if block.type === 'table'}
					<table>
						<thead>
							<tr>
								{#each block.head as cell, n (n)}<th scope="col"
										>{@html normalizeArticleHtml(cell)}</th
									>{/each}
							</tr>
						</thead>
						<tbody>
							{#each block.rows as row, r (r)}
								<tr>
									{#each row as cell, n (n)}<td>{@html normalizeArticleHtml(cell)}</td>{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			{/each}
		</div>
	</div>
	{#if props.article.links.length}
		<nav class="article-reader__links" aria-label={props.linksLabel ?? 'Другие разделы'}>
			{#each props.article.links as link, n (n)}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>
	{/if}
	{@render props.afterArticle?.()}
</article>

<style>
	:global(.article-reader) {
		width: var(--page-width, min(100% - 2rem, 80rem));
		margin-inline: auto;
		padding: 32px 0 48px;
		color: var(--text);
		line-height: 1.7;
	}
	:global(.article-reader h1),
	:global(.article-reader h2) {
		font-family: var(--font-display);
		line-height: 1.2;
	}
	:global(
		.article-reader:not(.article-reader--illustrated):not(.article-reader--article):not(
				.article-reader--editorial
			):not(.article-reader--index)
			> *
	) {
		max-width: var(--container-narrow);
	}
	:global(.article-reader__breadcrumbs) {
		--color-text-primary: var(--text);
		--color-text-secondary: var(--text-muted);
		--color-text-tertiary: var(--text-muted);
		--color-primary-600: var(--brand-700);
	}
	:global(.article-reader__breadcrumbs .c-breadcrumbs) {
		padding: 0;
		border: 0;
		background: transparent;
	}
	:global(.article-reader__breadcrumbs .c-breadcrumb-link) {
		padding: 0;
		background: transparent;
	}
	:global(.article-reader__breadcrumbs .c-breadcrumbs__separator) {
		font-size: 0;
	}
	:global(.article-reader__breadcrumbs .c-breadcrumbs__separator::before) {
		content: '\\';
		font-size: 0.875rem;
	}
	:global(.article-reader__illustration) {
		margin: 24px 0 0;
	}
	:global(.article-reader__illustration a) {
		display: block;
	}
	:global(.article-reader__illustration img) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius);
	}
	:global(.article-reader__illustration figcaption) {
		margin-top: 12px;
		color: var(--text-muted);
		font-size: var(--step--1);
	}
	:global(.article-reader h1) {
		margin: 8px 0 20px;
		font-size: var(--step-4);
	}
	:global(.article-reader h2) {
		font-size: var(--step-2);
	}
	:global(.article-reader__eyebrow) {
		margin: 0;
		color: var(--text-muted);
		font-size: var(--step--1);
	}
	:global(.article-reader__lead) {
		font-size: var(--step-1);
	}
	:global(.article-reader section) {
		margin-top: 32px;
		padding-top: 16px;
		border-top: 1px solid var(--hairline);
	}
	:global(.article-reader__reading-layout) {
		display: grid;
		grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
		gap: clamp(24px, 4vw, 64px);
		align-items: start;
		margin-top: 40px;
	}
	:global(.article-reader__contents) {
		position: sticky;
		top: calc(var(--article-header-height, 0px) + 24px);
		max-height: calc(100svh - var(--article-header-height, 0px) - 48px);
		overflow-y: auto;
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}
	:global(.article-reader__contents-title) {
		margin: 0 0 12px;
		color: #173f35;
		font-weight: 700;
	}
	:global(.article-reader__contents ul) {
		display: grid;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	:global(.article-reader__contents a) {
		display: block;
		padding: 8px 10px;
		border-left: 3px solid transparent;
		border-radius: var(--radius-sm);
		font-size: 0.9rem;
		line-height: 1.5;
	}
	:global(.article-reader__contents a[aria-current='location']) {
		border-left-color: var(--sun-500);
		background: color-mix(in srgb, var(--sun-500) 12%, transparent);
		color: #173f35;
	}
	:global(.article-reader__prose) {
		min-width: 0;
		max-width: var(--container-narrow);
		color: var(--text);
		line-height: 1.8;
		overflow-wrap: break-word;
	}
	:global(.article-reader__prose h1),
	:global(.article-reader__prose h2),
	:global(.article-reader__prose h3) {
		scroll-margin-top: calc(var(--article-header-height, 0px) + 24px);
		color: #173f35;
		text-wrap: balance;
	}
	:global(.article-reader__prose h1),
	:global(.article-reader__prose h2) {
		margin: 48px 0 20px;
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		line-height: 1.25;
	}
	:global(.article-reader__prose > h1:first-child),
	:global(.article-reader__prose > h2:first-child) {
		margin-top: 0;
	}
	:global(.article-reader__prose h3) {
		margin: 32px 0 16px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
		font-size: clamp(1.2rem, 2vw, 1.5rem);
		line-height: 1.3;
	}
	:global(.article-reader__prose p) {
		margin: 0 0 18px;
	}
	:global(.article-reader__prose ul) {
		margin: 0 0 24px;
		padding-left: 24px;
	}
	:global(.article-reader__prose li) {
		padding-left: 4px;
		margin-bottom: 8px;
	}
	:global(.article-reader__prose li::marker) {
		color: var(--sun-500);
	}
	:global(.article-reader__prose li p) {
		margin-bottom: 8px;
	}
	:global(.article-reader__prose table) {
		width: 100%;
		margin: 0 0 24px;
		border-collapse: collapse;
	}
	:global(.article-reader__prose th),
	:global(.article-reader__prose td) {
		padding: 10px 14px;
		border-bottom: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
	}
	:global(.article-reader__prose th) {
		color: #173f35;
		font-weight: 700;
	}
	:global(.article-reader__prose td:last-child),
	:global(.article-reader__prose th:last-child) {
		text-align: right;
	}
	:global(.article-reader__prose td:last-child) {
		white-space: nowrap;
	}
	:global(.article-reader__prose th) {
		overflow-wrap: anywhere;
	}
	@media (max-width: 860px) {
		/* The header is in normal flow here and does not cover anchor targets. */
		:global(.article-reader__prose h1),
		:global(.article-reader__prose h2),
		:global(.article-reader__prose h3) {
			scroll-margin-top: 24px;
		}
		:global(.article-reader__contents) {
			top: 24px;
			max-height: calc(100svh - 48px);
		}
	}
	@media (max-width: 760px) {
		:global(.article-reader__reading-layout) {
			grid-template-columns: minmax(0, 1fr);
			gap: 28px;
			margin-top: 28px;
		}
		:global(.article-reader__contents) {
			position: static;
			max-height: none;
		}
	}
	:global(.article-reader__links) {
		display: flex;
		flex-wrap: wrap;
		gap: 16px 24px;
		margin-top: 32px;
	}
	/* Editorial guide pages: title first, a photographic cover, then a calm
   reading column with a collapsible contents list and contextual figures. */
	:global(.article-reader--editorial),
	:global(.article-reader--index) {
		width: min(var(--page-width), 1180px);
		padding-top: clamp(24px, 4vw, 52px);
	}
	:global(.article-header) {
		max-width: 960px;
	}
	:global(.article-reader--editorial .article-reader__breadcrumbs .c-breadcrumbs__separator) {
		margin-inline: 0.4rem;
	}
	:global(.article-header__eyebrow) {
		margin: 28px 0 14px;
		color: #647c70;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}
	:global(.article-reader--editorial .article-header__title),
	:global(.article-reader--index > h1) {
		max-width: 29ch;
		margin: 0 0 24px;
		color: #173f35;
		font-size: clamp(2rem, 4.5vw, 3.75rem);
		font-weight: 600;
		line-height: 1.12;
		letter-spacing: -0.035em;
		text-wrap: balance;
		overflow-wrap: anywhere;
		scroll-margin-top: calc(var(--article-header-height, 0px) + 24px);
	}
	:global(.article-header__lead) {
		max-width: 76ch;
		margin: 0;
		color: #52665c;
		font-size: clamp(1.05rem, 1.4vw, 1.2rem);
		line-height: 1.8;
	}
	:global(.article-reader--editorial .article-reader__reading-layout) {
		grid-template-columns: minmax(180px, 230px) minmax(0, 1fr);
		gap: clamp(28px, 4vw, 64px);
		margin-top: clamp(36px, 5vw, 60px);
	}
	:global(.article-reader--editorial .article-reader__contents) {
		padding: 18px;
		border-color: #e3e8e1;
		border-radius: 16px;
		background: #f6f7f2;
	}
	:global(.article-contents > summary) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin: 0;
		padding-block: 4px;
		font-size: 0.8rem;
		cursor: pointer;
		list-style: none;
	}
	:global(.article-contents > summary::-webkit-details-marker) {
		display: none;
	}
	:global(.article-contents > summary::after) {
		content: '⌄';
		font-size: 1.25rem;
		line-height: 1;
	}
	:global(.article-contents[open] > summary) {
		margin-bottom: 16px;
	}
	:global(.article-contents[open] > summary::after) {
		transform: rotate(180deg);
	}
	:global(.article-contents > summary:focus-visible) {
		outline: 2px solid var(--sun-500);
		outline-offset: 4px;
		border-radius: 4px;
	}
	:global(.article-reader--editorial .article-reader__contents ul) {
		gap: 4px;
	}
	:global(.article-reader--editorial .article-reader__contents a) {
		padding: 9px 10px;
		color: #52665c;
		font-size: 0.8rem;
		line-height: 1.6;
	}
	:global(.article-reader--editorial .article-reader__contents a:hover) {
		background: #e9eee6;
	}
	:global(.article-reader--editorial .article-reader__contents a[aria-current='location']) {
		color: #173f35;
		background: #ece9da;
	}
	:global(.article-reader--editorial .article-reader__prose) {
		max-width: 76ch;
		font-size: clamp(1rem, 1.15vw, 1.075rem);
		line-height: 1.85;
	}
	:global(.article-reader--editorial .article-reader__prose h2) {
		margin: 44px 0 20px;
		padding-top: 24px;
		border-top: 1px solid #dce4dc;
		font-size: clamp(1.55rem, 2.4vw, 2.1rem);
		line-height: 1.25;
		text-wrap: balance;
	}
	:global(.article-reader--editorial .article-reader__prose h3) {
		margin: 36px 0 16px;
		padding-top: 0;
		border-top: 0;
		font-size: clamp(1.25rem, 2vw, 1.6rem);
		line-height: 1.3;
	}
	:global(.article-reader--editorial .article-reader__prose p) {
		margin-bottom: 22px;
	}
	:global(.article-reader--editorial .article-photo) {
		margin: 28px 0 32px;
	}
	:global(.article-photo > a) {
		display: block;
		border-radius: 16px;
		overflow: hidden;
		background: #edf0e8;
	}
	:global(.article-photo > a:focus-visible) {
		outline: 3px solid var(--sun-500);
		outline-offset: 4px;
	}
	:global(.article-photo img) {
		display: block;
		width: 100%;
		height: auto;
	}
	:global(.article-reader--editorial .article-photo--hero) {
		margin: 32px 0 0;
	}
	:global(.article-photo--hero > a) {
		border-radius: 24px;
	}
	:global(.article-reader--compact .article-header__title) {
		max-width: 32ch;
		font-size: clamp(1.9rem, 4vw, 3.25rem);
	}
	:global(.article-reader--compact .article-reader__reading-layout) {
		margin-top: 32px;
	}
	:global(.article-reader--compact .article-reader__prose .article-photo--illustration) {
		margin: 24px 0 32px;
	}
	:global(.article-reader--compact .article-photo--illustration > a) {
		border: 1px solid #e3e8e1;
		border-radius: 16px;
	}
	:global(.article-reader--editorial .article-photo--portrait) {
		max-width: 480px;
		margin-inline: auto;
	}
	:global(.article-photo--infographic > a) {
		border: 1px solid #e3e8e1;
	}
	:global(.article-gallery) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin: 28px 0 32px;
		align-items: start;
	}
	:global(.article-reader--editorial .article-gallery > .article-photo) {
		margin: 0;
	}
	/* Three portrait photos (or six) sit in one row; guide photos carry no captions. */
	:global(.article-gallery--three) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	:global(.article-note) {
		margin: 24px 0 40px;
		padding: clamp(20px, 3vw, 32px);
		border-left: 3px solid #b99b62;
		border-radius: 0 16px 16px 0;
		background: #f5f3e9;
	}
	:global(.article-reader--editorial .article-note > :last-child) {
		margin-bottom: 0;
	}
	:global(.article-note--emergency ul) {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		padding: 0;
		list-style: none;
	}
	:global(.article-note--emergency li) {
		padding: 0;
		margin: 0;
	}
	:global(.article-note--emergency li p) {
		margin: 0;
	}
	:global(.article-note--emergency a) {
		display: block;
		height: 100%;
		padding: 16px 12px;
		border: 1px solid #dbe2d7;
		border-radius: 12px;
		background: #fffef8;
		color: #173f35;
		font-size: 0.85rem;
		text-decoration: none;
	}
	:global(.article-note--emergency strong) {
		display: block;
		font-size: 1.9rem;
		line-height: 1.2;
		margin-bottom: 8px;
	}
	:global(.article-reader--editorial .article-reader__links) {
		gap: 12px;
		margin-top: 48px;
		padding-top: 24px;
		border-top: 1px solid #dce4dc;
	}
	:global(.article-reader--editorial .article-reader__links > a) {
		padding: 12px 16px;
		border: 1px solid #dce4dc;
		border-radius: 12px;
		color: #173f35;
		font-size: 0.9rem;
		text-decoration: none;
	}
	:global(.article-reader--editorial .article-reader__links > a:hover) {
		background: #edf0e8;
	}
	@media (max-width: 860px) {
		:global(.article-reader--editorial .article-header__title) {
			scroll-margin-top: 24px;
		}
	}
	@media (max-width: 760px) {
		:global(.article-reader--editorial .article-reader__reading-layout) {
			grid-template-columns: minmax(0, 1fr);
			gap: 28px;
			margin-top: 28px;
		}
		:global(.article-reader--editorial .article-reader__contents) {
			padding: 14px 16px;
		}
		:global(.article-contents > summary) {
			min-height: 32px;
		}
		:global(.article-reader--editorial .article-reader__contents ul) {
			max-height: 280px;
			overflow-y: auto;
			overscroll-behavior: contain;
		}
		:global(.article-reader--editorial .article-reader__prose h2) {
			margin-top: 40px;
		}
		:global(.article-photo--hero > a) {
			border-radius: 16px;
		}
	}

	/* Credit of a Commons photo: small print under the frame, the frame link stays the photo. */
	:global(.article-photo__credit) {
		margin-top: 8px;
		color: #5f6b64;
		font-size: 0.78rem;
		line-height: 1.45;
	}
	:global(.article-photo__credit a) {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	:global(.article-photo--hero .article-photo__credit) {
		padding-inline: 4px;
	}
	/* ComparisonCard inside the article: layout and panels come from stylist (@layer layout),
	   the palette from the article via the card's hooks; prose list rules are reset here. */
	:global(.article-reader__prose .article-comparison) {
		--comparison-card-margin: 12px 0 32px;
		--comparison-card-gap: 14px;
		--comparison-card-padding: 18px 22px 10px;
		--comparison-card-radius: 18px;
		/* Air between the column title and its rule, and between the rule and the first row. */
		--comparison-card-column-title-gap: 12px;
		--comparison-card-column-title-offset: 6px;
		--comparison-card-negative: #a4442f;
		--comparison-card-negative-surface: #fbf3ef;
		--comparison-card-positive: #2f6b45;
		--comparison-card-positive-surface: #f0f6f1;
		line-height: 1.55;
	}
	:global(.article-reader__prose .article-comparison h4) {
		font-family: var(--font-body, sans-serif);
		font-size: 0.78rem;
		font-weight: 700;
	}
	:global(.article-reader__prose .article-comparison ul) {
		margin: 0;
		padding: 0;
	}
	:global(.article-reader__prose .article-comparison li) {
		margin: 0;
		padding: 10px 0;
		color: #2b3a33;
		font-size: 0.97em;
	}
	:global(.article-reader__prose .article-comparison li::first-letter) {
		text-transform: uppercase;
	}
</style>
