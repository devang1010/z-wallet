import React from 'react';
import logoIcon from '../assets/logo.png'; // Adjust the path as necessary
interface LogoDivProps {
  className?: string;
}

function LogoDiv({ className }: LogoDivProps) {
  return (
    <div className={`flex items-center space-x-3 p-4 ${className || ''}`}>
      <img 
        src={logoIcon}
        alt="Z-Wallet Logo"
        className="w-14 h-14 object-contain rounded-full shadow-sm"
      />
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">Z-Wallet</h1>
        <span className="text-sm text-gray-500">Secure Wallet</span>
      </div>
    </div>
  );
}

export default LogoDiv;