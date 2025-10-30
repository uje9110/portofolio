"use client";
import About from "@/lib/components/About/About";
import Navbar from "@/lib/components/Navbar/Navbar";
import P5SketchWrapper from "@/lib/components/P5SketchWrapper";
import { useGlobalContext } from "@/lib/context/global";
import { rectTunnelSketch } from "@/lib/sketches/rectTunnel/rectTunnel-sketch";
import React from "react";

const page = () => {
  const { navigation } = useGlobalContext();
  return (
    <main className="flex items-center justify-center h-full">
      <div className=" border-white w-4/5 h-[90%] flex flex-col gap-4">
        <Navbar />
        <div className="bg-dark-navy flex-1 h-full">
          {navigation === "home" && (
            <P5SketchWrapper sketch={rectTunnelSketch} />
          )}
          {navigation === "about" && <About />}
          {navigation === "project" && <p className="text-white">TEST</p>}
          {navigation === "contact" && <p className="text-white">TEST</p>}
        </div>
      </div>
    </main>
  );
};

export default page;
