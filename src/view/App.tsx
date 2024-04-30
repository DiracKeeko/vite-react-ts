import React from 'react';

import ErrorBoundary from '@/component/ErrorBoundary';
import Routes from '@/route/Routes';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
};

export default App;
