import React, { useState } from "react";
import { RiTodoFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex justify-between p-4 bg-indigo-500 text-white items-center">
        <div className="logo flex items-center">
          <span className="font-bold text-xl flex items-center mx-4 lg:mx-9">
            TaskEase
            <RiTodoFill className="ml-1 mt-1" />
          </span>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row gap-4 lg:gap-8 mx-4 lg:mx-9 lg:items-center`}
        >
          <li className="cursor-pointer hover:font-bold transition-all">
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
