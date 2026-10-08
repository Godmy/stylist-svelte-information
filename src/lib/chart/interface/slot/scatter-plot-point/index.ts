/** Атом точки scatter plot */
export interface ScatterPlotDataPoint {
	id: string;
	x: number;
	y: number;
	name?: string;
	size?: number;
	color?: string;
	category?: string;
	description?: string;
}
