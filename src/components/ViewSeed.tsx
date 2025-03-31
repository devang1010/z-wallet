import React from 'react';
import * as storage from '../services/storage';

function ViewSeed(props: any) {
    const { isSeedHidden, setIsSeedHidden } = props;
    const mnemonic = storage.getMnemonic();

    return (
        <div className={`w-full max-w-md mx-auto my-4 ${isSeedHidden ? 'cursor-pointer' : ''}`}>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                {isSeedHidden ? (
                    <button 
                        onClick={() => setIsSeedHidden(false)}
                        className="w-full text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        View Seed
                    </button>
                ) : (
                    <p className="text-lg text-center text-gray-800 break-words">
                        {mnemonic}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ViewSeed;