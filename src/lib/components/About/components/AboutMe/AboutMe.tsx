import React from "react";
import ContainerHeaderOne from "./ShortIntro";
import { spaceGrotesk } from "@/app/layout";
import ShortIntro from "./ShortIntro";
import GridBar from "@/lib/components/SVG/GridBar";

export const AboutMe = () => {
  return (
    <div className="w-full flex gap-2 z-40">
      <div className="w-fit flex flex-col ">
        <ShortIntro />
        <GridBar />
      </div>
    </div>
  );
};
