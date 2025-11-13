import { animate } from "animejs";
import React, { useEffect, useRef } from "react";

const pathsD = [
  "M105.558 0.775757C105.179 0.286435 104.596 0 103.977 0H2C0.895433 0 0 0.895431 0 2V29C0 30.1045 0.895431 31 2 31H124.877C126.539 31 127.476 29.0901 126.459 27.7757L105.558 0.775757Z",
  "M136.445 31C135.823 31 135.236 30.7106 134.858 30.217L114.153 3.21705C113.144 1.9014 114.082 0 115.74 0H124.155C124.777 0 125.364 0.28938 125.742 0.782948L146.447 27.7829C147.456 29.0986 146.518 31 144.86 31L136.445 31Z",
  "M155.732 31C155.11 31 154.523 30.7106 154.145 30.217L133.44 3.21705C132.431 1.9014 133.369 0 135.027 0H143.442C144.064 0 144.651 0.289379 145.029 0.782948L165.735 27.7829C166.743 29.0986 165.805 31 164.147 31L155.732 31Z",
  "M174.795 31C174.173 31 173.586 30.7106 173.208 30.217L152.503 3.21705C151.494 1.9014 152.432 0 154.09 0H162.505C163.127 0 163.714 0.28938 164.092 0.782949L184.797 27.7829C185.806 29.0986 184.868 31 183.21 31L174.795 31Z",
  "M194.531 31C193.909 31 193.322 30.7106 192.943 30.217L172.238 3.2171C171.229 1.90144 172.168 4.45197e-05 173.825 4.45197e-05H182.241C182.863 4.45197e-05 183.449 0.289424 183.828 0.782993L204.533 27.7829C205.542 29.0986 204.604 31 202.946 31L194.531 31Z",
  "M192.3 3.1855C191.328 1.86484 192.271 0 193.911 0H205C206.105 0 207 0.89543 207 2V17.0672C207 18.9984 204.534 19.8081 203.389 18.2527L192.3 3.1855Z",
];

const circleGroups = [
  {
    outer: { cx: 100.8, cy: 7.2, r: 4.2, fill: "#0A0F1C" },
    inner: { cx: 100.8, cy: 7.19993, r: 1.4, fill: "white" },
    stroke: { cx: 100.8, cy: 7.1999, r: 2.3, stroke: "#FF8B21" },
  },
  {
    outer: { cx: 91, cy: 7.2, r: 4.2, fill: "#0A0F1C" },
    inner: { cx: 90.9999, cy: 7.19993, r: 1.4, fill: "white" },
    stroke: { cx: 91, cy: 7.1999, r: 2.3, stroke: "#FF8B21" },
  },
  {
    outer: { cx: 81.2, cy: 7.2, r: 4.2, fill: "#0A0F1C" },
    inner: { cx: 81.2001, cy: 7.19993, r: 1.4, fill: "white" },
    stroke: { cx: 81.1999, cy: 7.1999, r: 2.3, stroke: "#FF8B21" },
  },
];

const GridBlock = () => {
  const SVGRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const circleRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (!pathRefs.current.length) return;

    animate(pathRefs.current, {
      y: [-50, 0],
      duration: 400,
      delay: (_, i) => i * 50,
    });
  }, []);

  useEffect(() => {
    if (!circleRefs.current.length) return;

    animate(circleRefs.current, {
      opacity: [0, 1],
      duration: 400,
      delay: (_, i) => 400 + i * 100,
    });
  }, []);

  return (
    <svg
      className="w-full h-auto"
      ref={SVGRef}
      viewBox="0 0 207 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pathsD.map((path, index) => {
        return (
          <path
            key={`d-${index}`}
            d={path}
            fill="white"
            ref={(el) => {
              if (pathRefs.current) {
                pathRefs.current[index] = el;
              }
            }}
          />
        );
      })}
      {circleGroups.map(({ outer, inner, stroke }, i) => (
        <g
          key={i}
          ref={(el) => {
            if (circleRefs.current) {
              circleRefs.current[i] = el;
            }
          }}
        >
          <circle {...outer} />
          <circle {...inner} />
          <circle {...stroke} />
        </g>
      ))}
    </svg>
  );
};

export default GridBlock;
