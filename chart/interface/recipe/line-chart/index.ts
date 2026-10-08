import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
import type { TokenLineType } from '$stylist/chart/type/alias/line-type';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { BehaviorPointClickable } from '$stylist/chart/interface/behavior/point-clickable';
import type { BehaviorTooltipable } from '$stylist/chart/interface/behavior/tooltipable';
import type { BehaviorLegendable } from '$stylist/chart/interface/behavior/legendable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { BehaviorChartColorable } from '$stylist/chart/interface/behavior/chart-colorable';
import type { BehaviorChartAxis } from '$stylist/chart/interface/behavior/chart-axis';
import type { LineChartData } from '$stylist/chart/interface/slot/line-chart-data';
import type { LineChartPoint } from '$stylist/chart/interface/slot/line-chart';
export interface RecipeLineChart
	extends ComputeIntersectAll<
		[
			SlotTheme,
			SlotDimensionable,
			SlotText,
			BehaviorChartAxis,
			BehaviorLegendable,
			BehaviorTooltipable,
			BehaviorPointClickable<LineChartPoint, LineChartData>,
			BehaviorChartColorable,
			HTMLAttributes<HTMLDivElement>
		]
	> {
	data: LineChartData[];
	title?: string;
	chartClass?: string;
	showAxis?: boolean;
	showGrid?: boolean;
	showZAxis?: boolean;
	showAxisArrows?: boolean;
	smooth?: boolean;
	strokeWidth?: number;
	variant?: TokenLineType;
	size?: TokenSize;
}
