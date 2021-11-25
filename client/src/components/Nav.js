import React from "react";

function Nav() {
  return (
    <div className="fixed inset-x-0 top-0 w-screen px-2 h-20 z-50 bg-indigo-100">
      <NavItem />
    </div>
  );
}

const NavItem = () => {
  return (
    <div className="flex items-center h-full text-lg">
      <div className="flex items-center justify-around">
        {/* eslint-disable-next-line*/}
        <a href="#" className="nav-item">
          Recipes
        </a>
        {/* eslint-disable-next-line*/}
        <a href="#" className="nav-item">
          Quick & Easy
        </a>
        {/* eslint-disable-next-line*/}
        <a href="#" className="nav-item">
          Big Dinner
        </a>
        {/* eslint-disable-next-line*/}
        <a href="#" className="nav-item">
          About US
        </a>
      </div>

      <div className="flex justify-center items-center absolute inset-y-0 right-7 max-w-">
        {/* eslint-disable-next-line*/}
        <a href="#" className="nav-item ">
          Create Recipe
        </a>
      </div>
    </div>
  );
};
export default Nav;
