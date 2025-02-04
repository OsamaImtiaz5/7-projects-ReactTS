import { BrowserRouter, Route, Routes } from "react-router-dom";
import Balance from "./components/Expenses/Balance";
import MainContainer from "./components/MainContainer";
import PasswordGenerator from "./components/Password Generator/PasswordGenerator";
import AppLayout from "./components/PersistentDrawer";
import ToDolist from "./components/ToDO List/ToDolist";
import WeatherCard from "./components/Weather/WeatherCard";
import CurrencyConverter from "./components/Currency Converter App/CurrencyConverter";
import QuizCard from "./components/Quiz APP/QuizCard";
import Tictactoe from "./components/Tic TAc Toe App/Tictactoe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <MainContainer heading="Welcome">
              
                    <h1 className="text-3xl  font-bold pt-16 text-pink-500  ">
                      Select Apps To Display
                    </h1>
                  
                </MainContainer>
              </AppLayout>
            }
          />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/todo-list" element={<ToDolist />} />
          <Route path="/expense-tracker" element={<Balance />} />
          <Route path="/weather" element={<WeatherCard />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/quiz-app" element={<QuizCard />} />
          <Route path="//tic-tac-toe" element={<Tictactoe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
