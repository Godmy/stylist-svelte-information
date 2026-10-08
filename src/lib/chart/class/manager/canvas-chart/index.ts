import type { CanvasChartPadding } from '$stylist/chart/interface/slot/canvas-chart-padding';
import type { RecipeCanvasChart } from '$stylist/chart/interface/recipe/canvas-chart';
import type { TokenCanvasChartType } from '$stylist/chart/type/alias/canvas-chart-type';
import { TOKEN_CHART_COLORS } from '$stylist/chart/const/array/chart-colors';
import { DEFAULT_CANVAS_CHART_PADDING } from '$stylist/chart/const/map/default-canvas-chart-padding';
import { PRESET_CANVAS_CHART } from '$stylist/chart/const/preset/canvas-chart';

export class ManagerCanvasChart {
	static resolvePreset(
		name: 'default' | 'minimal' | 'bold' | 'small' | 'large'
	): RecipeCanvasChart {
		switch (name) {
			case 'minimal':
				return {
					...PRESET_CANVAS_CHART,
					variant: 'minimal',
					showGrid: false
				};
			case 'bold':
				return {
					...PRESET_CANVAS_CHART,
					variant: 'bold',
					size: 'lg'
				};
			case 'small':
				return {
					...PRESET_CANVAS_CHART,
					size: 'sm',
					width: 400,
					height: 300
				};
			case 'large':
				return {
					...PRESET_CANVAS_CHART,
					size: 'lg',
					width: 1200,
					height: 800
				};
			case 'default':
			default:
				return PRESET_CANVAS_CHART;
		}
	}

	static resolveColors(colors?: readonly string[]): string[] {
		return colors && colors.length > 0 ? [...colors] : [...TOKEN_CHART_COLORS];
	}

	static resolvePadding(): CanvasChartPadding {
		return DEFAULT_CANVAS_CHART_PADDING;
	}

	static shouldDrawChart(
		canvasRef: HTMLCanvasElement | null,
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[]
	): canvasRef is HTMLCanvasElement {
		return canvasRef !== null && data.length > 0;
	}

	static drawChart(params: {
		canvas: HTMLCanvasElement;
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[];
		type: TokenCanvasChartType;
		title: string;
		xAxisLabel: string;
		yAxisLabel: string;
		showGrid: boolean;
		colors: readonly string[];
	}): void {
		const { canvas, data, type, title, xAxisLabel, yAxisLabel, showGrid, colors } = params;
		const context = canvas.getContext('2d');
		if (!context) {
			return;
		}

		context.clearRect(0, 0, canvas.width, canvas.height);
		const padding = this.resolvePadding();

		this.drawTitle(context, canvas, title);
		this.drawAxisLabels(context, canvas, xAxisLabel, yAxisLabel);

		if (showGrid) {
			this.drawGrid(context, canvas, padding, data);
		}

		switch (type) {
			case 'bar':
				this.drawBarChart(context, canvas, data, padding, [...colors]);
				break;
			case 'pie':
				this.drawPieChart(context, canvas, data, [...colors]);
				break;
			case 'line':
			default:
				this.drawLineChart(context, canvas, data, padding, [...colors]);
				break;
		}
	}

	private static drawTitle(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		title: string
	): void {
		if (!title) {
			return;
		}

		context.font = 'bold 18px sans-serif';
		context.textAlign = 'center';
		context.fillText(title, canvas.width / 2, 20);
	}

	private static drawAxisLabels(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		xAxisLabel: string,
		yAxisLabel: string
	): void {
		if (xAxisLabel) {
			context.font = '14px sans-serif';
			context.textAlign = 'center';
			context.fillText(xAxisLabel, canvas.width / 2, canvas.height - 10);
		}

		if (!yAxisLabel) {
			return;
		}

		context.save();
		context.translate(20, canvas.height / 2);
		context.rotate(-Math.PI / 2);
		context.textAlign = 'center';
		context.fillText(yAxisLabel, 0, 0);
		context.restore();
	}

	private static drawGrid(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		padding: CanvasChartPadding,
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[]
	): void {
		const chartWidth = canvas.width - padding.left - padding.right;
		const chartHeight = canvas.height - padding.top - padding.bottom;

		context.strokeStyle = 'var(--color-border-primary)';
		context.lineWidth = 0.5;

		for (let i = 0; i <= 10; i += 1) {
			const y = padding.top + (chartHeight / 10) * i;
			context.beginPath();
			context.moveTo(padding.left, y);
			context.lineTo(padding.left + chartWidth, y);
			context.stroke();
		}

		for (let i = 0; i <= data.length; i += 1) {
			const x = padding.left + (chartWidth / Math.max(data.length, 1)) * i;
			context.beginPath();
			context.moveTo(x, padding.top);
			context.lineTo(x, padding.top + chartHeight);
			context.stroke();
		}
	}

	private static resolveYStats(
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[]
	) {
		const yValues = data.map((point) => point.y);
		const minY = Math.min(...yValues);
		const maxY = Math.max(...yValues);
		const yRange = maxY - minY || 1;

		return { minY, maxY, yRange };
	}

	private static drawLineChart(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[],
		padding: CanvasChartPadding,
		colors: string[]
	): void {
		if (data.length === 0) {
			return;
		}

		const chartWidth = canvas.width - padding.left - padding.right;
		const chartHeight = canvas.height - padding.top - padding.bottom;
		const { minY, yRange } = this.resolveYStats(data);
		const xStep = chartWidth / Math.max(data.length - 1, 1);

		context.beginPath();
		context.strokeStyle = colors[0];
		context.lineWidth = 2;

		data.forEach((point, index) => {
			const x = padding.left + xStep * index;
			const y = padding.top + chartHeight - ((point.y - minY) / yRange) * chartHeight;

			if (index === 0) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}
		});

		context.stroke();
		context.fillStyle = colors[0];

		data.forEach((point, index) => {
			const x = padding.left + xStep * index;
			const y = padding.top + chartHeight - ((point.y - minY) / yRange) * chartHeight;

			context.beginPath();
			context.arc(x, y, 4, 0, Math.PI * 2);
			context.fill();
		});

		this.drawCartesianLabels(
			context,
			canvas,
			data,
			padding,
			minY,
			yRange,
			chartHeight,
			xStep,
			false
		);
	}

	private static drawBarChart(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[],
		padding: CanvasChartPadding,
		colors: string[]
	): void {
		if (data.length === 0) {
			return;
		}

		const chartWidth = canvas.width - padding.left - padding.right;
		const chartHeight = canvas.height - padding.top - padding.bottom;
		const { minY, yRange } = this.resolveYStats(data);
		const barWidth = (chartWidth / data.length) * 0.8;
		const xStep = chartWidth / data.length;

		data.forEach((point, index) => {
			const x = padding.left + xStep * index + (xStep - barWidth) / 2;
			const barHeight = ((point.y - minY) / yRange) * chartHeight;
			const y = padding.top + chartHeight - barHeight;

			context.fillStyle = colors[index % colors.length];
			context.fillRect(x, y, barWidth, barHeight);
		});

		this.drawCartesianLabels(
			context,
			canvas,
			data,
			padding,
			minY,
			yRange,
			chartHeight,
			xStep,
			true
		);
	}

	private static drawCartesianLabels(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[],
		padding: CanvasChartPadding,
		minY: number,
		yRange: number,
		chartHeight: number,
		xStep: number,
		isBarChart: boolean
	): void {
		context.fillStyle = 'var(--color-text-primary)';
		context.font = '12px sans-serif';
		context.textAlign = 'center';

		data.forEach((point, index) => {
			const x = isBarChart
				? padding.left + xStep * index + xStep / 2
				: padding.left + xStep * index;
			context.fillText(point.x.toString(), x, canvas.height - padding.bottom + 20);
		});

		context.textAlign = 'right';
		for (let i = 0; i <= 10; i += 1) {
			const yValue = minY + (yRange / 10) * i;
			const y = padding.top + chartHeight - (i / 10) * chartHeight;
			context.fillText(yValue.toFixed(1), padding.left - 10, y + 4);
		}
	}

	private static drawPieChart(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		data: readonly {
			x: number | string;
			y: number;
			label?: string;
		}[],
		colors: string[]
	): void {
		if (data.length === 0) {
			return;
		}

		const total = data.reduce((sum, point) => sum + Math.abs(point.y), 0);
		if (total === 0) {
			return;
		}

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = Math.min(canvas.width, canvas.height) * 0.4;
		let startAngle = -Math.PI / 2;

		data.forEach((point, index) => {
			const sliceAngle = (Math.abs(point.y) / total) * Math.PI * 2;
			const endAngle = startAngle + sliceAngle;

			context.beginPath();
			context.moveTo(centerX, centerY);
			context.arc(centerX, centerY, radius, startAngle, endAngle);
			context.closePath();
			context.fillStyle = colors[index % colors.length];
			context.fill();

			const labelX = centerX + Math.cos(startAngle + sliceAngle / 2) * radius * 0.7;
			const labelY = centerY + Math.sin(startAngle + sliceAngle / 2) * radius * 0.7;

			context.fillStyle = 'var(--color-text-primary)';
			context.font = '12px sans-serif';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(point.x.toString(), labelX, labelY);

			startAngle = endAngle;
		});
	}
}
