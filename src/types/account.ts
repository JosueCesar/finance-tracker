import Transaction from "./transaction"

export default interface Account{
  id: string;
  name: String;
  balance: number;
  transactions: Transaction[];
}