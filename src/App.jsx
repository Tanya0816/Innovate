import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EcoSphereProvider } from '@/services/EcoSphereContext';
import PageLayout from '@/components/layout/PageLayout';
import routes from '@/routes';

const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-slate-950 text-slate-400">
    <div className="text-emerald-400 animate-pulse text-sm font-semibold tracking-wider">
      Loading EcoSphere...
    </div>
  </div>
);

function App() {
  return (
    <EcoSphereProvider>
      <Router>
        <PageLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              {routes.map(({ path, element: Component, index }) => (
                <Route
                  key={path}
                  path={path}
                  index={index}
                  element={<Component />}
                />
              ))}
            </Routes>
          </Suspense>
        </PageLayout>
      </Router>
    </EcoSphereProvider>
  );
}

export default App;
