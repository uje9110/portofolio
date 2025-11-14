import p5 from "p5";
import React, { useRef, useEffect, RefObject } from "react";

type Sketch = (
  p: p5,
  width: number,
  height: number,
  scrollRef?: RefObject<number>,
  zoomRef?: RefObject<number>
) => void;

type Props = {
  sketch: Sketch;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  scrollRef?: RefObject<number>;
  zoomRef?: RefObject<number>;
};

export default function P5SketchWrapper({
  sketch,
  containerRef,
  scrollRef,
  zoomRef,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { default: P5 } = await import("p5");
      if (!isMounted || !wrapperRef.current) return;

      const getSize = () => {
        const el = containerRef?.current ?? wrapperRef.current!;
        return {
          width: el.clientWidth,
          height: el.clientHeight,
        };
      };

      const { width, height } = getSize();
      const wrappedSketch = (p: p5) => {
        sketch(p, width, height, scrollRef, zoomRef);
      };

      const instance = new P5(wrappedSketch, wrapperRef.current);
      p5InstanceRef.current = instance;

      // 🧠 Listen for DOM size changes (trigger p5 resize)
      const observer = new ResizeObserver(() => {
        if (p5InstanceRef.current) {
          const { width, height } = getSize();
          p5InstanceRef.current.resizeCanvas(width, height);
        }
      });

      observer.observe(containerRef?.current ?? wrapperRef.current);

      return () => observer.disconnect();
    };

    init();

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [sketch, containerRef]);

  return <div ref={wrapperRef} className="w-full h-full" />;
}
