import Account from "./account"

export default interface Wallet {
  id: string;
  name: string;
  accounts: Account[];
  currentBalance: number;
}