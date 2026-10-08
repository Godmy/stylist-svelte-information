export type ComparisonTableProduct = {
	id: string;
	name: string;
	description?: string;
	features: {
		[featureId: string]: string | boolean | number;
	};
	primary?: boolean;
};
