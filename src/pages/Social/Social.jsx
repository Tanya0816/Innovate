import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import { Tabs, Button, Badge } from '../../components/ui';

const Social = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    csrActivities,
    participation,
    joinActivity,
    approveParticipation,
    rejectParticipation
  } = useEcoSphere();

  const [activeTab, setActiveTab] = useState('csr-activities');

  useEffect(() => {
    const lastPart = pathname.split('/').pop();
    if (lastPart && ['csr-activities', 'participation'].includes(lastPart)) {
      setActiveTab(lastPart);
    }
  }, [pathname]);

  const handleTabChange = (tabId) => {
    navigate(`/social/${tabId}`);
  };

  const tabs = [
    { id: 'csr-activities', label: 'CSR Activities' },
    { id: 'participation', label: 'Employee Participation' }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight">
          CSR & Employee Engagement
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Coordinate corporate social responsibility activities and review employee engagement tracking.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* CSR Activities Tab */}
      {activeTab === 'csr-activities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {csrActivities.map((act) => {
            const dateStr = new Date(act.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={act.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <Badge variant={act.status === 'Active' ? 'success' : act.status === 'Planned' ? 'info' : 'purple'}>
                      {act.status}
                    </Badge>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/20">
                      +{act.points} XP
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide truncate">
                    {act.name}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs text-slate-400 font-medium">
                    <div className="flex items-center">
                      <Icons.Calendar size={14} className="mr-2 text-slate-500" />
                      <span>{dateStr}</span>
                    </div>
                    <div className="flex items-center">
                      <Icons.Users size={14} className="mr-2 text-slate-500" />
                      <span>
                        {typeof act.remainingSpots === 'number'
                          ? `${act.remainingSpots} spots remaining`
                          : 'Open availability'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {act.joined ? (
                    <Button variant="outline" className="w-full text-xs font-semibold py-2" disabled>
                      <Icons.Check size={14} className="mr-1.5 text-emerald-400" />
                      Joined Activity
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full text-xs font-semibold py-2"
                      onClick={() => joinActivity(act.id)}
                    >
                      Join Activity
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Employee Participation Tab */}
      {activeTab === 'participation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="py-3 px-5">Employee</th>
                  <th className="py-3 px-4">Activity / Challenge</th>
                  <th className="py-3 px-4">Activity XP Value</th>
                  <th className="py-3 px-4">Award Points</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Approval Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {participation.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                      No participation claims submitted yet.
                    </td>
                  </tr>
                ) : (
                  participation.map((part) => {
                    let badgeVar = 'neutral';
                    if (part.status === 'Approved') badgeVar = 'success';
                    if (part.status === 'Pending') badgeVar = 'warning';
                    if (part.status === 'Rejected') badgeVar = 'danger';

                    return (
                      <tr key={part.id} className="hover:bg-slate-950/30 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-200">{part.employee}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-400">{part.activity}</td>
                        <td className="py-3.5 px-4 font-mono font-medium">{part.value.toFixed(2)}</td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">+{part.points} pts</td>
                        <td className="py-3.5 px-4">
                          <Badge variant={badgeVar}>{part.status}</Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {part.status === 'Pending' ? (
                            <div className="inline-flex space-x-2">
                              <Button
                                variant="glass"
                                size="sm"
                                className="text-[10px] font-bold px-2 py-1 text-emerald-400 border border-emerald-900/40 hover:bg-emerald-950/20"
                                onClick={() => approveParticipation(part.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="glass"
                                size="sm"
                                className="text-[10px] font-bold px-2 py-1 text-rose-400 border border-rose-900/40 hover:bg-rose-950/20"
                                onClick={() => rejectParticipation(part.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                              Decision Logged
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social;
