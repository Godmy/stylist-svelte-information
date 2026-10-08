# Chart — деревья компонентов

В отличие от `domain`, у `chart` нет единой точки входа (`page-domain`): домен — это
библиотека самостоятельных диаграмм. Каждый `organism/*` (и часть `molecule/*`) может
быть подключён приложением напрямую, без общего root-компонента. Общий для всех слой —
`interface/recipe/<family>` (пропсы) и `class/manager/<family>` (вся расчётная логика:
вычисление данных для SVG-компонентов, собранных из atom'ов, и геометрия/layout для
«ручных» SVG-диаграмм, нарисованных одним organism-блоком). Все классы в `class/manager/*`
именуются по единой схеме `Manager<Family>`. Направление сборки везде одно:
`data → const → type → interface → class → component`, внутри `component` —
`atom → molecule → organism` (без обратных связей).

## Общая карта кластера `component`

```
component/atom
├─ chart-axis-x                — ось X (тики, линия)
├─ chart-axis-y                — ось Y (тики, линия), использует class/manager/chart (ManagerChart)
├─ chart-axis-z                — ось Z (для 3-осевых графиков)
├─ chart-background            — фон/сетка графика
├─ chart-name                  — подпись/заголовок точки или серии (SVG text)
├─ chart-polyline               — ломаная линия серии, использует class/manager/chart (ManagerChart)
└─ metric-bar                  — одна метрика-полоса (значение/проценты), использует class/manager/metric-bar (ManagerMetricBar)

component/molecule
├─ chart-canvas                — сборка «ручного» SVG-графика: ось+фон+линия+подписи
│  ├─ atom/chart-axis-x
│  ├─ atom/chart-axis-y
│  ├─ atom/chart-axis-z
│  ├─ atom/chart-background
│  ├─ atom/chart-name
│  ├─ atom/chart-polyline
│  └─ class/manager/chart-canvas (ManagerChartCanvas)
├─ chart-legend                — легенда серий (список цвет+имя)
├─ chart-legend-bar             — легенда-«полоса» с текстом и линией-указателем к точке
│  └─ class/manager/chart-legend-bar (ManagerChartLegendBar) — измерение ширины текста, раскладка, анти-коллизии подписей
├─ chart-legend-band            — легенда-«лента» (диапазон/band)
├─ bar-chart                    — столбчатая диаграмма (используется внутри analytics-chart)
│  └─ class/manager/bar-chart (ManagerBarChart)
├─ pie-chart                    — круговая диаграмма (используется внутри analytics-chart)
│  └─ class/manager/pie-chart (ManagerPieChart)
├─ vertical-bars-chart          — самостоятельная вертикальная столбчатая диаграмма
├─ range-bars-chart             — самостоятельная диаграмма диапазонов (min–max полосы)
└─ metric-bars-card             — карточка из набора метрик
   └─ atom/metric-bar

component/organism
├─ chart                        — универсальный line/area-график на серии точек
│  ├─ molecule/chart-canvas
│  ├─ molecule/chart-legend
│  └─ class/manager/chart (ManagerChart)
├─ canvas-chart                 — график поверх HTML5 <canvas> (не SVG)
│  └─ class/manager/canvas-chart (ManagerCanvasChart)
├─ analytics-chart              — композитная витрина: переключение bar/line/pie
│  ├─ molecule/bar-chart
│  ├─ organism/line-chart       — organism использует другой organism (см. «Примечания»)
│  ├─ molecule/pie-chart
│  └─ class/manager/analytics-chart (ManagerAnalyticsChart)
├─ line-chart                   — линейный график (самостоятелен и переиспользуется в analytics-chart)
│  ├─ svg/component/atom/icon        (домен svg)
│  ├─ animation/component/atom/tooltip (домен animation)
│  └─ class/manager/line-chart (ManagerLineChart)
├─ heatmap                      — тепловая карта
│  ├─ svg/component/atom/icon        (домен svg)
│  ├─ animation/component/atom/tooltip (домен animation)
│  └─ class/manager/heatmap (ManagerHeatmap)
├─ scatter-plot                 — точечная диаграмма (самостоятельная геометрия в state)
├─ legend-bar-diagram           — диаграмма экспертных интервалов с легендой-«полосой»
│  ├─ molecule/chart-legend-bar
│  └─ class/manager/chart-legend-bar (ManagerChartLegendBar)
├─ legend-band-diagram          — диаграмма с легендой-«лентой»
│  ├─ molecule/chart-legend-band
│  └─ class/manager/chart-legend-band (ManagerChartLegendBand) → (внутренне) class/manager/chart-legend-bar
├─ critical-path-timeline       — таймлайн критического пути (проектная диаграмма)
│  └─ class/manager/critical-path-timeline (ManagerCriticalPathTimeline)
├─ exchange-oracle-forecast     — прогноз курса (история + вилка прогноза)
│  └─ class/manager/exchange-oracle-forecast (ManagerExchangeOracleForecast)
├─ expert-agreement-radar       — радар согласованности экспертных оценок
│  └─ class/manager/expert-agreement-radar (ManagerExpertAgreementRadar)
├─ expert-spread-matrix         — матрица разброса оценок экспертов (heatmap-таблица)
│  └─ class/manager/expert-spread-matrix (ManagerExpertSpreadMatrix)
├─ outlier-constellation        — «созвездие» точек с выделением выбросов
│  └─ class/manager/outlier-constellation (ManagerOutlierConstellation)
├─ risk-impact-map              — карта риск/влияние (probability × impact)
│  └─ class/manager/risk-impact-map (ManagerRiskImpactMap)
└─ wideband-delphi-diagram      — диаграмма Wideband Delphi (min/low/consensus/high/max)
   └─ class/manager/wideband-delphi-diagram (ManagerWidebandDelphiDiagram)
```

Общий для всех компонентов инфраструктурный слой (вне домена `chart`, не показан в
ветках выше, чтобы не дублировать): `layout/class/object-manager/class-names`
(`ClassNamesManager.merge`) — используется в `state.svelte.ts` практически каждого
atom/molecule/organism для сборки CSS-классов. Это чужой joint из домена `layout` с
собственной схемой именования — переименование `chart/class/manager` его не затронуло.

## Деревья по каждому top-level компоненту

Ниже — раскладка «сверху вниз» для компонентов, которые приложение подключает напрямую
(все `organism/*`, плюс самостоятельные `molecule/*`, не обёрнутые ни одним organism'ом).

### organism/chart

```
organism/chart
├─ interface/recipe/chart
├─ class/manager/chart (ManagerChart)          (resolveSeries, resolveLegendItems)
├─ molecule/chart-canvas
│  ├─ interface/recipe/chart-canvas, interface/recipe/analytics-chart-canvas
│  ├─ class/manager/chart-canvas (ManagerChartCanvas) (resolveSeries, resolveTickCount, resolveBounds)
│  ├─ atom/chart-axis-x
│  ├─ atom/chart-axis-y   → class/manager/chart (ManagerChart)
│  ├─ atom/chart-axis-z
│  ├─ atom/chart-background
│  ├─ atom/chart-name
│  └─ atom/chart-polyline → class/manager/chart (ManagerChart)
└─ molecule/chart-legend
   └─ interface/recipe/chart-legend
```

### organism/canvas-chart

```
organism/canvas-chart
├─ interface/recipe/canvas-chart
├─ interface/slot/canvas-chart-padding
├─ type/alias/canvas-chart-type, const/array/canvas-chart-type
├─ const/array/chart-colors, const/map/default-canvas-chart-padding, const/preset/canvas-chart
└─ class/manager/canvas-chart (ManagerCanvasChart)   (resolvePreset и раскладка на <canvas>)
```

### organism/analytics-chart

```
organism/analytics-chart
├─ interface/recipe/analytics-chart
├─ interface/slot/analytics-chart-data-point, interface/slot/analytics-chart-bar-point
├─ class/manager/analytics-chart (ManagerAnalyticsChart) (resolveMaxValue, buildBarChartPoints, …)
├─ molecule/bar-chart
│  ├─ interface/recipe/bar-chart, interface/slot/bar-chart
│  ├─ class/manager/bar-chart (ManagerBarChart)
│  └─ svg/component/atom/icon, animation/component/atom/tooltip
├─ organism/line-chart               (см. дерево ниже — переиспользуется целиком)
└─ molecule/pie-chart
   ├─ interface/recipe/pie-chart, interface/recipe/pie-chart-props
   └─ class/manager/pie-chart (ManagerPieChart) (resolveTotal, resolveColors, resolveSegments)
```

### organism/line-chart

```
organism/line-chart
├─ interface/recipe/line-chart
├─ interface/slot/line-chart, interface/slot/line-chart-data
├─ class/manager/line-chart (ManagerLineChart)    (resolveMaxValue, resolveChartWidth, …)
├─ const/preset/line-chart-color-scheme
├─ svg/component/atom/icon            (домен svg)
└─ animation/component/atom/tooltip   (домен animation)
```

### organism/heatmap

```
organism/heatmap
├─ interface/recipe/heatmap
├─ interface/slot/heatmap, interface/slot/heatmap/cell
├─ type/alias/heatmap-axis-value, const/record/heatmap-gradient-by-scheme
├─ class/manager/heatmap (ManagerHeatmap)       (resolveRows, resolveColumns, resolveMaxValue, …)
├─ svg/component/atom/icon            (домен svg)
└─ animation/component/atom/tooltip   (домен animation)
```

### organism/scatter-plot

```
organism/scatter-plot
├─ interface/recipe/scatter-plot
└─ interface/slot/scatter-plot-point
   (геометрия точек считается прямо в state.svelte.ts, без class/manager)
```

### organism/legend-bar-diagram

```
organism/legend-bar-diagram
├─ interface/recipe/legend-bar-diagram
├─ class/manager/chart-legend-bar (ManagerChartLegendBar)     (measureTextWidth, раскладка, анти-коллизии)
└─ molecule/chart-legend-bar
   ├─ interface/recipe/chart-legend-bar
   └─ class/manager/chart-legend-bar (ManagerChartLegendBar)  (тот же менеджер, переиспользован)
```

### organism/legend-band-diagram

```
organism/legend-band-diagram
├─ interface/recipe/legend-band-diagram
├─ class/manager/chart-legend-band (ManagerChartLegendBand)
│  └─ class/manager/chart-legend-bar (ManagerChartLegendBar)  (переиспользует раскладку текста/линий)
└─ molecule/chart-legend-band
   └─ interface/recipe/chart-legend-band
```

### organism/critical-path-timeline

```
organism/critical-path-timeline
├─ interface/recipe/critical-path-timeline
└─ class/manager/critical-path-timeline (ManagerCriticalPathTimeline)  (парсинг дат, тики, раскладка полос по датам)
```

### organism/exchange-oracle-forecast

```
organism/exchange-oracle-forecast
├─ interface/recipe/exchange-oracle-forecast
└─ class/manager/exchange-oracle-forecast (ManagerExchangeOracleForecast) (раскладка history/forecast, сплит-точка)
```

### organism/expert-agreement-radar

```
organism/expert-agreement-radar
├─ interface/recipe/expert-agreement-radar
└─ class/manager/expert-agreement-radar (ManagerExpertAgreementRadar)   (полярные координаты осей радара)
```

### organism/expert-spread-matrix

```
organism/expert-spread-matrix
├─ interface/recipe/expert-spread-matrix
└─ class/manager/expert-spread-matrix (ManagerExpertSpreadMatrix)     (сетка эксперт×период, min/max-нормализация)
```

### organism/outlier-constellation

```
organism/outlier-constellation
├─ interface/recipe/outlier-constellation
└─ class/manager/outlier-constellation (ManagerOutlierConstellation)    (раскладка точек вокруг центра, выброс/не выброс)
```

### organism/risk-impact-map

```
organism/risk-impact-map
├─ interface/recipe/risk-impact-map
└─ class/manager/risk-impact-map (ManagerRiskImpactMap)          (probability×impact → координаты, exposure → размер)
```

### organism/wideband-delphi-diagram

```
organism/wideband-delphi-diagram
├─ interface/recipe/wideband-delphi-diagram
└─ class/manager/wideband-delphi-diagram (ManagerWidebandDelphiDiagram)  (раскладка вилки min/low/consensus/high/max по времени)
```

### molecule/vertical-bars-chart (самостоятельный, не обёрнут ни одним organism)

```
molecule/vertical-bars-chart
└─ interface/recipe/vertical-bars-chart
   (раскладка столбцов считается в state.svelte.ts)
```

### molecule/range-bars-chart (самостоятельный)

```
molecule/range-bars-chart
└─ interface/recipe/range-bars-chart
   (раскладка диапазонов считается в state.svelte.ts)
```

### molecule/metric-bars-card (самостоятельный)

```
molecule/metric-bars-card
├─ interface/recipe/metric-bars-card
└─ atom/metric-bar
   ├─ interface/recipe/metric-bar
   └─ class/manager/metric-bar (ManagerMetricBar)   (clampPercentage, resolvePercentage)
```

## Примечания

- **`organism/analytics-chart` зависит от `organism/line-chart`** — единственное место в
  домене, где organism использует другой organism напрямую (а не molecule/atom). Формально
  это не нарушает `Assembly Direction Policy` (там запрещено только обратное направление
  `organism → molecule/atom`), но это единственный такой случай в `chart` — учитывать при
  дальнейшем рефакторинге `analytics-chart` или `line-chart`.
- Весь расчётный слой домена собран в одном joint `class/manager/*`, все классы именуются
  по единой схеме `Manager<Family>` (`ManagerChart`, `ManagerChartCanvas`,
  `ManagerCanvasChart`, `ManagerAnalyticsChart`, `ManagerBarChart`, `ManagerPieChart`,
  `ManagerLineChart`, `ManagerHeatmap`, `ManagerMetricBar`, `ManagerChartLegendBar`,
  `ManagerChartLegendBand`, `ManagerCriticalPathTimeline`, `ManagerExchangeOracleForecast`,
  `ManagerExpertAgreementRadar`, `ManagerExpertSpreadMatrix`, `ManagerOutlierConstellation`,
  `ManagerRiskImpactMap`, `ManagerWidebandDelphiDiagram`). Внутри joint'а по-прежнему
  различаются две категории по задаче, а не по имени:
  - вычисление/нормализация данных для SVG-компонентов, собранных из atom'ов (`ManagerChart`,
    `ManagerChartCanvas`, `ManagerCanvasChart`, `ManagerAnalyticsChart`, `ManagerBarChart`,
    `ManagerPieChart`, `ManagerLineChart`, `ManagerHeatmap`, `ManagerMetricBar`);
  - геометрия/layout для organism'ов, которые рисуют SVG «руками» одним блоком без
    molecule/atom-разбивки (`ManagerChartLegendBar`, `ManagerChartLegendBand`,
    `ManagerCriticalPathTimeline`, `ManagerExchangeOracleForecast`,
    `ManagerExpertAgreementRadar`, `ManagerExpertSpreadMatrix`, `ManagerOutlierConstellation`,
    `ManagerRiskImpactMap`, `ManagerWidebandDelphiDiagram`).
- `class/manager/chart-legend-band` — единственная межменеджерская зависимость внутри
  `class/manager`: импортирует `ManagerChartLegendBar` для переиспользования измерения
  текста и антиколлизионной раскладки линий-указателей.
- `chart-legend-bar` — редкий случай, где один и тот же `class/manager/chart-legend-bar`
  используется и молекулой (`molecule/chart-legend-bar`, для собственной раскладки), и
  organism'ом (`organism/legend-bar-diagram`, для раскладки данных перед передачей в ту же
  молекулу).
- `organism/line-chart` и `organism/heatmap` — единственные компоненты домена, зависящие от
  других доменов библиотеки: `svg/component/atom/icon` и `animation/component/atom/tooltip`.
- У каждого entity в `chart/component/**` есть парный `interface/recipe/<family>` с пропсами;
  прямой связи `interface/behavior` и `interface/slot` с компонентами не показано выше —
  они собираются в `recipe` на уровне DSIAP и не импортируются компонентами напрямую.
