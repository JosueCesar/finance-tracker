import Wallet from "../types/wallet"
import Account from "../types/account"
import Transaction from "../types/transaction"

export const createWallet = () => {

}

export const addAccount = (wallet: Wallet, accountToAdd: Account) => {
  wallet.accounts.push(accountToAdd);
}

export const removeAccount = (accountToRemove: string, wallet: Wallet) => {
  const valueToRemove = wallet.accounts.find(account => account.id === accountToRemove)?.balance
  wallet.accounts.filter(account => account.id !== accountToRemove);
  wallet.currentBalance = valueToRemove ? wallet.currentBalance -= valueToRemove : wallet.currentBalance;
}

export const addTransaction = (transaction: Transaction, accountId: string, wallet: Wallet ) => {
  let accountToChange = wallet.accounts?.find(account => account.id === accountId);
  if (accountToChange) {
    accountToChange.transactions.push(transaction);
    transaction.type === "income" ? accountToChange.balance += transaction.value : accountToChange.balance -= transaction.value;
  }
}

export const removeTransaction = (transactionToRemove: string, accountId: string, wallet: Wallet) => {
  let accountToChange = wallet.accounts?.find(account => account.id === accountId);
  if (accountToChange) {
    accountToChange.transactions.filter(transaction => transaction.id !== transactionToRemove);   
  }
}
