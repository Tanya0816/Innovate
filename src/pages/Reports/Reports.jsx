import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import { Tabs, Button, Select } from '../../components/ui';

const Reports = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const { departments, csrActivities, challenges } = useEcoSphere();
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    if (tab && ['summary', 'environmental', 'social', 'governance', 'custom-builder'].includes(tab)) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab('summary');
    }
  }, [tab]);

  const handleTabChange = (tabId) => {
    navigate(`/reports/${tabId}`);
  };
  
  // Custom Filter State
  const [dateRange, setDateRange] = useState('Q3-2026');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generator Loading States
  const [generatingId, setGeneratingId] = useState(null);
  const [downloadReady, setDownloadReady] = useState({});

  const tabs = [
    { id: 'summary', label: 'ESG Summary' },
    { id: 'environmental', label: 'Environmental' },
    { id: 'social', label: 'Social' },
    { id: 'governance', label: 'Governance' },
    { id: 'custom-builder', label: 'Custom Report Builder' }
  ];

  const handleGenerateReport = (reportId) => {
    setGeneratingId(reportId);
    setDownloadReady(prev => ({ ...prev, [reportId]: false }));

    setTimeout(() => {
      setGeneratingId(null);
      setDownloadReady(prev => ({ ...prev, [reportId]: true }));
    }, 1500);
  };

  const handleCustomExport = (format) => {
    setGeneratingId('custom');
    setTimeout(() => {
      setGeneratingId(null);
      alert(`EcoSphere Custom ESG Report exported as ${format} successfully!`);
    }, 1200);
  };

  const predefinedReports = [
    {
      id: 'env',
      title: 'Environmental Impact Report',
      description: 'Granular breakdown of carbon emissions, scope tracking, electricity consumption, and target offsets.',
      type: 'environmental'
    },
    {
      id: 'soc',
      title: 'Social Engagement Report',
      description: 'Employee participation rates in CSR events, training completions, diversity representation, and XP logs.',
      type: 'social'
    },
    {
      id: 'gov',
      title: 'Governance & Compliance Report',
      description: 'Incident log, audit schedules, policy acknowledgments, and risk resolution rates.',
      type: 'governance'
    },
    {
      id: 'sum',
      title: 'Executive ESG Summary',
      description: 'High-level synthesis of all ESG metrics compiled for board reviews and stakeholder distribution.',
      type: 'summary'
    }
  ];

  const activeReports = predefinedReports.filter(r => 
    activeTab === 'summary' ? true : r.type === activeTab
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight">
          Analytics & Custom Reports
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Compile and export compliance documentation and executive sustainability summaries.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Predefined Reports */}
      {activeTab !== 'custom-builder' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeReports.map((rep) => {
            const isGenerating = generatingId === rep.id;
            const isReady = downloadReady[rep.id];

            return (
              <div
                key={rep.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400">
                      <Icons.FileText size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                      {rep.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-2.5">
                    {rep.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  {isGenerating ? (
                    <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                      <Icons.Loader2 size={16} className="animate-spin" />
                      <span>Generating Report...</span>
                    </div>
                  ) : isReady ? (
                    <div className="flex items-center space-x-2.5">
                      <Button
                        variant="glass"
                        size="sm"
                        className="text-xs font-semibold border-emerald-900/40 text-emerald-400 hover:bg-emerald-950/20"
                        onClick={() => alert(`Downloading ${rep.title} PDF...`)}
                      >
                        <Icons.Download size={14} className="mr-1.5" />
                        PDF
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        className="text-xs font-semibold border-blue-900/40 text-blue-400 hover:bg-blue-950/20"
                        onClick={() => alert(`Downloading ${rep.title} Excel...`)}
                      >
                        <Icons.Download size={14} className="mr-1.5" />
                        Excel
                      </Button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Ready to compile
                    </span>
                  )}

                  {!isGenerating && (
                    <Button
                      variant={isReady ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => handleGenerateReport(rep.id)}
                    >
                      {isReady ? 'Regenerate' : 'Generate'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Report Builder Tab */}
      {activeTab === 'custom-builder' && (
        <div className="space-y-6">
          {/* Custom Filters Board */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide pb-2 border-b border-slate-800">
              Configure Report Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Select
                label="Date Scope"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                options={[
                  { value: 'Q3-2026', label: 'Q3 2026 (Current)' },
                  { value: 'Q2-2026', label: 'Q2 2026' },
                  { value: 'H1-2026', label: 'H1 2026' },
                  { value: 'Full-Year-2025', label: 'Full Year 2025' }
                ]}
              />

              <Select
                label="Department Filter"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                options={[
                  { value: 'All', label: 'All Departments' },
                  ...departments.map(d => ({ value: d.name, label: d.name }))
                ]}
              />

              <Select
                label="ESG Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { value: 'All', label: 'All Categories' },
                  { value: 'Environmental', label: 'Environmental' },
                  { value: 'Social', label: 'Social' },
                  { value: 'Governance', label: 'Governance' }
                ]}
              />

              <Select
                label="Module Focus"
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                options={[
                  { value: 'All', label: 'All Modules' },
                  { value: 'Emissions', label: 'Carbon Accounting' },
                  { value: 'CSR', label: 'CSR Activities' },
                  { value: 'Audits', label: 'Compliance Audits' },
                  { value: 'Gamification', label: 'Gamification Rewards' }
                ]}
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                className="font-semibold text-xs border-slate-700 hover:bg-slate-800"
                onClick={() => alert('Custom report query saved successfully!')}
              >
                <Icons.Save size={14} className="mr-1.5 text-emerald-400" />
                Save Report Query
              </Button>

              {generatingId === 'custom' ? (
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 py-2">
                  <Icons.Loader2 size={16} className="animate-spin" />
                  <span>Compiling custom query...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">
                    Export Format:
                  </span>
                  <Button
                    variant="glass"
                    size="sm"
                    className="text-xs font-bold text-rose-400 border-rose-900/40 hover:bg-rose-950/20"
                    onClick={() => handleCustomExport('PDF')}
                  >
                    PDF
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    className="text-xs font-bold text-emerald-400 border-emerald-900/40 hover:bg-emerald-950/20"
                    onClick={() => handleCustomExport('Excel')}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    className="text-xs font-bold text-blue-400 border-blue-900/40 hover:bg-blue-950/20"
                    onClick={() => handleCustomExport('CSV')}
                  >
                    CSV
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
