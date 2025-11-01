import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { animate, svg as svgHelpers, utils } from "animejs";
import ButtonOneGroups from "../Buttons/ButtonOneGroups";

const About = () => {
  const lineRef = useRef<SVGSVGElement | null>(null);

  const [startingPos, setStartingPos] = useState<Record<string, number>>({
    x: 0,
    y: 0,
  });

  const [targetPos, setTargetPos] = useState<Record<string, number>>({
    top: 0,
    left: 0,
  });

  const getContentContainerRect = () => {
    const el = document.getElementById("about-content-container");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTargetPos({ top: rect.top, left: rect.left });
  };

  useLayoutEffect(() => {
    getContentContainerRect();
    window.addEventListener("resize", getContentContainerRect);
    return () => window.removeEventListener("resize", getContentContainerRect);
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const [drawable] = svgHelpers.createDrawable(line);
    // Optionally: cancel prior animations targeting this drawable
    utils.remove(drawable);

    animate(drawable, {
      draw: ["0 0", "0 1"], // start clear → full
      duration: 1200,
      ease: "inOutQuad",
    });
  }, [startingPos, targetPos]);

  return (
    <>
      {/* SVG Layer */}
      <svg
        ref={lineRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        <line
          id="about-connector-line"
          x1={startingPos.x}
          y1={startingPos.y}
          x2={targetPos.left}
          y2={targetPos.top}
          stroke="white"
          strokeWidth="1"
        />
      </svg>

      <main className="p-4 text-white h-full flex-1 flex gap-6">
        <div className="flex flex-col w-fit justify-between items-start h-full">
          <ButtonOneGroups
            setStartingPos={setStartingPos}
            titles={["Me", "Skills", "Gear", "Work"]}
          />

          <div className="h-fit w-fit flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-5/6 bg-white h-6"></div>
              <div className="w-1/3 bg-white h-6"></div>
              <div className="w-1/4 bg-white h-6"></div>
            </div>
            <div className="border border-white h-32 w-64"></div>
          </div>
        </div>

        <div
          id="about-content-container"
          className="border border-white flex-1"
        ></div>
      </main>
    </>
  );
};

export default About;
