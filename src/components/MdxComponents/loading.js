import * as React from 'react';

const LoadingProvider = ({ retry, timedOut, pastDelay, isLoading, ...props }) => {
  if (isLoading) {
    return <div>Loading...</div>
  }
  return <div {...props}></div>;
};

export default LoadingProvider;
