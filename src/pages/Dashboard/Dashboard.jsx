import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie
} from 'recharts';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import ESGMetricCard from '../../components/cards/ESGMetricCard';
import AnalyticsCard from '../../components/cards/AnalyticsCard';
import ProgressRing from '../../components/ui/ProgressRing';
import ActivityTimeline from '../../components/ui/ActivityTimeline';
import ScoreIndicator from '../../components/ui/ScoreIndicator';
import { Modal, Input, Select, Button, Badge } from '../../components/ui';

/* ─── Shared Recharts tooltip style ──────────────────────────────────────── */
const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.92)',
  borderColor: 'rgba(51, 65, 85, 0.4)',
  borderRadius: '12px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};
const tooltipLabelStyle = { color: '#e2e8f0', fontWeight: 700, fontSize: 12 };

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    scores,
    goals,
    carbonTrend,
    energyConsumption,
    renewableEnergy,
    wasteManagement,
    socialMetrics,
    governanceMetrics,
    recentActivities,
    departments,
    logCarbonData,
    challenges,
    joinChallenge,
    audits,
    compliance,
    csrActivities
  } = useEcoSphere();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [carbonAmount, setCarbonAmount] = useState('');
  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || '');

  const handleLogCarbon = (e) => {
    e.preventDefault();
    if (!carbonAmount) return;
    logCarbonData(carbonAmount, selectedDept);
    setCarbonAmount('');
    setIsLogModalOpen(false);
  };

  const handleQuickChallenge = () => {
    const nextChallenge = challenges.find(c => !c.joined && c.status === 'Active');
    if (nextChallenge) {
      joinChallenge(nextChallenge.id);
    } else {
      navigate('/gamification/challenges');
    }
  };

  // Derive dynamic metrics
  const activeGoals = goals.filter(g => g.status !== 'Completed');
  const openComplianceRisks = compliance.filter(c => c.status === 'Open').length;
  const completedAudits = audits.filter(a => a.status === 'Completed').length;
  const auditCompletionRate = audits.length > 0
    ? Math.round((completedAudits / audits.length) * 100)
    : 100;

  return (
    <div className="space-y-8">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  Header Panel                                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20">
              <Icons.BarChart3 size={20} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              EcoSphere Dashboard
            </h2>
          </div>
          <p className="text-slate-400 text-[13px] font-medium ml-[52px]">
            Enterprise Environmental, Social &amp; Governance performance analytics cockpit
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="primary" size="sm" onClick={() => setIsLogModalOpen(true)}>
            <Icons.Plus size={14} className="mr-1.5" />
            Log Carbon Data
          </Button>
          <Button variant="secondary" size="sm" onClick={handleQuickChallenge}>
            <Icons.Play size={14} className="mr-1.5 text-amber-400" />
            Start Challenge
          </Button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  1. Executive KPI Section                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <ESGMetricCard
          title="Total Carbon Emission"
          value="2,370 t"
          change="-8.4%"
          trend="down"
          trendType="positive-is-down"
          icon="Leaf"
          color="emerald"
          subtitle="Direct and Scope 2 total CO2"
        />
        <ESGMetricCard
          title="Carbon Reduction"
          value="18.4%"
          change="+2.1%"
          trend="up"
          trendType="positive-is-up"
          icon="TrendingDown"
          color="emerald"
          subtitle="Reduction vs 2025 baseline"
        />
        <ESGMetricCard
          title="ESG Compliance Score"
          value={`${scores.overall} / 100`}
          change="+1.5%"
          trend="up"
          trendType="positive-is-up"
          icon="ShieldCheck"
          color="teal"
          subtitle="Dynamic composite rating"
        />
        <ESGMetricCard
          title="Active ESG Goals"
          value={`${activeGoals.length}`}
          change={goals.length - activeGoals.length > 0 ? `-${goals.length - activeGoals.length}` : '0'}
          trend="neutral"
          icon="Target"
          color="cyan"
          subtitle="Active sustainability targets"
        />
        <ESGMetricCard
          title="Energy Efficiency"
          value="85 / 100"
          change="+4.2%"
          trend="up"
          trendType="positive-is-up"
          icon="Zap"
          color="blue"
          subtitle="Optimized power efficiency score"
        />
        <ESGMetricCard
          title="Waste Reduction"
          value="78 / 100"
          change="+3.0%"
          trend="up"
          trendType="positive-is-up"
          icon="Trash2"
          color="purple"
          subtitle="Diversion rate score"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  2. Environmental Analytics (2×2 Grid)                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Icons.Leaf className="text-emerald-400" size={15} />
          </div>
          <h3 className="text-[13px] font-bold text-slate-200 uppercase tracking-wider">
            Environmental Analytics
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 to-transparent ml-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Carbon Emissions Trend — Green Gradient */}
          <AnalyticsCard
            title="Carbon Emission Trend"
            subtitle="Monthly tons CO2e tracked vs regional targets"
          >
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={carbonTrend} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
                <defs>
                  <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.2)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={{ color: '#34d399' }} />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  name="CO2 Emissions (Tons)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4, stroke: '#10b981' }}
                  activeDot={{ r: 6, fill: '#34d399', stroke: '#0f172a', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Energy Consumption — Cyan bars */}
          <AnalyticsCard
            title="Energy Consumption Analytics"
            subtitle="Power consumption metrics comparison (MWh & M³)"
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={energyConsumption} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.2)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '12px' }} />
                <Bar dataKey="electricity" name="Electricity (MWh)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gas" name="Natural Gas (k m³)" fill="#0891b2" radius={[4, 4, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Renewable Energy Adoption — Emerald stacked area */}
          <AnalyticsCard
            title="Renewable Energy Adoption"
            subtitle="Clean power solar generation share vs traditional grid"
          >
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={renewableEnergy} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
                <defs>
                  <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#475569" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#475569" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.2)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '12px' }} />
                <Area type="monotone" dataKey="solar" name="Renewable Solar (%)" stackId="1" stroke="#10b981" fill="url(#solarGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="grid" name="Traditional Grid (%)" stackId="1" stroke="#475569" fill="url(#gridGradient)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </AnalyticsCard>

          {/* Waste Management — Orange/Yellow/Emerald pie */}
          <AnalyticsCard
            title="Waste Management Statistics"
            subtitle="Materials destination breakdown (Percentage share)"
          >
            <div className="flex flex-col sm:flex-row items-center justify-around w-full gap-6">
              <ResponsiveContainer width={190} height={190}>
                <PieChart>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Pie
                    data={wasteManagement}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    cornerRadius={3}
                  >
                    {wasteManagement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(15,23,42,0.6)" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Custom legend */}
              <div className="space-y-3">
                {wasteManagement.map((entry) => (
                  <div key={entry.name} className="flex items-center space-x-3 group">
                    <span className="w-3 h-3 rounded-full ring-2 ring-offset-1 ring-offset-slate-900 transition-transform duration-200 group-hover:scale-125" style={{ backgroundColor: entry.color, ringColor: entry.color }} />
                    <span className="text-[12px] text-slate-400 font-medium">{entry.name}</span>
                    <span className="text-[12px] text-white font-bold font-mono">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </AnalyticsCard>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  3 & 4. Social & Governance Grid                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Social Impact Analytics */}
        <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-700/30">
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Icons.Users className="text-blue-400" size={15} />
              </div>
              <h3 className="text-[13px] font-bold text-slate-200 uppercase tracking-wider">
                Social Impact Analytics
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                {[
                  { label: 'CSR Activities', value: `${csrActivities?.length || 0}`, sub: 'initiatives' },
                  { label: 'Volunteer Hours', value: `${socialMetrics.volunteerHours}`, sub: 'hrs' },
                  { label: 'Community Impact', value: `${socialMetrics.communityScore}`, sub: '/ 100' },
                  { label: 'Engagement Rating', value: 'B', sub: 'Grade' },
                ].map((item) => (
                  <div key={item.label} className="p-3.5 bg-slate-800/40 backdrop-blur-sm border border-slate-700/25 rounded-xl text-center hover:border-slate-600/40 transition-colors duration-300">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">{item.label}</span>
                    <span className="text-lg font-extrabold text-white mt-1.5 block leading-none">{item.value}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{item.sub}</span>
                  </div>
                ))}
              </div>

              {/* Progress Ring for Employee Participation */}
              <div className="flex flex-col items-center justify-center p-5 border border-slate-700/25 bg-slate-800/30 backdrop-blur-sm rounded-xl min-w-[140px]">
                <ProgressRing percentage={socialMetrics.participationRate} color="stroke-blue-500" size={90} />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3">Participation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Dashboard */}
        <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-700/30">
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Icons.ShieldAlert className="text-purple-400" size={15} />
              </div>
              <h3 className="text-[13px] font-bold text-slate-200 uppercase tracking-wider">
                Governance &amp; Compliance Cockpit
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ScoreIndicator
                score={governanceMetrics.complianceStatusRate}
                title="Audit Compliance Rate"
                color="emerald"
                details="Enterprise threshold: 95%"
              />
              <ScoreIndicator
                score={auditCompletionRate}
                title="Audit Completion Rate"
                color="purple"
                details={`${completedAudits} of ${audits.length} audits logged`}
              />
              <ScoreIndicator
                score={governanceMetrics.policyAdoptionRate}
                title="Policy Adoption Rate"
                color="blue"
                details="Staff certifications logged"
              />
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4 flex items-center justify-between hover:border-slate-600/40 transition-colors duration-300">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Risk Incidents</span>
                  <span className={`text-xl font-extrabold mt-1.5 block leading-none ${openComplianceRisks > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {openComplianceRisks} active
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">compliance issues</span>
                </div>
                <div className={`p-2.5 rounded-xl border shadow-lg ${openComplianceRisks > 0 ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-rose-500/10' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/10'}`}>
                  <Icons.AlertTriangle size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  5. ESG Performance Overview & Activity Timeline                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sustainability Goal Progress Tracker */}
        <div className="lg:col-span-2 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 via-transparent to-teal-500/3 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-700/30">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Icons.Target className="text-emerald-400" size={15} />
                </div>
                <h3 className="text-[13px] font-bold text-slate-200 uppercase tracking-wider">
                  Sustainability Goal Tracking
                </h3>
              </div>
              <span
                className="text-[11px] text-emerald-400/70 font-semibold cursor-pointer hover:text-emerald-400 transition-colors duration-200"
                onClick={() => navigate('/environmental/goals')}
              >
                Configure Goals →
              </span>
            </div>

            <div className="space-y-3">
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                let barColor = 'bg-gradient-to-r from-emerald-500 to-emerald-400';
                if (g.status === 'Behind Plan') barColor = 'bg-gradient-to-r from-amber-500 to-amber-400';
                if (g.status === 'Completed' || pct >= 100) barColor = 'bg-gradient-to-r from-cyan-500 to-cyan-400';

                return (
                  <div key={g.id} className="p-3.5 bg-slate-800/30 backdrop-blur-sm border border-slate-700/25 rounded-xl flex items-center justify-between gap-4 hover:border-slate-600/40 transition-colors duration-300">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-slate-200 truncate">{g.name}</span>
                        <span className="text-slate-500 font-mono text-[10px]">{g.current} / {g.target} t CO2</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <div className="flex-1 bg-slate-800/60 rounded-full h-2 overflow-hidden">
                          <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 font-bold w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                    <Badge variant={g.status === 'Completed' || pct >= 100 ? 'cyan' : g.status === 'Behind Plan' ? 'warning' : 'info'}>
                      {g.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Timeline Feed */}
        <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 via-transparent to-orange-500/3 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-700/30">
              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Icons.Activity className="text-amber-400" size={15} />
              </div>
              <h3 className="text-[13px] font-bold text-slate-200 uppercase tracking-wider">
                Recent ESG Activities
              </h3>
            </div>

            <div className="max-h-[320px] overflow-y-auto scrollbar-thin pr-1">
              <ActivityTimeline activities={recentActivities} />
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-slate-700/30 text-center">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.15em]">
              EcoSphere ESG Framework v1.2
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  Log Carbon Data Modal                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        title="Log Carbon Footprint Data"
      >
        <form onSubmit={handleLogCarbon} className="space-y-4">
          <Input
            label="Carbon Amount (Metric Tons)"
            type="number"
            step="0.01"
            placeholder="e.g., 25.50"
            value={carbonAmount}
            onChange={(e) => setCarbonAmount(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Reporting Department"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            options={departments.map(d => ({ value: d.name, label: d.name }))}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Log Emissions
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
