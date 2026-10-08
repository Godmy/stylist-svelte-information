import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeChartLegendBand extends SlotText {
	value: number;
	valueLabel?: string;
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
	connectorVisible?: boolean;
	class?: string;
}
