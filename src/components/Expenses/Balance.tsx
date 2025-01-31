import { useState } from "react";
import MainContainer from "../MainContainer";
import AppLayout from "../PersistentDrawer";
import Transactions from "./Transactions";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const onIncome = (amount: number) => {
    setIncome(income + amount);
    setBalance(balance + amount);
  };
  const onExpense = (amount: number) => {
    setExpense(expense + amount);
    setBalance(balance - amount);
  };
  return (
    <AppLayout>
      <MainContainer heading="Expense Tracker App">
        <div className="flex flex-col items-center gap-4 ">
          <div>
            <p className="text-2xl mt-16">
              Balance:<span className="font-bold">{balance}</span>
            </p>
          </div>

          <div className=" flex flex-row text-white space-x-8 ">
            <p className="bg-green-600 p-2 rounded-xl">
              Income:<span className="font-bold">{income}</span>
            </p>
            <p className="bg-red-600 p-2 rounded-xl">
              Expense:<span className="font-bold">{expense}</span>
            </p>
          </div>
        </div>
        <Transactions onIncome={onIncome} onExpense={onExpense} />
      </MainContainer>
    </AppLayout>
  );
};
export default Balance;
