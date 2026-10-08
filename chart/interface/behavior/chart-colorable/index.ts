import type { TokenThemeScheme } from '$stylist/theme/type/alias/theme-scheme';
/** Р¦РІРµС‚РѕРІР°СЏ СЃС…РµРјР° Рё С†РІРµС‚ РѕСЃРµР№ РґР»СЏ РіСЂР°С„РёС‡РµСЃРєРёС… РїСЂРµРґСЃС‚Р°РІР»РµРЅРёР№. */
export interface BehaviorChartColorable {
	colorScheme?: TokenThemeScheme | string;
	axisColor?: string;
}
