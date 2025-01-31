import React, { useState } from "react";
interface Props {
  onIncome: (amount: number) => void;
  onExpense: (amount: number) => void;
}
interface Data {
  id: number;
  title: string;
  amount: number;
  transactionType: string;
}
const Transactions = ({ onIncome, onExpense }: Props) => {
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [transactionType, setTransactionType] = useState("expense");
  console.log(amount, "amount");

  const toggleMenu = () => setMenu((prev) => !prev);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Validation
    if (!title.trim() || !amount) {
      alert("Both title and amount are required!");
      return;
    }

    // Create new transaction
    const newTransaction: Data = {
      id: data.length + 1,
      title: title.trim(),
      amount: Number(amount),
      transactionType,
    };

    // Update income/expense based on transaction type
    if (transactionType === "income") {
      onIncome(Number(amount));
    } else {
      onExpense(Number(amount));
    }

    // Add transaction to the list
    setData((prevData) => [...prevData, newTransaction]);

    // Reset form fields
    setTitle("");
    setAmount(0);
    setTransactionType("expense");
    setMenu(false); // Close the menu
    console.log(data);
  };
  return (
    <div className="mt-16 ">
      <button
        onClick={toggleMenu}
        className="bg-black text-white p-2 rounded-lg hover:bg-gray-700"
      >
        Add Transations
      </button>
      {menu && (
        <div className="flex flex-row justify-center mt-4">
          <div className="flex flex-col text-black  gap-2">
            <input
              required
              type="number"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setAmount(value === "" ? "" : Number(value)); // Ensures valid state
              }}
              placeholder="Enter Amount"
              className="p-2 rounded-lg border-black placeholder:text-gray-500 bg-amber-100"
            />

            <input
              required
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter Title"
              className="p-2 rounded-lg border-black placeholder:text-gray-500 bg-amber-100"
            />

            <select
              value={transactionType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setTransactionType(e.target.value);
              }}
              className="bg-amber-100"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              onClick={handleSubmit}
              className="bg-black text-white p-2 rounded-lg hover:bg-gray-700 mt-4"
            >
              Add
            </button>
          </div>
        </div>
      )}
      {data.length > 0 &&
        data.map((d) => (
          <div className="flex justify-center">
            <div
              className={`flex flex-row w-[150px] justify-between text-white p-2 rounded-md font-bold  mt-4
                ${
                  d.transactionType === "expense" ? "bg-red-500" : "bg-green-500"
                }`}
            >
              <p>{d.title}</p>
              <p>{d.amount}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Transactions;
