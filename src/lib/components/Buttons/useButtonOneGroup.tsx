import { useRef, useState } from "react";

const useButtonOneGroup = () => {
  const [activeButton, setActiveButton] = useState<string>("");

  const originalData = useRef<
    Record<
      string,
      { viewBox: string; width: string; height: string; paths: string[] }
    >
  >({});

  const recordOriginal = (id: string, svg: SVGSVGElement) => {
    if (originalData.current[id]) return; // already stored

    const paths = Array.from(svg.querySelectorAll("path")).map(
      (p) => p.getAttribute("d") || ""
    );

    originalData.current[id] = {
      viewBox: svg.getAttribute("viewBox")!,
      width: svg.getAttribute("width")!,
      height: svg.getAttribute("height")!,
      paths,
    };
  };

  const scaleSVGViewBox = (SVG: SVGSVGElement, scale: number) => {
    const viewBox = SVG.getAttribute("viewBox");

    const multipliedViewbox = viewBox
      ?.split(" ")
      .map((val, index) => {
        if (index < 2) {
          return val;
        }
        return Number(val) * scale;
      })
      .join(" ");

    SVG.setAttribute("viewBox", multipliedViewbox as string);
  };

  const scaleSVGHeightAndWidth = (SVG: SVGSVGElement, scale: number) => {
    const svgHeight = SVG.getAttribute("height");
    const svgWidth = SVG.getAttribute("width");

    const multipliedHeight = String(Number(svgHeight) * scale);
    const multipliedWidth = String(Number(svgWidth) * scale);

    SVG.setAttribute("height", multipliedHeight);
    SVG.setAttribute("width", multipliedWidth);
  };

  const scalePathDValues = (stringVal: string, scale: number) => {
    return stringVal.replace(/-?\d+\.?\d*/g, (number) => {
      return (parseFloat(number) * scale).toString();
    });
  };

  const scaleSVGPathD = (SVG: SVGSVGElement, scale: number) => {
    const paths = SVG.querySelectorAll("path");

    paths.forEach((p) => {
      const pathD = p.getAttribute("d");
      const multipliedPathD = scalePathDValues(pathD as string, scale);
      p.setAttribute("d", multipliedPathD as string);
    });
  };

  const scaleSVGText = (original : number, scale : number) => {
    return original * scale
  } 

  const scaleSVG = (id: string, scale: number) => {
    const SVG = document.getElementById(id);

    if (!(SVG instanceof SVGSVGElement)) {
      console.warn("Element is not an SVGSVGElement:", SVG);
      return;
    }

    recordOriginal(id, SVG);
    scaleSVGViewBox(SVG, scale);
    scaleSVGHeightAndWidth(SVG, scale);
    scaleSVGPathD(SVG, scale);
  };

  const resetSVG = (id: string) => {
    const data = originalData.current[id];
    const svg = document.getElementById(id) as SVGSVGElement | null;
    if (!svg || !data) return;

    svg.setAttribute("viewBox", data.viewBox);
    svg.setAttribute("width", data.width);
    svg.setAttribute("height", data.height);

    const paths = svg.querySelectorAll("path");
    paths.forEach((p, i) => p.setAttribute("d", data.paths[i]));
  };

  return { activeButton, setActiveButton, scaleSVG, resetSVG, scaleSVGText };
};

export default useButtonOneGroup;
