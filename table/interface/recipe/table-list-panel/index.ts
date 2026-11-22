import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeTableListPanel extends ComputeIntersectAll<
	[
		{
			class?: string;
			/** Section labels by table name, in the order their labels first appear. */
			groups?: Readonly<Record<string, string>>;
			/** Hide the icon, title and count when the host renders them elsewhere. */
			showMetadata?: boolean;
			items: {
				name: string;
				rowCount: number;
				hasSoftDelete: boolean;
			}[];
			selectedName: string | null;
			onSelect: (name: string) => void;
			/** Open the named table, for example in a schema diagram. */
			onOpen?: (name: string) => void;
		}
	]
> {}
