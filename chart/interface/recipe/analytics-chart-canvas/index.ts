import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeChartCanvas } from '$stylist/chart/interface/recipe/chart-canvas';

export interface RecipeAnalyticsChartCanvas extends ComputeIntersectAll<[RecipeChartCanvas]> {
	xAxisLabel?: string;
	yAxisLabel?: string;
	zAxisLabel?: string;
}
