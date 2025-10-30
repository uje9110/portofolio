"use client";

import p5 from "p5";
import React, { useRef, useEffect } from "react";

type Sketch = (p: p5, width: number, height: number) => void;

type Props = {
  sketch: Sketch;
};

export default function P5SketchWrapper({ sketch }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null); // ✅ persistent ref

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const p5Module = await import("p5");
      const P5 = p5Module.default;

      if (isMounted && wrapperRef.current) {
        const { clientWidth, clientHeight } = wrapperRef.current;

        const wrappedSketch = (p: p5) => {
          sketch(p, clientWidth, clientHeight);

          p.windowResized = () => {
            if (wrapperRef.current) {
              const { clientWidth, clientHeight } = wrapperRef.current;
              p.resizeCanvas(clientWidth, clientHeight);
            }
          };
        };

        p5InstanceRef.current = new P5(wrappedSketch, wrapperRef.current); // ✅ store instance
      }
    })();

    return () => {
      isMounted = false;

      // ✅ properly kill p5 instance on unmount
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [sketch]);

  return <div ref={wrapperRef} className="w-full h-full" />;
}
