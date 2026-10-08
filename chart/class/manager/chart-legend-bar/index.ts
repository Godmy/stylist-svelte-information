export class ManagerChartLegendBar {
	static measureTextWidth(text: string, fontSize = 11): number {
		return Array.from(text).reduce((width, char) => {
			if (/[A-Z0-9]/.test(char)) return width + fontSize * 0.64;
			if (/[-_\s.]/.test(char)) return width + fontSize * 0.34;
			if (/[il]/.test(char)) return width + fontSize * 0.32;
			if (/[mw]/.test(char)) return width + fontSize * 0.82;
			return width + fontSize * 0.56;
		}, 0);
	}

	private static countLineLabelIntersections(
		startX: number,
		startY: number,
		endY: number,
		labels: { x: number; y: number; width: number; height: number }[]
	): number {
		if (endY <= startY) return 0;

		return labels.filter((label) => {
			const sampleY = label.y + label.height / 2;
			if (sampleY < startY || sampleY > endY) return false;
			return startX >= label.x && startX <= label.x + label.width;
		}).length;
	}

	static createLayout(
		items: { text: string; value: number; color?: string }[],
		options: {
			width?: number;
			height?: number;
			plotHeight?: number;
			labelAreaHeight?: number;
			paddingLeft?: number;
			paddingRight?: number;
			paddingTop?: number;
			barWidth?: number;
			minBarHeight?: number;
			fontSize?: number;
			color?: string;
		} = {}
	): {
		width: number;
		height: number;
		plotHeight: number;
		axisY: number;
		maxValue: number;
		items: {
			id: string;
			text: string;
			value: number;
			valueLabel: string;
			color: string;
			x: number;
			y: number;
			width: number;
			height: number;
			connectorX: number;
			connectorY1: number;
			connectorY2: number;
			connectorTargetX: number;
			connectorWidth: number;
			labelX: number;
			labelY: number;
			labelWidth: number;
			labelHeight: number;
			textX: number;
			textY: number;
		}[];
	} {
		const width = options.width ?? 1120;
		const plotHeight = options.plotHeight ?? 220;
		const labelAreaHeight = options.labelAreaHeight ?? 150;
		const height = options.height ?? plotHeight + labelAreaHeight + 34;
		const paddingLeft = options.paddingLeft ?? 28;
		const paddingRight = options.paddingRight ?? 28;
		const paddingTop = options.paddingTop ?? 18;
		const barWidth =
			options.barWidth ??
			Math.max(
				9,
				Math.min(24, ((width - paddingLeft - paddingRight) / Math.max(1, items.length)) * 0.42)
			);
		const minBarHeight = options.minBarHeight ?? 8;
		const fontSize = options.fontSize ?? 11;
		const axisY = paddingTop + plotHeight;
		const maxValue = Math.max(1, ...items.map((item) => item.value));
		const plotWidth = Math.max(1, width - paddingLeft - paddingRight);
		const step = plotWidth / Math.max(1, items.length);
		const connectorCenters = items.map((_, index) => paddingLeft + step * index + step / 2);
		const labelHeight = 24;
		const labelPaddingX = 16;
		const connectorInset = 8;
		const laneGap = 10;
		const connectorGap = 10;
		const defaultColor = options.color ?? '#2563eb';
		const levelColors = [
			`color-mix(in srgb, ${defaultColor} 64%, #020617 36%)`,
			defaultColor,
			`color-mix(in srgb, ${defaultColor} 56%, white 44%)`,
			`color-mix(in srgb, ${defaultColor} 24%, white 76%)`
		];
		const laneRightEdges: number[] = [];
		const placedLabels: { x: number; y: number; width: number; height: number; lane: number }[] =
			[];

		return {
			width,
			height,
			plotHeight,
			axisY,
			maxValue,
			items: items.map((item, index) => {
				const centerX = connectorCenters[index];
				const barHeight = Math.max(minBarHeight, (item.value / maxValue) * (plotHeight - 18));
				const rawLabelWidth =
					ManagerChartLegendBar.measureTextWidth(item.text, fontSize) + labelPaddingX;
				const labelWidth = Math.max(54, Math.min(150, rawLabelWidth));
				const baseLabelX = Math.max(4, Math.min(width - labelWidth - 4, centerX - labelWidth / 2));
				const leftmostConnectorX = Math.max(4, centerX - labelWidth + connectorInset);
				const rightmostConnectorX = Math.min(width - labelWidth - 4, centerX - connectorInset);
				const shiftStep = 8;
				const leftCandidates = Array.from(
					{ length: Math.max(1, Math.floor((baseLabelX - leftmostConnectorX) / shiftStep) + 1) },
					(_, candidateIndex) => baseLabelX - (candidateIndex + 1) * shiftStep
				).filter((candidateX) => candidateX >= leftmostConnectorX);
				const rightCandidates = Array.from(
					{ length: Math.max(1, Math.floor((rightmostConnectorX - baseLabelX) / shiftStep) + 1) },
					(_, candidateIndex) => baseLabelX + (candidateIndex + 1) * shiftStep
				).filter((candidateX) => candidateX <= rightmostConnectorX);
				const labelCandidates = [
					...leftCandidates.sort((left, right) => left - right),
					baseLabelX,
					...rightCandidates.sort((left, right) => left - right)
				].filter(
					(candidateX, candidateIndex, candidates) =>
						candidates.indexOf(candidateX) === candidateIndex
				);
				let selected = {
					labelX: baseLabelX,
					labelY: axisY + connectorGap,
					targetX: centerX,
					lane: 0,
					score: Number.POSITIVE_INFINITY
				};

				for (let lane = 0; lane < Math.max(8, laneRightEdges.length + 3); lane += 1) {
					const labelY = axisY + connectorGap + lane * (labelHeight + laneGap);

					for (const candidateX of labelCandidates) {
						const overlapsLane =
							laneRightEdges[lane] !== undefined && candidateX < laneRightEdges[lane] + 8;

						if (overlapsLane) continue;

						const otherConnectorCount = connectorCenters.filter((connectorX, connectorIndex) => {
							if (connectorIndex === index) return false;
							return (
								connectorX >= candidateX - connectorInset &&
								connectorX <= candidateX + labelWidth + connectorInset
							);
						}).length;

						const containsConnector =
							centerX >= candidateX + connectorInset &&
							centerX <= candidateX + labelWidth - connectorInset;
						if (!containsConnector) continue;

						const intersections = ManagerChartLegendBar.countLineLabelIntersections(
							centerX,
							axisY,
							labelY,
							placedLabels
						);
						const score =
							intersections * 1000 +
							Math.max(0, intersections - 1) * 10000 +
							otherConnectorCount * 260 +
							lane * 80 +
							(candidateX > baseLabelX ? 500 : 0) +
							candidateX * 0.01;

						if (score < selected.score) {
							selected = {
								labelX: candidateX,
								labelY,
								targetX: centerX,
								lane,
								score
							};
						}
					}
				}

				laneRightEdges[selected.lane] = selected.labelX + labelWidth;
				placedLabels.push({
					x: selected.labelX,
					y: selected.labelY,
					width: labelWidth,
					height: labelHeight,
					lane: selected.lane
				});

				return {
					id: `${item.text}-${index}`,
					text: item.text,
					value: item.value,
					valueLabel: String(item.value),
					color: item.color ?? levelColors[selected.lane % levelColors.length],
					x: centerX - barWidth / 2,
					y: axisY - barHeight,
					width: barWidth,
					height: barHeight,
					connectorX: centerX,
					connectorY1: axisY,
					connectorY2: selected.labelY,
					connectorTargetX: selected.targetX,
					connectorWidth: 1.35 + selected.lane * 0.55,
					labelX: selected.labelX,
					labelY: selected.labelY,
					labelWidth,
					labelHeight,
					textX: selected.labelX + labelWidth / 2,
					textY: selected.labelY + 15
				};
			})
		};
	}
}
