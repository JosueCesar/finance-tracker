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
  deleteTransaction(accountId: string, TransactionId: string): void;
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
    selectedWallet.accounts.push({
      ...data,
      id: uuid(), 
      transactions: [],
    });
    selectedWallet.currentBalance += data.balance;

    setWallets([ ...wallets.filter(item => item.id !== selectedWallet.id), selectedWallet ]);
  }, [ selectedWallet, wallets ]);

  const deleteAccount = useCallback((accountId: string) => {
    let accountToDelete = selectedWallet.accounts?.find(account => account.id === accountId);

    if (accountToDelete) {
      selectedWallet.accounts.filter(account => account.id !== accountId);
      selectedWallet.currentBalance -= accountToDelete.balance;

      setWallets([ ...wallets.filter(item => item.id !== selectedWallet.id), selectedWallet ]);
    }
  }, [ selectedWallet, wallets ]);

  const createTransaction = useCallback((accountId: string, data: Omit<Transaction, "id">) => {
    let accountToChange = selectedWallet.accounts?.find(account => account.id === accountId);

    if (accountToChange) {
      accountToChange.transactions.push({
        ...data, 
        id: uuid(),
      });

      setWallets([ ...wallets.filter(item => item.id !== selectedWallet.id), selectedWallet ]);
    }
  }, [ selectedWallet, wallets ]);

  const deleteTransaction = useCallback((accountId: string, TransactionId: string) => {
    let accountToChange = selectedWallet.accounts?.find(account => account.id === accountId);

    if (accountToChange) {
      let transactionToDelete = accountToChange.transactions?.find(transaction => transaction.id === TransactionId);

      if (transactionToDelete) {
        accountToChange.transactions.filter(transaction => transaction.id !== TransactionId); 

        accountToChange.balance = transactionToDelete.type === "income" ? accountToChange.balance -= transactionToDelete.value : accountToChange.balance += transactionToDelete.value;
        
        setSelectedWallet({
          ...selectedWallet,
          currentBalance: transactionToDelete.type === "income" ? accountToChange.balance -= transactionToDelete.value : accountToChange.balance += transactionToDelete.value
        })

        setWallets([ ...wallets.filter(item => item.id !== selectedWallet.id), selectedWallet ]);
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