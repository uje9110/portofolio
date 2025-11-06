import React, { useRef } from "react";
import ButtonOneGroups from "../Buttons/ButtonOneGroups";

const About = () => {
  const SVGButtonsRef = useRef<(SVGSVGElement | null)[]>([]);

  return (
    <main className="p-4 text-white h-full flex-1 flex gap-6">
      <div className="flex flex-col w-fit justify-between items-start h-full">
        {/* Left */}
        <ButtonOneGroups SVGButtonsRef={SVGButtonsRef}  titles={["Me", "Skills", "Gear", "Work"]} />
        <div className="h-fit w-fit flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="w-5/6 bg-white h-6"></div>
            <div className="w-1/3 bg-white h-6"></div>
            <div className="w-1/4 bg-white h-6"></div>
          </div>
          <div className="border border-white h-32 w-64"></div>
        </div>
      </div>
      <div className="border border-white flex-1"></div>
    </main>
  );
};

export default About;
