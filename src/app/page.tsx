"use client";
import About from "@/lib/components/About/About";
import Navbar from "@/lib/components/Navbar/Navbar";
import P5SketchWrapper from "@/lib/components/P5SketchWrapper";
import { useGlobalContext } from "@/lib/context/global";
import { rectTunnelSketch } from "@/lib/sketches/rectTunnel/rectTunnel-sketch";
import { animate } from "animejs";
import React, { useEffect, useRef } from "react";

const page = () => {
  const MainWrapperRef = useRef<HTMLDivElement | null>(null);

  const scrollValue = useRef(0); // keep scroll value persistent between renders

  console.log(MainWrapperRef.current);

  useEffect(() => {
    if (!MainWrapperRef.current) return;

    // Start from Tailwind sizes
    let currentWidth = 95;
    let currentHeight = 91;

    const handleWheel = (e: WheelEvent) => {
      if (!MainWrapperRef.current) return;

      // Convert deltaY into a smooth zoom factor
      const zoomChange = e.deltaY * -0.01; // adjust sensitivity

      // Apply zoom
      currentWidth += zoomChange;
      currentHeight += zoomChange;

      // Clamp between Tailwind min and 100%
      currentWidth = Math.min(100, Math.max(95, currentWidth));
      currentHeight = Math.min(100, Math.max(91, currentHeight));

      // Animate with Anime.js v4
      animate(MainWrapperRef.current, {
        width: `${currentWidth}%`,
        height: `${currentHeight}%`,
        duration: 200,
        easing: "easeOutQuad",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main className="flex items-center justify-center h-full w-full">
      <div
        ref={MainWrapperRef}
        className="overflow-hidden rounded-lg "
        style={{
          width: "95%",
          height: "91%",
        }}
      >
        <div ref={MainWrapperRef} className="w-full h-screen overflow-hidden">
          <P5SketchWrapper
            sketch={rectTunnelSketch}
            containerRef={MainWrapperRef}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
