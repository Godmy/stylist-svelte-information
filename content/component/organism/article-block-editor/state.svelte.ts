import { tick, untrack, onDestroy } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { RecipeArticleBlockEditor } from '$stylist/content/interface/recipe/article-block-editor';
import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
import type { CreditedImage } from '$stylist/image/type/object/credited-image';
import type { ArticleEditorSection } from '$stylist/content/type/object/article-editor-section';
import type { ArticleEditorRun } from '$stylist/content/type/object/article-editor-run';
import { splitArticleSections } from '$stylist/content/function/script/split-article-sections';
import { createArticleBlock } from '$stylist/content/function/create/article-block';
import { ARTICLE_BLOCK_OPTIONS } from '$stylist/content/const/array/article-block-options';
import { articleBlockLabel } from '$stylist/content/function/resolve/article-block-label';

export function createArticleBlockEditorState(
	getProps: () => RecipeArticleBlockEditor,
	getValue: () => ArticleBlock[]
) {
	const blocks = $derived(getValue());
	const open = new SvelteSet<string>();
	let adding = $state<number | null>(null);
	let uploading = $state(false);
	let uploadError = $state.raw<{ block: ArticleBlock; text: string } | null>(null);
	let root: HTMLElement | undefined;
	let active = true;
	onDestroy(() => {
		active = false;
		if (uploading) getProps().onBusyChange?.(false);
	});
	$effect(() => {
		// Read only to re-run when the parent bumps resetKey.
		const _resetKey = getProps().resetKey;
		untrack(() => {
			open.clear();
			if (blocks.length <= 30)
				for (const section of splitArticleSections(blocks)) open.add(section.key);
		});
	});
	$effect(() => {
		const request = getProps().revealRequest;
		if (request) void reveal(request.index);
	});
	const TYPES = ARTICLE_BLOCK_OPTIONS;
	const typeLabel = articleBlockLabel;

	// Sections: every heading starts one; blocks before the first heading are the intro.

	const sections = $derived(splitArticleSections(blocks));

	// Paragraphs in a row are edited as one «Текст» item: one field, a blank line between
	// paragraphs. The article still stores one paragraph block each; other blocks stand alone.
	const isText = (block: ArticleBlock | undefined) => block?.type === 'paragraph';
	function runs(section: ArticleEditorSection) {
		const list: ArticleEditorRun[] = [];
		for (let index = section.start; index < section.end; index++) {
			const last = list[list.length - 1];
			if (last && isText(blocks[index]) && isText(blocks[last.end - 1])) last.end = index + 1;
			else list.push({ start: index, end: index + 1 });
		}
		return list;
	}
	/** The first index of the run holding the block: its item carries the `block-N` id. */
	function runStart(index: number) {
		let start = index;
		if (isText(blocks[start])) while (start > 0 && isText(blocks[start - 1])) start--;
		return start;
	}
	const runHtml = (run: ArticleEditorRun) =>
		blocks
			.slice(run.start, run.end)
			.map((block) => (block.type === 'paragraph' ? block.html : ''))
			.join('\n\n');
	/** While typing: paragraphs edited in place when their count is unchanged. */
	function typeText(run: ArticleEditorRun, value: string) {
		const parts = value.split('\n\n');
		if (parts.length !== run.end - run.start) return;
		parts.forEach((html, n) => {
			const block = blocks[run.start + n];
			if (block.type === 'paragraph') block.html = html;
		});
	}
	/** On leaving the field: blank lines split the text into paragraph blocks again. */
	function setText(run: ArticleEditorRun, value: string) {
		const parts = value
			.split(/\n[ \t]*\n/)
			.map((part) => part.trim())
			.filter(Boolean);
		const replacements: ArticleBlock[] = (parts.length ? parts : ['']).map((html) => ({
			type: 'paragraph',
			html
		}));
		blocks.splice(run.start, run.end - run.start, ...replacements);
	}
	const paragraphs = (n: number) => `${n} ${plural(n, 'абзац', 'абзаца', 'абзацев')}`;

	const plain = (html: string) =>
		html
			.replace(/<[^>]*>/g, ' ')
			.replace(/&nbsp;/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	function preview(section: ArticleEditorSection) {
		for (const block of blocks.slice(section.start, section.end)) {
			const text =
				block.type === 'paragraph' || block.type === 'note'
					? plain(block.html)
					: block.type === 'list'
						? plain(block.items.join(' · '))
						: block.type === 'comparison'
							? block.columns.map((column) => column.title).join(' / ')
							: '';
			if (text) return text.length > 140 ? `${text.slice(0, 140)}…` : text;
		}
		return '';
	}
	function plural(n: number, one: string, few: string, many: string) {
		const tens = n % 100;
		const units = n % 10;
		if (tens >= 11 && tens <= 14) return many;
		return units === 1 ? one : units >= 2 && units <= 4 ? few : many;
	}
	const blockCount = (n: number) => `${n} ${plural(n, 'блок', 'блока', 'блоков')}`;

	function toggle(key: string) {
		if (open.has(key)) open.delete(key);
		else open.add(key);
	}
	function ensureOpen(index: number) {
		const section = sections.find((item) => index >= item.start && index < item.end);
		if (section) open.add(section.key);
	}
	/** Opens the block's section, scrolls to the block and focuses its first field. */
	async function reveal(index: number) {
		ensureOpen(index);
		await tick();
		focusIn(root?.querySelector<HTMLElement>(`[data-block-index="${runStart(index)}"]`) ?? null);
	}
	function focusIn(element: HTMLElement | null) {
		if (!element) return;
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		const field = element.matches('input, textarea, select')
			? element
			: element.querySelector<HTMLElement>('input:not([type="checkbox"]), textarea, select');
		field?.focus({ preventScroll: true });
	}

	/** The next free `section-N`: anchors of existing headings never change. */

	function insert(index: number, type: ArticleBlock['type']) {
		const block = createArticleBlock(type, blocks);
		blocks.splice(index, 0, block);
		adding = null;
		if (block.type === 'heading') open.add(block.id);
		reveal(index).then(() => {
			// A paragraph added next to text joins its field: put the caret on the new line.
			const field = document.activeElement;
			const start = runStart(index);
			if (block.type !== 'paragraph' || (start === index && !isText(blocks[index + 1]))) return;
			if (!(field instanceof HTMLTextAreaElement)) return;
			const before = blocks
				.slice(start, index)
				.reduce((n, item) => n + (item.type === 'paragraph' ? item.html.length : 0) + 2, 0);
			field.setSelectionRange(before, before);
		});
	}
	/** Moves a block or a whole text run by stepping over its neighbour. */
	function move(run: ArticleEditorRun, step: number) {
		if (step < 0) {
			const [neighbour] = blocks.splice(run.start - 1, 1);
			blocks.splice(run.end - 1, 0, neighbour);
		} else {
			const [neighbour] = blocks.splice(run.end, 1);
			blocks.splice(run.start, 0, neighbour);
		}
		ensureOpen(run.start + step);
	}
	function remove(run: ArticleEditorRun) {
		const count = run.end - run.start;
		const what = isText(blocks[run.start])
			? `текст (${paragraphs(count)})`
			: `блок «${typeLabel(blocks[run.start].type)}»`;
		if ((getProps().confirmRemove ?? window.confirm)(`Удалить ${what}?`))
			blocks.splice(run.start, count);
	}

	// Lists and tables are edited as plain text: one item or row per line, cells split by «|».
	const lines = (value: string) =>
		value
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);
	const cells = (line: string) => line.split('|').map((cell) => cell.trim());
	const tableText = (block: Extract<ArticleBlock, { type: 'table' }>) =>
		[block.head, ...block.rows].map((row) => row.join(' | ')).join('\n');
	function setTable(block: Extract<ArticleBlock, { type: 'table' }>, value: string) {
		const [head = [], ...rows] = lines(value).map(cells);
		block.head = head;
		block.rows = rows.map((row) => head.map((_, n) => row[n] ?? ''));
	}

	/** Text areas grow with their text instead of scrolling inside a 4-line box. */
	function autosize(node: HTMLTextAreaElement) {
		const fit = () => {
			node.style.height = 'auto';
			node.style.height = `${node.scrollHeight + 2}px`;
		};
		const frame = requestAnimationFrame(fit);
		node.addEventListener('input', fit);
		return {
			destroy() {
				cancelAnimationFrame(frame);
				node.removeEventListener('input', fit);
			}
		};
	}

	async function upload(block: Extract<ArticleBlock, { type: 'photos' }>, input: HTMLInputElement) {
		const loader = getProps().uploadImage;
		if (!loader) return;
		uploadError = null;
		uploading = true;
		getProps().onBusyChange?.(true);
		try {
			for (const file of input.files ?? []) {
				const image = await loader(file);
				if (!active || !blocks.includes(block)) return;
				if (!block.photos.some((item) => item.src === image.src)) {
					block.photos.push(image);
					getProps().onImageAdded?.(image);
				}
			}
		} catch (error) {
			if (active)
				uploadError = { block, text: error instanceof Error ? error.message : 'Фото не загружено' };
		} finally {
			if (active) {
				uploading = false;
				getProps().onBusyChange?.(false);
				input.value = '';
			}
		}
	}
	async function addByPath(
		block: Extract<ArticleBlock, { type: 'photos' }>,
		input: HTMLInputElement
	) {
		const resolve = getProps().resolveImage;
		const src = input.value.trim();
		if (!resolve || !src || block.photos.some((item) => item.src === src)) return;
		try {
			const image = await resolve(src);
			if (!active || !blocks.includes(block)) return;
			block.photos.push(image);
			input.value = '';
			getProps().onImageAdded?.(image);
		} catch (error) {
			if (active)
				uploadError = { block, text: error instanceof Error ? error.message : `Нет фото ${src}` };
		}
	}

	function movePhoto(list: CreditedImage[], index: number, step: number) {
		const [item] = list.splice(index, 1);
		list.splice(index + step, 0, item);
	}

	return {
		typeLabel,
		runs,
		runStart,
		runHtml,
		typeText,
		setText,
		paragraphs,
		preview,
		plural,
		blockCount,
		toggle,
		reveal,
		insert,
		move,
		remove,
		lines,
		tableText,
		setTable,
		autosize,
		upload,
		addByPath,
		movePhoto,
		get adding() {
			return adding;
		},
		set adding(value: number | null) {
			adding = value;
		},
		get sections() {
			return sections;
		},
		get open() {
			return open;
		},
		get uploadError() {
			return uploadError;
		},
		get busy() {
			return uploading || getProps().disabled;
		},
		get types() {
			return TYPES;
		},
		blockId(index: number) {
			return `${getProps().idPrefix ?? 'article-block'}-${index}`;
		},
		connect(node: HTMLElement) {
			root = node;
			return {
				destroy() {
					root = undefined;
				}
			};
		}
	};
}
export default createArticleBlockEditorState;
