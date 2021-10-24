import Transaction from "./transaction"

export default interface Account {
  id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
}