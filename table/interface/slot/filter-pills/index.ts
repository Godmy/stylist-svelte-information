export interface SlotFilterPills {
	columnKey: string;
	label?: string;
	options: string[];
	active?: string[];
	onToggle?: (columnKey: string, value: string) => void;
	class?: string;
}
