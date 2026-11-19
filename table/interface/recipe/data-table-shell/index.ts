import type { SlotDataTableShell } from '$stylist/table/interface/slot/data-table-shell';
export interface RecipeDataTableShell<
	T extends Record<string, unknown>
> extends SlotDataTableShell<T> {
	/** Hides the column manager behind a header button; closed by default. */
	columnManagerToggle?: boolean;
	/** localStorage key that remembers whether the column manager is open. */
	storageKey?: string;
	/** localStorage key that remembers hidden columns, usually one per table. */
	columnsStorageKey?: string;
	/** Fills the parent height: the table scrolls inside with a sticky header. */
	fill?: boolean;
}
