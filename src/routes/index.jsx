import Dashboard from '../pages/Dashboard/Dashboard';
import Environmental from '../pages/Environmental/Environmental';
import Social from '../pages/Social/Social';
import Governance from '../pages/Governance/Governance';
import Gamification from '../pages/Gamification/Gamification';
import Reports from '../pages/Reports/Reports';
import Settings from '../pages/Settings/Settings';

const routes = [
  { path: '/', element: Dashboard, index: true },
  
  // Environmental Sub-routes
  { path: '/environmental', element: Environmental },
  { path: '/environmental/emission-factors', element: Environmental },
  { path: '/environmental/product-esg', element: Environmental },
  { path: '/environmental/carbon-transactions', element: Environmental },
  { path: '/environmental/goals', element: Environmental },
  
  // Social Sub-routes
  { path: '/social', element: Social },
  { path: '/social/csr-activities', element: Social },
  { path: '/social/participation', element: Social },
  
  // Governance Sub-routes
  { path: '/governance', element: Governance },
  { path: '/governance/policies', element: Governance },
  { path: '/governance/audits', element: Governance },
  { path: '/governance/compliance', element: Governance },
  
  // Gamification Sub-routes
  { path: '/gamification', element: Gamification },
  { path: '/gamification/challenges', element: Gamification },
  { path: '/gamification/badges', element: Gamification },
  { path: '/gamification/rewards', element: Gamification },
  { path: '/gamification/leaderboard', element: Gamification },
  
  // Reports
  { path: '/reports', element: Reports },
  { path: '/reports/:tab', element: Reports },
  
  // Settings
  { path: '/settings', element: Settings },
  { path: '/settings/:tab', element: Settings }
];

export default routes;
