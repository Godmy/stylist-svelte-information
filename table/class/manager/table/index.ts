import type { HTMLAttributes } from 'svelte/elements';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
import type { RecipeTable } from '$stylist/table/interface/recipe/table';
import type { RecipeRow } from '$stylist/table/interface/recipe/row';
import type { RecipeCell } from '$stylist/table/interface/recipe/cell';
export class ObjectManagerTable {
	static getTableRestProps(props: RecipeTable) {
		const {
			class: _class,
			caption: _caption,
			content: _content,
			striped: _striped,
			bordered: _bordered,
			hoverable: _hoverable,
			stickyHeader: _stickyHeader,
			...rest
		} = props;
		return rest;
	}

	static getRowRestProps(props: RecipeRow & HTMLAttributes<HTMLTableRowElement>) {
		const {
			class: _class,
			content: _content,
			striped: _striped,
			active: _active,
			hoverable: _hoverable,
			...rest
		} = props;
		return rest;
	}

	static getCellRestProps(props: RecipeCell & HTMLAttributes<HTMLTableCellElement>) {
		const { align: _align, class: _class, content: _content, variant: _variant, ...rest } = props;
		return rest;
	}
}
