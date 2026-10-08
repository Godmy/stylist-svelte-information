export class ManagerOutlierConstellation {
	static createLayout(
		points: {
			id: string;
			text: string;
			x: number;
			y: number;
			confidence: number;
			outlier?: boolean;
		}[],
		options: { width?: number; height?: number } = {}
	) {
		const width = options.width ?? 760;
		const height = options.height ?? 440;
		const plotX = 58;
		const plotY = 24;
		const plotWidth = width - plotX - 32;
		const plotHeight = height - plotY - 54;
		const centerX = plotX + plotWidth / 2;
		const centerY = plotY + plotHeight / 2;
		const items = points.map((point) => ({
			...point,
			x: plotX + ((point.x + 1) / 2) * plotWidth,
			y: plotY + plotHeight - ((point.y + 1) / 2) * plotHeight,
			r: 5 + Math.max(0, Math.min(1, point.confidence)) * 9
		}));

		return { width, height, plotX, plotY, plotWidth, plotHeight, centerX, centerY, points: items };
	}
}
