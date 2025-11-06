import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import useButtonOneGroup from "./useButtonOneGroup";

const SCALE = 1.2;

type ButtonOneGroupsProps = {
  titles: string[];
  SVGButtonsRef: RefObject<(SVGSVGElement | null)[]>;
};

const ButtonOneGroups: FC<ButtonOneGroupsProps> = ({
  titles,
  SVGButtonsRef,
}) => {
  const { activeButton, setActiveButton, scaleSVG, resetSVG, scaleSVGText } =
    useButtonOneGroup({SVGButtonsRef});

  useEffect(() => {
    titles.forEach((id) => resetSVG(id));
    if (activeButton) scaleSVG(activeButton, SCALE);
  }, [activeButton]);

  return (
    <div className="flex flex-col gap-2">
      {titles.map((t, index) => {
        return (
          <svg
            ref={(el) => {
              if (SVGButtonsRef.current) {
                SVGButtonsRef.current[index] = el;
              }
            }}
            key={t}
            id={t}
            className="transition-all duration-150 origin-top-left cursor-pointer group hover:scale-200"
            width="133"
            height="36"
            viewBox="0 0 133 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setActiveButton(t);
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
  );
};

export default ButtonOneGroups;
