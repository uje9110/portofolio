"use client";
import P5SketchWrapper from "@/lib/components/P5SketchWrapper";
import { rectTunnelSketch } from "@/lib/sketches/rectTunnel/rectTunnel-sketch";
import { animate } from "animejs";
import React, { useEffect, useRef, useState } from "react";

const THRESHOLD = 3800;

const Page = () => {
  const MainWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<number>(0);
  const scrollAccum = useRef<number>(0);
  const zoomRef = useRef<number>(1);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [section, setSection] = useState(0);

  useEffect(() => {
    if (!MainWrapperRef.current) return;
    let currentWidth = 95;
    let currentHeight = 91;

    const handleWheel = (e: WheelEvent) => {
      if (!MainWrapperRef.current) return;

      scrollRef.current = e.deltaY;

      // accumulate scroll
      scrollAccum.current += e.deltaY;

      // scrolling down enough → next section
      if (scrollAccum.current > THRESHOLD) {
        setSection((prev) => Math.max(0, prev - 1));
        scrollAccum.current = 0;
      }

      // scrolling up enough → previous section
      if (scrollAccum.current < -THRESHOLD) {
        setSection((prev) => prev + 1);
        scrollAccum.current = 0;
      }

      // zoom effect
      const zoomChange = e.deltaY * -0.01;

      currentWidth += zoomChange;
      currentHeight += zoomChange;

      currentWidth = Math.min(100, Math.max(95, currentWidth));
      currentHeight = Math.min(100, Math.max(91, currentHeight));

      animate(MainWrapperRef.current, {
        width: `${currentWidth}%`,
        height: `${currentHeight}%`,
        backgroundColor: "#4D5564",
        duration: 200,
        easing: "easeOutQuad",
      });
    };

    const handleMouse = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      mousePosRef.current.x = mouseX;
      mousePosRef.current.y = mouseY;
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main className="flex items-center justify-center h-full w-full">
      <div
        ref={MainWrapperRef}
        className="overflow-hidden rounded-lg"
        style={{ width: "95%", height: "91%", backgroundColor: "#121C2E" }}
      >
        {/* SECTION 0 */}
        {section === 0 && (
          <div className="w-full h-full">
            <P5SketchWrapper
              scrollRef={scrollRef}
              zoomRef={zoomRef}
              sketch={rectTunnelSketch}
              containerRef={MainWrapperRef}
              mousePosRef={mousePosRef}
            />
          </div>
        )}

        {/* SECTION 1 */}
        {section === 1 && (
          <div className="w-full h-screen bg-[#4D5564] text-white flex items-center justify-center text-4xl">
            Second Section (scroll more…)
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
