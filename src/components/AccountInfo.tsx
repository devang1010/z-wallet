import React, { useEffect, useState } from 'react';
import { Box, Button,  Typography, Card, CardHeader ,CardContent, CardActions, Avatar, IconButton, Tooltip } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as storage from '../services/storage';
import ethIcon from '../assets/eth_icon.svg';
import { getAccountBackgroundColor } from '../utils/color';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { balanceOf, formatEth } from '../utils/ethers';


function AccountInfo(props: any) {

    const {  currentAccount, provider, setOpenViewAccountModal, networkInfo, setOpenSendTokenModal, accountBalance, setAccountBalance } = props;

    const accountIndex = storage.getAccountIndex();

    const currentAccountName = currentAccount?.address ? storage.getAccountName(currentAccount.address) : '';
  
    
    const [addressCopied, setAddressCopied] = useState(false);

    const handleCopyAddress = async (e: any) => {
      e.preventDefault();
      await navigator.clipboard.writeText(currentAccount.address);
      setAddressCopied(true);
      setTimeout(() => {
        setAddressCopied(false);
      }, 1500)
    }

    const handleViewAccount =  (e: any) => {
      e.preventDefault();
      setOpenViewAccountModal(true);
    }

    useEffect(() => {
      if (currentAccount) {
        chrome.runtime.sendMessage({ 
          type: "UPDATE_WALLET_ADDRESS", 
          address: currentAccount.address 
        });
      }
      // window.location.reload()
    }, [currentAccount]);

    const handleSendToken = (e: any) => {
      e.preventDefault();
      // setOpenSendTokenModal(true);
    }

    useEffect(() => {
        initAccountBalance();
    }, [currentAccount?.address]);

    useEffect(() => {
      initAccountBalance();
    }, [provider?.connection?.url]);

    const initAccountBalance = async () => {
      const balance = await balanceOf(provider, currentAccount?.address);
      setAccountBalance(balance);
    }

    return (
        <div className="w-full p-4">
            <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-4">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar
                            className="bg-gradient-to-br from-blue-500 to-blue-600"
                            sx={{ bgcolor: getAccountBackgroundColor(currentAccount?.address) }}
                        >
                            <AccountBalanceWalletIcon />
                        </Avatar>
                        <div>
                            <h3 className="font-medium text-gray-900">
                                {currentAccountName || `Account ${accountIndex + 1}`}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                                {currentAccount?.address
                                    ? `${currentAccount.address.slice(0, 4)}***${currentAccount.address.slice(-3)}`
                                    : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconButton
                            onClick={handleCopyAddress}
                            className="hover:bg-gray-100"
                        >
                            <ContentCopyIcon />
                        </IconButton>
                        <IconButton onClick={handleViewAccount} className='hover:bg-gray-100'>
                             <InfoIcon/>
                        </IconButton>
                        
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
                <img
                    src={ethIcon}
                    alt="ETH"
                    className="w-12 h-12 mx-auto mb-4 rounded-full border border-gray-200"
                />
                <p className="text-3xl font-medium text-gray-900">
                    {Number(formatEth(accountBalance)).toFixed(4)} ETH
                </p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                </button>
            </div>
        </div>
    );
}

export default AccountInfo;