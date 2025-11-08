import React from "react";
import ContainerHeaderOne from "./ContainerHeaderOne";
import { spaceGrotesk } from "@/app/layout";

export const AboutMe = () => {
  return (
    <div className="w-full flex gap-2 z-40">
      <div className="w-fit flex flex-col ">
        <div className="w-1/3 flex flex-col gap-2">
          <ContainerHeaderOne scale={1.18} />
          <div className="border border-white w-full rounded-md p-2">
            <p className={`text-sm ${spaceGrotesk.className}`}>
              I specialize in building modern web apps with React, TypeScript,
              and Node.js. I love working across the stack — from pixel-perfect
              UIs to robust backend systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
