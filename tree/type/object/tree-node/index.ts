export type TreeNode = {
	id: string;
	label: string;
	children?: TreeNode[];
	expanded?: boolean;
	disabled?: boolean;
};
