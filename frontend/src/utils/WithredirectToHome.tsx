/**
 * * This component is created particularly to avoid reloading entire app from routes other than the home page. 
 * * Now from whichever route the app is loaded it will land in home page only
 */

import React, { useEffect } from 'react';

const WithRedirectToHome = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const ComponentWithRedirect: React.FC<P> = (props) => {

    useEffect(() => {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithRedirect;
};

export default WithRedirectToHome;
