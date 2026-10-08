import type { LineChartPoint } from '$stylist/chart/interface/slot/line-chart';

export interface AnalyticsChartBarPoint extends LineChartPoint {
	label: string;
}
