import Wallet from "./wallet"

export default interface User{
  id: number;
  name: string;
  wallet: Wallet;
}