import React, { createContext, useContext, useState, useEffect } from 'react';
import * as mock from '../data/mockData';

const EcoSphereContext = createContext();

export const EcoSphereProvider = ({ children }) => {
  const [goals, setGoals] = useState(mock.initialGoals);
  const [csrActivities, setCsrActivities] = useState(mock.initialCsrActivities);
  const [participation, setParticipation] = useState(mock.initialParticipation);
  const [audits, setAudits] = useState(mock.initialAudits);
  const [compliance, setCompliance] = useState(mock.initialCompliance);
  const [challenges, setChallenges] = useState(mock.initialChallenges);
  const [badges, setBadges] = useState(mock.initialBadges);
  const [rewards, setRewards] = useState(mock.initialRewards);
  const [leaderboard, setLeaderboard] = useState(mock.initialLeaderboard);
  const [departments, setDepartments] = useState(mock.initialDepartments);
  const [emissionFactors, setEmissionFactors] = useState(mock.initialEmissionFactors);
  const [productEsg, setProductEsg] = useState(mock.initialProductEsg);
  const [carbonTransactions, setCarbonTransactions] = useState(mock.initialCarbonTransactions);
  const [recentActivities, setRecentActivities] = useState(mock.recentActivities);
  const [carbonTrend, setCarbonTrend] = useState(mock.carbonTrendData);
  const [deptRanking, setDeptRanking] = useState(mock.departmentRankingData);
  const [energyConsumption, setEnergyConsumption] = useState(mock.energyConsumptionData);
  const [renewableEnergy, setRenewableEnergy] = useState(mock.renewableEnergyData);
  const [wasteManagement, setWasteManagement] = useState(mock.wasteManagementData);
  const [socialMetrics, setSocialMetrics] = useState(mock.initialSocialMetrics);
  const [governanceMetrics, setGovernanceMetrics] = useState(mock.initialGovernanceMetrics);
  
  // Settings Configuration
  const [esgConfig, setEsgConfig] = useState({
    autoCalculate: false,
    requireEvidence: true,
    autoAwardBadges: true,
    emailAlerts: false
  });

  // Calculate scores dynamically based on the state
  const [scores, setScores] = useState({
    environmental: 87,
    social: 74,
    governance: 85,
    overall: 81
  });

  useEffect(() => {
    // Environmental Score calculation: base 80 + progress on goals
    const activeGoalsCount = goals.length;
    const completedOrOnTrack = goals.filter(g => g.status === 'On Track' || g.current >= g.target).length;
    const envScore = activeGoalsCount > 0 
      ? Math.round(75 + (completedOrOnTrack / activeGoalsCount) * 20) 
      : 80;

    // Social Score calculation: base 70 + CSR participation
    const joinedCsrCount = csrActivities.filter(a => a.joined).length;
    const socScore = Math.min(100, 70 + (joinedCsrCount * 7));

    // Governance Score calculation: base 90 - open compliance issues
    const openIssues = compliance.filter(c => c.status === 'Open').length;
    const govScore = Math.max(0, 90 - (openIssues * 6));

    // Overall Score: average of all three
    const overallScore = Math.round((envScore + socScore + govScore) / 3);

    setScores({
      environmental: envScore,
      social: socScore,
      governance: govScore,
      overall: overallScore
    });
  }, [goals, csrActivities, compliance]);

  // Helper to add activity log to dashboard
  const logActivity = (text, type = 'success') => {
    const newAct = {
      id: Date.now(),
      text,
      type,
      time: 'Just now'
    };
    setRecentActivities(prev => [newAct, ...prev.slice(0, 7)]);
  };

  // Helper to award points/XP to current user
  const rewardUserXp = (amount, reason) => {
    setLeaderboard(prev => {
      const updated = prev.map(item => {
        if (item.isCurrentUser) {
          const newXp = item.xp + amount;
          return { ...item, xp: newXp };
        }
        return item;
      });
      // Sort and recalculate ranks
      return updated
        .sort((a, b) => b.xp - a.xp)
        .map((item, idx) => ({ ...item, rank: idx + 1 }));
    });
    logActivity(`You earned ${amount} XP for ${reason}`, 'success');

    // Auto unlock badges if enabled
    if (esgConfig.autoAwardBadges) {
      setLeaderboard(currLeaderboard => {
        const userXp = currLeaderboard.find(item => item.isCurrentUser)?.xp || 0;
        setBadges(prevBadges => {
          return prevBadges.map(badge => {
            if (!badge.unlocked && badge.name === 'Sustainability Champion' && userXp >= 1000) {
              logActivity(`Unlocked badge: ${badge.name}!`, 'success');
              return { ...badge, unlocked: true };
            }
            if (!badge.unlocked && badge.name === 'Eco Warrior' && csrActivities.filter(a => a.joined).length >= 3) {
              logActivity(`Unlocked badge: ${badge.name}!`, 'success');
              return { ...badge, unlocked: true };
            }
            return badge;
          });
        });
        return currLeaderboard;
      });
    }
  };

  // CRUD Goals
  const addGoal = (goal) => {
    const newGoal = {
      id: Date.now(),
      name: goal.name,
      department: goal.department,
      target: parseFloat(goal.target) || 100,
      current: parseFloat(goal.current) || 0,
      deadline: goal.deadline,
      status: goal.current >= goal.target ? 'Completed' : 'Active'
    };
    setGoals(prev => [...prev, newGoal]);
    logActivity(`New goal added: "${goal.name}" for ${goal.department}`, 'success');
  };

  const editGoal = (id, updatedGoal) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const current = parseFloat(updatedGoal.current) || 0;
        const target = parseFloat(updatedGoal.target) || 0;
        let status = updatedGoal.status;
        if (current >= target) status = 'Completed';
        return {
          ...g,
          ...updatedGoal,
          current,
          target,
          status
        };
      }
      return g;
    }));
    logActivity(`Goal "${updatedGoal.name}" updated`, 'success');
  };

  const deleteGoal = (id) => {
    const goal = goals.find(g => g.id === id);
    setGoals(prev => prev.filter(g => g.id !== id));
    if (goal) {
      logActivity(`Goal "${goal.name}" removed`, 'warning');
    }
  };

  // CSR activities & employee participation
  const joinActivity = (id) => {
    setCsrActivities(prev => prev.map(act => {
      if (act.id === id) {
        if (act.joined) return act; // already joined
        const hasSpots = typeof act.remainingSpots === 'number';
        const newSpots = hasSpots ? act.remainingSpots - 1 : 'Open';
        
        // Add to participation table as pending review or approved
        const newPart = {
          id: Date.now(),
          employee: 'Representative User',
          activity: act.name,
          value: parseFloat(act.points) || 100.00,
          points: Math.round(act.points / 10),
          status: esgConfig.requireEvidence ? 'Pending' : 'Approved'
        };
        setParticipation(p => [newPart, ...p]);

        if (!esgConfig.requireEvidence) {
          rewardUserXp(act.points, `joining CSR Activity: ${act.name}`);
        } else {
          logActivity(`Joined "${act.name}". Participation pending admin approval.`, 'warning');
        }

        return {
          ...act,
          remainingSpots: newSpots,
          joined: true
        };
      }
      return act;
    }));
  };

  const approveParticipation = (id) => {
    setParticipation(prev => prev.map(p => {
      if (p.id === id) {
        if (p.status === 'Approved') return p;
        // If the approver approves, let's reward points to that employee
        if (p.employee === 'Representative User') {
          rewardUserXp(p.value, `approved participation in ${p.activity}`);
        } else {
          logActivity(`Approved participation for ${p.employee} in ${p.activity}`, 'success');
        }
        return { ...p, status: 'Approved' };
      }
      return p;
    }));
  };

  const rejectParticipation = (id) => {
    setParticipation(prev => prev.map(p => {
      if (p.id === id) {
        logActivity(`Rejected participation for ${p.employee} in ${p.activity}`, 'danger');
        return { ...p, status: 'Rejected' };
      }
      return p;
    }));
  };

  // Add audit and compliance issues
  const addAudit = (audit) => {
    const newAudit = {
      id: Date.now(),
      title: audit.title,
      department: audit.department,
      auditor: audit.auditor || 'Internal Auditor',
      date: audit.date || new Date().toISOString().split('T')[0],
      category: audit.category,
      status: audit.status || 'Under Review'
    };
    setAudits(prev => [newAudit, ...prev]);
    logActivity(`Audit "${audit.title}" created`, 'success');
  };

  const addCompliance = (issue) => {
    const newIssue = {
      id: Date.now(),
      title: issue.title,
      severity: issue.severity || 'Medium',
      department: issue.department,
      status: 'Open'
    };
    setCompliance(prev => [newIssue, ...prev]);
    logActivity(`Compliance issue reported: "${issue.title}" (${issue.severity} severity)`, 'danger');
  };

  // Gamification challenges, badges, and rewards
  const joinChallenge = (id) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id) {
        if (ch.joined) return ch;
        // User joined
        rewardUserXp(ch.xp, `starting challenge: ${ch.name}`);
        return { ...ch, joined: true };
      }
      return ch;
    }));
  };

  const redeemReward = (id) => {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    
    const userXp = leaderboard.find(item => item.isCurrentUser)?.xp || 0;
    if (userXp < reward.cost) {
      logActivity(`Insufficient XP to redeem "${reward.name}". Needed: ${reward.cost} XP.`, 'danger');
      return false;
    }

    // Deduct XP
    setLeaderboard(prev => {
      const updated = prev.map(item => {
        if (item.isCurrentUser) {
          return { ...item, xp: item.xp - reward.cost };
        }
        return item;
      });
      return updated
        .sort((a, b) => b.xp - a.xp)
        .map((item, idx) => ({ ...item, rank: idx + 1 }));
    });

    setRewards(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, redeemed: true };
      }
      return r;
    }));

    logActivity(`Redeemed reward: "${reward.name}". deducted ${reward.cost} XP.`, 'success');
    return true;
  };

  // Settings: CRUD Departments
  const addDepartment = (dept) => {
    const newDept = {
      id: Date.now(),
      name: dept.name,
      code: dept.code.toUpperCase(),
      head: dept.head,
      parent: dept.parent || '—',
      employees: parseInt(dept.employees) || 0,
      status: dept.status || 'Active'
    };
    setDepartments(prev => [...prev, newDept]);
    logActivity(`Department "${dept.name}" created`, 'success');
  };

  const editDepartment = (id, updatedDept) => {
    setDepartments(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          ...updatedDept,
          employees: parseInt(updatedDept.employees) || 0
        };
      }
      return d;
    }));
    logActivity(`Department "${updatedDept.name}" updated`, 'success');
  };

  const deleteDepartment = (id) => {
    const dept = departments.find(d => d.id === id);
    setDepartments(prev => prev.filter(d => d.id !== id));
    if (dept) {
      logActivity(`Department "${dept.name}" deleted`, 'warning');
    }
  };

  // General Settings
  const updateEsgConfig = (key, value) => {
    setEsgConfig(prev => ({
      ...prev,
      [key]: value
    }));
    logActivity(`Configuration updated: ${key} = ${value}`, 'success');
  };

  // Carbon logging action
  const logCarbonData = (amount, deptName) => {
    const carbonAmount = parseFloat(amount) || 0;
    if (carbonAmount <= 0) return;
    
    // Add carbon transaction or emissions
    const newTxn = {
      id: Date.now(),
      txnId: `Txn-${Math.floor(1000 + Math.random() * 9000)}`,
      project: `Logged Carbon - ${deptName || 'General'}`,
      type: 'Emit',
      amount: carbonAmount,
      cost: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'Approved'
    };
    setCarbonTransactions(prev => [newTxn, ...prev]);

    // Update carbon trend for current month
    setCarbonTrend(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1].emissions += carbonAmount;
      }
      return updated;
    });

    logActivity(`Logged ${carbonAmount} tons of CO2 emissions for ${deptName || 'General'}`, 'warning');
  };

  return (
    <EcoSphereContext.Provider value={{
      goals,
      csrActivities,
      participation,
      audits,
      compliance,
      challenges,
      badges,
      rewards,
      leaderboard,
      departments,
      emissionFactors,
      productEsg,
      carbonTransactions,
      recentActivities,
      carbonTrend,
      deptRanking,
      energyConsumption,
      renewableEnergy,
      wasteManagement,
      socialMetrics,
      governanceMetrics,
      esgConfig,
      scores,
      addGoal,
      editGoal,
      deleteGoal,
      joinActivity,
      approveParticipation,
      rejectParticipation,
      addAudit,
      addCompliance,
      joinChallenge,
      redeemReward,
      addDepartment,
      editDepartment,
      deleteDepartment,
      updateEsgConfig,
      logCarbonData,
      rewardUserXp
    }}>
      {children}
    </EcoSphereContext.Provider>
  );
};

export const useEcoSphere = () => {
  const context = useContext(EcoSphereContext);
  if (!context) {
    throw new Error('useEcoSphere must be used within an EcoSphereProvider');
  }
  return context;
};
