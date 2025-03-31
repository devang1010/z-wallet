import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from '../../components/LogoDiv';
import { Button, Typography } from '@mui/material';
import ViewSeed from '../../components/ViewSeed';
import { getMnemonic } from '../../services/storage';

function NewSeed(props: any) {
    const mnemonic = getMnemonic();
    if(!mnemonic) throw new Error('mnemonic seed not found');

    const [isSeedHidden, setIsSeedHidden] = useState(true);
    const navigate = useNavigate();

    const handleNext = (e: any) => {
        navigate('/seed/confirm');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <LogoDiv className="mb-8" />

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                        Secret Recovery Phrase
                    </h1>

                    <div className="space-y-6">
                        {/* Warning Messages */}
                        <div className="space-y-4 bg-blue-50 rounded-lg p-4">
                            <Typography variant="body2" className="text-gray-700">
                                Your Secret Recovery Phrase makes it easy to back up and restore your account.
                            </Typography>
                            <Typography variant="body2" className="text-red-600 font-medium">
                                WARNING: Never disclose your Secret Recovery Phrase. 
                                Anyone with this phrase can take your Ether forever.
                            </Typography>
                        </div>

                        {/* Seed Phrase Viewer */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ViewSeed 
                                isSeedHidden={isSeedHidden}
                                setIsSeedHidden={setIsSeedHidden}
                            />
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-center pt-4">
                            <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                onClick={handleNext}
                                disabled={isSeedHidden}
                                className="w-full md:w-auto px-8 py-3 text-lg font-medium"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewSeed;