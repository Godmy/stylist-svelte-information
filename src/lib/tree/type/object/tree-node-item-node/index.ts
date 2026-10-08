export type TreeNodeItemNode = {
	key?: string;
	desc: string;
	child?: TreeNodeItemNode[];
	[key: string]: unknown;
};
