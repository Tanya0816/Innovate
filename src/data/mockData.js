export const initialGoals = [
  {
    id: 1,
    name: 'Reduce Fleet Emissions',
    department: 'Logistics',
    target: 450,
    current: 180,
    deadline: '2026-12-31',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Cut Packaging Waste',
    department: 'Manufacturing',
    target: 200,
    current: 180,
    deadline: '2026-06-30',
    status: 'On Track'
  },
  {
    id: 3,
    name: 'Offsite Energy Shift',
    department: 'Corporate',
    target: 500,
    current: 150,
    deadline: '2026-10-15',
    status: 'Behind Plan'
  }
];

export const initialCsrActivities = [
  {
    id: 1,
    name: 'Tree Planting',
    status: 'Planned',
    remainingSpots: 15,
    date: '2026-08-12',
    points: 250,
    joined: false
  },
  {
    id: 2,
    name: 'Blood Donation',
    status: 'Planned',
    remainingSpots: 8,
    date: '2026-08-20',
    points: 100,
    joined: false
  },
  {
    id: 3,
    name: 'Climate Pledge',
    status: 'Active',
    remainingSpots: 'Open',
    date: '2026-07-01',
    points: 50,
    joined: true
  },
  {
    id: 4,
    name: 'ESG Workshop',
    status: 'Scheduled',
    remainingSpots: 'Open',
    date: '2026-07-28',
    points: 150,
    joined: false
  }
];

export const initialParticipation = [
  {
    id: 1,
    employee: 'Alice Co',
    activity: 'Tree Planting',
    value: 250.00,
    points: 25,
    status: 'Pending'
  },
  {
    id: 2,
    employee: 'Bob Smith',
    activity: 'CSR Workshop',
    value: 100.00,
    points: 10,
    status: 'Approved'
  }
];

export const initialAudits = [
  {
    id: 1,
    title: 'Q3 Waste Audit',
    department: 'Manufacturing',
    auditor: 'John Doe',
    date: '2026-09-15',
    category: 'Environmental',
    status: 'Completed'
  },
  {
    id: 2,
    title: 'Vendor Compliance Check',
    department: 'Procurement',
    auditor: 'Jane Doe',
    date: '2026-07-20',
    category: 'Governance',
    status: 'Under Review'
  }
];

export const initialCompliance = [
  {
    id: 1,
    title: 'Material Safety Breach',
    severity: 'High',
    department: 'Manufacturing',
    status: 'Open'
  },
  {
    id: 2,
    title: 'Non-certified Supplier',
    severity: 'Medium',
    department: 'Procurement',
    status: 'Resolved'
  }
];

export const initialChallenges = [
  {
    id: 1,
    name: 'Sustainability Sprint',
    xp: 250,
    duration: '30 days',
    status: 'Active',
    joined: false
  },
  {
    id: 2,
    name: 'Recycle Challenge',
    xp: 100,
    duration: '15 days',
    status: 'Active',
    joined: true
  },
  {
    id: 3,
    name: 'Commute Green Week',
    xp: 150,
    duration: '7 days',
    status: 'Draft',
    joined: false
  }
];

export const initialBadges = [
  {
    id: 1,
    name: 'Carbon Zero',
    description: 'Carbon footprint reduced by 50%',
    unlocked: true,
    icon: 'Zap'
  },
  {
    id: 2,
    name: 'Eco Warrior',
    description: 'Participated in 3 CSR events',
    unlocked: false,
    icon: 'Shield'
  },
  {
    id: 3,
    name: 'Sustainability Champion',
    description: 'Earned 1000+ XP',
    unlocked: true,
    icon: 'Trophy'
  },
  {
    id: 4,
    name: 'Green Team',
    description: 'Formed department recycling program',
    unlocked: false,
    icon: 'Users'
  }
];

export const initialRewards = [
  {
    id: 1,
    name: 'Plant 10 Trees',
    cost: 500,
    description: 'We plant 10 trees in your name',
    redeemed: false
  },
  {
    id: 2,
    name: 'Eco Coffee Mug',
    cost: 300,
    description: 'Eco-friendly insulated stainless steel mug',
    redeemed: false
  },
  {
    id: 3,
    name: 'Carbon Offset Cert',
    cost: 1000,
    description: '1 ton of certified carbon offset',
    redeemed: false
  },
  {
    id: 4,
    name: 'Solar Charger',
    cost: 1500,
    description: 'Portable solar panel phone charger',
    redeemed: false
  }
];

export const initialLeaderboard = [
  { rank: 1, employee: 'Representative User', xp: 4200, isCurrentUser: true },
  { rank: 2, employee: 'John Doe', xp: 2800, isCurrentUser: false },
  { rank: 3, employee: 'Jane Doe', xp: 2500, isCurrentUser: false }
];

export const initialDepartments = [
  {
    id: 1,
    name: 'Manufacturing',
    code: 'MFG',
    head: 'A. Smith',
    parent: '—',
    employees: 150,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Logistics',
    code: 'LOG',
    head: 'B. Johnson',
    parent: 'Manufacturing',
    employees: 50,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Corporate',
    code: 'CORP',
    head: 'C. Davis',
    parent: '—',
    employees: 20,
    status: 'Active'
  }
];

export const initialEmissionFactors = [
  {
    id: 1,
    source: 'Electricity (Grid)',
    scope: 'Scope 2',
    factor: '0.385 kg CO2e/kWh',
    category: 'Energy'
  },
  {
    id: 2,
    source: 'Natural Gas',
    scope: 'Scope 1',
    factor: '2.03 kg CO2e/m³',
    category: 'Stationary Combustion'
  },
  {
    id: 3,
    source: 'Diesel Fuel',
    scope: 'Scope 1',
    factor: '2.68 kg CO2e/L',
    category: 'Mobile Combustion'
  },
  {
    id: 4,
    source: 'Air Travel',
    scope: 'Scope 3',
    factor: '0.115 kg CO2e/km',
    category: 'Business Travel'
  }
];

export const initialProductEsg = [
  {
    id: 1,
    name: 'EcoPack Pro',
    category: 'Packaging',
    carbonFootprint: 1.2,
    recyclingRate: 95,
    esgScore: 92
  },
  {
    id: 2,
    name: 'FlexiBox',
    category: 'Packaging',
    carbonFootprint: 2.8,
    recyclingRate: 70,
    esgScore: 78
  },
  {
    id: 3,
    name: 'GreenLite Container',
    category: 'Shipping',
    carbonFootprint: 12.4,
    recyclingRate: 85,
    esgScore: 85
  }
];

export const initialCarbonTransactions = [
  {
    id: 1,
    txnId: 'Txn-1024',
    project: 'Amazon Reforestation',
    type: 'Buy',
    amount: 500,
    cost: 7500,
    date: '2026-06-15',
    status: 'Approved'
  },
  {
    id: 2,
    txnId: 'Txn-1025',
    project: 'Wind Farm India',
    type: 'Buy',
    amount: 250,
    cost: 3750,
    date: '2026-07-02',
    status: 'Approved'
  },
  {
    id: 3,
    txnId: 'Txn-1026',
    project: 'Solar Cookers Kenya',
    type: 'Buy',
    amount: 100,
    cost: 1800,
    date: '2026-07-10',
    status: 'Pending'
  }
];

export const carbonTrendData = [
  { name: 'Jan', emissions: 480 },
  { name: 'Feb', emissions: 450 },
  { name: 'Mar', emissions: 410 },
  { name: 'Apr', emissions: 430 },
  { name: 'May', emissions: 390 },
  { name: 'Jun', emissions: 360 },
  { name: 'Jul', emissions: 340 }
];

export const departmentRankingData = [
  { name: 'Admin', score: 65 },
  { name: 'HR', score: 72 },
  { name: 'Mkt', score: 78 },
  { name: 'Ops', score: 82 },
  { name: 'Prod', score: 88 }
];

export const recentActivities = [
  { id: 1, text: 'FDA Compliant 2026 Audit Draft completed', type: 'success', time: '2 hrs ago' },
  { id: 2, text: 'New compliance issues in Logistics department', type: 'warning', time: '5 hrs ago' },
  { id: 3, text: 'Carbon Offset Transaction Approved for Wind Farm', type: 'success', time: '1 day ago' },
  { id: 4, text: 'ESG recommendations and Corrective Plans pending review', type: 'danger', time: '2 days ago' }
];

export const energyConsumptionData = [
  { name: 'Jan', electricity: 14200, gas: 4200 },
  { name: 'Feb', electricity: 13900, gas: 4000 },
  { name: 'Mar', electricity: 12500, gas: 3600 },
  { name: 'Apr', electricity: 13100, gas: 3100 },
  { name: 'May', electricity: 11800, gas: 2800 },
  { name: 'Jun', electricity: 11500, gas: 2200 },
  { name: 'Jul', electricity: 10900, gas: 1900 }
];

export const renewableEnergyData = [
  { name: 'Jan', solar: 15, grid: 85 },
  { name: 'Feb', solar: 18, grid: 82 },
  { name: 'Mar', solar: 22, grid: 78 },
  { name: 'Apr', solar: 28, grid: 72 },
  { name: 'May', solar: 35, grid: 65 },
  { name: 'Jun', solar: 42, grid: 58 },
  { name: 'Jul', solar: 48, grid: 52 }
];

export const wasteManagementData = [
  { name: 'Recycled', value: 45, color: '#10b981' },
  { name: 'Composted', value: 25, color: '#f59e0b' },
  { name: 'Landfilled', value: 30, color: '#fb923c' }
];

export const initialSocialMetrics = {
  volunteerHours: 1450,
  communityScore: 86,
  participationRate: 72
};

export const initialGovernanceMetrics = {
  policyAdoptionRate: 94,
  complianceStatusRate: 98.2
};
