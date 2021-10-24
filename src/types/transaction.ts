export default interface Transaction{
  id: number;
  date: Date;
  value: number;
  type: "income" | "expense";
  class: string;
}