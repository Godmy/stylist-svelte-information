import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { ChartFunctionPoint } from '$stylist/chart/interface/slot/chart-point';
export interface RecipeChartPolyline
	extends ComputeIntersectAll<[SlotTheme, HTMLAttributes<SVGPolylineElement>]> {
	points?: ChartFunctionPoint[];
	width: number;
	height: number;
	xDomain?: [number, number];
	yDomain?: [number, number];
	color?: string;
	strokeWidth?: number;
}
