import type { HTMLAttributes } from 'svelte/elements';
import type { TableSchema } from '$stylist/table/type/object/table';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface SlotDataTableShell<T extends Record<string, unknown>>
	extends HTMLAttributes<HTMLDivElement> {
	data: T[];
	schema: TableSchema<T>;
	title?: string;
	searchPlaceholder?: string;
	showSearch?: boolean;
	showColumnManager?: boolean;
	pageSizeOptions?: number[];
	defaultPageSize?: number;
	loading?: boolean;
	onExport?: () => void;
	onRowClick?: (item: T) => void;
}
