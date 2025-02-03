import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

// Interface for App Layout props
interface AppLayoutProps {
  children?: React.ReactNode;
}

// Example roles for testing
const userRole = "admin"; // Simulate user role (could be dynamic)

// Define routes as objects with paths, labels, and roles
const routes: Record<string, { path: string; label: string; role?: string }> = {
  "Password Generator App": {
    path: "/password-generator",
    label: "Password Generator App",
  },
  "ToDo List App": {
    path: "/todo-list",
    label: "ToDo List App",
  },
  "Expense Tracker App": {
    path: "/expense-tracker",
    label: "Expense tracker App",
  },
  "Weather App": {
    path: "/weather",
    label: "Weather App",
  },
  "Currency Converter App": {
    path: "/currency-converter",
    label: "Currency Converter  App",
  },
  "Quiz App": {
    path: "/quiz-app",
    label: "Quiz App",
  },
  "Tic Tac Toe App": {
    path: "/tic-tac-toe",
    label: "Tic Tac Toe App",
  },
  // Add more routes with roles (if needed)
};

const AppBar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => (
  <header className="fixed top-0 left-0 w-full h-16 bg-purple-800 text-white flex items-center px-4 shadow-lg z-10">
    {/* Left Icon */}
    <button
      className="text-white p-2"
      aria-label="Open drawer"
      onClick={onMenuClick}
    >
      <CiMenuBurger size="30px" />
    </button>

    {/* Center Heading */}
    <h1 className="text-2xl font-semibold text-center flex-grow">
      Mini Apps Project
    </h1>
  </header>
);

const Drawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);

    if (window.innerWidth < 768) onClose();
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 shadow-lg transition-transform duration-300 z-20 ${
        isOpen ? "md:translate-x-0" : "-translate-x-full"
      } w-50vw`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 h-16 bg-purple-800 border border-white text-blue-50">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          className="text-gray-600 p-2"
          aria-label="Close drawer"
          onClick={onClose}
        >
          <AiOutlineClose size="24px" color="red" />
        </button>
      </div>

      {/* Drawer Content */}
      <ul className="divide-y divide-gray-600 h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-300">
        {Object.keys(routes).reverse().map((key, index) => {
          const { path, label, role } = routes[key];

          // Role-based filtering (only show items accessible by the user's role)
          if (role && role !== userRole) {
            return null;
          }

          return (
            <li
              key={index}
              className={`p-4 hover:bg-fuchsia-700 hover:text-white cursor-pointer text-gray-700 text-lg font-semibold ${
                location.pathname === path ? "bg-purple-700 text-white" : ""
              }`}
              onClick={() => handleNavigation(path)}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

const Main: React.FC<AppLayoutProps> = ({ children }) => (
  <main className="flex-grow mt-16  min-h-screen bg-gray-50">{children}</main>
);

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 // Handle the responsive behavior of the sidebar
 useEffect(() => {
   const handleResize = () => {
     if (window.innerWidth < 768) {
       setIsDrawerOpen(false); // Close the sidebar on mobile
     } if (window.innerWidth >= 768) {
       setIsDrawerOpen(true); // Open the sidebar on large screens
     }
   };

   // Set initial state on load
   handleResize();

   // Add resize event listener
   window.addEventListener("resize", handleResize);

   // Clean up event listener on component unmount
   return () => {
     window.removeEventListener("resize", handleResize);
   };
 }, []);

  return (
    <div className="flex min-h-screen">
      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* AppBar */}
        <AppBar onMenuClick={() => setIsDrawerOpen(true)} />

        {/* Main Content */}
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default AppLayout;
