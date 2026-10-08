import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
import type { BehaviorTooltipable } from '$stylist/chart/interface/behavior/tooltipable';
import type { BehaviorLegendable } from '$stylist/chart/interface/behavior/legendable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { BehaviorChartColorable } from '$stylist/chart/interface/behavior/chart-colorable';
import type { BehaviorChartAxis } from '$stylist/chart/interface/behavior/chart-axis';
import type { IChartDataPoint } from '$stylist/chart/interface/slot/bar-chart';
export interface RecipeBarChart
	extends ComputeIntersectAll<
		[
			SlotTheme,
			SlotDimensionable,
			SlotText,
			BehaviorChartAxis,
			BehaviorLegendable,
			BehaviorTooltipable,
			BehaviorChartColorable,
			HTMLAttributes<HTMLDivElement>
		]
	> {
	onBarClick?: (item: IChartDataPoint) => void;
	data: IChartDataPoint[];
	title?: string;
	chartClass?: string;
	showAxis?: boolean;
	showGrid?: boolean;
	showZAxis?: boolean;
	showAxisArrows?: boolean;
	barGap?: number;
	barWidth?: number;
}
