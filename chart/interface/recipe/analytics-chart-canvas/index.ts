import type { RecipeChartCanvas } from '$stylist/chart/interface/recipe/chart-canvas';

export interface RecipeAnalyticsChartCanvas extends RecipeChartCanvas {
	xAxisLabel?: string;
	yAxisLabel?: string;
	zAxisLabel?: string;
}
