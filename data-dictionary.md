# Manufacturing Operations — Data Dictionary

**Dataset:** Manufacturing Production & Quality KPIs
**Records:** 5,000 production orders | **Date Range:** Jan 2024 – Jun 2025
**Granularity:** One row per production order

---

## Identifiers & Time Dimensions

| Column | Type | Description |
|---|---|---|
| `order_id` | string | Unique production order ID (e.g., ORD-00001) |
| `date` | date | Production completion date (YYYY-MM-DD) |
| `week` | int | ISO week number (1–53) |
| `month` | string | Year-month period (YYYY-MM) |

## Operational Dimensions

| Column | Type | Values | Description |
|---|---|---|---|
| `division` | string | North, South, Central | Manufacturing division/plant |
| `product_line` | string | Precision Bearings, Hydraulic Valves, Gear Assemblies, Shaft Components, Housing Units | Product family |
| `material` | string | Steel 4140, Aluminum 6061, Stainless 316, Bronze C932, Titanium Grade 5 | Primary raw material |
| `operator_id` | string | OP-001 through OP-020 | Production operator identifier |
| `machine_id` | string | MCH-01 through MCH-15 | CNC/production machine |
| `shift` | string | Day, Swing, Night | Production shift |

## Production Output Metrics

| Column | Type | Unit | Description |
|---|---|---|---|
| `planned_qty` | int | units | Scheduled production quantity for the order |
| `actual_qty` | int | units | Total units actually produced |
| `good_qty` | int | units | Units passing quality inspection (actual – defects) |
| `defect_qty` | int | units | Total defective units (scrap + rework) |
| `scrap_qty` | int | units | Units scrapped — unrecoverable waste |
| `rework_qty` | int | units | Units requiring rework before acceptance |

## Quality & Efficiency Rates

| Column | Type | Unit | Derivation |
|---|---|---|---|
| `defect_rate` | float | ratio | `defect_qty / actual_qty` — lower is better |
| `yield_rate` | float | ratio | `good_qty / actual_qty` — higher is better |
| `std_cycle_time_min` | float | minutes | Standard (target) cycle time per unit |
| `actual_cycle_time_min` | float | minutes | Observed cycle time per unit |
| `cycle_time_variance_pct` | float | % | `(actual – std) / std × 100` — positive = slower than standard |

## Delivery Performance

| Column | Type | Unit | Description |
|---|---|---|---|
| `promised_lead_days` | int | days | Committed lead time to customer |
| `actual_lead_days` | int | days | Actual days from order to delivery |
| `on_time_delivery` | int | 0/1 | 1 = delivered on or before promise, 0 = late |

## Equipment

| Column | Type | Unit | Description |
|---|---|---|---|
| `downtime_minutes` | int | minutes | Unplanned machine downtime during the order |

## Financial Metrics

| Column | Type | Unit | Description |
|---|---|---|---|
| `material_cost_per_unit` | float | USD | Raw material cost per unit produced |
| `labor_cost_per_unit` | float | USD | Direct labor cost per unit (cycle time × labor rate) |
| `overhead_per_unit` | float | USD | Allocated overhead per unit (1.5× labor) |
| `unit_price` | float | USD | Selling price per good unit |
| `total_production_cost` | float | USD | Total cost for the order (all units) |
| `scrap_cost` | float | USD | Cost of scrapped material + partial labor |
| `rework_cost` | float | USD | Additional labor cost for reworked units |
| `revenue` | float | USD | `unit_price × good_qty` |
| `gross_margin` | float | ratio | `(revenue – total_production_cost) / revenue` |

---

## Transformations Applied

1. **Date parsing** — Raw date strings converted to datetime; `week` and `month` derived for aggregation.
2. **Derived rates** — `defect_rate`, `yield_rate`, `cycle_time_variance_pct`, and `gross_margin` computed from base metrics.
3. **Cost allocation** — Overhead applied at 1.5× direct labor. Scrap cost = material + 50% labor. Rework cost = 75% labor.
4. **Null handling** — No nulls in cleaned dataset; all records complete.

## Key Metric Definitions (Scorecard Alignment)

| KPI | Formula | Target | Scorecard Link |
|---|---|---|---|
| **OTD %** | `SUM(on_time_delivery) / COUNT(orders)` | ≥ 95% | On-time delivery reliability |
| **Defect Rate** | `SUM(defect_qty) / SUM(actual_qty)` | ≤ 3% | Scrap/rework reduction |
| **Yield Rate** | `SUM(good_qty) / SUM(actual_qty)` | ≥ 97% | Production quality |
| **Scrap Cost Ratio** | `SUM(scrap_cost) / SUM(revenue)` | ≤ 1.5% | Profitability support |
| **Gross Margin** | `SUM(revenue – cost) / SUM(revenue)` | ≥ 22% | Margin improvement |
| **Schedule Adherence** | `SUM(actual_qty) / SUM(planned_qty)` | ≥ 90% | Production throughput |
