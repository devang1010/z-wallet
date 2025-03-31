import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { setWeb3Provider, getNetworkByChainID, unsubscribeIfExistAllAccountBalances, subscribeAccountBalance } from '../../utils/ethers';
import { NETWORK_CHAIN_ID, NETWORKS } from '../../utils/constants';
import AccountInfo from '../../components/AccountInfo';
import * as storage from '../../services/storage';
import { decryptData } from '../../utils/crypto';
import NewAccountModal from '../../components/NewAccount';
import ImportAccountModal from '../../components/ImportAccount';
import ViewAccountModal from '../../components/ViewAccount';
import {BigNumber, ethers} from 'ethers';
import { HDNode } from 'ethers/lib/utils';

function Dashboard(props: any) {

    const [provider, setProvider] = useState(setWeb3Provider(NETWORK_CHAIN_ID.GOERLI));

    const [chainID, setChainID] = useState(NETWORK_CHAIN_ID.GOERLI);
    const [network, setNetwork] = useState(getNetworkByChainID(NETWORK_CHAIN_ID.GOERLI));
    const [networkInfo, setNetworkInfo] = useState(NETWORKS.find(ntwrk => ntwrk.chainID===NETWORK_CHAIN_ID.GOERLI));
    const [accounts, setAccounts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentAccount, setCurrentAccount] = useState<Partial<HDNode>>();
    const [openNewAccountModal, setOpenNewAccountModal] = useState(false);
    const [openImportAccountModal, setOpenImportAccountModal] = useState(false);
    const [openViewAccountModal, setOpenViewAccountModal] = useState(false);
    const [accountBalance, setAccountBalance] = useState(BigNumber.from(0));

    useEffect(() => {
      setProvider(setWeb3Provider(chainID));
      const ntwrk = getNetworkByChainID(chainID);
      setNetwork(ntwrk);
      const ntwrkInfo = NETWORKS.find(ntwrk => ntwrk.chainID===chainID);
      setNetworkInfo(ntwrkInfo);
    }, [chainID]);

    useEffect(() => {
        const accts = storage.getAccounts();
        const accountsInfo = accts.map((acct: any) => { 
            const account = decryptData(acct);
            return {
                address: account?.address,
                name: storage.getAccountName(account.address),
                isImported: account?.isImported ? true : false
            }
        });
        setAccounts(accountsInfo);
    }, [])

    useEffect(() => {
        const index = storage.getAccountIndex();
        setCurrentIndex(index);
        const account = storage.getAccount(index);
        setCurrentAccount(account);
    }, []);

    useEffect(() => {
    
        if(!provider) return;
        
        unsubscribeIfExistAllAccountBalances(provider);
        subscribeAccountBalance(provider, currentAccount?.address, (balance: ethers.BigNumber) => {
            if(balance.eq(accountBalance)) return;
            setAccountBalance(balance);
        });
       
        return () => {
            unsubscribeIfExistAllAccountBalances(provider);
        }
    
    }, [provider, currentAccount])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar Section */}
            <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
                <Navbar 
                    {...props}
                    setChainID={setChainID}
                    accounts={accounts}
                    setAccounts={setAccounts}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                    setOpenNewAccountModal={setOpenNewAccountModal}
                    setOpenImportAccountModal={setOpenImportAccountModal}
                    provider={provider}
                />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-8 md:grid-cols-12">
                    {/* Account Info Section */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <AccountInfo 
                            chainID={chainID}
                            currentAccount={currentAccount}
                            setOpenViewAccountModal={setOpenViewAccountModal}
                            provider={provider}
                            networkInfo={networkInfo}
                            accountBalance={accountBalance}
                            setAccountBalance={setAccountBalance}
                        />
                    </div>

                    {/* Network Info Section */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Network Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Chain ID</span>
                                    <span className="text-sm font-medium">{chainID}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Network</span>
                                    <span className="text-sm font-medium">{networkInfo?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <div className="relative z-50">
                <NewAccountModal 
                    open={openNewAccountModal}
                    setOpen={setOpenNewAccountModal}
                    accounts={accounts}
                    setCurrentAccount={setCurrentAccount}
                    setCurrentIndex={setCurrentIndex}
                    setAccounts={setAccounts}
                    className="transition-all duration-300"
                />

                <ImportAccountModal
                    open={openImportAccountModal}
                    setOpen={setOpenImportAccountModal}
                    accounts={accounts}
                    setCurrentAccount={setCurrentAccount}
                    setCurrentIndex={setCurrentIndex}
                    setAccounts={setAccounts}
                    className="transition-all duration-300"
                />

                <ViewAccountModal
                    open={openViewAccountModal}
                    setOpen={setOpenViewAccountModal}
                    currentAccount={currentAccount}
                    chainID={chainID}
                    className="transition-all duration-300"
                />
            </div>
        </div>
    );
}

export default Dashboard;