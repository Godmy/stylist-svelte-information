export function enhanceArticleContents(node: HTMLElement, getHeaderBottom: () => number = () => 0) {
	const disclosure = node.querySelector<HTMLDetailsElement>('.article-contents');
	const smallScreen = window.matchMedia('(max-width: 760px)');
	function setContentsLayout() {
		if (disclosure) disclosure.open = !smallScreen.matches;
	}
	setContentsLayout();
	smallScreen.addEventListener('change', setContentsLayout);
	const links = Array.from(node.querySelectorAll<HTMLAnchorElement>('.article-reader__contents a'));
	const sections = links.flatMap((link) => {
		const heading = Array.from(node.querySelectorAll<HTMLElement>('[id]')).find(
			(item) => item.id === link.hash.slice(1)
		);
		return heading ? [{ link, heading }] : [];
	});

	let frame = 0;
	let current: HTMLAnchorElement | undefined;

	function update() {
		frame = 0;
		const headerBottom = Math.max(0, getHeaderBottom());
		const readingLine = headerBottom + Math.min(160, (window.innerHeight - headerBottom) * 0.25);
		let selected: HTMLAnchorElement | undefined;
		for (const { link, heading } of sections) {
			if (heading.getBoundingClientRect().top <= readingLine) selected = link;
			else break;
		}
		// A short final section can reach the page bottom before the reading line.
		if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
			const last = sections.at(-1);
			if (last && last.heading.getBoundingClientRect().top < window.innerHeight)
				selected = last.link;
		}
		if (selected === current) return;
		current?.removeAttribute('aria-current');
		selected?.setAttribute('aria-current', 'location');
		current = selected;
		// Long contents lists scroll internally; keep the marked entry visible.
		const contents = selected?.closest<HTMLElement>('.article-reader__contents');
		if (selected && contents && contents.scrollHeight > contents.clientHeight) {
			const entryRect = selected.getBoundingClientRect();
			const contentsRect = contents.getBoundingClientRect();
			if (entryRect.top < contentsRect.top + 12)
				contents.scrollTop += entryRect.top - contentsRect.top - 12;
			else if (entryRect.bottom > contentsRect.bottom - 12)
				contents.scrollTop += entryRect.bottom - contentsRect.bottom + 12;
		}
	}

	function schedule() {
		if (!frame) frame = requestAnimationFrame(update);
	}

	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule);
	window.addEventListener('hashchange', schedule);
	const observer = new ResizeObserver(schedule);
	observer.observe(node);
	if (node.parentElement) observer.observe(node.parentElement);
	schedule();

	return {
		destroy() {
			smallScreen.removeEventListener('change', setContentsLayout);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('hashchange', schedule);
			observer.disconnect();
			if (frame) cancelAnimationFrame(frame);
			current?.removeAttribute('aria-current');
		}
	};
}
