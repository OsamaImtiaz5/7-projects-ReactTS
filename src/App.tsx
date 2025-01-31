import { BrowserRouter, Route, Routes } from "react-router-dom";
import Balance from "./components/Expenses/Balance";
import MainContainer from "./components/MainContainer";
import PasswordGenerator from "./components/Password Generator/PasswordGenerator";
import AppLayout from "./components/PersistentDrawer";
import ToDolist from "./components/ToDO List/ToDolist";
import WeatherCard from "./components/Weather/WeatherCard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
            <MainContainer heading="Welcome">
            <div className="h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 text-center">
            <h1 className="text-3xl  font-bold pt-16 text-pink-500  ">Select Apps To Display</h1>
            </div>
          </MainContainer>
          </AppLayout>
          } />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/todo-list" element={<ToDolist />} />
            <Route path='/expense-tracker' element={<Balance/>}/>
            <Route path='/weather' element={<WeatherCard/>}/>
            {/* Add other routes here */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
