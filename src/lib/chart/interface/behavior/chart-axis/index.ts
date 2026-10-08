/**
 * Параметры осей и шкал аналитического чарта.
 *
 * Примечание: xAxisLabel / yAxisLabel / zAxisLabel удалены — дублировали
 * SlotText.title. Для подписей осей используйте SlotText в рецепте.
 */
export interface BehaviorChartAxis {
	xScale?: [number, number];
	yScale?: [number, number];
	xTickCount?: number;
	yTickCount?: number;
	zTickCount?: number;
	showAxis?: boolean;
	showGrid?: boolean;
	showZAxis?: boolean;
	showAxisArrows?: boolean;
	axisColor?: string;
	maxValue?: number;
	minValue?: number;
}
