import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonOneGroups from "../Buttons/ButtonOneGroups";
import { animate, svg, utils } from "animejs";
import { useGlobalContext } from "@/lib/context/global";
import { AboutMe } from "./components/AboutMe/AboutMe";

const getAboutContainerPolyline = (aboutRightContainerRect: DOMRect) => {
  return [
    {
      point: `0,0 ${aboutRightContainerRect.width - 1},0 ${
        aboutRightContainerRect.width - 1
      },${aboutRightContainerRect.height - 1}`,
    },
    {
      point: `0,0 0,${aboutRightContainerRect.height - 1} ${
        aboutRightContainerRect.width - 1
      },${aboutRightContainerRect.height - 1}`,
    },
  ];
};

const About = () => {
  const { aboutNavigation } = useGlobalContext();
  const AboutRightContainerRef = useRef<HTMLDivElement | null>(null);
  const ContainerPolyline = useRef<(SVGPolylineElement | null)[]>([]);

  const [aboutRightContainerRect, setAboutRightContainerRect] =
    useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (AboutRightContainerRef.current) {
      setAboutRightContainerRect(
        AboutRightContainerRef.current.getBoundingClientRect()
      );
    }
  }, []);

  useEffect(() => {
    if (!ContainerPolyline.current.length) return;

    ContainerPolyline.current.forEach((line) => {
      if (!line) return;

      const drawable = svg.createDrawable(line);
      utils.remove(drawable);

      animate(drawable, {
        draw: ["0 0", "0 1"],
        duration: 500,
        easing: "inOutQuad",
        delay: 150,
      });
    });
  }, [aboutRightContainerRect]);

  return (
    <main className="p-4 text-white relative h-full flex-1 flex gap-6">
      {/* Left */}
      <div className="flex flex-col w-1/6 justify-between items-start h-full z-20">
        <ButtonOneGroups aboutRightContainerRect={aboutRightContainerRect} />
      </div>

      {/* Right */}
      <div ref={AboutRightContainerRef} className="flex-1 z-30 relative p-4">
        {aboutRightContainerRect && (
          <svg className="w-full h-full z-10 absolute top-0 left-0">
            {getAboutContainerPolyline(aboutRightContainerRect).map((p, i) => (
              <polyline
                key={i}
                ref={(el) => {
                  if (ContainerPolyline.current)
                    ContainerPolyline.current[i] = el;
                }}
                fill="none"
                stroke="white"
                strokeWidth={2}
                points={p.point}
              />
            ))}
          </svg>
        )}
        <div>{aboutNavigation === "Me" && <AboutMe />}</div>
      </div>
    </main>
  );
};

export default About;
