import React, {
  FC,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useButtonOneGroup from "./useButtonOneGroup";
import { animate, svg, utils } from "animejs";
import { useGlobalContext } from "@/lib/context/global";

const SCALE = 1.2;
const TITLES = ["Me", "Skills", "Gear", "Work"];

type ButtonOneGroupsProps = {
  aboutRightContainerRect: DOMRect | null;
};

const ButtonOneGroups: FC<ButtonOneGroupsProps> = ({
  aboutRightContainerRect,
}) => {
  const { setAboutNavigation } = useGlobalContext();
  const SVGButtonsRef = useRef<(SVGSVGElement | null)[]>([]);
  const ConnectingLineRef = useRef<SVGPolylineElement | null>(null);

  const {
    activeButton,
    setActiveButton,
    scaleSVG,
    resetSVG,
    scaleSVGText,
    activeButtonRect,
  } = useButtonOneGroup({ SVGButtonsRef });

  const buttonAndContainerMidpoint = useMemo(() => {
    if (!aboutRightContainerRect || !activeButtonRect) return;
    return (aboutRightContainerRect.left + activeButtonRect.right) / 2;
  }, [aboutRightContainerRect, activeButtonRect]);

  // Button activation
  useEffect(() => {
    TITLES.forEach((id) => resetSVG(id));
    if (activeButton) {
      scaleSVG(activeButton, SCALE);
    }
  }, [activeButton]);

  // Polyline animation
  useEffect(() => {
    const polyline = ConnectingLineRef.current;
    if (!polyline) return;

    const [drawable] = svg.createDrawable(polyline);
    utils.remove(drawable);

    animate(drawable, {
      delay: 150,
      draw: ["0 0", "0 1"],
      duration: 500,
      ease: "inOutQuad",
    });
  }, [activeButton]);

  return (
    <>
      <svg className="fixed top-0 left-0 z-10 w-full h-full">
        <polyline
          ref={ConnectingLineRef}
          points={
            activeButtonRect &&
            buttonAndContainerMidpoint &&
            aboutRightContainerRect
              ? `${activeButtonRect?.right},${activeButtonRect?.top} ${buttonAndContainerMidpoint},${activeButtonRect?.top} ${buttonAndContainerMidpoint},${aboutRightContainerRect?.top} ${aboutRightContainerRect?.left},${aboutRightContainerRect?.top}`
              : ""
          }
          fill="none"
          stroke="white"
        />
      </svg>
      <div className="flex flex-col gap-2 z-20">
        {TITLES.map((t, index) => {
          return (
            <svg
              ref={(el) => {
                if (SVGButtonsRef.current) {
                  SVGButtonsRef.current[index] = el;
                }
              }}
              key={t}
              id={t}
              className="transition-all duration-150 origin-top-left cursor-pointer group "
              width="133"
              height="36"
              viewBox="0 0 133 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setActiveButton(t);
                setAboutNavigation(t);
              }}
            >
              <path
                className={`group-hover:fill-light-orange group-hover:stroke-1 group-hover:stroke-white transition-colors duration-300  ${
                  activeButton === t ? "fill-light-orange" : "fill-white"
                }`}
                d="M117.012 20.5649L128.122 0.235474H0V34.7482H90.2945L98.0458 20.5649H117.012Z"
              />
              <path
                className={`${
                  activeButton === t ? "fill-white" : "fill-light-orange"
                }`}
                d="M100.088 24.5835H118.999L112.994 34.9845H94.0825L100.088 24.5835Z"
              />
              <path
                id="button-line-element"
                d="M132 0.235474L118.999 24.5835M118.999 24.5835H100.088L94.0825 34.9845H112.994L118.999 24.5835Z"
                stroke="white"
              />
              <text
                x="30%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={activeButton === t ? scaleSVGText(14, 1.2) : 14}
                fill="black"
              >
                {t}
              </text>
            </svg>
          );
        })}
      </div>
    </>
  );
};

export default ButtonOneGroups;
