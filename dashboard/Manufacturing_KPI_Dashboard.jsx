import { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const DATA = {"monthly":[{"month":"2024-01","orders":269,"planned":30875,"actual":25081,"good":24070,"defects":1011,"scrap":334,"rework":677,"otd_sum":224,"otd_count":269,"revenue":1454363.99,"cost":1095807.98,"scrap_cost":8708.22,"rework_cost":4582.51,"downtime":1509,"defect_rate":4.03,"yield_rate":95.97,"otd_pct":83.3,"adherence":81.2,"margin_pct":24.4,"scrap_ratio":0.6},{"month":"2024-02","orders":271,"planned":30425,"actual":25021,"good":24011,"defects":1010,"scrap":324,"rework":686,"otd_sum":222,"otd_count":271,"revenue":1487470.63,"cost":1124518.37,"scrap_cost":9121.2,"rework_cost":4722.64,"downtime":955,"defect_rate":4.04,"yield_rate":95.96,"otd_pct":81.9,"adherence":82.2,"margin_pct":24.2,"scrap_ratio":0.61},{"month":"2024-03","orders":276,"planned":31775,"actual":25998,"good":24972,"defects":1026,"scrap":325,"rework":701,"otd_sum":235,"otd_count":276,"revenue":1548755.28,"cost":1168669.77,"scrap_cost":8914.75,"rework_cost":4709.75,"downtime":890,"defect_rate":3.95,"yield_rate":96.05,"otd_pct":85.1,"adherence":81.8,"margin_pct":24.5,"scrap_ratio":0.58},{"month":"2024-04","orders":287,"planned":34050,"actual":28167,"good":27040,"defects":1127,"scrap":369,"rework":758,"otd_sum":238,"otd_count":287,"revenue":1684005.75,"cost":1272841.41,"scrap_cost":10314.99,"rework_cost":5237.39,"downtime":1321,"defect_rate":4.0,"yield_rate":96.0,"otd_pct":82.9,"adherence":82.7,"margin_pct":24.5,"scrap_ratio":0.61},{"month":"2024-05","orders":296,"planned":35025,"actual":28968,"good":27827,"defects":1141,"scrap":372,"rework":769,"otd_sum":240,"otd_count":296,"revenue":1651996.12,"cost":1246550.04,"scrap_cost":9363.28,"rework_cost":5219.32,"downtime":948,"defect_rate":3.94,"yield_rate":96.06,"otd_pct":81.1,"adherence":82.7,"margin_pct":24.3,"scrap_ratio":0.57},{"month":"2024-06","orders":278,"planned":32300,"actual":26798,"good":25743,"defects":1055,"scrap":329,"rework":726,"otd_sum":230,"otd_count":278,"revenue":1589855.91,"cost":1191447.23,"scrap_cost":8509.68,"rework_cost":5062.37,"downtime":1711,"defect_rate":3.94,"yield_rate":96.06,"otd_pct":82.7,"adherence":83.0,"margin_pct":25.0,"scrap_ratio":0.54},{"month":"2024-07","orders":312,"planned":37425,"actual":31153,"good":29908,"defects":1245,"scrap":422,"rework":823,"otd_sum":261,"otd_count":312,"revenue":1758330.27,"cost":1325521.95,"scrap_cost":10850.3,"rework_cost":5563.97,"downtime":1338,"defect_rate":4.0,"yield_rate":96.0,"otd_pct":83.7,"adherence":83.2,"margin_pct":24.4,"scrap_ratio":0.62},{"month":"2024-08","orders":270,"planned":32200,"actual":26789,"good":25764,"defects":1025,"scrap":340,"rework":685,"otd_sum":229,"otd_count":270,"revenue":1555184.75,"cost":1172742.2,"scrap_cost":8423.94,"rework_cost":4760.36,"downtime":1172,"defect_rate":3.83,"yield_rate":96.17,"otd_pct":84.8,"adherence":83.2,"margin_pct":24.4,"scrap_ratio":0.54},{"month":"2024-09","orders":264,"planned":30900,"actual":25709,"good":24711,"defects":998,"scrap":323,"rework":675,"otd_sum":217,"otd_count":264,"revenue":1502231.77,"cost":1137158.31,"scrap_cost":8959.78,"rework_cost":4581.81,"downtime":1414,"defect_rate":3.88,"yield_rate":96.12,"otd_pct":82.2,"adherence":83.2,"margin_pct":24.3,"scrap_ratio":0.6},{"month":"2024-10","orders":261,"planned":29950,"actual":25145,"good":24144,"defects":1001,"scrap":319,"rework":682,"otd_sum":222,"otd_count":261,"revenue":1485904.91,"cost":1121134.59,"scrap_cost":8666.61,"rework_cost":4674.67,"downtime":1461,"defect_rate":3.98,"yield_rate":96.02,"otd_pct":85.1,"adherence":84.0,"margin_pct":24.4,"scrap_ratio":0.58},{"month":"2024-11","orders":283,"planned":35250,"actual":29501,"good":28362,"defects":1139,"scrap":369,"rework":770,"otd_sum":229,"otd_count":283,"revenue":1755121.26,"cost":1310647.93,"scrap_cost":9687.54,"rework_cost":5299.56,"downtime":960,"defect_rate":3.86,"yield_rate":96.14,"otd_pct":80.9,"adherence":83.7,"margin_pct":25.4,"scrap_ratio":0.55},{"month":"2024-12","orders":297,"planned":34100,"actual":28637,"good":27506,"defects":1131,"scrap":370,"rework":761,"otd_sum":245,"otd_count":297,"revenue":1657309.77,"cost":1248447.7,"scrap_cost":9514.42,"rework_cost":5240.48,"downtime":1141,"defect_rate":3.95,"yield_rate":96.05,"otd_pct":82.5,"adherence":84.0,"margin_pct":24.6,"scrap_ratio":0.57},{"month":"2025-01","orders":296,"planned":35150,"actual":29766,"good":28538,"defects":1228,"scrap":404,"rework":824,"otd_sum":241,"otd_count":296,"revenue":1773989.05,"cost":1323353.68,"scrap_cost":10684.33,"rework_cost":5684.47,"downtime":1279,"defect_rate":4.13,"yield_rate":95.87,"otd_pct":81.4,"adherence":84.7,"margin_pct":25.0,"scrap_ratio":0.6},{"month":"2025-02","orders":261,"planned":31775,"actual":26720,"good":25668,"defects":1052,"scrap":347,"rework":705,"otd_sum":212,"otd_count":261,"revenue":1589133.53,"cost":1192819.42,"scrap_cost":9394.78,"rework_cost":4950.96,"downtime":1296,"defect_rate":3.94,"yield_rate":96.06,"otd_pct":81.2,"adherence":84.1,"margin_pct":24.7,"scrap_ratio":0.59},{"month":"2025-03","orders":301,"planned":33100,"actual":27964,"good":26891,"defects":1073,"scrap":335,"rework":738,"otd_sum":245,"otd_count":301,"revenue":1622372.87,"cost":1220782.26,"scrap_cost":8887.37,"rework_cost":5029.91,"downtime":1532,"defect_rate":3.84,"yield_rate":96.16,"otd_pct":81.4,"adherence":84.5,"margin_pct":24.6,"scrap_ratio":0.55},{"month":"2025-04","orders":249,"planned":28900,"actual":24388,"good":23440,"defects":948,"scrap":315,"rework":633,"otd_sum":200,"otd_count":249,"revenue":1443670.19,"cost":1088809.0,"scrap_cost":8226.75,"rework_cost":4452.46,"downtime":823,"defect_rate":3.89,"yield_rate":96.11,"otd_pct":80.3,"adherence":84.4,"margin_pct":24.5,"scrap_ratio":0.57},{"month":"2025-05","orders":267,"planned":30325,"actual":25679,"good":24713,"defects":966,"scrap":292,"rework":674,"otd_sum":222,"otd_count":267,"revenue":1463268.81,"cost":1095479.19,"scrap_cost":7236.65,"rework_cost":4545.39,"downtime":1293,"defect_rate":3.76,"yield_rate":96.24,"otd_pct":83.1,"adherence":84.7,"margin_pct":25.2,"scrap_ratio":0.49},{"month":"2025-06","orders":262,"planned":30200,"actual":25577,"good":24569,"defects":1008,"scrap":329,"rework":679,"otd_sum":211,"otd_count":262,"revenue":1465119.28,"cost":1097793.37,"scrap_cost":8126.28,"rework_cost":4673.19,"downtime":1196,"defect_rate":3.94,"yield_rate":96.06,"otd_pct":80.5,"adherence":84.7,"margin_pct":24.8,"scrap_ratio":0.55}],"byProduct":[{"product_line":"Gear Assemblies","orders":991,"actual":99184,"good":94785,"defects":4399,"otd":0.81,"margin":0.243,"scrap_cost":39620.7,"revenue":5710120.28,"defect_rate":4.44,"otd_pct":81.4,"margin_pct":24.3},{"product_line":"Housing Units","orders":1000,"actual":95996,"good":92661,"defects":3335,"otd":0.84,"margin":0.249,"scrap_cost":27798.77,"revenue":6775353.91,"defect_rate":3.47,"otd_pct":84.2,"margin_pct":24.9},{"product_line":"Hydraulic Valves","orders":1021,"actual":97394,"good":92537,"defects":4857,"otd":0.85,"margin":0.238,"scrap_cost":45060.5,"revenue":6106710.96,"defect_rate":4.99,"otd_pct":84.8,"margin_pct":23.8},{"product_line":"Precision Bearings","orders":965,"actual":93173,"good":89569,"defects":3604,"otd":0.80,"margin":0.249,"scrap_cost":29224.37,"revenue":4953329.22,"defect_rate":3.87,"otd_pct":80.3,"margin_pct":24.9},{"product_line":"Shaft Components","orders":1023,"actual":101314,"good":98325,"defects":2989,"otd":0.81,"margin":0.252,"scrap_cost":21886.53,"revenue":4942569.77,"defect_rate":2.95,"otd_pct":81.4,"margin_pct":25.2}],"byDivision":[{"division":"Central","orders":1718,"actual":167607,"good":160883,"defects":6724,"defect_rate":4.01,"otd_pct":82.1,"margin_pct":24.6,"scrap_cost":57877.35,"revenue":9779271.65},{"division":"North","orders":1619,"actual":155738,"good":149695,"defects":6043,"defect_rate":3.88,"otd_pct":83.1,"margin_pct":24.7,"scrap_cost":50601.77,"revenue":9051380.37},{"division":"South","orders":1663,"actual":163716,"good":157299,"defects":6417,"defect_rate":3.92,"otd_pct":82.2,"margin_pct":24.6,"scrap_cost":55111.75,"revenue":9657432.12}],"byShift":[{"shift":"Day","actual":171315,"defects":6886,"defect_rate":4.02,"otd_pct":83.5},{"shift":"Night","actual":150504,"defects":5846,"defect_rate":3.88,"otd_pct":81.7},{"shift":"Swing","actual":165242,"defects":6452,"defect_rate":3.9,"otd_pct":82.2}],"totals":{"orders":5000,"output":487061,"good":467877,"defects":19184,"otd":82.5,"defectRate":3.94,"yieldRate":96.06,"margin":24.6,"adherence":83.4,"revenue":28488084,"cost":21434524,"scrapCost":163591,"reworkCost":88991,"scrapRatio":0.57}};

const COLORS = {
  navy: '#0f1b2d',
  slate: '#1a2744',
  card: '#1e2f4a',
  cardHover: '#243656',
  border: '#2a3f60',
  accent: '#22d3ee',
  accentDim: 'rgba(34,211,238,0.15)',
  green: '#34d399',
  greenDim: 'rgba(52,211,153,0.15)',
  red: '#f87171',
  redDim: 'rgba(248,113,113,0.15)',
  amber: '#fbbf24',
  amberDim: 'rgba(251,191,36,0.15)',
  purple: '#a78bfa',
  text: '#e2e8f0',
  textDim: '#94a3b8',
  textMuted: '#64748b',
  chartLine1: '#22d3ee',
  chartLine2: '#34d399',
  chartLine3: '#fbbf24',
  chartLine4: '#a78bfa',
  chartLine5: '#f87171',
  barColors: ['#22d3ee','#34d399','#fbbf24','#a78bfa','#f87171'],
};

const fmt = (n) => n?.toLocaleString('en-US') ?? '—';
const fmtK = (n) => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : `$${(n/1e3).toFixed(0)}K`;
const fmtPct = (n) => `${n}%`;

const KPICard = ({ label, value, format, target, targetLabel, inverse, icon }) => {
  const v = format === 'pct' ? fmtPct(value) : format === 'money' ? fmtK(value) : fmt(value);
  const met = inverse ? value <= target : value >= target;
  const statusColor = met ? COLORS.green : COLORS.red;
  const statusBg = met ? COLORS.greenDim : COLORS.redDim;
  return (
    <div style={{background:COLORS.card, borderRadius:12, padding:'20px 16px', border:`1px solid ${COLORS.border}`, flex:'1 1 0', minWidth:140, position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:statusColor,borderRadius:'12px 12px 0 0'}} />
      <div style={{fontSize:11,color:COLORS.textMuted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6,fontWeight:600}}>{label}</div>
      <div style={{fontSize:28,fontWeight:700,color:COLORS.text,fontFamily:'JetBrains Mono, monospace',lineHeight:1.1}}>{v}</div>
      <div style={{marginTop:8,display:'flex',alignItems:'center',gap:6}}>
        <span style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:statusColor}} />
        <span style={{fontSize:11,color:COLORS.textDim}}>Target: {targetLabel}</span>
      </div>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h2 style={{fontSize:15,fontWeight:700,color:COLORS.text,textTransform:'uppercase',letterSpacing:'0.1em',margin:'32px 0 16px',paddingBottom:8,borderBottom:`1px solid ${COLORS.border}`}}>{children}</h2>
);

const TabButton = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding:'6px 16px',fontSize:12,fontWeight:600,borderRadius:6,border:'none',cursor:'pointer',
    background: active ? COLORS.accent : 'transparent',
    color: active ? COLORS.navy : COLORS.textDim,
    transition:'all 0.15s'
  }}>{children}</button>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:COLORS.slate,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:'10px 14px',fontSize:12}}>
      <div style={{fontWeight:700,color:COLORS.text,marginBottom:6}}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:p.color,display:'inline-block'}} />
          <span style={{color:COLORS.textDim}}>{p.name}:</span>
          <span style={{color:COLORS.text,fontWeight:600,fontFamily:'JetBrains Mono, monospace'}}>{typeof p.value==='number'&&p.value>1000?fmt(p.value):p.value}{p.unit||''}</span>
        </div>
      ))}
    </div>
  );
};

const chartAxisStyle = {fontSize:10,fill:COLORS.textMuted,fontFamily:'JetBrains Mono, monospace'};

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [dateRange, setDateRange] = useState('all');
  const T = DATA.totals;

  const filteredMonthly = useMemo(() => {
    let d = DATA.monthly;
    if (dateRange === 'h1_2024') d = d.filter(m => m.month >= '2024-01' && m.month <= '2024-06');
    else if (dateRange === 'h2_2024') d = d.filter(m => m.month >= '2024-07' && m.month <= '2024-12');
    else if (dateRange === '2025') d = d.filter(m => m.month >= '2025-01');
    return d;
  }, [dateRange]);

  const chartData = filteredMonthly.map(m => ({...m, label: m.month.slice(2).replace('-','/')}));

  return (
    <div style={{background:COLORS.navy,minHeight:'100vh',color:COLORS.text,fontFamily:'"IBM Plex Sans", system-ui, sans-serif',padding:0}}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg, ${COLORS.slate} 0%, ${COLORS.navy} 100%)`,borderBottom:`1px solid ${COLORS.border}`,padding:'20px 24px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div>
            <div style={{fontSize:10,color:COLORS.accent,textTransform:'uppercase',letterSpacing:'0.15em',fontWeight:700,marginBottom:4}}>Manufacturing Operations</div>
            <h1 style={{fontSize:22,fontWeight:700,margin:0,color:COLORS.text,letterSpacing:'-0.02em'}}>KPI Dashboard</h1>
            <div style={{fontSize:11,color:COLORS.textMuted,marginTop:4}}>Jan 2024 – Jun 2025 · 5,000 production orders · 3 divisions</div>
          </div>
          <div style={{display:'flex',gap:4,background:COLORS.navy,borderRadius:8,padding:3}}>
            {[['all','All'],['h1_2024','H1 2024'],['h2_2024','H2 2024'],['2025','2025']].map(([k,l])=>(
              <TabButton key={k} active={dateRange===k} onClick={()=>setDateRange(k)}>{l}</TabButton>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:4,marginTop:16,background:COLORS.navy,borderRadius:8,padding:3,width:'fit-content'}}>
          {[['overview','Overview'],['quality','Quality & Defects'],['delivery','Delivery & Output'],['financial','Financial']].map(([k,l])=>(
            <TabButton key={k} active={activeView===k} onClick={()=>setActiveView(k)}>{l}</TabButton>
          ))}
        </div>
      </div>

      <div style={{padding:'16px 24px 40px',maxWidth:1200,margin:'0 auto'}}>
        {/* KPI Cards */}
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:8}}>
          <KPICard label="On-Time Delivery" value={T.otd} format="pct" target={95} targetLabel="≥ 95%" />
          <KPICard label="Defect Rate" value={T.defectRate} format="pct" target={3} targetLabel="≤ 3%" inverse />
          <KPICard label="Yield Rate" value={T.yieldRate} format="pct" target={97} targetLabel="≥ 97%" />
          <KPICard label="Gross Margin" value={T.margin} format="pct" target={22} targetLabel="≥ 22%" />
          <KPICard label="Schedule Adherence" value={T.adherence} format="pct" target={90} targetLabel="≥ 90%" />
          <KPICard label="Scrap Cost Ratio" value={T.scrapRatio} format="pct" target={1.5} targetLabel="≤ 1.5%" inverse />
        </div>

        {/* ===== OVERVIEW ===== */}
        {activeView === 'overview' && (<>
          <SectionTitle>Monthly Trends — Key Metrics</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={chartData} margin={{top:5,right:20,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis yAxisId="left" tick={chartAxisStyle} domain={[75,100]} tickFormatter={v=>`${v}%`} />
                <YAxis yAxisId="right" orientation="right" tick={chartAxisStyle} domain={[0,5]} tickFormatter={v=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11,color:COLORS.textDim}} />
                <Line yAxisId="left" type="monotone" dataKey="otd_pct" name="OTD %" stroke={COLORS.chartLine1} strokeWidth={2.5} dot={{r:3}} />
                <Line yAxisId="left" type="monotone" dataKey="yield_rate" name="Yield %" stroke={COLORS.chartLine2} strokeWidth={2.5} dot={{r:3}} />
                <Line yAxisId="left" type="monotone" dataKey="adherence" name="Schedule Adh. %" stroke={COLORS.chartLine4} strokeWidth={2} dot={{r:2}} strokeDasharray="5 5" />
                <Line yAxisId="right" type="monotone" dataKey="defect_rate" name="Defect Rate %" stroke={COLORS.chartLine5} strokeWidth={2.5} dot={{r:3}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Revenue & Cost Trend</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={chartData} margin={{top:5,right:20,bottom:5,left:10}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} tickFormatter={v=>fmtK(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Area type="monotone" dataKey="revenue" name="Revenue" fill={COLORS.accentDim} stroke={COLORS.accent} strokeWidth={2} />
                <Area type="monotone" dataKey="cost" name="Cost" fill={COLORS.redDim} stroke={COLORS.red} strokeWidth={1.5} />
                <Bar dataKey="scrap_cost" name="Scrap Cost" fill={COLORS.amber} barSize={10} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Performance by Product Line</SectionTitle>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
              <thead>
                <tr style={{borderBottom:`2px solid ${COLORS.border}`}}>
                  {['Product Line','Orders','Output','Defect Rate','OTD %','Margin','Scrap Cost'].map(h=>(
                    <th key={h} style={{padding:'10px 12px',textAlign:h==='Product Line'?'left':'right',color:COLORS.textMuted,fontSize:10,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:600}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA.byProduct.map((p,i) => (
                  <tr key={p.product_line} style={{borderBottom:`1px solid ${COLORS.border}`,background:i%2===0?'transparent':COLORS.slate}}>
                    <td style={{padding:'10px 12px',fontWeight:600}}>{p.product_line}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmt(p.orders)}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmt(p.actual)}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12,color:p.defect_rate>4?COLORS.red:p.defect_rate>3?COLORS.amber:COLORS.green}}>{p.defect_rate}%</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12,color:p.otd_pct<80?COLORS.red:p.otd_pct<85?COLORS.amber:COLORS.green}}>{p.otd_pct}%</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{p.margin_pct}%</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmtK(p.scrap_cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>)}

        {/* ===== QUALITY ===== */}
        {activeView === 'quality' && (<>
          <SectionTitle>Defect Rate Trend with Threshold</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData} margin={{top:5,right:20,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} domain={[3,5]} tickFormatter={v=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Area type="monotone" dataKey="defect_rate" name="Defect Rate" fill={COLORS.redDim} stroke={COLORS.red} strokeWidth={2.5} dot={{r:4,fill:COLORS.red}} />
                <Line type="monotone" dataKey={() => 3} name="Target (3%)" stroke={COLORS.green} strokeWidth={1.5} strokeDasharray="8 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Scrap vs Rework Volume</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{top:5,right:20,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Bar dataKey="scrap" name="Scrap Units" stackId="a" fill={COLORS.red} radius={[0,0,0,0]} />
                <Bar dataKey="rework" name="Rework Units" stackId="a" fill={COLORS.amber} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Defect Rate by Product Line</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={DATA.byProduct} layout="vertical" margin={{top:5,right:20,bottom:5,left:100}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis type="number" tick={chartAxisStyle} tickFormatter={v=>`${v}%`} domain={[0,6]} />
                <YAxis type="category" dataKey="product_line" tick={{...chartAxisStyle,fontSize:11}} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="defect_rate" name="Defect Rate %" radius={[0,6,6,0]}>
                  {DATA.byProduct.map((p,i) => <Cell key={i} fill={p.defect_rate>4?COLORS.red:p.defect_rate>3.5?COLORS.amber:COLORS.green} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Exception Flag */}
          <SectionTitle>⚠ Exception Flags — Quality Alerts</SectionTitle>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {DATA.byProduct.filter(p=>p.defect_rate>4).map(p=>(
              <div key={p.product_line} style={{background:COLORS.redDim,border:`1px solid ${COLORS.red}33`,borderRadius:8,padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:20}}>🔴</span>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{p.product_line} — Defect rate at {p.defect_rate}% (target ≤ 3%)</div>
                  <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Scrap cost: {fmtK(p.scrap_cost)} | {p.defects.toLocaleString()} defective units across {p.orders} orders</div>
                </div>
              </div>
            ))}
            {DATA.byProduct.filter(p=>p.defect_rate<=4&&p.defect_rate>3).map(p=>(
              <div key={p.product_line} style={{background:COLORS.amberDim,border:`1px solid ${COLORS.amber}33`,borderRadius:8,padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:20}}>🟡</span>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{p.product_line} — Defect rate at {p.defect_rate}% (approaching threshold)</div>
                  <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Monitoring — currently within acceptable range but trending above 3% target</div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ===== DELIVERY ===== */}
        {activeView === 'delivery' && (<>
          <SectionTitle>On-Time Delivery & Schedule Adherence</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData} margin={{top:5,right:20,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} domain={[70,100]} tickFormatter={v=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Area type="monotone" dataKey="otd_pct" name="OTD %" fill={COLORS.accentDim} stroke={COLORS.accent} strokeWidth={2.5} dot={{r:3}} />
                <Line type="monotone" dataKey="adherence" name="Schedule Adherence %" stroke={COLORS.purple} strokeWidth={2} dot={{r:3}} />
                <Line type="monotone" dataKey={() => 95} name="OTD Target (95%)" stroke={COLORS.green} strokeWidth={1.5} strokeDasharray="8 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Production Output vs Planned</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{top:5,right:20,bottom:5,left:10}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} tickFormatter={v=>`${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Bar dataKey="planned" name="Planned" fill={COLORS.textMuted} radius={[4,4,0,0]} barSize={14} />
                <Bar dataKey="actual" name="Actual" fill={COLORS.accent} radius={[4,4,0,0]} barSize={14} />
                <Bar dataKey="good" name="Good Units" fill={COLORS.green} radius={[4,4,0,0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Performance by Division</SectionTitle>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
              <thead>
                <tr style={{borderBottom:`2px solid ${COLORS.border}`}}>
                  {['Division','Orders','Output','Good Units','Defect Rate','OTD %','Margin','Scrap Cost'].map(h=>(
                    <th key={h} style={{padding:'10px 12px',textAlign:h==='Division'?'left':'right',color:COLORS.textMuted,fontSize:10,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:600}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA.byDivision.map((d,i)=>(
                  <tr key={d.division} style={{borderBottom:`1px solid ${COLORS.border}`,background:i%2===0?'transparent':COLORS.slate}}>
                    <td style={{padding:'10px 12px',fontWeight:600}}>{d.division}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmt(d.orders)}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmt(d.actual)}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmt(d.good)}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12,color:d.defect_rate>4?COLORS.red:COLORS.amber}}>{d.defect_rate}%</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{d.otd_pct}%</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{d.margin_pct}%</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'JetBrains Mono, monospace',fontSize:12}}>{fmtK(d.scrap_cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SectionTitle>Machine Downtime Trend (minutes)</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{top:5,right:20,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="downtime" name="Downtime (min)" fill={COLORS.amber} radius={[4,4,0,0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>)}

        {/* ===== FINANCIAL ===== */}
        {activeView === 'financial' && (<>
          <SectionTitle>Gross Margin Trend</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData} margin={{top:5,right:20,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} domain={[20,28]} tickFormatter={v=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Area type="monotone" dataKey="margin_pct" name="Gross Margin %" fill={COLORS.greenDim} stroke={COLORS.green} strokeWidth={2.5} dot={{r:4}} />
                <Line type="monotone" dataKey={() => 22} name="Target (22%)" stroke={COLORS.accent} strokeWidth={1.5} strokeDasharray="8 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Cost of Quality (Scrap + Rework)</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{top:5,right:20,bottom:5,left:10}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="label" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize:11}} />
                <Bar dataKey="scrap_cost" name="Scrap Cost" stackId="q" fill={COLORS.red} radius={[0,0,0,0]} />
                <Bar dataKey="rework_cost" name="Rework Cost" stackId="q" fill={COLORS.amber} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle>Margin by Product Line</SectionTitle>
          <div style={{background:COLORS.card,borderRadius:12,border:`1px solid ${COLORS.border}`,padding:'20px 16px 8px'}}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={DATA.byProduct} layout="vertical" margin={{top:5,right:20,bottom:5,left:100}}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis type="number" tick={chartAxisStyle} tickFormatter={v=>`${v}%`} domain={[20,28]} />
                <YAxis type="category" dataKey="product_line" tick={{...chartAxisStyle,fontSize:11}} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="margin_pct" name="Gross Margin %" radius={[0,6,6,0]}>
                  {DATA.byProduct.map((p,i) => <Cell key={i} fill={COLORS.barColors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 3 Drivers narrative */}
          <SectionTitle>Top 3 Margin Drivers — What Changed, Why, What To Do</SectionTitle>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{background:COLORS.card,borderRadius:10,border:`1px solid ${COLORS.border}`,padding:16,borderLeft:`4px solid ${COLORS.red}`}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>1. Hydraulic Valves — Highest scrap cost, lowest margin</div>
              <div style={{fontSize:12,color:COLORS.textDim,lineHeight:1.6}}>
                <b style={{color:COLORS.text}}>What changed:</b> Defect rate of 4.99% is 66% above the 3% target, generating $45K in scrap costs — the highest of any product line.<br/>
                <b style={{color:COLORS.text}}>Why:</b> Complex valve geometries combined with tight tolerances drive higher rejection rates. The 23.8% margin is the lowest across all lines.<br/>
                <b style={{color:COLORS.text}}>What to do:</b> Implement SPC on critical valve dimensions. Target a 1.5-point reduction in defect rate — this alone would recover ~$15K in annual scrap cost and lift margin by ~0.4 points.
              </div>
            </div>
            <div style={{background:COLORS.card,borderRadius:10,border:`1px solid ${COLORS.border}`,padding:16,borderLeft:`4px solid ${COLORS.amber}`}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>2. On-Time Delivery — 82.5% vs. 95% target across all lines</div>
              <div style={{fontSize:12,color:COLORS.textDim,lineHeight:1.6}}>
                <b style={{color:COLORS.text}}>What changed:</b> OTD has hovered 10+ points below target for the entire period, with no sustained improvement trend.<br/>
                <b style={{color:COLORS.text}}>Why:</b> Schedule adherence is only 83.4% — planned vs. actual output gap means orders routinely slip. Night shift productivity is lowest at 81.7% OTD.<br/>
                <b style={{color:COLORS.text}}>What to do:</b> Review planning accuracy. Investigate root causes of planned-vs-actual gap by machine and shift. Consider buffer stock for high-demand SKUs.
              </div>
            </div>
            <div style={{background:COLORS.card,borderRadius:10,border:`1px solid ${COLORS.border}`,padding:16,borderLeft:`4px solid ${COLORS.green}`}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>3. Shaft Components — Best-performing line, model for others</div>
              <div style={{fontSize:12,color:COLORS.textDim,lineHeight:1.6}}>
                <b style={{color:COLORS.text}}>What changed:</b> Defect rate of 2.95% is the only line below target. Margin at 25.2% is the highest. Scrap cost is $22K — lowest of all lines.<br/>
                <b style={{color:COLORS.text}}>Why:</b> Simpler geometry, shorter cycle times, and higher material utilization. Also benefits from the most experienced operator distribution.<br/>
                <b style={{color:COLORS.text}}>What to do:</b> Document Shaft Components best practices and cross-train operators from Hydraulic Valves and Gear Assemblies lines.
              </div>
            </div>
          </div>
        </>)}

        {/* Footer */}
        <div style={{marginTop:40,padding:'16px 0',borderTop:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',fontSize:10,color:COLORS.textMuted}}>
          <span>Manufacturing Operations KPI Dashboard · Portfolio Project</span>
          <span>Data: 5,000 orders · Jan 2024 – Jun 2025 · 5 product lines · 3 divisions</span>
        </div>
      </div>
    </div>
  );
}
