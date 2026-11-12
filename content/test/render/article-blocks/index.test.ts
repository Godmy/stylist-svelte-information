import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flushSync, mount, tick, unmount } from 'svelte';
import ArticleReader from '$stylist/content/component/organism/article-reader/index.svelte';
import EditorStory from '$stylist/content/component/organism/article-block-editor/index.story.svelte';
import type { ArticleBlock } from '$stylist/content/type/alias/article-block';

const mounted: ReturnType<typeof mount>[] = [];
beforeEach(() => {
	vi.stubGlobal(
		'ResizeObserver',
		class {
			observe() {}
			disconnect() {}
		}
	);
	vi.stubGlobal('matchMedia', () => ({
		matches: false,
		addEventListener() {},
		removeEventListener() {}
	}));
	Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
		value: vi.fn(),
		configurable: true,
		writable: true
	});
});
afterEach(async () => {
	for (const component of mounted.splice(0).reverse()) await unmount(component);
	document.body.replaceChildren();
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

function click(label: string) {
	const button = document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
	expect(button, label).not.toBeNull();
	button!.click();
	flushSync();
}

describe('article reader', () => {
	it('renders a single hero, provider-neutral credit, contents and normalized HTML', () => {
		mounted.push(
			mount(ArticleReader, {
				target: document.body,
				props: {
					contentsAction: () => {},
					article: {
						headline: 'Knowledge',
						lead: '<b onclick="bad()">Intro</b>',
						links: [],
						blocks: [
							{
								type: 'photos',
								variant: 'hero',
								photos: [
									{
										src: '/photo.jpg',
										width: 800,
										height: 600,
										alt: 'Example',
										credit: {
											title: 'Photo',
											author: 'Author',
											source: 'https://photos.example/item',
											license: 'CC BY',
											licenseUrl: 'https://license.example/by'
										}
									}
								]
							},
							{ type: 'heading', level: 2, id: 'part:two', text: 'Section', contents: 'Section' },
							{
								type: 'paragraph',
								html: '<a href="javascript:bad()">Unsafe link</a><em>Text</em>'
							},
							{ type: 'note', emergency: false, html: '<p>Note</p>' },
							{ type: 'table', head: ['Column'], rows: [['<strong>Value</strong>']] }
						]
					}
				}
			})
		);
		flushSync();
		expect(document.querySelectorAll('img')).toHaveLength(1);
		expect(document.querySelector('img')?.getAttribute('loading')).toBe('eager');
		expect(document.querySelector('figcaption')?.parentElement?.tagName).toBe('FIGURE');
		expect(document.querySelector('figcaption')?.textContent).toContain('Author');
		expect(document.querySelector('figcaption a')?.getAttribute('href')).toBe(
			'https://photos.example/item'
		);
		expect(document.querySelector('.article-reader__contents a')?.getAttribute('href')).toBe(
			'#part:two'
		);
		expect(document.querySelector('[onclick],a[href^="javascript:"]')).toBeNull();
		expect(document.querySelector('td strong')?.textContent).toBe('Value');
		expect(document.body.textContent).not.toContain('Шри-Ланка');
	});
});

describe('article block editor uses the same live document', () => {
	it('splits a text field into paragraphs and updates the reader preview', async () => {
		mounted.push(
			mount(EditorStory, {
				target: document.body,
				props: {
					value: [
						{ type: 'paragraph', html: 'First' },
						{ type: 'paragraph', html: 'Second' }
					]
				}
			})
		);
		flushSync();
		const textarea = document.querySelector<HTMLTextAreaElement>('textarea[aria-label^="Текст,"]')!;
		expect(textarea.value).toBe('First\n\nSecond');
		textarea.value = 'One\n\nTwo\n\nThree';
		textarea.dispatchEvent(new Event('change', { bubbles: true }));
		flushSync();
		await tick();
		expect(
			[...document.querySelectorAll('.article-reader__prose > p')].map((node) => node.textContent)
		).toEqual(['One', 'Two', 'Three']);
	});
	it('adds a structural block without creating a nested form', async () => {
		mounted.push(mount(EditorStory, { target: document.body, props: { value: [] } }));
		flushSync();
		click('Добавить блок здесь');
		[...document.querySelectorAll('button')]
			.find((button) => button.textContent === 'Заголовок')!
			.click();
		flushSync();
		await tick();
		const input = document.querySelector<HTMLInputElement>('input[aria-label="Заголовок"]')!;
		input.value = 'New section';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		flushSync();
		expect(document.querySelector('.article-reader__prose h2')?.textContent).toBe('New section');
		const contents = document.querySelector<HTMLInputElement>(
			'input[placeholder="пусто — не показывать"]'
		)!;
		contents.value = 'New section';
		contents.dispatchEvent(new Event('input', { bubbles: true }));
		flushSync();
		await tick();
		await vi.waitFor(() =>
			expect(
				document
					.querySelector('.article-reader__contents a[aria-current="location"]')
					?.getAttribute('href')
			).toBe('#section-2')
		);
		expect(document.querySelector('form')).toBeNull();
	});
	it('moves an entire paragraph run over the next structural block', () => {
		mounted.push(
			mount(EditorStory, {
				target: document.body,
				props: {
					value: [
						{ type: 'paragraph', html: 'First' },
						{ type: 'paragraph', html: 'Second' },
						{ type: 'note', emergency: false, html: 'Note' }
					]
				}
			})
		);
		flushSync();
		click('Ниже');
		expect(document.querySelector('.article-reader__prose')?.firstElementChild?.className).toBe(
			'article-note'
		);
		expect(
			[...document.querySelectorAll('.article-reader__prose > p')].map((node) => node.textContent)
		).toEqual(['First', 'Second']);
	});
	it('removes a paragraph run through the caller confirmation policy', () => {
		const confirmRemove = vi.fn(() => true);
		mounted.push(
			mount(EditorStory, {
				target: document.body,
				props: {
					value: [
						{ type: 'paragraph', html: 'First' },
						{ type: 'paragraph', html: 'Second' }
					],
					confirmRemove
				}
			})
		);
		flushSync();
		click('Удалить блок');
		expect(confirmRemove).toHaveBeenCalledOnce();
		expect(document.querySelectorAll('.article-reader__prose > p')).toHaveLength(0);
	});
	it('calls an injected uploader and exposes its failure without a site endpoint', async () => {
		const uploadImage = vi.fn(async () => {
			throw new Error('Storage unavailable');
		});
		const onBusyChange = vi.fn();
		mounted.push(
			mount(EditorStory, {
				target: document.body,
				props: {
					value: [{ type: 'photos', variant: 'photo', photos: [] }],
					uploadImage,
					onBusyChange
				}
			})
		);
		flushSync();
		const input = document.querySelector<HTMLInputElement>('input[type="file"]')!;
		const file = new File(['sample'], 'photo.jpg', { type: 'image/jpeg' });
		Object.defineProperty(input, 'files', { value: [file] });
		input.dispatchEvent(new Event('change', { bubbles: true }));
		flushSync();
		await vi.waitFor(() =>
			expect(document.querySelector('[role="alert"]')?.textContent).toBe('Storage unavailable')
		);
		expect(uploadImage).toHaveBeenCalledWith(file);
		expect(onBusyChange.mock.calls.map((call) => call[0])).toEqual([true, false]);
	});
	it('resolves an existing image through its caller and reports the selected cover candidate', async () => {
		const image = { src: '/assets/existing.jpg', width: 600, height: 400, alt: 'Existing' };
		const onImageAdded = vi.fn();
		const value: ArticleBlock[] = [{ type: 'photos', variant: 'photo', photos: [] }];
		mounted.push(
			mount(EditorStory, {
				target: document.body,
				props: { value, resolveImage: async () => image, onImageAdded }
			})
		);
		flushSync();
		const input = document.querySelector<HTMLInputElement>(
			'[aria-label="Путь к опубликованному фото"]'
		)!;
		input.value = image.src;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		await vi.waitFor(() => expect(onImageAdded).toHaveBeenCalledWith(image));
		expect(document.querySelector('.article-reader__prose img')?.getAttribute('src')).toBe(
			image.src
		);
	});
});
