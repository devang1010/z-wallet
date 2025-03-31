import React from 'react';
import { useNavigate } from 'react-router-dom';

function ImportWallet(props: any) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg w-full">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-4 bg-blue-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Import Existing Wallet
          </h2>
          
          <p className="text-gray-600">
            Import your wallet using a Secret Recovery Phrase
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/wallet/import')}
        className="w-full py-4 px-6 bg-blue-600 text-white font-medium rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-opacity-50 transition-colors"
      >
        Import Wallet
      </button>
    </div>
  );
}

export default ImportWallet;