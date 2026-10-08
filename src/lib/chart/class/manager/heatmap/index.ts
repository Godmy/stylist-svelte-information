import type { IHeatmapCell } from '$stylist/chart/interface/slot/heatmap/cell';
import type { TokenThemeScheme } from '$stylist/theme/type/alias/theme-scheme';
import { HEATMAP_GRADIENT_BY_SCHEME } from '$stylist/chart/const/record/heatmap-gradient-by-scheme';
import type { HeatmapAxisValue } from '$stylist/chart/type/alias/heatmap-axis-value';

export class ManagerHeatmap {
	static resolveRows(data: IHeatmapCell[]): HeatmapAxisValue[] {
		return [...new Set(data.map((item) => item.row))];
	}

	static resolveColumns(data: IHeatmapCell[]): HeatmapAxisValue[] {
		return [...new Set(data.map((item) => item.column))];
	}

	static resolveMaxValue(data: IHeatmapCell[], maxValue?: number): number {
		if (typeof maxValue === 'number') {
			return maxValue;
		}

		return data.length > 0 ? Math.max(...data.map((item) => item.value)) : 100;
	}

	static resolveChartWidth(width: number, showAxis: boolean): number {
		return width - (showAxis ? 60 : 10);
	}

	static resolveChartHeight(height: number, showAxis: boolean): number {
		return height - (showAxis ? 40 : 10);
	}

	static resolveCellSize(totalSize: number, length: number): number {
		return length === 0 ? 0 : totalSize / length;
	}

	static resolveColorByScheme(intensity: number, scheme: TokenThemeScheme): string {
		const normalizedIntensity = Math.min(100, Math.max(0, intensity * 100));

		switch (scheme) {
			case 'sunset':
				return `hsl(0, 70%, ${70 - normalizedIntensity * 0.5}%)`;
			case 'forest':
				return `hsl(120, 60%, ${50 + (100 - normalizedIntensity) * 0.3}%)`;
			case 'ocean':
				return `hsl(270, 60%, ${70 - normalizedIntensity * 0.4}%)`;
			case 'minimal':
			default:
				return `hsl(210, 80%, ${80 - normalizedIntensity * 0.6}%)`;
		}
	}

	static resolveLegendGradient(scheme: TokenThemeScheme): string {
		return HEATMAP_GRADIENT_BY_SCHEME[scheme] ?? HEATMAP_GRADIENT_BY_SCHEME.minimal;
	}

	static resolveLegendTitle(scheme: TokenThemeScheme): string {
		return `${scheme.charAt(0).toUpperCase() + scheme.slice(1)} Color Scale`;
	}

	static resolveAxisLabel(label: HeatmapAxisValue): string {
		const normalizedLabel = String(label);
		return normalizedLabel.length > 10 ? `${normalizedLabel.substring(0, 7)}...` : normalizedLabel;
	}

	static resolveLegendMidpoint(minValue: number, maxValue: number): number {
		return (minValue + maxValue) / 2;
	}

	static resolveHeatmapCells(params: {
		data: IHeatmapCell[];
		rows: HeatmapAxisValue[];
		columns: HeatmapAxisValue[];
		cellWidth: number;
		cellHeight: number;
		showAxis: boolean;
		cellPadding: number;
		minValue: number;
		calculatedMaxValue: number;
		colorScheme: TokenThemeScheme;
	}): (IHeatmapCell & {
		id: string;
		x: number;
		y: number;
		width: number;
		height: number;
		color: string;
		intensity: number;
	})[] {
		const {
			data,
			rows,
			columns,
			cellWidth,
			cellHeight,
			showAxis,
			cellPadding,
			minValue,
			calculatedMaxValue,
			colorScheme
		} = params;
		const denominator = calculatedMaxValue - minValue || 1;

		return data.map((cell) => {
			const rowIndex = rows.indexOf(cell.row);
			const columnIndex = columns.indexOf(cell.column);
			const x = columnIndex * cellWidth + (showAxis ? 50 : 5) + cellPadding;
			const y = rowIndex * cellHeight + (showAxis ? 10 : 5) + cellPadding;
			const width = cellWidth - cellPadding * 2;
			const height = cellHeight - cellPadding * 2;
			const intensity = (cell.value - minValue) / denominator;
			const color = this.resolveColorByScheme(intensity, colorScheme);

			return {
				...cell,
				id: `${cell.row}:${cell.column}`,
				x,
				y,
				width,
				height,
				color,
				intensity
			};
		});
	}
}
