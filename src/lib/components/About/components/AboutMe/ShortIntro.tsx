import { spaceGrotesk } from "@/app/layout";
import GridBlock from "@/lib/components/SVG/GridBlock";
import { animate } from "animejs";
import React, { useEffect, useRef } from "react";

const ShortIntro = () => {
  const textContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textContainer.current) return;

    const el = textContainer.current;
    const fullHeight = el.scrollHeight;

    animate(textContainer.current, {
      height: [`0px`, `${fullHeight}px`],
      opacity: [0, 1],
      duration: 400,
      delay: 1000,
    });
  }, []);

  return (
    <div className="w-1/3 flex flex-col gap-2">
      <GridBlock />
      <div
        ref={textContainer}
        className="border border-white w-full rounded-md p-2 overflow-hidden"
      >
        <p className={`text-sm ${spaceGrotesk.className}`}>
          I specialize in building modern web apps with React, TypeScript, and
          Node.js. I love working across the stack — from pixel-perfect UIs to
          robust backend systems
        </p>
      </div>
    </div>
  );
};

export default ShortIntro;
