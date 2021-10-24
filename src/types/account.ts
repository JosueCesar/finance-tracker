import Transaction from "./transaction"

export default interface Account{
  id: number;
  name: String;
  balance: number;
  transactions: Transaction[];
}