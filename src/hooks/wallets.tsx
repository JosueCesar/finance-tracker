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
  
  createWallet(data: Omit<Wallet, "id" | "accounts">): void;
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

  const createWallet = useCallback((data: Omit<Wallet, "id" | "accounts">) => {
    wallets.push({
      ...data,
      id: uuid(),
      accounts: [],
    });
  }, [wallets]);

  const deleteWallet = useCallback((id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  }, [wallets, setWallets]);
  
  const createAccount = useCallback((data: Omit<Account, "id" | "transactions">) => {
    // TODO:
  }, []);

  const deleteAccount = useCallback((accountId: string) => {}, [
    // TODO:
  ]);

  const createTransaction = useCallback((accountId: string, data: Omit<Transaction, "id">) => {
    // TODO:
  }, []);

  const deleteTransaction = useCallback((accountId: string, TransactionId: string) => {
    // TODO:
  }, []);
  
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

const useWallet = (): WalletContextData => {
  const context = useContext(WalletContext);

  if(!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
};

export { WalletsProvider, useWallet };