import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import { Tabs, Button, Input, Select, Badge, Modal } from '../../components/ui';

const Environmental = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    goals,
    addGoal,
    editGoal,
    deleteGoal,
    emissionFactors,
    productEsg,
    carbonTransactions,
    departments
  } = useEcoSphere();

  const [activeTab, setActiveTab] = useState('goals');
  
  useEffect(() => {
    const lastPart = pathname.split('/').pop();
    if (lastPart && ['emission-factors', 'product-esg', 'carbon-transactions', 'goals'].includes(lastPart)) {
      setActiveTab(lastPart);
    }
  }, [pathname]);

  const handleTabChange = (tabId) => {
    navigate(`/environmental/${tabId}`);
  };

  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);

  // Form State
  const [goalName, setGoalName] = useState('');
  const [goalDept, setGoalDept] = useState(departments[0]?.name || '');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalCurrent, setGoalCurrent] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [goalStatus, setGoalStatus] = useState('Active');

  const tabs = [
    { id: 'emission-factors', label: 'Emission Factors' },
    { id: 'product-esg', label: 'Product ESG Profiles' },
    { id: 'carbon-transactions', label: 'Carbon Transactions' },
    { id: 'goals', label: 'Goals' }
  ];

  const handleOpenAddModal = () => {
    setGoalName('');
    setGoalDept(departments[0]?.name || '');
    setGoalTarget('');
    setGoalCurrent('');
    setGoalDeadline(new Date().toISOString().split('T')[0]);
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addGoal({
      name: goalName,
      department: goalDept,
      target: goalTarget,
      current: goalCurrent,
      deadline: goalDeadline
    });
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (goal) => {
    setCurrentGoal(goal);
    setGoalName(goal.name);
    setGoalDept(goal.department);
    setGoalTarget(goal.target);
    setGoalCurrent(goal.current);
    setGoalDeadline(goal.deadline);
    setGoalStatus(goal.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editGoal(currentGoal.id, {
      name: goalName,
      department: goalDept,
      target: goalTarget,
      current: goalCurrent,
      deadline: goalDeadline,
      status: goalStatus
    });
    setIsEditModalOpen(false);
  };

  // Filtered Goals
  const filteredGoals = goals.filter(goal => 
    goal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight">
          Emission Tracking & Goals
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Measure carbon accounting scopes, evaluate product footprints, and track carbon offsets.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Goals Tab Content */}
      {activeTab === 'goals' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Icons.Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input
                  type="text"
                  placeholder="Search goals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="primary" size="sm" onClick={handleOpenAddModal}>
                <Icons.Plus size={14} className="mr-1.5" />
                New Goal
              </Button>
              <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
                <Icons.Download size={14} className="mr-1.5" />
                Export
              </Button>
            </div>
          </div>

          {/* Goals Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    <th className="py-3 px-5">Name</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Target CO2e</th>
                    <th className="py-3 px-4">Current CO2e</th>
                    <th className="py-3 px-4 w-48">Progress</th>
                    <th className="py-3 px-4">Deadline</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {filteredGoals.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-slate-500 font-medium">
                        No goals found. Click "+ New Goal" to add one.
                      </td>
                    </tr>
                  ) : (
                    filteredGoals.map((goal) => {
                      const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                      let progressColor = 'bg-emerald-500';
                      if (goal.status === 'Behind Plan') progressColor = 'bg-amber-500';
                      if (goal.status === 'Completed' || pct >= 100) progressColor = 'bg-cyan-500';

                      let badgeVariant = 'neutral';
                      if (goal.status === 'Active') badgeVariant = 'info';
                      if (goal.status === 'On Track') badgeVariant = 'success';
                      if (goal.status === 'Behind Plan') badgeVariant = 'warning';
                      if (goal.status === 'Completed') badgeVariant = 'cyan';

                      return (
                        <tr key={goal.id} className="hover:bg-slate-950/30 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-slate-200">{goal.name}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-400">{goal.department}</td>
                          <td className="py-3.5 px-4 font-mono font-medium">{goal.target} t</td>
                          <td className="py-3.5 px-4 font-mono font-medium">{goal.current} t</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                                <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${pct}%` }} />
                              </div>
                              <span className="font-mono text-[10px] text-slate-400 w-8 text-right font-bold">{pct}%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-medium">{goal.deadline}</td>
                          <td className="py-3.5 px-4">
                            <Badge variant={badgeVariant}>{goal.status}</Badge>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex space-x-1">
                              <button
                                onClick={() => handleOpenEditModal(goal)}
                                className="p-1.5 text-slate-400 hover:text-emerald-400 rounded hover:bg-slate-850 transition-all"
                                title="Edit Goal"
                              >
                                <Icons.Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => deleteGoal(goal.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-850 transition-all"
                                title="Delete Goal"
                              >
                                <Icons.Trash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Emission Factors Tab Content */}
      {activeTab === 'emission-factors' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="py-3 px-5">Source</th>
                  <th className="py-3 px-4">Scope</th>
                  <th className="py-3 px-4">Emission Factor</th>
                  <th className="py-3 px-4">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {emissionFactors.map((factor) => (
                  <tr key={factor.id} className="hover:bg-slate-950/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-200">{factor.source}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={factor.scope === 'Scope 1' ? 'success' : factor.scope === 'Scope 2' ? 'info' : 'purple'}>
                        {factor.scope}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">{factor.factor}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-semibold">{factor.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product ESG Profiles Tab Content */}
      {activeTab === 'product-esg' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="py-3 px-5">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Carbon Footprint</th>
                  <th className="py-3 px-4">Recycling Rate</th>
                  <th className="py-3 px-4">ESG Rating Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {productEsg.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-950/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-200">{prod.name}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-semibold">{prod.category}</td>
                    <td className="py-3.5 px-4 font-mono font-medium">{prod.carbonFootprint} kg CO2e / unit</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                          <div className="h-full rounded-full bg-cyan-500" style={{ width: `${prod.recyclingRate}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{prod.recyclingRate}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-100">{prod.esgScore}</span>
                        <Badge variant={prod.esgScore >= 85 ? 'success' : 'info'}>
                          {prod.esgScore >= 90 ? 'Grade A' : prod.esgScore >= 80 ? 'Grade B' : 'Grade C'}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Carbon Transactions Tab Content */}
      {activeTab === 'carbon-transactions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="py-3 px-5">Transaction ID</th>
                  <th className="py-3 px-4">Offset Project</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount (Tons)</th>
                  <th className="py-3 px-4">Cost (USD)</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {carbonTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-950/30 transition-colors">
                    <td className="py-3.5 px-5 font-mono font-semibold text-slate-400">{txn.txnId}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-200">{txn.project}</td>
                    <td className="py-3.5 px-4">
                      <span className={`font-semibold ${txn.type === 'Buy' || txn.type === 'Offset' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">{txn.amount} t</td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {txn.cost > 0 ? `$${txn.cost.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-medium">{txn.date}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={txn.status === 'Approved' ? 'success' : 'warning'}>
                        {txn.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Sustainability Goal">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Goal Name"
            placeholder="e.g., Reduce Office Energy Usage"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Responsible Department"
            value={goalDept}
            onChange={(e) => setGoalDept(e.target.value)}
            options={departments.map(d => ({ value: d.name, label: d.name }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target CO2 (Tons)"
              type="number"
              placeholder="e.g., 200"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              required
            />
            <Input
              label="Current Progress"
              type="number"
              placeholder="e.g., 20"
              value={goalCurrent}
              onChange={(e) => setGoalCurrent(e.target.value)}
              required
            />
          </div>

          <Input
            label="Target Deadline Date"
            type="date"
            value={goalDeadline}
            onChange={(e) => setGoalDeadline(e.target.value)}
            required
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Goal Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modify Sustainability Goal">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            label="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />

          <Select
            label="Department"
            value={goalDept}
            onChange={(e) => setGoalDept(e.target.value)}
            options={departments.map(d => ({ value: d.name, label: d.name }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target CO2 (Tons)"
              type="number"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              required
            />
            <Input
              label="Current Progress"
              type="number"
              value={goalCurrent}
              onChange={(e) => setGoalCurrent(e.target.value)}
              required
            />
          </div>

          <Input
            label="Deadline Date"
            type="date"
            value={goalDeadline}
            onChange={(e) => setGoalDeadline(e.target.value)}
            required
          />

          <Select
            label="Goal Status"
            value={goalStatus}
            onChange={(e) => setGoalStatus(e.target.value)}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'On Track', label: 'On Track' },
              { value: 'Behind Plan', label: 'Behind Plan' },
              { value: 'Completed', label: 'Completed' }
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

export default Environmental;
