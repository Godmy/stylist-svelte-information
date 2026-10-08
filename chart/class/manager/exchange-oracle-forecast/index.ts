export class ManagerExchangeOracleForecast {
	static createLayout(
		history: { time: string; value: number }[],
		forecast: {
			time: string;
			min: number;
			low: number;
			consensus: number;
			high: number;
			max: number;
		}[],
		options: { width?: number; height?: number; currency?: string; timeLabelStep?: number } = {}
	) {
		const width = options.width ?? 1120;
		const height = options.height ?? 440;
		const plotX = 64;
		const plotY = 24;
		const plotWidth = width - plotX - 32;
		const plotHeight = height - plotY - 62;
		const splitRatio = 0.52;
		const splitX = plotX + plotWidth * splitRatio;
		const historyWidth = plotWidth * splitRatio;
		const forecastWidth = plotWidth * (1 - splitRatio);
		const currency = options.currency ?? '$';
		const timeLabelStep = Math.max(1, options.timeLabelStep ?? 3);
		const values = [
			...history.map((point) => point.value),
			...forecast.flatMap((point) => [point.min, point.low, point.consensus, point.high, point.max])
		];
		const rawMin = Math.min(...values);
		const rawMax = Math.max(...values);
		const padding = Math.max(1, (rawMax - rawMin) * 0.08);
		const minValue = Math.floor((rawMin - padding) / 10) * 10;
		const maxValue = Math.ceil((rawMax + padding) / 10) * 10;
		const scaleY = (value: number) =>
			plotY + plotHeight - ((value - minValue) / Math.max(1, maxValue - minValue)) * plotHeight;
		const scaleHistoryX = (index: number) =>
			plotX + (historyWidth * index) / Math.max(1, history.length - 1);
		const scaleForecastX = (index: number) =>
			splitX + (forecastWidth * index) / Math.max(1, forecast.length - 1);
		const historyPoints = history.map((point, index) => ({
			id: `history-${point.time}-${index}`,
			time: point.time,
			value: point.value,
			x: scaleHistoryX(index),
			y: scaleY(point.value),
			showLabel: index % timeLabelStep === 0
		}));
		const forecastPoints = forecast.map((point, index) => ({
			id: `forecast-${point.time}-${index}`,
			time: point.time,
			x: scaleForecastX(index),
			minY: scaleY(point.min),
			lowY: scaleY(point.low),
			consensusY: scaleY(point.consensus),
			highY: scaleY(point.high),
			maxY: scaleY(point.max),
			showLabel: index % timeLabelStep === 0 || index === forecast.length - 1
		}));
		const linePath = (points: { x: number; y: number }[]) =>
			points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
		const forecastLinePath = (selector: (point: (typeof forecastPoints)[number]) => number) =>
			forecastPoints
				.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${selector(point)}`)
				.join(' ');
		const bandPath = (
			topSelector: (point: (typeof forecastPoints)[number]) => number,
			bottomSelector: (point: (typeof forecastPoints)[number]) => number
		) => {
			const top = forecastPoints.map(
				(point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${topSelector(point)}`
			);
			const bottom = [...forecastPoints]
				.reverse()
				.map((point) => `L ${point.x} ${bottomSelector(point)}`);
			return `${top.join(' ')} ${bottom.join(' ')} Z`;
		};
		const ticks = Array.from({ length: 6 }, (_, index) => {
			const ratio = index / 5;
			const value = minValue + (maxValue - minValue) * ratio;
			return {
				id: `tick-${index}`,
				value,
				y: scaleY(value),
				label: `${currency}${Math.round(value)}`
			};
		}).reverse();
		const lastHistoryPoint = historyPoints[historyPoints.length - 1];

		return {
			width,
			height,
			plotX,
			plotY,
			plotWidth,
			plotHeight,
			splitX,
			currency,
			ticks,
			historyPoints,
			forecastPoints,
			historyPath: linePath(historyPoints),
			outerBandPath: bandPath(
				(point) => point.maxY,
				(point) => point.minY
			),
			coreBandPath: bandPath(
				(point) => point.highY,
				(point) => point.lowY
			),
			consensusPath: forecastLinePath((point) => point.consensusY),
			lastHistoryPoint
		};
	}
}
