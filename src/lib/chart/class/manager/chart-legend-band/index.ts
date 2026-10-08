import { ManagerChartLegendBar } from '$stylist/chart/class/manager/chart-legend-bar';

export class ManagerChartLegendBand {
	static createLayout(
		items: {
			text: string;
			value?: number;
			atom?: number;
			molecule?: number;
			organism?: number;
			template?: number;
			page?: number;
			atoms?: number;
			molecules?: number;
			organisms?: number;
			templates?: number;
			pages?: number;
			color?: string;
		}[],
		options: {
			width?: number;
			height?: number;
			plotHeight?: number;
			labelAreaHeight?: number;
			paddingLeft?: number;
			paddingRight?: number;
			paddingTop?: number;
			bandWidth?: number;
			minBandHeight?: number;
			minValue?: number;
			maxValue?: number;
			tickCount?: number;
			fontSize?: number;
			color?: string;
		} = {}
	): {
		width: number;
		height: number;
		plotHeight: number;
		plotX: number;
		plotRight: number;
		axisY: number;
		minValue: number;
		maxValue: number;
		ticks: { id: string; value: number; y: number }[];
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
			connectorWidth: number;
			labelX: number;
			labelY: number;
			labelWidth: number;
			labelHeight: number;
			textX: number;
			textY: number;
			segments: {
				id: string;
				text: string;
				value: number;
				color: string;
				x: number;
				y: number;
				width: number;
				height: number;
			}[];
		}[];
	} {
		const width = options.width ?? 1120;
		const plotHeight = options.plotHeight ?? 220;
		const labelAreaHeight = options.labelAreaHeight ?? 150;
		const height = options.height ?? plotHeight + labelAreaHeight + 38;
		const paddingLeft = options.paddingLeft ?? 28;
		const paddingRight = options.paddingRight ?? 28;
		const paddingTop = options.paddingTop ?? 18;
		const plotX = paddingLeft;
		const plotRight = width - paddingRight;
		const axisY = paddingTop + plotHeight;
		const plotWidth = Math.max(1, plotRight - plotX);
		const step = plotWidth / Math.max(1, items.length);
		const bandWidth =
			options.bandWidth ??
			Math.max(14, Math.min(32, (plotWidth / Math.max(1, items.length)) * 0.58));
		const minBandHeight = options.minBandHeight ?? 8;
		const fontSize = options.fontSize ?? 11;
		const labelHeight = 24;
		const labelPaddingX = 16;
		const connectorInset = 8;
		const laneGap = 10;
		const connectorGap = 10;
		const tickCount = Math.max(1, options.tickCount ?? 5);
		const defaultColor = options.color ?? '#2563eb';
		const levelColors = [
			`color-mix(in srgb, ${defaultColor} 64%, #020617 36%)`,
			defaultColor,
			`color-mix(in srgb, ${defaultColor} 56%, white 44%)`,
			`color-mix(in srgb, ${defaultColor} 24%, white 76%)`
		];
		const componentColors = {
			atom: defaultColor,
			molecule: `color-mix(in srgb, ${defaultColor} 42%, white 58%)`,
			organism: `color-mix(in srgb, ${defaultColor} 70%, #020617 30%)`,
			template: `color-mix(in srgb, ${defaultColor} 42%, white 58%)`,
			page: defaultColor
		};
		const preparedItems = items.map((item) => {
			const atom = item.atom ?? item.atoms ?? 0;
			const molecule = item.molecule ?? item.molecules ?? 0;
			const organism = item.organism ?? item.organisms ?? 0;
			const template = item.template ?? item.templates ?? 0;
			const page = item.page ?? item.pages ?? 0;
			const total = item.value ?? atom + molecule + organism + template + page;

			return {
				...item,
				value: total,
				sections: [
					{ id: 'atom', text: 'Atom', value: atom, color: componentColors.atom },
					{ id: 'molecule', text: 'Molecule', value: molecule, color: componentColors.molecule },
					{ id: 'organism', text: 'Organism', value: organism, color: componentColors.organism },
					{ id: 'template', text: 'Template', value: template, color: componentColors.template },
					{ id: 'page', text: 'Page', value: page, color: componentColors.page }
				].filter((section) => section.value > 0)
			};
		});
		const minValue = options.minValue ?? 0;
		const maxValue = Math.max(
			minValue + 1,
			options.maxValue ?? Math.max(1, ...preparedItems.map((item) => item.value))
		);
		const ticks = Array.from({ length: tickCount + 1 }, (_, index) => {
			const ratio = index / tickCount;
			const value = minValue + (maxValue - minValue) * ratio;

			return {
				id: `tick-${index}`,
				value: Math.round(value),
				y: axisY - ratio * plotHeight
			};
		}).reverse();
		const laneRightEdges: number[] = [];

		return {
			width,
			height,
			plotHeight,
			plotX,
			plotRight,
			axisY,
			minValue,
			maxValue,
			ticks,
			items: preparedItems.map((item, index) => {
				const centerX = plotX + step * index + step / 2;
				const valueRatio = (item.value - minValue) / (maxValue - minValue);
				const bandHeight = Math.max(minBandHeight, Math.max(0, valueRatio) * (plotHeight - 12));
				const rawLabelWidth =
					ManagerChartLegendBar.measureTextWidth(item.text, fontSize) + labelPaddingX;
				const labelWidth = Math.max(54, Math.min(150, rawLabelWidth));
				const baseLabelX = Math.max(4, Math.min(width - labelWidth - 4, centerX - labelWidth / 2));
				const leftmostConnectorX = Math.max(4, centerX - labelWidth + connectorInset);
				const rightmostConnectorX = Math.min(width - labelWidth - 4, centerX - connectorInset);
				const shiftStep = 8;
				const candidates = [
					...Array.from(
						{ length: Math.max(1, Math.floor((baseLabelX - leftmostConnectorX) / shiftStep) + 1) },
						(_, candidateIndex) => baseLabelX - (candidateIndex + 1) * shiftStep
					)
						.filter((candidateX) => candidateX >= leftmostConnectorX)
						.sort((left, right) => left - right),
					baseLabelX,
					...Array.from(
						{ length: Math.max(1, Math.floor((rightmostConnectorX - baseLabelX) / shiftStep) + 1) },
						(_, candidateIndex) => baseLabelX + (candidateIndex + 1) * shiftStep
					)
						.filter((candidateX) => candidateX <= rightmostConnectorX)
						.sort((left, right) => left - right)
				].filter(
					(candidateX, candidateIndex, allCandidates) =>
						allCandidates.indexOf(candidateX) === candidateIndex
				);
				let selected = {
					labelX: baseLabelX,
					labelY: axisY + connectorGap,
					lane: 0,
					score: Number.POSITIVE_INFINITY
				};

				for (let lane = 0; lane < Math.max(8, laneRightEdges.length + 3); lane += 1) {
					const labelY = axisY + connectorGap + lane * (labelHeight + laneGap);

					for (const candidateX of candidates) {
						const overlapsLane =
							laneRightEdges[lane] !== undefined && candidateX < laneRightEdges[lane] + 8;

						if (overlapsLane) continue;
						if (
							centerX < candidateX + connectorInset ||
							centerX > candidateX + labelWidth - connectorInset
						)
							continue;

						const score = lane * 80 + (candidateX > baseLabelX ? 500 : 0) + candidateX * 0.01;

						if (score < selected.score) {
							selected = {
								labelX: candidateX,
								labelY,
								lane,
								score
							};
						}
					}
				}

				laneRightEdges[selected.lane] = selected.labelX + labelWidth;

				let segmentY = axisY;
				const segments = item.sections.map((section) => {
					const sectionHeight = item.value <= 0 ? 0 : (section.value / item.value) * bandHeight;
					segmentY -= sectionHeight;

					return {
						id: `${item.text}-${section.id}-${index}`,
						text: section.text,
						value: section.value,
						color: section.color,
						x: centerX - bandWidth / 2,
						y: segmentY,
						width: Math.max(1, bandWidth),
						height: Math.max(0, sectionHeight)
					};
				});

				return {
					id: `${item.text}-${index}`,
					text: item.text,
					value: item.value,
					valueLabel: String(item.value),
					color: item.color ?? levelColors[selected.lane % levelColors.length],
					x: centerX - bandWidth / 2,
					y: axisY - bandHeight,
					width: bandWidth,
					height: bandHeight,
					connectorX: centerX,
					connectorY1: axisY,
					connectorY2: selected.labelY,
					connectorWidth: 1.35 + selected.lane * 0.55,
					labelX: selected.labelX,
					labelY: selected.labelY,
					labelWidth,
					labelHeight,
					textX: selected.labelX + labelWidth / 2,
					textY: selected.labelY + 15,
					segments
				};
			})
		};
	}
}
