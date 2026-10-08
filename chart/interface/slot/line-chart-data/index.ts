import type { LineChartPoint } from '$stylist/chart/interface/slot/line-chart';

export interface LineChartData {
	id: string;
	label: string;
	data: LineChartPoint[];
	color?: string;
}
