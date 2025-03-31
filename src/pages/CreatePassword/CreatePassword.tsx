import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from '../../components/LogoDiv';
import GoBackIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Typography, FilledInput } from '@mui/material';
import { createMnemonicSeedRandom, createHDRootNodeFromMnemonic, createAccountFromHDRootNode } from '../../utils/ethers';
import { SHA256Hash } from '../../utils/crypto';
import * as storage from '../../services/storage';

function CreatePassword(props: any) {
    const navigate = useNavigate();
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [error, setError] = useState('');

    const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const value = e.target.value.trim(); // Remove whitespace
        if (value !== e.target.value) {
            setError('Password cannot contain spaces');
            return;
        }
        setPwd(value);
    };

    const handleConfirmPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim(); // Remove whitespace
        if (value !== e.target.value) {
            setError('Password cannot contain spaces');
            return;
        }
        setConfirmPwd(value);
    };

    const _generateAndStoreMnemonicAndAccount = () => {
        const mnemonic = createMnemonicSeedRandom();
        const HDRoot = createHDRootNodeFromMnemonic(mnemonic);
        const newAccIndex = storage.getLastPathIndex() + 1;
        const account = createAccountFromHDRootNode(HDRoot, newAccIndex);
        storage.setMnemonic(mnemonic);
        storage.setAccount(account);
        storage.setAccountName(`Account ${newAccIndex + 1}`, account.address);
        storage.setAccountIndex(newAccIndex);
        storage.setLastPathIndex(newAccIndex);
    };

    const setPasswordAndCreateAccount = () => {
        if (!pwd) {
            setError('Password is required');
            return;
        }
        if (pwd.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (pwd !== confirmPwd) {
            setError('Passwords don\'t match');
            return;
        }
        if (/\s/.test(pwd)) {
            setError('Password cannot contain spaces');
            return;
        }

        const hash = SHA256Hash(pwd);
        storage.setPassword(hash);
        storage.setLoginPassword(hash);
        _generateAndStoreMnemonicAndAccount();
        navigate('/seed/new');
    };

    return (
        <div className="min-h-screen p-4 md:p-6 flex flex-col">
            <div className="mb-4">
                <LogoDiv />
                <Button 
                    size="medium" 
                    color="primary" 
                    variant="text"
                    onClick={() => navigate(-1)}
                    className="mt-4 flex items-center gap-2"
                >
                    <GoBackIcon className="w-4 h-4" />
                    Back
                </Button>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow max-w-md mx-auto w-full">
                <h1 className="text-2xl md:text-3xl font-semibold mb-8">
                    Create Password
                </h1>

                <div className="w-full space-y-4">
                    <div className="space-y-2">
                        <Typography variant="body2" color="text.secondary">
                            New Password (min 8 characters)
                        </Typography>
                        <FilledInput
                            type="password"
                            value={pwd}
                            onChange={handlePwdChange}
                            className="w-full"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="space-y-2">
                        <Typography variant="body2" color="text.secondary">
                            Confirm Password
                        </Typography>
                        <FilledInput
                            type="password"
                            value={confirmPwd}
                            onChange={handleConfirmPwdChange}
                            className="w-full"
                            autoComplete="new-password"
                        />
                    </div>

                    {error && (
                        <Typography 
                            variant="body2" 
                            className="text-red-500 text-sm"
                        >
                            {error}
                        </Typography>
                    )}

                    <Button 
                        size="large" 
                        color="primary" 
                        variant="contained"
                        onClick={setPasswordAndCreateAccount}
                        className="w-full py-3 mt-4"
                    >
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreatePassword;