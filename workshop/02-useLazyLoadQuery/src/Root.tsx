import React, { Suspense } from 'react';

import Providers from './Providers';
import App from './App';

import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';

const Root = () => {
  /**
   * @TODO
   * Add Suspense to suspend when using useLazyLoadQuery
   * Add ErrorBoundary to catch errors in useLazyLoadQuery
   */

  return (
    <Providers>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </Providers>
  );
};

export default Root;
