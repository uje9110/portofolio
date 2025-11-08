import { RefObject, useRef, useState } from "react";

type useButtonOneGroupProps = {
  SVGButtonsRef: RefObject<(SVGSVGElement | null)[]>;
};

const useButtonOneGroup = ({ SVGButtonsRef }: useButtonOneGroupProps) => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [activeButtonRect, setActiveButtonRect] = useState<DOMRect | null>(
    null
  );

  // Original Data
  const originalData = useRef<
    Record<string, { viewBox: string; width: string; height: string }>
  >({});

  const recordOriginal = (id: string, svg: SVGSVGElement) => {
    if (originalData.current[id]) return;

    originalData.current[id] = {
      viewBox: svg.getAttribute("viewBox")!,
      width: svg.getAttribute("width")!,
      height: svg.getAttribute("height")!,
    };
  };

  // Assign active button rect
  const assignActiveButtonRect = (SVG: SVGSVGElement) => {
    setTimeout(() => {
      setActiveButtonRect(SVG.getBoundingClientRect());
    }, 150);
  };

  // Scale Button
  const scaleSVGHeightAndWidth = (SVG: SVGSVGElement, scale: number) => {
    const svgHeight = SVG.getAttribute("height");
    const svgWidth = SVG.getAttribute("width");

    const multipliedHeight = String(Number(svgHeight) * scale);
    const multipliedWidth = String(Number(svgWidth) * scale);

    SVG.setAttribute("height", multipliedHeight);
    SVG.setAttribute("width", multipliedWidth);
  };

  const scaleSVGText = (original: number, scale: number) => {
    return original * scale;
  };

  const scaleSVG = (id: string, scale: number) => {
    const SVG = SVGButtonsRef.current.find((b) => b?.id === id);
    if (!SVG) return;
    
    recordOriginal(id, SVG);
    scaleSVGHeightAndWidth(SVG, scale);
    assignActiveButtonRect(SVG);
  };

  // Modified resetSVG
  const resetSVG = (id: string) => {
    const data = originalData.current[id];
    const svg = SVGButtonsRef.current?.find((b) => b?.id === id);

    if (!svg || !data) return;

    svg.setAttribute("viewBox", data.viewBox);
    svg.setAttribute("width", data.width);
    svg.setAttribute("height", data.height);
  };

  return {
    activeButton,
    setActiveButton,
    scaleSVG,
    resetSVG,
    scaleSVGText,
    activeButtonRect,
  };
};

export default useButtonOneGroup;
