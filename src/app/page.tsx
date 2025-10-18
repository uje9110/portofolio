import P5SketchWrapper from "@/lib/components/P5SketchWrapper";
import StarSketch from "@/lib/sketches/star/star-sketch";
import React from "react";

const page = () => {
  return (
    <main className="flex items-center justify-center h-full">
      <div className=" border-white w-4/5 h-[90%] flex flex-col gap-4">
        <div className="flex justify-between gap-4  ">
          <div className="h-20 flex-1 bg-dark-navy">
            {/* <P5SketchWrapper sketch={StarSketch} /> */}
          </div>
          <div className="h-20 w-32 border border-dark-navy bg-light-orange"></div>
        </div>
        <div className=" h-12 flex gap-4 items-center justify-between ">
          <div className="accent-white border border-dark-navy flex items-center justify-center h-full flex-1">
            Home
          </div>
          <div className="accent-white border border-dark-navy flex items-center justify-center h-full flex-1">
            Home
          </div>
          <div className="accent-white border border-dark-navy flex items-center justify-center h-full flex-1">
            Home
          </div>
          <div className="accent-white border border-dark-navy flex items-center justify-center h-full flex-1">
            Home
          </div>
        </div>
        <div className="bg-dark-navy flex-1 "></div>
      </div>
    </main>
  );
};

export default page;
