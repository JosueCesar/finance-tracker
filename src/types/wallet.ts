import Account from "./account"

export default interface Wallet {
  accounts: Account[];
  currentBalance: number;
}