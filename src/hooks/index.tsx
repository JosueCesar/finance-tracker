import React from 'react';

import { WalletsProvider } from './wallets';

const context: React.FC = ({ children }) => {
  return (
    <WalletsProvider>
      {children}
    </WalletsProvider>
  );
}

export default context;