export class ManagerRiskImpactMap {
	static createLayout(
		risks: {
			id: string;
			text: string;
			probability: number;
			impact: number;
			exposure: number;
			critical?: boolean;
		}[],
		options: { width?: number; height?: number } = {}
	) {
		const width = options.width ?? 760;
		const height = options.height ?? 440;
		const plotX = 58;
		const plotY = 24;
		const plotWidth = width - plotX - 32;
		const plotHeight = height - plotY - 54;
		const maxExposure = Math.max(1, ...risks.map((risk) => risk.exposure));
		const items = risks.map((risk) => ({
			...risk,
			x: plotX + Math.max(0, Math.min(1, risk.probability)) * plotWidth,
			y: plotY + plotHeight - Math.max(0, Math.min(1, risk.impact)) * plotHeight,
			r: 8 + (risk.exposure / maxExposure) * 18
		}));

		return { width, height, plotX, plotY, plotWidth, plotHeight, risks: items };
	}
}
