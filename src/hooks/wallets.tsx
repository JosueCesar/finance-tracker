import React, { createContext, useContext, useState, useCallback } from 'react';

import { uuid } from 'uuidv4';

import Account from '../types/account';
import Transaction from '../types/transaction';
import Wallet from '../types/wallet';

interface WalletContextData {
  wallets: Wallet[];
  selectedWallet: Wallet;

  selectWallet(wallet: Wallet): void;
  unselectWallet(): void;
  
  createWallet(data: Omit<Wallet, "id" | "accounts" | "currentBalance">): void;
  deleteWallet(id: string): void;
  
  createAccount(data: Omit<Account, "id" | "transactions">): void;
  deleteAccount(accountId: string): void;
  
  createTransaction(accountId: string, data: Omit<Transaction, "id">): void;
  deleteTransaction(accountId: string, transactionId: string): void;
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData);

const WalletsProvider: React.FC = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet>({} as Wallet);

  const selectWallet = useCallback((wallet: Wallet) => {
    setSelectedWallet(wallet);
  }, []);
  
  const unselectWallet = useCallback(() => {
    setSelectedWallet({} as Wallet);
  }, []);

  const createWallet = useCallback((data: Omit<Wallet, "id" | "accounts" | "currentBalance">) => {
    setWallets([
      ...wallets,
      {
        ...data,
        id: uuid(),
        currentBalance: 0,
        accounts: [],
      }
    ]);
  }, [ wallets ]);

  const deleteWallet = useCallback((id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  }, [ wallets ]);
  
  const createAccount = useCallback((data: Omit<Account, "id" | "transactions">) => {
    const account: Account = {
      ...data,
      id: uuid(),
      transactions: [],
    };

    setSelectedWallet({
      ...selectedWallet,
      accounts: [
        account,
      ],
      currentBalance: selectedWallet.currentBalance + account.balance,
    });

    setWallets([ ...wallets.filter(wallet => wallet.id !== selectedWallet.id), selectedWallet ]);
  }, [ selectedWallet, wallets ]);

  const deleteAccount = useCallback((accountId: string) => {
    let accountToDelete = selectedWallet.accounts?.find(account => account.id === accountId);

    if (accountToDelete) {
      setSelectedWallet({
        ...selectedWallet,
        currentBalance: selectedWallet.currentBalance - accountToDelete.balance,
        accounts: [
          ...selectedWallet.accounts.filter(account => account.id !== accountId),
        ]
      });

      setWallets([ ...wallets.filter(wallet => wallet.id !== selectedWallet.id), selectedWallet ]);
    }
  }, [ selectedWallet, wallets ]);

  const createTransaction = useCallback((accountId: string, data: Omit<Transaction, "id">) => {
    // FIXME: Not updating wallets state
    let account = selectedWallet.accounts.find(account => account.id === accountId);

    if(account) {
      account.transactions.push({
        ...data,
        id: uuid(),
      });
      account.balance = data.type === "income" ? 
        account.balance += data.value:
        account.balance -= data.value;

      setSelectedWallet({
        ...selectedWallet,
        currentBalance: data.type === "income" ?
          selectedWallet.currentBalance += data.value:
          selectedWallet.currentBalance -= data.value,
        accounts: [
          {
            ...account,
          }
        ]
      });
      
      setWallets([ ...wallets.filter(wallet => wallet.id !== selectedWallet.id), selectedWallet ]);
    }
  }, [ selectedWallet, wallets ]);

  const deleteTransaction = useCallback((accountId: string, transactionId: string) => {
    // FIXME: Not working properly, it is making sum on sometimes on deletion, sometimes it decreases, it's realy UNSTABLE!
    let account = selectedWallet.accounts.find(account => account.id === accountId);

    if(account) {
      const transaction = account.transactions.find(item => item.id === transactionId);

      if(transaction) {
        account.transactions = account.transactions.filter(item => item.id !== transactionId);

        account.balance = transaction.type === "income" ?
          account.balance -= transaction.value:
          account.balance += transaction.value;
        
        setSelectedWallet({
          ...selectedWallet,
          currentBalance: transaction.type === "income" ?
            selectedWallet.currentBalance - transaction.value:
            selectedWallet.currentBalance + transaction.value,
          accounts: [
            {
              ...account,
            }
          ]
        });

        setWallets([ ...wallets.filter(wallet => wallet.id !== selectedWallet.id), selectedWallet ]);
      }
    }
  }, [ selectedWallet, wallets ]);
  
  return (
    <WalletContext.Provider
      value={{
        wallets,
        selectedWallet,
        selectWallet,
        unselectWallet,
        createWallet,
        deleteWallet,
        createAccount,
        deleteAccount,
        createTransaction,
        deleteTransaction
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWallets = (): WalletContextData => {
  const context = useContext(WalletContext);

  if(!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
};

export { WalletsProvider, useWallets };