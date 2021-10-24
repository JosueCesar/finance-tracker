export default interface Transaction {
  id: string;
  date: Date;
  value: number;
  type: "income" | "expense";
  class: string;
}