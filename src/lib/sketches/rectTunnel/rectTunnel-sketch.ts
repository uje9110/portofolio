import p5 from "p5";
import { Rect } from "./RectTunnel";
import { RefObject } from "react";

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
    p.createCanvas(w, h, p.WEBGL);
    p.rectMode(p.CENTER);

    // Build layered rectangles
    for (let r = 0; r < rectAmount; r++) {
      const z = p.map(r, 0, rectAmount - 1, rectAmount - 1, 0);
      const t = r / 7;
      const rw = p.lerp(w * 0.25, w * 1, t);
      const rh = p.lerp(h * 0.25, h * 1, t);
      rects.push(new Rect(p, rw, rh, z));
    }

    const innerRectWidth = rects[0].w;
    const outerRectWidth = rects[rects.length - 1].w;

    minZoom = 1;
    maxZoom = outerRectWidth / innerRectWidth;

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

    zoom = p.lerp(zoom, targetZoom, 0.1);
    if (zoomRef) zoomRef.current = zoom;

    const linesBetween = 6;
    const movementScale = p.map(zoom, minZoom, maxZoom, 1, 0.1, true);

    for (let i = 0; i < rects.length - 1; i++) {
      const r = rects[i];
      const nextR = rects[i + 1];
      const t = i / (rects.length - 1);

      let color = p.color(255, p.lerp(0, 40, t));

      r.drawRect(p, movementScale, zoom, color);
      r.drawLines(p, movementScale, zoom, linesBetween, nextR);
    }
  };
};
