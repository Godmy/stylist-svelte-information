import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
import type { BehaviorPointClickable } from '$stylist/chart/interface/behavior/point-clickable';
import type { BehaviorLegendable } from '$stylist/chart/interface/behavior/legendable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { BehaviorChartColorable } from '$stylist/chart/interface/behavior/chart-colorable';
import type { BehaviorChartAxis } from '$stylist/chart/interface/behavior/chart-axis';
import type { ScatterPlotDataPoint } from '$stylist/chart/interface/slot/scatter-plot-point';
export interface RecipeScatterPlot
	extends ComputeIntersectAll<
		[
			SlotTheme,
			SlotDimensionable,
			SlotText,
			BehaviorChartAxis,
			BehaviorLegendable,
			BehaviorPointClickable<ScatterPlotDataPoint>,
			BehaviorChartColorable,
			HTMLAttributes<HTMLDivElement>
		]
	> {
	data: ScatterPlotDataPoint[];
	title?: string;
	showAxis?: boolean;
	showGrid?: boolean;
	showZAxis?: boolean;
	showAxisArrows?: boolean;
	pointSize?: number;
	showLabels?: boolean;
}
