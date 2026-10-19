export interface SlotColumnManager {
	columns: {
		key: string;
		header: string;
		visible: boolean;
		sortable?: boolean;
		filterable?: boolean;
		width?: number;
	}[];
	onColumnsChange?: (
		columns: {
			key: string;
			header: string;
			visible: boolean;
			sortable?: boolean;
			filterable?: boolean;
			width?: number;
		}[]
	) => void;
	class?: string;
	/** Heading of the list; defaults to «Columns». */
	title?: string;
	/** Label of the reset button; defaults to «Reset». */
	resetLabel?: string;
}
