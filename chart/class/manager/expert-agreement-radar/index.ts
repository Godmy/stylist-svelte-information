export class ManagerExpertAgreementRadar {
	static createLayout(
		axes: { text: string; value: number; target?: number }[],
		options: { width?: number; height?: number; maxValue?: number } = {}
	) {
		const width = options.width ?? 520;
		const height = options.height ?? 520;
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = Math.min(width, height) * 0.34;
		const maxValue = options.maxValue ?? 100;
		const pointFor = (index: number, value: number) => {
			const angle = -Math.PI / 2 + (Math.PI * 2 * index) / Math.max(1, axes.length);
			const distance = (value / maxValue) * radius;
			return {
				x: centerX + Math.cos(angle) * distance,
				y: centerY + Math.sin(angle) * distance
			};
		};
		const labelPoints = axes.map((axis, index) => {
			const point = pointFor(index, maxValue * 1.16);
			return { ...point, id: axis.text, text: axis.text };
		});
		const valuePoints = axes.map((axis, index) => ({
			...pointFor(index, axis.value),
			id: axis.text,
			value: axis.value
		}));
		const targetPoints = axes.map((axis, index) => ({
			...pointFor(index, axis.target ?? maxValue * 0.72),
			id: axis.text
		}));
		const path = (points: { x: number; y: number }[]) =>
			`${points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')} Z`;

		return {
			width,
			height,
			centerX,
			centerY,
			radius,
			maxValue,
			labelPoints,
			valuePoints,
			targetPoints,
			valuePath: path(valuePoints),
			targetPath: path(targetPoints)
		};
	}
}
