import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { BehaviorLegendable } from '$stylist/chart/interface/behavior/legendable';
import type { TokenCanvasChartType } from '$stylist/chart/type/alias/canvas-chart-type';
import type { AnalyticsChartDataPoint } from '$stylist/chart/interface/slot/analytics-chart-data-point';
export interface RecipeAnalyticsChart
	extends ComputeIntersectAll<
		[
			SlotTheme,
			SlotDimensionable,
			SlotText,
			SlotText,
			BehaviorLegendable,
			HTMLAttributes<HTMLDivElement>
		]
	> {
	data: AnalyticsChartDataPoint[];
	type?: TokenCanvasChartType;
	title?: string;
	showTrend?: boolean;
	trendValue?: number;
	chartClass?: string;
	legendClass?: string;
}
