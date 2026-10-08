import type { RecipeCanvasChart } from '$stylist/chart/interface/recipe/canvas-chart';

export const PRESET_CANVAS_CHART: RecipeCanvasChart = {
	width: 800,
	height: 600,
	type: 'line',
	variant: 'default',
	size: 'md',
	showGrid: true,
	showLegend: true,
	showTooltip: true,
	colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
};
