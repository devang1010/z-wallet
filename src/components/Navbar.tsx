import React, { useState } from 'react';
import LogoDiv from './LogoDiv';
import MenuIcon from '@mui/icons-material/Menu';
import CreateAccountIcon from '@mui/icons-material/Add';
import ImportAccountIcon from '@mui/icons-material/Download';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import SelectNetwork from './SelectNetwork';
import { Button, Avatar, Box, IconButton } from '@mui/material';
import { Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import { getAccountBackgroundColor } from '../utils/color';
import * as storage from '../services/storage';
import { useNavigate } from 'react-router-dom';

function Navbar(props: any) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { chainID, setChainID, accounts, currentAccount, setCurrentAccount, setCurrentIndex, setOpenNewAccountModal, setOpenImportAccountModal } = props;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelectAccount = (index: number) => {
    setCurrentIndex(index);
    const currentAcct = storage.getAccount(index);
    setCurrentAccount(currentAcct);
    storage.setAccountIndex(index);
    handleClose();
  };

  const handleLockWallet = () => {
    storage.clearLoginPassword();
    // Use window.location.replace instead of navigate for a complete reset
    navigate('/login', { replace: true });

    // Optional: force a clean component re-mount
    window.location.reload();
    // OR if you want to use navigate, ensure state is cleared after navigation
    // navigate('/login');
    // setTimeout(() => storage.clearLoginPassword(), 100);
  };

  const handleRemoveAccounts = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4">
        <div className="w-full flex justify-between items-center h-16">
          {/* Logo */}
          <LogoDiv />

          {/* Network Selector and Menu */}
          <div className="flex items-center space-x-4">
            <SelectNetwork
              chainID={chainID}
              setChainID={setChainID}
              className="hidden md:block"
            />

            {/* Hamburger Menu */}
            <IconButton
              onClick={handleMenuOpen}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            {/* Menu Items */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              className="mt-2"
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* Settings Section */}
              <MenuItem onClick={handleClose} className="font-medium">
                <SettingsIcon className="mr-3" /> Settings
              </MenuItem>

              <Divider />

              {/* Accounts Section */}
              <MenuItem className="font-medium">
                <AccountBalanceWalletIcon className="mr-3" /> My Accounts
              </MenuItem>

              {accounts.map((account: any, index: number) => (
                <MenuItem
                  key={account.address + index}
                  onClick={() => handleSelectAccount(index)}
                  className="pl-8 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar
                      sx={{
                        bgcolor: getAccountBackgroundColor(account.address),
                        width: 24,
                        height: 24
                      }}
                    >
                      <AccountBalanceWalletIcon fontSize="small" />
                    </Avatar>
                    <span>{storage.getAccountName(account.address) || `Account ${index + 1}`}</span>
                    {account?.isImported && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                        Imported
                      </span>
                    )}
                  </div>
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => {
                  setOpenNewAccountModal(true);
                  handleClose();
                }}
                className="pl-8 text-blue-600 hover:bg-blue-50"
              >
                <CreateAccountIcon className="mr-3" /> Create Account
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setOpenImportAccountModal(true);
                  handleClose();
                }}
                className="pl-8 text-blue-600 hover:bg-blue-50"
              >
                <ImportAccountIcon className="mr-3" /> Import Account
              </MenuItem>

              <Divider />

              {/* Actions Section */}
              <MenuItem
                onClick={handleLockWallet}
                className="text-gray-700 hover:bg-gray-50"
              >
                <LockOutlinedIcon className="mr-3" /> Lock Wallet
              </MenuItem>

              <MenuItem
                onClick={handleRemoveAccounts}
                className="text-red-600 hover:bg-red-50"
              >
                <DeleteIcon className="mr-3" /> Remove All Accounts
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;