import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from '../../components/LogoDiv';
import { Button, Typography, TextareaAutosize } from '@mui/material';
import GoBackIcon from '@mui/icons-material/ArrowBackIos';
import * as storage from '../../services/storage';

function ConfirmSeed(props: any) {
    const mnemonic = storage.getMnemonic();
    if (!mnemonic) throw new Error('mnemonic seed not found');

    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);

    const [confirmSeed, setConfirmSeed] = useState('');
    const [error, setError] = useState('');
    const [isSeedMatch, setIsSeedMatch] = useState(false);

    const handleConfirmSeedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError('');
        setConfirmSeed(e.target.value);
    };

    const handleConfirm = (e: any) => {
        const confirmationPhrase = confirmSeed.trim();
        const mnemonic = storage.getMnemonic();
        if (mnemonic !== confirmationPhrase.trim()) {
            setError('seed phrase doesn\'t match');
            return;
        }
        navigate('/', { replace: true });

        // Optional: force a clean component re-mount
        window.location.reload();
    };

    useEffect(() => {
        const mnemonic = storage.getMnemonic();
        if (confirmSeed.trim() === mnemonic)
            setIsSeedMatch(true);
        else
            setIsSeedMatch(false);
    }, [confirmSeed])

    return (
        <div className="min-h-screen p-4">
            <LogoDiv />
            <Button
                size="medium"
                color="primary"
                variant="text"
                onClick={navigateBack}
                className="mt-4"
            >
                <GoBackIcon className="w-4 h-4" />
                Back
            </Button>
            <div className="w-full max-w-2xl mx-auto mt-8 px-4">
                <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                    Confirm your Secret Recovery Phrase
                </h1>
                <div className="space-y-6">
                    <Typography variant="body2" color="text.secondary">
                        Please type each phrase in order to make sure it is correct.
                    </Typography>
                    <TextareaAutosize
                        onChange={handleConfirmSeedChange}
                        aria-label="confirm seed phrase"
                        className="w-full min-h-[120px] p-4 text-lg text-center leading-relaxed 
                                 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ resize: 'none' }}
                    />
                    {error && (
                        <Typography variant="body2" className="text-red-500 mb-4">
                            {error}
                        </Typography>
                    )}
                    <Button
                        size="medium"
                        color="primary"
                        variant="contained"
                        onClick={handleConfirm}
                        disabled={!isSeedMatch}
                        className="w-full sm:w-auto"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmSeed;