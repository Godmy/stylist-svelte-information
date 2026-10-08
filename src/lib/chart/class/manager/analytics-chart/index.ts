import type { AnalyticsChartDataPoint } from '$stylist/chart/interface/slot/analytics-chart-data-point';

export class ManagerAnalyticsChart {
	static resolveMaxValue(data: AnalyticsChartDataPoint[]): number {
		return data.length > 0 ? Math.max(...data.map((item) => item.value), 0) : 100;
	}

	static buildBarChartPoints(data: AnalyticsChartDataPoint[]) {
		return data.map((item, index) => ({
			id: `point-${index}`,
			name: item.label,
			label: item.label,
			value: item.value,
			color: item.color
		}));
	}

	static buildPieChartPoints(data: AnalyticsChartDataPoint[]): any[] {
		return data.map((item, index) => ({
			x: index,
			y: item.value,
			label: item.label,
			color: item.color
		}));
	}

	static buildLineSeries(data: AnalyticsChartDataPoint[], title: string): any[] {
		// TODO: Fix type mismatch with AnalyticsChartLineSeries
		return [
			{
				id: 'analytics-series',
				label: title,
				data: data.map((item, index) => ({
					id: `${index}`,
					name: item.label,
					value: item.value,
					color: item.color
				}))
			}
		];
	}

	static resolveLegendColor(color?: string): string {
		return color || 'var(--color-primary-500)';
	}
}
