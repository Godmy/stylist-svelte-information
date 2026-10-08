export class ManagerExpertSpreadMatrix {
	static createLayout(
		experts: string[],
		periods: string[],
		values: { expert: string; period: string; value: number; outlier?: boolean }[],
		options: { width?: number; cellSize?: number; minValue?: number; maxValue?: number } = {}
	) {
		const cellSize = options.cellSize ?? 38;
		const labelWidth = 116;
		const labelHeight = 34;
		const width = options.width ?? labelWidth + periods.length * cellSize + 24;
		const height = labelHeight + experts.length * cellSize + 28;
		const allValues = values.map((item) => item.value);
		const minValue = options.minValue ?? Math.min(...allValues);
		const maxValue = options.maxValue ?? Math.max(...allValues);
		const valueByKey = new Map(values.map((item) => [`${item.expert}:${item.period}`, item]));
		const cells = experts.flatMap((expert, row) =>
			periods.map((period, column) => {
				const item = valueByKey.get(`${expert}:${period}`);
				const ratio = ((item?.value ?? minValue) - minValue) / Math.max(1, maxValue - minValue);
				return {
					id: `${expert}-${period}`,
					expert,
					period,
					value: item?.value ?? 0,
					outlier: item?.outlier ?? false,
					x: labelWidth + column * cellSize,
					y: labelHeight + row * cellSize,
					size: cellSize,
					color: `color-mix(in srgb, #2563eb ${Math.round(18 + ratio * 66)}%, white)`
				};
			})
		);

		return {
			width,
			height,
			cellSize,
			labelWidth,
			labelHeight,
			experts,
			periods,
			cells,
			minValue,
			maxValue
		};
	}
}
