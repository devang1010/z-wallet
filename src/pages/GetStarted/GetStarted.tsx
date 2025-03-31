import React from 'react';
import LogoDiv from '../../components/LogoDiv';
import ImportWallet from '../../components/ImportWallet';
import CreateWallet from '../../components/CreateWallet';

function GetStarted(props: any) {
  return (
    <div className="w-full min-h-screen p-4">
      <LogoDiv />
      <div className="w-full mt-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to Z-Wallet
          </h1>
          <p className="mt-2 text-gray-600">
            Get started with your secure wallet
          </p>
        </div>
        
        <div className="w-full space-y-4">
          <ImportWallet {...props} />
          <CreateWallet {...props} />
        </div>
      </div>
    </div>
  );
}

export default GetStarted;