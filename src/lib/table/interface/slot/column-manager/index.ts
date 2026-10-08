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
}
