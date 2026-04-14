# Manufacturing Operations KPI Dashboard

A portfolio project demonstrating manufacturing analytics capabilities: data cleaning, KPI reporting, interactive dashboarding, and profitability analysis — built to mirror the metrics and reporting structure used in real manufacturing operations scorecards.

## Project Overview

This dashboard tracks five core manufacturing KPIs across 5,000 production orders spanning Jan 2024 – Jun 2025:

- **On-Time Delivery (OTD)** — % of orders delivered by promised date
- **Defect Rate** — % of units failing quality inspection (scrap + rework)
- **Yield Rate** — % of good units produced vs. total output
- **Gross Margin** — profitability after direct costs
- **Schedule Adherence** — actual vs. planned production output
- **Scrap Cost Ratio** — scrap cost as % of revenue

### Key Findings

| Metric | Actual | Target | Status |
|---|---|---|---|
| On-Time Delivery | 82.5% | ≥ 95% | 🔴 Below target |
| Defect Rate | 3.94% | ≤ 3% | 🔴 Below target |
| Yield Rate | 96.06% | ≥ 97% | 🟡 Near target |
| Gross Margin | 24.6% | ≥ 22% | 🟢 Meeting target |
| Schedule Adherence | 83.4% | ≥ 90% | 🔴 Below target |
| Scrap Cost Ratio | 0.57% | ≤ 1.5% | 🟢 Meeting target |

## Project Structure

```
├── README.md                          # This file
├── data-dictionary.md                 # Metric definitions and data documentation
├── data/
│   ├── manufacturing_raw.csv          # Raw production dataset (5,000 records)
│   └── manufacturing_cleaned.csv      # Cleaned and transformed dataset
├── reports/
│   ├── Manufacturing_KPI_Report.xlsx  # Formatted Excel workbook with pivot-ready data
│   └── profitability_summary.md       # "What changed, why, what to do" narrative
└── dashboard/
    └── Manufacturing_KPI_Dashboard.jsx # Interactive React dashboard with filtering
```

## Approach

### Layer 1: Data Foundation
- Generated realistic manufacturing production data with 34 columns covering output, quality, delivery, and financials
- Built a comprehensive data dictionary documenting every column, its derivation, and how it maps to scorecard KPIs
- Applied consistent transformations: defect rate, yield rate, cycle time variance, and gross margin calculations

### Layer 2: Weekly KPI Report (Excel)
- Created a formatted Excel workbook with four sheets: Executive Summary, By Product Line, By Division, and Raw Data
- Color-coded KPI status (green = meeting target, red = below)
- Autofilter and freeze panes on raw data for ad-hoc analysis

### Layer 3: Interactive Dashboard
- Built a React dashboard with four views: Overview, Quality & Defects, Delivery & Output, Financial
- Time period filters (All, H1 2024, H2 2024, 2025)
- Trend charts with threshold lines for exception flagging
- Product line comparison tables with conditional formatting

### Layer 4: Profitability Insight
- Identified top 3 margin drivers with "what changed, why, what to do" narrative
- Hydraulic Valves: highest defect rate (4.99%) and scrap cost ($45K), lowest margin (23.8%)
- OTD gap: 12.5 points below target across all lines — root cause in schedule adherence
- Shaft Components as best-practice model: only line below 3% defect target

## Tools Used

- **Python (pandas, openpyxl)** — data generation, cleaning, aggregation, Excel workbook creation
- **React + Recharts** — interactive dashboard with filtering and responsive charts
- **Excel** — formatted KPI report with pivot-ready structure
- **Markdown** — data dictionary and profitability narrative

## What I'd Recommend

1. **Immediate**: Implement Statistical Process Control on Hydraulic Valves critical dimensions to attack the 4.99% defect rate
2. **Short-term**: Review planning accuracy to close the 83.4% schedule adherence gap — this is the primary driver of OTD misses
3. **Medium-term**: Cross-train operators using Shaft Components best practices to reduce defect rates on Gear Assemblies and Hydraulic Valves
