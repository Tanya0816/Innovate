import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import { Tabs, Button, Input, Select, Badge, Modal } from '../../components/ui';

const Settings = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const {
    departments,
    addDepartment,
    editDepartment,
    deleteDepartment,
    esgConfig,
    updateEsgConfig
  } = useEcoSphere();

  const [activeTab, setActiveTab] = useState('departments');

  useEffect(() => {
    if (tab && ['departments', 'categories', 'esg-config'].includes(tab)) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab('departments');
    }
  }, [tab]);

  const handleTabChange = (tabId) => {
    navigate(`/settings/${tabId}`);
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);

  // Form State
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [deptHead, setDeptHead] = useState('');
  const [deptParent, setDeptParent] = useState('');
  const [deptEmployees, setDeptEmployees] = useState('');
  const [deptStatus, setDeptStatus] = useState('Active');

  const tabs = [
    { id: 'departments', label: 'Departments' },
    { id: 'categories', label: 'Categories' },
    { id: 'esg-config', label: 'ESG Configuration' }
  ];

  const handleOpenAddModal = () => {
    setDeptName('');
    setDeptCode('');
    setDeptHead('');
    setDeptParent('');
    setDeptEmployees('');
    setDeptStatus('Active');
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addDepartment({
      name: deptName,
      code: deptCode,
      head: deptHead,
      parent: deptParent,
      employees: deptEmployees,
      status: deptStatus
    });
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (dept) => {
    setCurrentDept(dept);
    setDeptName(dept.name);
    setDeptCode(dept.code);
    setDeptHead(dept.head);
    setDeptParent(dept.parent);
    setDeptEmployees(dept.employees.toString());
    setDeptStatus(dept.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editDepartment(currentDept.id, {
      name: deptName,
      code: deptCode,
      head: deptHead,
      parent: deptParent,
      employees: deptEmployees,
      status: deptStatus
    });
    setIsEditModalOpen(false);
  };

  // Static Categories List
  const categoriesList = [
    { id: 1, name: 'Scope 1 - Direct Emissions', type: 'Environmental', items: 'Combustion, Fleet vehicle mileage' },
    { id: 2, name: 'Scope 2 - Indirect Emissions', type: 'Environmental', items: 'Grid electricity purchasing, Steam' },
    { id: 3, name: 'Scope 3 - Value Chain Emissions', type: 'Environmental', items: 'Business flights, Shipping logistics' },
    { id: 4, name: 'CSR Volunteer Event', type: 'Social', items: 'Tree planting campaigns, Charity workshops' },
    { id: 5, name: 'Internal Compliance Audits', type: 'Governance', items: 'Health audits, Supplier audits' }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight">
          Configuration & Administration
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Manage company department registries, view ESG reporting categories, and set operational rules.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Departments Tab Content */}
      {activeTab === 'departments' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex justify-end bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
            <Button variant="primary" size="sm" onClick={handleOpenAddModal}>
              <Icons.Plus size={14} className="mr-1.5" />
              New Department
            </Button>
          </div>

          {/* Departments Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    <th className="py-3 px-5">Department Name</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Department Head</th>
                    <th className="py-3 px-4">Parent Dept</th>
                    <th className="py-3 px-4">Employees</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {departments.map((dept) => (
                    <tr key={dept.id} className="hover:bg-slate-950/30 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-slate-200">{dept.name}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-450">{dept.code}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-300">{dept.head}</td>
                      <td className="py-3.5 px-4 text-slate-400 font-medium">{dept.parent}</td>
                      <td className="py-3.5 px-4 font-mono">{dept.employees}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={dept.status === 'Active' ? 'success' : 'neutral'}>
                          {dept.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex space-x-1">
                          <button
                            onClick={() => handleOpenEditModal(dept)}
                            className="p-1.5 text-slate-400 hover:text-emerald-400 rounded hover:bg-slate-850 transition-all"
                            title="Edit Department"
                          >
                            <Icons.Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => deleteDepartment(dept.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-850 transition-all"
                            title="Delete Department"
                            disabled={departments.length <= 1}
                          >
                            <Icons.Trash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="py-3 px-5">Category Name</th>
                  <th className="py-3 px-4">ESG Pillar</th>
                  <th className="py-3 px-4">Monitored Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {categoriesList.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-950/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-200">{cat.name}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={cat.type === 'Environmental' ? 'success' : cat.type === 'Social' ? 'info' : 'purple'}>
                        {cat.type}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-semibold">{cat.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ESG Configuration Tab Content */}
      {activeTab === 'esg-config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-xl">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide pb-2 border-b border-slate-800">
            ESG Configuration & Rules
          </h3>

          <div className="space-y-4">
            <label className="flex items-start space-x-3.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={esgConfig.autoCalculate}
                onChange={(e) => updateEsgConfig('autoCalculate', e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:ring-opacity-25"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  Enable auto emission calculation
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Automatically convert active raw fuel records into carbon metric tons.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={esgConfig.requireEvidence}
                onChange={(e) => updateEsgConfig('requireEvidence', e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:ring-opacity-25"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  Require evidence for all CSR activities
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Volunteer sign-ups must be vetted and approved by internal ESG staff.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={esgConfig.autoAwardBadges}
                onChange={(e) => updateEsgConfig('autoAwardBadges', e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:ring-opacity-25"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  Auto-award badges on challenge completion
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Immediately unlock system badges once an employee XP threshold is reached.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={esgConfig.emailAlerts}
                onChange={(e) => updateEsgConfig('emailAlerts', e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:ring-opacity-25"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  Email alerts for new compliance issues
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Send high-severity compliance alerts directly to department audit heads.
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Corporate Department">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Department Name"
            placeholder="e.g., Quality Assurance"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
            autoFocus
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Dept Code"
              placeholder="e.g., QA"
              value={deptCode}
              onChange={(e) => setDeptCode(e.target.value)}
              required
            />
            <Input
              label="Department Head"
              placeholder="e.g., J. Miller"
              value={deptHead}
              onChange={(e) => setDeptHead(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Parent Department"
              placeholder="e.g., Manufacturing (Optional)"
              value={deptParent}
              onChange={(e) => setDeptParent(e.target.value)}
            />
            <Input
              label="Total Employees"
              type="number"
              placeholder="e.g., 25"
              value={deptEmployees}
              onChange={(e) => setDeptEmployees(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Department
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Department Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modify Corporate Department">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            label="Department Name"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Dept Code"
              value={deptCode}
              onChange={(e) => setDeptCode(e.target.value)}
              required
            />
            <Input
              label="Department Head"
              value={deptHead}
              onChange={(e) => setDeptHead(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Parent Department"
              value={deptParent}
              onChange={(e) => setDeptParent(e.target.value)}
            />
            <Input
              label="Total Employees"
              type="number"
              value={deptEmployees}
              onChange={(e) => setDeptEmployees(e.target.value)}
              required
            />
          </div>

          <Select
            label="Status"
            value={deptStatus}
            onChange={(e) => setDeptStatus(e.target.value)}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' }
            ]}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Settings;
