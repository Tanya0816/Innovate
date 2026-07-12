import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import { Tabs, Button, Input, Select, Badge, Modal } from '../../components/ui';

const Governance = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    audits,
    compliance,
    addAudit,
    addCompliance,
    departments
  } = useEcoSphere();

  const [activeTab, setActiveTab] = useState('policies');

  useEffect(() => {
    const lastPart = pathname.split('/').pop();
    if (lastPart && ['policies', 'audits', 'compliance'].includes(lastPart)) {
      setActiveTab(lastPart);
    }
  }, [pathname]);

  const handleTabChange = (tabId) => {
    navigate(`/governance/${tabId}`);
  };

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  // Form States
  const [auditTitle, setAuditTitle] = useState('');
  const [auditDept, setAuditDept] = useState(departments[0]?.name || '');
  const [auditAuditor, setAuditAuditor] = useState('');
  const [auditCategory, setAuditCategory] = useState('Environmental');
  
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDept, setIssueDept] = useState(departments[0]?.name || '');
  const [issueSeverity, setIssueSeverity] = useState('Medium');

  const tabs = [
    { id: 'policies', label: 'Policies' },
    { id: 'audits', label: 'Audits' },
    { id: 'compliance', label: 'Compliance Issues' }
  ];

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    addAudit({
      title: auditTitle,
      department: auditDept,
      auditor: auditAuditor,
      category: auditCategory,
      status: 'Under Review'
    });
    setAuditTitle('');
    setAuditAuditor('');
    setIsAuditModalOpen(false);
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    addCompliance({
      title: issueTitle,
      department: issueDept,
      severity: issueSeverity
    });
    setIssueTitle('');
    setIsIssueModalOpen(false);
  };

  const policiesList = [
    { id: 1, title: 'Environmental Sustainability Policy', code: 'POL-ENV-01', version: 'v3.2', status: 'Active', category: 'Environmental' },
    { id: 2, title: 'Code of Business Conduct & Ethics', code: 'POL-GOV-02', version: 'v4.0', status: 'Active', category: 'Governance' },
    { id: 3, title: 'Supplier Code of Conduct', code: 'POL-GOV-03', version: 'v2.1', status: 'Active', category: 'Governance' },
    { id: 4, title: 'Employee Well-being & Safety Guidelines', code: 'POL-SOC-01', version: 'v1.5', status: 'Under Review', category: 'Social' }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight">
          Policies, Audits & Compliance
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Maintain corporate governance policies, record compliance reviews, and audit operational compliance.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Policies Tab Content */}
      {activeTab === 'policies' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="py-3 px-5">Policy Title</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {policiesList.map((pol) => (
                  <tr key={pol.id} className="hover:bg-slate-950/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-200">{pol.title}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-400">{pol.code}</td>
                    <td className="py-3.5 px-4 font-mono">{pol.version}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={pol.category === 'Environmental' ? 'success' : pol.category === 'Social' ? 'info' : 'purple'}>
                        {pol.category}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Badge variant={pol.status === 'Active' ? 'success' : 'warning'}>
                        {pol.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audits Tab Content */}
      {activeTab === 'audits' && (
        <div className="space-y-4">
          <div className="flex justify-end bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
            <Button variant="primary" size="sm" onClick={() => setIsAuditModalOpen(true)}>
              <Icons.Plus size={14} className="mr-1.5" />
              New Audit
            </Button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    <th className="py-3 px-5">Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Auditor</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Audit Date</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {audits.map((aud) => (
                    <tr key={aud.id} className="hover:bg-slate-950/30 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-slate-200">{aud.title}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-400">{aud.department}</td>
                      <td className="py-3.5 px-4 text-slate-400 font-medium">{aud.auditor}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={aud.category === 'Environmental' ? 'success' : aud.category === 'Social' ? 'info' : 'purple'}>
                          {aud.category}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-450">{aud.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <Badge variant={aud.status === 'Completed' ? 'success' : 'warning'}>
                          {aud.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tab Content */}
      {activeTab === 'compliance' && (
        <div className="space-y-4">
          <div className="flex justify-end bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
            <Button variant="danger" size="sm" onClick={() => setIsIssueModalOpen(true)}>
              <Icons.AlertOctagon size={14} className="mr-1.5" />
              File Compliance Issue
            </Button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    <th className="py-3 px-5">Compliance Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Severity Level</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {compliance.map((comp) => {
                    let severityVariant = 'info';
                    if (comp.severity === 'High') severityVariant = 'danger';
                    if (comp.severity === 'Medium') severityVariant = 'warning';
                    if (comp.severity === 'Low') severityVariant = 'neutral';

                    return (
                      <tr key={comp.id} className="hover:bg-slate-950/30 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-200">{comp.title}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-400">{comp.department}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant={severityVariant}>{comp.severity}</Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Badge variant={comp.status === 'Open' ? 'danger' : 'success'}>
                            {comp.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* New Audit Modal */}
      <Modal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} title="Record Governance Audit">
        <form onSubmit={handleAuditSubmit} className="space-y-4">
          <Input
            label="Audit Title"
            placeholder="e.g., Annual Energy Audit"
            value={auditTitle}
            onChange={(e) => setAuditTitle(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Department Audited"
            value={auditDept}
            onChange={(e) => setAuditDept(e.target.value)}
            options={departments.map(d => ({ value: d.name, label: d.name }))}
          />

          <Input
            label="Auditor Name"
            placeholder="e.g., John Doe"
            value={auditAuditor}
            onChange={(e) => setAuditAuditor(e.target.value)}
            required
          />

          <Select
            label="Audit Category"
            value={auditCategory}
            onChange={(e) => setAuditCategory(e.target.value)}
            options={[
              { value: 'Environmental', label: 'Environmental' },
              { value: 'Social', label: 'Social' },
              { value: 'Governance', label: 'Governance' }
            ]}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAuditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Log Audit
            </Button>
          </div>
        </form>
      </Modal>

      {/* File Compliance Issue Modal */}
      <Modal isOpen={isIssueModalOpen} onClose={() => setIsIssueModalOpen(false)} title="File New Compliance Breach Issue">
        <form onSubmit={handleIssueSubmit} className="space-y-4">
          <Input
            label="Breach Description / Title"
            placeholder="e.g., Chemical runoff leak in Storage"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Department Responsible"
            value={issueDept}
            onChange={(e) => setIssueDept(e.target.value)}
            options={departments.map(d => ({ value: d.name, label: d.name }))}
          />

          <Select
            label="Breach Severity Level"
            value={issueSeverity}
            onChange={(e) => setIssueSeverity(e.target.value)}
            options={[
              { value: 'Low', label: 'Low Severity' },
              { value: 'Medium', label: 'Medium Severity' },
              { value: 'High', label: 'High Severity' }
            ]}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsIssueModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger">
              File Breach Incident
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Governance;
