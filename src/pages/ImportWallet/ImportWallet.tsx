import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from '../../components/LogoDiv';
import { Button, Typography, FilledInput, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { createHDRootNodeFromMnemonic, createAccountFromHDRootNode, isValidMnemonicSeed } from '../../utils/ethers';
import { SHA256Hash } from '../../utils/crypto';
import GoBackIcon from '@mui/icons-material/ArrowBackIos';
import * as storage from '../../services/storage';

function ImportWallet(props: any) {
    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);

    const [mnemonic, setSeed] = useState('');
    const [showSeed, setShowSeed] = useState(false);
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [mnemonicError, setSeedError] = useState('');
    const [pwdError, setPwdError] = useState('');

    const handleSeedHidden = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowSeed(e.target.checked);
    };

    const handleSeedChange = (e: any) => {
        setSeedError('');
        const targetVal = e.target.value;
        setSeed(targetVal);
        if (!isValidMnemonicSeed(targetVal)) {
            setSeedError('invalid mnemonic phrase');
            return;
        }
    };

    const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPwdError('');
        setPwd(e.target.value);
    };

    const handleConfirmPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setConfirmPwd(e.target.value);
    };

    const _generateAndStoreMnemonicAndAccount = () => {
        const HDRoot = createHDRootNodeFromMnemonic(mnemonic);
        const newAccIndex = storage.getLastPathIndex() + 1;
        const account = createAccountFromHDRootNode(HDRoot, newAccIndex);
        storage.setMnemonic(mnemonic);
        storage.setAccount(account);
        storage.setAccountName(`Account ${newAccIndex + 1}`, account.address);
        storage.setAccountIndex(newAccIndex);
        storage.setLastPathIndex(newAccIndex);
    };

    const setPasswordAndCreateAccount = (e: any) => {
        if (!pwd.length || pwd.length < 8) {
            setPwdError('password less than 8 chars');
            return;
        }
        if (pwd !== confirmPwd) {
            setPwdError('password inputs don\'t match');
            return;
        }
        const hash = SHA256Hash(pwd);
        storage.setPassword(hash);
        storage.setLoginPassword(hash);
        _generateAndStoreMnemonicAndAccount();
        navigate('/', { replace: true });

    // Optional: force a clean component re-mount
    window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 w-full">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <LogoDiv />
                    <Button
                        size="medium"
                        color="primary"
                        variant="text"
                        onClick={navigateBack}
                        className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                        <GoBackIcon className="w-4 h-4" />
                        Back
                    </Button>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                        Import a wallet with Secret Recovery Phrase
                    </h1>

                    <Typography variant="body2" color="text.secondary" className="mb-8">
                        Only the first account on this wallet will auto load. After completing this process,
                        to add additional accounts, click the drop down menu, then select Create Account.
                    </Typography>

                    <div className="space-y-6">
                        {/* Secret Recovery Phrase Input */}
                        <div className="space-y-2">
                            <Typography variant="subtitle2" className="text-gray-700">
                                Secret Recovery Phrase
                            </Typography>
                            <FilledInput
                                type={showSeed ? "text" : "password"}
                                value={mnemonic}
                                onChange={handleSeedChange}
                                className="w-full bg-gray-50"
                                placeholder="Enter your recovery phrase"
                            />
                            {mnemonicError && (
                                <Typography className="text-red-500 text-sm mt-1">
                                    {mnemonicError}
                                </Typography>
                            )}
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleSeedHidden} />}
                                    label="Show secret recovery phrase"
                                    className="text-gray-600"
                                />
                            </FormGroup>
                        </div>

                        {/* Password Inputs */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Typography variant="subtitle2" className="text-gray-700">
                                    New Password (min 8 characters)
                                </Typography>
                                <FilledInput
                                    type="password"
                                    value={pwd}
                                    onChange={handlePwdChange}
                                    className="w-full bg-gray-50"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="space-y-2">
                                <Typography variant="subtitle2" className="text-gray-700">
                                    Confirm Password
                                </Typography>
                                <FilledInput
                                    type="password"
                                    value={confirmPwd}
                                    onChange={handleConfirmPwdChange}
                                    className="w-full bg-gray-50"
                                    placeholder="Confirm password"
                                />
                            </div>

                            {pwdError && (
                                <Typography className="text-red-500 text-sm">
                                    {pwdError}
                                </Typography>
                            )}
                        </div>

                        {/* Import Button */}
                        <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={setPasswordAndCreateAccount}
                            className="w-full py-3 text-lg font-medium mt-6"
                            disabled={!mnemonic || !pwd || !confirmPwd}
                        >
                            Import Wallet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImportWallet;