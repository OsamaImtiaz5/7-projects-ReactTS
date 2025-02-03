import React, { useRef, useState } from "react";
import AppLayout from "../PersistentDrawer";
import MainContainer from "../MainContainer";
import Circle from "../../assets/download (1).png";
import Cross from "../../assets/download (2).png";

const Tictactoe = () => {
  const [data, setData] = useState(Array(9).fill("")); // Stores board state
  const [count, setCount] = useState(0); // Move counter
  const [lock, setLock] = useState(false); // Lock board on win
  const title = useRef<HTMLHeadingElement | null>(null); // Winner display

  const handleToggle = (num: number) => {
    if (lock || data[num]) return;

    const newData = [...data]; // Copy current state
    newData[num] = count % 2 === 0 ? "X" : "O";
    setData(newData);
    setCount(count + 1);

    checkWin(newData);
  };

  const checkWin = (board: string[]) => {
    const winPatterns = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        declareWinner(board[a]);
        return;
      }
    }
  };

  const declareWinner = (winner: string) => {
    setLock(true);
    if (title.current) {
      title.current.innerHTML = `Winner: <img src=${
        winner === "X" ? Cross : Circle
      } width="40" height="40"/>`;
    }
  };

  const resetGame = () => {
    setData(Array(9).fill("")); // Clears board
    setCount(0);
    setLock(false);
    if (title.current) title.current.innerText = "Tic Tac Toe"; // Reset heading
  };

  return (
    <AppLayout>
      <MainContainer heading="Tic Tac Toe Game">
        <h2 ref={title} className="text-xl font-bold text-center mb-4">
          Tic Tac Toe
        </h2>
        <div className="grid grid-cols-3 gap-2 mx-auto w-72">
          {/* Because the container has 3 columns and there are 9 items, the grid
          will automatically arrange them into 3 rows (since 9 / 3 = 3). */}
          {data.map((value, index) => (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className="rounded-md bg-gray-800 flex w-24 h-24 cursor-pointer items-center justify-center"
            >
              {value === "X" && <img src={Cross} width="50" height="50" />}
              {value === "O" && <img src={Circle} width="50" height="50" />}
            </div>
          ))}
        </div>
        <button
          onClick={resetGame}
          className="mt-4 text-2xl bg-blue-800 p-2 cursor-pointer text-white rounded-md hover:bg-blue-400"
        >
          Reset
        </button>
      </MainContainer>
    </AppLayout>
  );
};

export default Tictactoe;
