import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeCriticalPathTimeline extends ComputeIntersectAll<[SlotText]> {
	tasks: {
		id: string;
		text: string;
		start: string;
		end: string;
		group?: string;
		progress?: number;
		critical?: boolean;
		dependsOn?: string[];
	}[];
	width?: number;
	rowHeight?: number;
	dayWidth?: number;
	timeLabelStep?: number;
	class?: string;
}
