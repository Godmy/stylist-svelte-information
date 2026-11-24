import type { Snippet } from 'svelte';

export interface SlotRowExpandable {
	expandableContent: Snippet;
	rowContent: Snippet;
	isExpanded?: boolean;
	class?: string;
	cellClass?: string;
	headerCellClass?: string;
	onToggle?: (expanded: boolean) => void;
}
