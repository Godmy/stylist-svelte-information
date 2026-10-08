import type { RecipeBaseCard } from '$stylist/list/interface/recipe/base-card';

export function createBaseCardState(getProps: () => RecipeBaseCard) {
	const props = $derived(getProps());
	const variant = $derived(props.variant ?? 'default');
	const size = $derived(props.size ?? 'md');
	const disabled = $derived(props.disabled ?? false);

	const containerClasses = $derived(`base-card ${props.class ?? ''}`.trim());
	const headerClasses = $derived(`base-card__header ${props.headerClass ?? ''}`.trim());
	const bodyClasses = $derived(`base-card__body ${props.bodyClass ?? ''}`.trim());
	const footerClasses = $derived(`base-card__footer ${props.footerClass ?? ''}`.trim());
	const hasHeader = $derived(Boolean(props.title || props.description));
	const hasFooter = $derived(Boolean(props.footer));

	const restProps = $derived.by(() => {
		const {
			class: _class,
			title: _title,
			description: _description,
			variant: _variant,
			size: _size,
			disabled: _disabled,
			headerClass: _headerClass,
			bodyClass: _bodyClass,
			footerClass: _footerClass,
			footer: _footer,
			children: _children,
			...rest
		} = props;
		return rest;
	});

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get containerClasses() {
			return containerClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get bodyClasses() {
			return bodyClasses;
		},
		get footerClasses() {
			return footerClasses;
		},
		get hasHeader() {
			return hasHeader;
		},
		get hasFooter() {
			return hasFooter;
		},
		get restProps() {
			return restProps;
		}
	};
}
