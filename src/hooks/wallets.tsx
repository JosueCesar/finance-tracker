import React, { createContext, useContext, useState, useCallback } from 'react';
import Account from '../types/account';
import Transaction from '../types/transaction';
import Wallet from '../types/wallet';

interface WalletContextData {
  wallets: Wallet[];
  selectedWallet: Wallet;
  
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

  const createWallet = useCallback((data: Omit<Wallet, "id" | "accounts">) => {
    // TODO:
  }, []);

  const deleteWallet = useCallback((id: string) => {}, [
    // TODO:
  ]);
  
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