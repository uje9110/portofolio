import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between gap-4  ">
      <div className="h-12 flex-1 ">
        <div className=" h-full flex gap-4 items-center justify-between ">
          <div className="accent-white border border-dark-navy bg-white text-dark-navy flex items-center justify-center h-full flex-1 transition-all duration-300 ease-in-out hover:rounded-4xl hover:bg-light-orange hover:text-dark-navy">
            Home
          </div>

          <div className="accent-white border border-dark-navy bg-white text-dark-navy flex items-center justify-center h-full flex-1 transition-all duration-300 ease-in-out hover:rounded-4xl hover:bg-light-orange hover:text-dark-navy">
            Home
          </div>

          <div className="accent-white border border-dark-navy bg-white text-dark-navy flex items-center justify-center h-full flex-1 transition-all duration-300 ease-in-out hover:rounded-4xl hover:bg-light-orange hover:text-dark-navy">
            Home
          </div>

          <div className="accent-white border border-dark-navy bg-white text-dark-navy flex items-center justify-center h-full flex-1 transition-all duration-300 ease-in-out hover:rounded-4xl hover:bg-light-orange hover:text-dark-navy">
            Home
          </div>
        </div>
      </div>
      <div className="h-12 w-12 border border-dark-navy bg-light-orange"></div>
    </div>
  );
};

export default Navbar;
