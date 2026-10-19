import type { HTMLAttributes } from 'svelte/elements';
import type { TableSchema } from '$stylist/table/type/object/table';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface SlotDataTable<T extends Record<string, unknown>>
	extends HTMLAttributes<HTMLDivElement> {
	data: T[];
	schema: TableSchema<T>;
	striped?: boolean;
	hoverable?: boolean;
	maxHeight?: string;
	onRowClick?: (row: T) => void;
	/** Leading column with the row's position (1, 2, …) in the displayed order. */
	rowNumbers?: boolean;
	/** Keep the header row visible while the table body scrolls (use with `maxHeight`). */
	stickyHeader?: boolean;
	/** Text of the empty state; defaults to «No data to display.». */
	emptyText?: string;
}
