"use client";
import Navbar from "@/lib/components/Navbar/Navbar";
import P5SketchWrapper from "@/lib/components/P5SketchWrapper";
import { rectTunnelSketch } from "@/lib/sketches/rectTunnel/rectTunnel-sketch";
import React from "react";

const page = () => {

  return (
    <main className="flex items-center justify-center h-full">
      <div className=" border-white w-4/5 h-[90%] flex flex-col gap-4">
        <Navbar />
        <div className="bg-dark-navy flex-1 ">
          <P5SketchWrapper sketch={rectTunnelSketch} />
        </div>
      </div>
    </main>
  );
};

export default page;
