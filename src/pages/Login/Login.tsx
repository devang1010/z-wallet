import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from '../../components/LogoDiv';
import GoBackIcon from '@mui/icons-material/ArrowBackIos';
import logoIcon from '../../assets/logo.png';
import { Button, Typography, FilledInput } from '@mui/material';
import { SHA256Hash } from '../../utils/crypto';
import { createMnemonicSeedRandom, createHDRootNodeFromMnemonic, createAccountFromHDRootNode } from '../../utils/ethers';
import * as storage from '../../services/storage';

function Login(props: any) {
    const navigate = useNavigate();

    const navigateBack = () => navigate(-1);

    const [pwd, setPwd] = useState('');
    const [error, SetError] = useState('');

    const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

    const handleLogin = (e: any) => {
        if (!pwd.length || pwd.length < 8) {
            SetError('password less than 8 characters.');
            return;
        }
        const hash = SHA256Hash(pwd);
        const pwdHash = storage.getPasswordHash();
        if (hash !== pwdHash) {
            SetError('password incorrect');
            return;
        }
        storage.setLoginPassword(hash);
        console.log(pwd);
        console.log(hash === pwdHash);
        // window.location.replace("/");
        navigate('/', { replace: true });

    // Optional: force a clean component re-mount
    window.location.reload();
    }

    const handleImportWalletFromMnemonic = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className="w-full min-h-screen p-4 flex flex-col items-center">
            <div className="w-full flex flex-col items-center space-y-6">
                <img 
                    src={logoIcon}
                    alt="Logo"
                    className="w-32 h-32 object-contain"
                />
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                <div className="w-full flex flex-col items-center space-y-4">
                    <Typography 
                        variant="body2" 
                        className="text-gray-600"
                    >
                        Password
                    </Typography>
                    <FilledInput
                        type="password"
                        value={pwd}
                        onChange={handlePwdChange}
                        className="min-w-[300px]"
                    />

                    {error && 
                        <Typography 
                            variant="body2" 
                            className="text-red-500"
                        >
                            {error}
                        </Typography>
                    }
                    
                    <Button 
                        size="medium" 
                        color="primary" 
                        variant="contained"
                        onClick={handleLogin}
                        className="w-full py-2"
                    >
                        Unlock
                    </Button>
                    
                    <Button 
                        size="small" 
                        color="primary" 
                        variant="text"
                        onClick={handleImportWalletFromMnemonic}
                        className="normal-case mt-2"
                    >
                        or import using secret phrase
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;