import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { CatalogField } from '$stylist/tree/type/object/catalog-field';

export interface RecipeCatalog extends ComputeIntersectAll<
	[Omit<HTMLAttributes<HTMLElement>, 'title' | 'class'>]
> {
	/** Flat rows; the tree is built from `idKey` and `parentKey`. */
	rows: Record<string, unknown>[];
	/** Columns of a row; omitted, every column of the first row becomes a text field. */
	fields?: CatalogField[];
	idKey?: string;
	parentKey?: string;
	/** Column shown as the node label. */
	labelKey?: string;
	/** Reference column shown as a badge next to the label, e.g. the row type. */
	badgeKey?: string;
	/** Column whose falsy value dims a row, e.g. `is_visible`. */
	activeKey?: string;
	title?: string;
	/** Row selected on first render. */
	selectedId?: string;
	/** Saves changed columns of one row; a returned string is shown as the error. */
	onSave?: (id: string, changes: Record<string, unknown>) => Promise<string | void> | string | void;
	/** Without `onSave` the editor is read-only. */
	readonly?: boolean;
	/** localStorage key that remembers the label panel and the chosen labels; omitted, nothing is stored. */
	storageKey?: string;
	class?: string;
}
