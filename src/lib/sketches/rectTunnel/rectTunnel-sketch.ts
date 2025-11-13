import p5 from "p5";
import { Rect } from "./RectTunnel";
const bk_lines = [
  "I'm an avid, self-learning",
  "Fullstack Web Developer",
  "who thrives on discovering new things",
  "and immediately applying",
  "that knowledge to my work.",
];
const lines = ["Fullstack Web Developer"];

export const rectTunnelSketch = (p: p5, w: number, h: number) => {
  const rects: Rect[] = [];
  let customFont: p5.Font;

  // zoom parameters
  let zoom = 1;
  let targetZoom = 1;
  const zoomSensitivity = 0.001;

  // these will be dynamically derived later
  let minZoom = 1;
  let maxZoom = 1;

  p.setup = async () => {
    customFont = await p.loadFont("/fonts/Space_Grotesk.ttf");
    p.createCanvas(w, h);
    p.noFill();
    p.stroke(255);
    p.rectMode(p.CENTER);

    for (let r = 0; r < 10; r++) {
      const t = r / 7;
      const rw = p.lerp(w * 0.25, w * 1, t);
      const rh = p.lerp(h * 0.25, h * 1, t);
      rects.push(new Rect(p, rw, rh));
    }

    // 🟡 define zoom range based on inner/outer rects
    const innerRectWidth = rects[0].w;
    const outerRectWidth = rects[rects.length - 1].w;

    // when outerRect fills the canvas, scale = 1
    // when innerRect fills the canvas, scale = outerRectWidth / innerRectWidth
    minZoom = 1;
    maxZoom = outerRectWidth / innerRectWidth;

    // initialize zoom to min
    zoom = minZoom;
    targetZoom = minZoom;
  };

  p.mouseWheel = (event: any) => {
    targetZoom -= event.deltaY * zoomSensitivity;
    targetZoom = p.constrain(targetZoom, minZoom, maxZoom);
  };

  p.draw = () => {
    p.background(10, 20, 40);

    zoom = p.lerp(zoom, targetZoom, 0.1);

    const linesBetween = 6;

    // 🌀 movement restriction scales inversely with zoom
    const movementScale = p.map(zoom, minZoom, maxZoom, 1, 0.1, true);

    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      const factor = 1 - i / (rects.length - 1);

      // 💫 movement scaled by zoom
      const offsetX =
        p.map(p.mouseX, 0, p.width, -50, 50) * factor * movementScale;
      const offsetY =
        p.map(p.mouseY, 0, p.height, -50, 50) * factor * movementScale;

      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.scale(zoom);
      p.translate(offsetX, offsetY);

      r.show(p);

      if (i === 0) {
        p.fill(255);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16 / zoom);
        p.textFont(customFont);

        const lineHeight = 24 / zoom;

        for (let i = 0; i < lines.length; i++) {
          const y = (i - (lines.length - 1) / 2) * lineHeight;
          p.text(lines[i], 0, y);
        }
      }

      p.pop();
    }

    // connecting lines (same logic — use movementScale here too)
    for (let i = 0; i < rects.length - 1; i++) {
      const factorA = 1 - i / (rects.length - 1);
      const factorB = 1 - (i + 1) / (rects.length - 1);

      const offsetAX =
        p.map(p.mouseX, 0, p.width, -50, 50) * factorA * movementScale;
      const offsetAY =
        p.map(p.mouseY, 0, p.height, -50, 50) * factorA * movementScale;
      const offsetBX =
        p.map(p.mouseX, 0, p.width, -50, 50) * factorB * movementScale;
      const offsetBY =
        p.map(p.mouseY, 0, p.height, -50, 50) * factorB * movementScale;

      const curr = rects[i].corners.map((c) => ({
        x: c.x + offsetAX,
        y: c.y + offsetAY,
      }));
      const next = rects[i + 1].corners.map((c) => ({
        x: c.x + offsetBX,
        y: c.y + offsetBY,
      }));

      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.scale(zoom);

      for (let j = 0; j < curr.length; j++) {
        p.line(curr[j].x, curr[j].y, next[j].x, next[j].y);
      }

      for (let j = 0; j < curr.length; j++) {
        const c1 = curr[j];
        const c2 = curr[(j + 1) % curr.length];
        const n1 = next[j];
        const n2 = next[(j + 1) % next.length];

        for (let k = 1; k < linesBetween; k++) {
          const t = k / linesBetween;
          const xA = p.lerp(c1.x, c2.x, t);
          const yA = p.lerp(c1.y, c2.y, t);
          const xB = p.lerp(n1.x, n2.x, t);
          const yB = p.lerp(n1.y, n2.y, t);
          p.line(xA, yA, xB, yB);
        }
      }

      p.pop();
    }
  };
};
