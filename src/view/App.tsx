import React from 'react';

import Routes from '@/route/Routes';
import ErrorBoundary from '@/component/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
};

export default App;
