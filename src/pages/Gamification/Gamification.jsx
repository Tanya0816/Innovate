import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';
import { Tabs, Button, Select, Badge, Modal, Input } from '../../components/ui';

const Gamification = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    challenges,
    badges,
    rewards,
    leaderboard,
    joinChallenge,
    redeemReward,
    logActivity
  } = useEcoSphere();

  const [activeTab, setActiveTab] = useState('challenges');
  
  useEffect(() => {
    const lastPart = pathname.split('/').pop();
    if (lastPart && ['challenges', 'badges', 'rewards', 'leaderboard'].includes(lastPart)) {
      setActiveTab(lastPart);
    }
  }, [pathname]);

  const handleTabChange = (tabId) => {
    navigate(`/gamification/${tabId}`);
  };

  const [statusFilter, setStatusFilter] = useState('All');
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // Form State
  const [challName, setChallName] = useState('');
  const [challXp, setChallXp] = useState('');
  const [challDur, setChallDur] = useState('');
  const [challStatus, setChallStatus] = useState('Active');

  const tabs = [
    { id: 'challenges', label: 'Challenges' },
    { id: 'badges', label: 'Badges' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  const handleChallengeSubmit = (e) => {
    e.preventDefault();
    // In-memory add challenge
    const newChall = {
      id: Date.now(),
      name: challName,
      xp: parseInt(challXp) || 100,
      duration: challDur || '7 days',
      status: challStatus,
      joined: false
    };
    challenges.push(newChall); // Mutates local array directly as demo
    setChallName('');
    setChallXp('');
    setChallDur('');
    setIsChallengeModalOpen(false);
  };

  const filteredChallenges = challenges.filter(c => 
    statusFilter === 'All' ? true : c.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight">
          Challenges, Badges & Leaderboard
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Participate in ESG challenges, earn unlockable badges, redeem carbon rewards, and review top performers.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
            <div className="w-full sm:w-48">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Statuses' },
                  { value: 'Active', label: 'Active' },
                  { value: 'Draft', label: 'Draft' },
                  { value: 'Under Review', label: 'Under Review' },
                  { value: 'Completed', label: 'Completed' },
                  { value: 'Archived', label: 'Archived' }
                ]}
              />
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsChallengeModalOpen(true)}>
              <Icons.Plus size={14} className="mr-1.5" />
              New Challenge
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChallenges.map((ch) => (
              <div
                key={ch.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <Badge variant={ch.status === 'Active' ? 'success' : ch.status === 'Draft' ? 'neutral' : 'warning'}>
                      {ch.status}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-900/30 px-2 py-0.5 rounded">
                      +{ch.xp} XP
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide truncate">
                    {ch.name}
                  </h3>

                  <div className="mt-4 flex items-center text-xs text-slate-400 font-semibold">
                    <Icons.Clock size={14} className="mr-2 text-slate-500" />
                    <span>Duration: {ch.duration}</span>
                  </div>
                </div>

                <div className="mt-6">
                  {ch.joined ? (
                    <Button variant="outline" className="w-full text-xs font-semibold py-2" disabled>
                      <Icons.Check size={14} className="mr-1.5 text-emerald-400" />
                      Active Challenge
                    </Button>
                  ) : ch.status !== 'Active' ? (
                    <Button variant="outline" className="w-full text-xs font-semibold py-2" disabled>
                      Cannot Join
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="w-full text-xs font-semibold py-2 hover:bg-slate-800 border-slate-700"
                      onClick={() => joinChallenge(ch.id)}
                    >
                      Join Challenge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((badge) => {
            const BadgeIcon = Icons[badge.icon] || Icons.Award;
            return (
              <div
                key={badge.id}
                className={`border rounded-xl p-5 shadow-xl flex flex-col items-center text-center transition-all duration-300 ${
                  badge.unlocked
                    ? 'bg-slate-900 border-slate-800 hover:border-emerald-800/60'
                    : 'bg-slate-950/40 border-slate-900/60 opacity-60'
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-4 border ${
                    badge.unlocked
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                      : 'bg-slate-900 border-slate-850 text-slate-600'
                  }`}
                >
                  <BadgeIcon size={32} />
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${badge.unlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-2 leading-relaxed">
                  {badge.description}
                </p>
                <div className="mt-4">
                  {badge.unlocked ? (
                    <Badge variant="success">Unlocked</Badge>
                  ) : (
                    <Badge variant="neutral">Locked</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-1.5 bg-slate-950 border border-slate-800 text-amber-400 rounded-lg">
                    <Icons.Gift size={18} />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-900/30 px-2 py-0.5 rounded">
                    {reward.cost} XP
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                  {reward.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-2 leading-relaxed">
                  {reward.description}
                </p>
              </div>

              <div className="mt-6">
                {reward.redeemed ? (
                  <Button variant="outline" className="w-full text-xs font-semibold py-2" disabled>
                    <Icons.Check size={14} className="mr-1.5 text-emerald-400" />
                    Redeemed
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full text-xs font-semibold py-2 shadow-emerald-950/15"
                    onClick={() => redeemReward(reward.id)}
                  >
                    Redeem Reward
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl max-w-2xl mx-auto">
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <Icons.ListOrdered size={16} className="mr-2 text-emerald-400" />
              Corporate ESG Leaderboard
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Top XP Earners</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {leaderboard.map((item) => (
              <div
                key={item.employee}
                className={`p-4 flex items-center justify-between transition-colors ${
                  item.isCurrentUser 
                    ? 'bg-emerald-950/20 hover:bg-emerald-950/25 border-l-4 border-l-emerald-500' 
                    : 'hover:bg-slate-950/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : item.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : item.rank === 3
                            ? 'bg-amber-700 text-slate-100'
                            : 'bg-slate-850 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {item.rank}
                  </div>

                  <div>
                    <span className={`text-xs font-bold ${item.isCurrentUser ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {item.employee}
                    </span>
                    {item.isCurrentUser && (
                      <span className="ml-2 text-[9px] bg-emerald-950/60 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800/35 font-bold uppercase tracking-wide">
                        You
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 font-semibold">
                  <Icons.Zap size={14} className="text-amber-400" />
                  <span className="font-mono text-slate-100 text-xs font-bold">
                    {item.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Challenge Modal */}
      <Modal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} title="Create Gamification Challenge">
        <form onSubmit={handleChallengeSubmit} className="space-y-4">
          <Input
            label="Challenge Title / Goal"
            placeholder="e.g., Plastic-Free November"
            value={challName}
            onChange={(e) => setChallName(e.target.value)}
            required
            autoFocus
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Reward XP Points"
              type="number"
              placeholder="e.g., 200"
              value={challXp}
              onChange={(e) => setChallXp(e.target.value)}
              required
            />
            <Input
              label="Duration"
              placeholder="e.g., 14 days"
              value={challDur}
              onChange={(e) => setChallDur(e.target.value)}
              required
            />
          </div>

          <Select
            label="Initial Status"
            value={challStatus}
            onChange={(e) => setChallStatus(e.target.value)}
            options={[
              { value: 'Active', label: 'Active Challenge' },
              { value: 'Draft', label: 'Save as Draft' }
            ]}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsChallengeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Challenge
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Gamification;
