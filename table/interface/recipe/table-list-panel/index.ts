export interface RecipeTableListPanel {
	class?: string;
	items: {
		name: string;
		rowCount: number;
		hasSoftDelete: boolean;
	}[];
	selectedName: string | null;
	onSelect: (name: string) => void;
}
