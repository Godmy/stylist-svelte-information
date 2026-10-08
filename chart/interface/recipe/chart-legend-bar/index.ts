import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeChartLegendBar extends SlotText {
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
	connectorTargetX: number;
	connectorWidth: number;
	labelX: number;
	labelY: number;
	labelWidth: number;
	labelHeight: number;
	textX: number;
	textY: number;
	connectorVisible?: boolean;
	class?: string;
}
