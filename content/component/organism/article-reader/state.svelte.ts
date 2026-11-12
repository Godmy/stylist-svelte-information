import type { RecipeArticleReader } from '$stylist/content/interface/recipe/article-reader';
import { enhanceArticleContents } from '$stylist/content/function/script/article-contents';
export function createArticleReaderState(getProps: () => RecipeArticleReader) {
	const contents = $derived(
		getProps().article.blocks.flatMap((block) =>
			block.type === 'heading' && block.contents ? [{ id: block.id, label: block.contents }] : []
		)
	);
	const firstPhoto = $derived(
		getProps().article.blocks.findIndex((block) => block.type === 'photos')
	);
	const contentsKey = $derived(contents.map((entry) => entry.id).join('\u0000'));
	const wide = $derived.by(() => {
		const first = getProps().article.blocks[0];
		return first?.type === 'photos' && first.variant === 'hero' ? first.photos[0] : undefined;
	});
	return {
		get contentsKey() {
			return contentsKey;
		},
		get contents() {
			return contents;
		},
		get firstPhoto() {
			return firstPhoto;
		},
		get wide() {
			return wide;
		},
		contentsAction(node: HTMLElement, _blocks: unknown) {
			const connect = () => {
				const action = getProps().contentsAction;
				return action ? action(node) : enhanceArticleContents(node);
			};
			let action = connect();
			let destroyed = false;
			let revision = 0;
			return {
				update() {
					action?.destroy?.();
					action = undefined;
					const current = ++revision;
					queueMicrotask(() => {
						if (!destroyed && current === revision) action = connect();
					});
				},
				destroy() {
					destroyed = true;
					action?.destroy?.();
				}
			};
		}
	};
}
export default createArticleReaderState;
