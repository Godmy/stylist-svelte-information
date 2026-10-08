export class ManagerWidebandDelphiDiagram {
	static createLayout(
		points: {
			time: string;
			min: number;
			low: number;
			consensus: number;
			high: number;
			max: number;
			market?: number;
			procurement?: number;
		}[],
		options: {
			width?: number;
			height?: number;
			minValue?: number;
			maxValue?: number;
			timeLabelStep?: number;
			currency?: string;
		} = {}
	): {
		width: number;
		height: number;
		plotX: number;
		plotY: number;
		plotWidth: number;
		plotHeight: number;
		minValue: number;
		maxValue: number;
		currency: string;
		ticks: { id: string; value: number; y: number; label: string }[];
		points: {
			id: string;
			time: string;
			x: number;
			minY: number;
			lowY: number;
			consensusY: number;
			highY: number;
			maxY: number;
			marketY?: number;
			procurementY?: number;
			consensus: number;
			showTimeLabel: boolean;
		}[];
		outerBandPath: string;
		coreBandPath: string;
		consensusPath: string;
		marketPath: string;
		procurementPath: string;
	} {
		const width = options.width ?? 1120;
		const height = options.height ?? 420;
		const plotX = 64;
		const plotY = 24;
		const plotWidth = width - plotX - 28;
		const plotHeight = height - plotY - 56;
		const currency = options.currency ?? '$';
		const timeLabelStep = Math.max(1, options.timeLabelStep ?? 3);
		const values = points.flatMap((point) => [
			point.min,
			point.low,
			point.consensus,
			point.high,
			point.max,
			point.market ?? point.consensus,
			point.procurement ?? point.consensus
		]);
		const rawMinValue = options.minValue ?? Math.min(...values);
		const rawMaxValue = options.maxValue ?? Math.max(...values);
		const valuePadding = Math.max(1, (rawMaxValue - rawMinValue) * 0.08);
		const minValue = Math.floor((rawMinValue - valuePadding) / 10) * 10;
		const maxValue = Math.ceil((rawMaxValue + valuePadding) / 10) * 10;
		const scaleY = (value: number) =>
			plotY + plotHeight - ((value - minValue) / Math.max(1, maxValue - minValue)) * plotHeight;
		const scaleX = (index: number) => plotX + (plotWidth * index) / Math.max(1, points.length - 1);
		const layoutPoints = points.map((point, index) => ({
			id: `${point.time}-${index}`,
			time: point.time,
			x: scaleX(index),
			minY: scaleY(point.min),
			lowY: scaleY(point.low),
			consensusY: scaleY(point.consensus),
			highY: scaleY(point.high),
			maxY: scaleY(point.max),
			marketY: point.market === undefined ? undefined : scaleY(point.market),
			procurementY: point.procurement === undefined ? undefined : scaleY(point.procurement),
			consensus: point.consensus,
			showTimeLabel: index % timeLabelStep === 0 || index === points.length - 1
		}));
		const linePath = (selector: (point: (typeof layoutPoints)[number]) => number | undefined) =>
			layoutPoints
				.map((point) => ({ x: point.x, y: selector(point) }))
				.filter((point): point is { x: number; y: number } => point.y !== undefined)
				.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
				.join(' ');
		const bandPath = (
			topSelector: (point: (typeof layoutPoints)[number]) => number,
			bottomSelector: (point: (typeof layoutPoints)[number]) => number
		) => {
			const top = layoutPoints.map(
				(point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${topSelector(point)}`
			);
			const bottom = [...layoutPoints]
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

		return {
			width,
			height,
			plotX,
			plotY,
			plotWidth,
			plotHeight,
			minValue,
			maxValue,
			currency,
			ticks,
			points: layoutPoints,
			outerBandPath: bandPath(
				(point) => point.maxY,
				(point) => point.minY
			),
			coreBandPath: bandPath(
				(point) => point.highY,
				(point) => point.lowY
			),
			consensusPath: linePath((point) => point.consensusY),
			marketPath: linePath((point) => point.marketY),
			procurementPath: linePath((point) => point.procurementY)
		};
	}
}
