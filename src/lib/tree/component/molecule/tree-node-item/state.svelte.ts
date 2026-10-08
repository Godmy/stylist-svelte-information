import type { RecipeTreeNodeItem } from '$stylist/tree/interface/recipe/tree-node-item';

export function createTreeNodeItemState(getProps: () => RecipeTreeNodeItem) {
	const props = $derived(getProps());
	const ChevronRight = 'chevron-right';
	const ChevronDown = 'chevron-down';

	const expandedNodes = $derived(props.expandedNodes ?? new Set<string>());
	const node = $derived(props.node);
	const className = $derived(props.class ?? '');
	const faIcon = $derived(props.faIcon ?? false);
	const secondaryIcon = $derived(props.secondaryIcon);

	const expanded = $derived(node.key ? expandedNodes.has(node.key) : false);
	const hasChildren = $derived(node.child !== undefined && node.child.length > 0);

	const containerClasses = 'c-tree-node';
	const headerClasses = $derived(
		['c-tree-node__header', expanded ? 'c-tree-node__header--expanded' : '']
			.filter(Boolean)
			.join(' ')
	);
	const toggleIconClasses = 'c-tree-node__toggle';
	const noToggleClasses = 'c-tree-node__no-toggle';
	const textClasses = 'c-tree-node__text';
	const secondaryIconClasses = 'c-tree-node__icon';
	const secondaryIconImageClasses = 'c-tree-node__icon-img';
	const childrenClasses = 'c-tree-node__children';

	function handleSelect() {
		if (node.key) {
			props.onSelectCallback?.(node.key);
			props.onNodeSelect?.(node);
		}
	}

	function toggleExpand(e: Event) {
		e.stopPropagation();
		if (node.key) {
			if (expandedNodes.has(node.key)) {
				expandedNodes.delete(node.key);
			} else {
				expandedNodes.add(node.key);
			}
			props.onNodeToggle?.(node);
		}
	}

	const filteredRestProps = $derived.by(() => {
		const {
			node: _node,
			onSelectCallback: _onSelectCallback,
			secondaryIcon: _secondaryIcon,
			faIcon: _faIcon,
			expandedNodes: _expandedNodes,
			class: _class,
			children: _children,
			onNodeSelect: _onNodeSelect,
			onNodeToggle: _onNodeToggle,
			...rest
		} = props;
		return rest;
	});

	return {
		get node() {
			return node;
		},
		get className() {
			return className;
		},
		get faIcon() {
			return faIcon;
		},
		get secondaryIcon() {
			return secondaryIcon;
		},
		get expandedNodes() {
			return expandedNodes;
		},
		get expanded() {
			return expanded;
		},
		get hasChildren() {
			return hasChildren;
		},
		get containerClasses() {
			return containerClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get toggleIconClasses() {
			return toggleIconClasses;
		},
		get noToggleClasses() {
			return noToggleClasses;
		},
		get textClasses() {
			return textClasses;
		},
		get secondaryIconClasses() {
			return secondaryIconClasses;
		},
		get secondaryIconImageClasses() {
			return secondaryIconImageClasses;
		},
		get childrenClasses() {
			return childrenClasses;
		},
		ChevronRight,
		ChevronDown,
		handleSelect,
		toggleExpand,
		get filteredRestProps() {
			return filteredRestProps;
		},
		get children() {
			return props.children;
		}
	};
}

export default createTreeNodeItemState;
