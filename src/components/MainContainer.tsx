import React from "react";
interface MainContainerProps {
  children: React.ReactNode;
  heading: string;
}
const MainContainer = ({ children, heading }: MainContainerProps) => {
  return (
    <div className="h-[100%] bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 text-center ">
      <h1 className="text-3xl  font-bold pt-16 text-blue-500  ">{heading}</h1>
      {children}
    </div>
  );
};

export default MainContainer;
