import { useGlobalContext } from "@/lib/context/global";
import React from "react";

const Navbar = () => {
  const { navigation, setNavigation } = useGlobalContext();
  return (
    <div className="flex justify-between gap-4 z-90">
      <div className="h-12 flex-1 ">
        <div className=" h-full flex gap-4 items-center justify-between ">
          {["home", "about", "project", "contact"].map((v) => {
            return (
              <div
              key={v}
                onClick={() => {
                  setNavigation(v);
                }}
                className={`capitalize accent-white cursor-pointer border border-dark-navy  text-dark-navy flex items-center justify-center h-full flex-1 transition-all duration-300 ease-in-out hover:rounded-4xl hover:bg-light-orange hover:text-dark-navy ${
                  navigation === v ? "bg-light-orange rounded-4xl" : "bg-white"
                }`}
              >
                <p className="text-michroma">

                {v}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-12 w-12 border border-dark-navy bg-light-orange"></div>
    </div>
  );
};

export default Navbar;
