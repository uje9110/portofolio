  import p5 from "p5";
  import { Rect } from "./RectTunnel";
  import { RefObject } from "react";
  const bk_lines = [
    "I'm an avid, self-learning",
    "Fullstack Web Developer",
    "who thrives on discovering new things",
    "and immediately applying",
    "that knowledge to my work.",
  ];
  const lines = ["Fullstack Web Developer"];

export const rectTunnelSketch = (
  p: p5,
  w: number,
  h: number,
  scrollRef?: RefObject<number>,
  zoomRef?: RefObject<number>
) => {
  const rects: Rect[] = [];
  const rectAmount = 10;

  let customFont: p5.Font;
  let zoom = 1;
  let targetZoom = 1;
  const zoomSensitivity = 0.001;

  let minZoom = 1;
  let maxZoom = 1;

  p.setup = async () => {
    customFont = await p.loadFont("/fonts/Space_Grotesk.ttf");
    p.colorMode(p.HSB, 360, 100, 100, 255);
    p.createCanvas(w, h);
    p.rectMode(p.CENTER);

    for (let r = 0; r < rectAmount; r++) {
      const opacity = 15 * (1 - r / rectAmount);
      const t = r / 7;
      const rw = p.lerp(w * 0.25, w * 1, t);
      const rh = p.lerp(h * 0.25, h * 1, t);
      rects.push(new Rect(p, rw, rh, opacity));
    }

    const innerRectWidth = rects[0].w;
    const outerRectWidth = rects[rects.length - 1].w;

    minZoom = 1;
    maxZoom = outerRectWidth / innerRectWidth;

    // 🔥 If zoomRef has a value, use it as initial zoom
    if (zoomRef?.current) {
      zoom = zoomRef.current;
      targetZoom = zoomRef.current;
    } else {
      zoom = minZoom;
      targetZoom = minZoom;
    }
  };

  p.mouseWheel = () => {
    if (!scrollRef?.current) return;
    targetZoom -= scrollRef.current * zoomSensitivity;
    targetZoom = p.constrain(targetZoom, minZoom, maxZoom);
  };

  p.draw = () => {
    p.background(10, 20, 40);

    // Smooth zoom animation
    zoom = p.lerp(zoom, targetZoom, 0.1);

    // 🔥 Save the *updated* zoom value for outside use
    if (zoomRef) zoomRef.current = zoom;

    const linesBetween = 6;
    const movementScale = p.map(zoom, minZoom, maxZoom, 1, 0.1, true);

    for (let i = 0; i < rects.length - 1; i++) {
      const r = rects[i];
      const nextR = rects[i + 1];
      const factor = 1 - i / (rects.length - 1);

      r.drawRect(p, factor, movementScale, zoom);
      r.drawLines(
        p,
        i,
        rects.length,
        movementScale,
        zoom,
        linesBetween,
        nextR
      );
    }
  };
};

