import p5 from "p5";
import { Rect } from "./RectTunnel";
import { RefObject } from "react";

function drawRectFace(
  p: p5,
  rect: Rect,
  movementScale: number,
  zoom: number,
  mousePos: { x: number; y: number },
  fillColor: p5.Color
) {
  const factor = rect.z / 10;

  const offsetX =
    p.map(mousePos.x, 0, p.width, -80, 80) * factor * movementScale;
  const offsetY =
    p.map(mousePos.y, 0, p.height, -80, 80) * factor * movementScale;

  p.push();
  p.scale(zoom);
  p.translate(offsetX, offsetY);

  p.fill(fillColor);
  p.stroke(255, 150);

  p.beginShape();
  for (const c of rect.corners) {
    p.vertex(c.x, c.y, rect.z);
  }
  p.endShape(p.CLOSE);

  p.pop();
}

function drawBatchedLines(
  p: p5,
  rects: Rect[],
  movementScale: number,
  zoom: number,
  mousePos: { x: number; y: number },
  linesBetween: number
) {
  p.push();
  p.scale(zoom);
  p.stroke(255, 150);
  p.noFill();

  p.beginShape(p.LINES);

  for (let i = 0; i < rects.length - 1; i++) {
    const a = rects[i];
    const b = rects[i + 1];

    const factorA = a.z / 10;
    const factorB = b.z / 10;

    const offsetAX =
      p.map(mousePos.x, 0, p.width, -80, 80) * factorA * movementScale;
    const offsetAY =
      p.map(mousePos.y, 0, p.height, -80, 80) * factorA * movementScale;

    const offsetBX =
      p.map(mousePos.x, 0, p.width, -80, 80) * factorB * movementScale;
    const offsetBY =
      p.map(mousePos.y, 0, p.height, -80, 80) * factorB * movementScale;

    const rectA = a.corners.map((c) => ({
      x: c.x + offsetAX,
      y: c.y + offsetAY,
    }));
    const rectB = b.corners.map((c) => ({
      x: c.x + offsetBX,
      y: c.y + offsetBY,
    }));

    // corner → corner
    for (let j = 0; j < 4; j++) {
      p.vertex(rectA[j].x, rectA[j].y, a.z);
      p.vertex(rectB[j].x, rectB[j].y, b.z);
    }

    // internal lines
    for (let j = 0; j < 4; j++) {
      const c1 = rectA[j];
      const c2 = rectA[(j + 1) % 4];
      const n1 = rectB[j];
      const n2 = rectB[(j + 1) % 4];

      for (let k = 1; k < linesBetween; k++) {
        const t = k / linesBetween;

        const xA = p.lerp(c1.x, c2.x, t);
        const yA = p.lerp(c1.y, c2.y, t);

        const xB = p.lerp(n1.x, n2.x, t);
        const yB = p.lerp(n1.y, n2.y, t);

        p.vertex(xA, yA, a.z);
        p.vertex(xB, yB, b.z);
      }
    }
  }

  p.endShape();
  p.pop();
}

export const rectTunnelSketch = (
  p: p5,
  w: number,
  h: number,
  scrollRef?: RefObject<number>,
  zoomRef?: RefObject<number>,
  mousePosRef?: RefObject<{ x: number; y: number }>
) => {
  const rects: Rect[] = [];
  const rectAmount = 10;

  let customFont: p5.Font;
  let zoom = 1;
  let targetZoom = 1;
  const zoomSensitivity = 0.001;

  let minZoom = 1;
  let maxZoom = 1;

  let defaultMousePos = { x: p.mouseX, y: p.mouseY };
  let mousePos = { x: 0, y: 0 };

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
      rects.push(new Rect(rw, rh, z));
    }

    const innerRectWidth = rects[0].w;
    const outerRectWidth = rects[rects.length - 1].w;

    minZoom = 1;
    maxZoom = outerRectWidth / innerRectWidth;

    if (mousePosRef?.current) {
      mousePos = mousePosRef.current;
    } else {
      mousePos = defaultMousePos;
    }

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

    // draw rect faces normally
    for (let i = 0; i < rects.length - 1; i++) {
      const r = rects[i];
      const t = i / (rects.length - 1);
      const color = p.color(255, p.lerp(0, 40, t));

      drawRectFace(p, rects[i], movementScale, zoom, mousePos, color);
    }

    // ❗ now draw ALL lines in ONE call
    drawBatchedLines(p, rects, movementScale, zoom, mousePos, linesBetween);
  };
};
