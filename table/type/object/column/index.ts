/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
import type { Snippet } from 'svelte';
import type { CellType } from '$stylist/table/type/alias/cell-type';

export type ColumnSchema<T, K extends keyof T = keyof T> = {
	key: K;
	header: string;
	cell: CellType;
	width?: number;
	sortable?: boolean;
	filterable?: 'text' | 'pills';
	hidden?: boolean;
	render?: (value: T[K], row: T) => unknown;
	/** Summary shown under the header (e.g. a column total); computed by the consumer. */
	total?: string | number;
	/** Badge colour of a `pill` cell for this row; `default` when omitted. */
	pill?: (value: T[K], row: T) => 'default' | 'primary' | 'success' | 'warning' | 'danger';
	/** Content of a `custom` cell (links, buttons); rendered inside the cell. */
	snippet?: Snippet<[T]>;
};
