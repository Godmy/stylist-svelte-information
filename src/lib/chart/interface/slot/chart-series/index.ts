import type { ChartFunctionPoint } from '$stylist/chart/interface/slot/chart-point';

/** Серия графика: идентичность, подпись, цвет и набор точек */
export interface ChartSeries {
	id: string;
	name: string;
	color?: string;
	points: ChartFunctionPoint[];
}
