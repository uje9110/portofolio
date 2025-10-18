"use client";

import p5 from "p5";
import React, { useRef, useEffect } from "react";

type Sketch = (p: p5, width: number, height: number) => void;

type Props = {
  sketch: Sketch;
};

export default function P5SketchWrapper({ sketch }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: p5 | null = null;

    (async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      if (wrapperRef.current) {
        const { clientWidth, clientHeight } = wrapperRef.current;

        const wrappedSketch = (p: p5) => {
          sketch(p, clientWidth, clientHeight);

          // 👇 keep canvas responsive when parent resizes
          p.windowResized = () => {
            if (wrapperRef.current) {
              const { clientWidth, clientHeight } = wrapperRef.current;
              p.resizeCanvas(clientWidth, clientHeight);
            }
          };
        };

        p5Instance = new p5(wrappedSketch, wrapperRef.current);
      }
    })();

    return () => {
      p5Instance?.remove();
    };
  }, [sketch]);

  return <div ref={wrapperRef} className="w-full h-full" />;
}
