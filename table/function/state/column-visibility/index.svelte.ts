/**
 * Hidden table columns remembered in this browser (localStorage) under `storageKey`.
 * Call `restore()` on the client after mount; without storage (private mode, SSR) the
 * choice lasts for the visit only.
 */
export function createColumnVisibility(storageKey: () => string) {
	let hidden = $state<string[]>([]);

	return {
		get hidden() {
			return hidden;
		},
		isHidden(key: string) {
			return hidden.includes(key);
		},
		restore() {
			try {
				const saved: unknown = JSON.parse(localStorage.getItem(storageKey()) ?? '[]');
				hidden = Array.isArray(saved)
					? saved.filter((value): value is string => typeof value === 'string')
					: [];
			} catch {
				hidden = [];
			}
		},
		set(next: string[]) {
			hidden = [...new Set(next)];
			try {
				localStorage.setItem(storageKey(), JSON.stringify(hidden));
			} catch {
				// storage unavailable: keep the choice in memory
			}
		},
		toggle(key: string) {
			this.set(hidden.includes(key) ? hidden.filter((value) => value !== key) : [...hidden, key]);
		}
	};
}
