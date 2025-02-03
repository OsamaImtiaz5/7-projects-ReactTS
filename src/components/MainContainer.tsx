import React from "react";
interface MainContainerProps {
  children: React.ReactNode;
  heading: string;
}
const MainContainer = ({ children, heading }: MainContainerProps) => {
  return (
    <div className="h-[100%] bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 text-center flex flex-col justify-center items-center p-2 ">
      <h1 className="text-3xl  font-bold pt-16 text-pink-800  ">{heading}</h1>
      {children}
    </div>
  );
};

export default MainContainer;
