import React from "react";
import { RiTodoFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between p-4 bg-indigo-500 text-white ">
        <div className="logo flex items-center">
          <span className="font-bold text-xl flex items-center mx-9">
            TaskEase
            <RiTodoFill className="ml-1 mt-1" />
          </span>
        </div>
        <ul className="flex gap-8 mx-9">
          <li className="cursor-pointer hover:font-bold  transition-all">
            Home
          </li>
          <li className="cursor-pointer hover:font-bold transition-all">
            Your Task
          </li>
          <li className="cursor-pointer hover:font-bold transition-all">
            About
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
