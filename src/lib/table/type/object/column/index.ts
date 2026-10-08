/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
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
};
