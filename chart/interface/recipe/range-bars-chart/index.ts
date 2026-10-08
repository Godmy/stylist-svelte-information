import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeRangeBarsChart
	extends ComputeIntersectAll<
		[
			{
				items: {
					id: string;
					label: string;
					startPercent: number;
					markerPercent: number;
					endPercent: number;
					valueLabel: string;
					ariaLabel?: string;
				}[];
				scaleMinLabel: string;
				scaleMaxLabel: string;
				labelWidth?: string;
				valueWidth?: string;
				class?: string;
			}
		]
	> {
	onSelectItem?: (itemId: string) => void;
}
