import p5 from "p5";
import { Rect } from "./RectTunnel";

  
  export const rectTunnelSketch = (p: p5, w: number, h: number) => {
    const rects: Rect[] = [];

    let customFont : p5.Font

    p.setup = async () => {
      customFont = await p.loadFont("/fonts/Michroma-Regular.ttf");
      p.createCanvas(w, h);
      p.noFill();
      p.stroke(255);
      p.rectMode(p.CENTER);

      for (let r = 0; r < 10; r++) {
        const t = r / 7; // smoother spacing
        const rw = p.lerp(w * 0.3, w * 1, t);
        const rh = p.lerp(h * 0.3, h * 1, t);
        rects.push(new Rect(p, rw, rh));
      }
    };

    p.draw = () => {
      p.background(10, 20, 40);

      // draw all rectangles with depth-based movement
      const linesBetween = 6;

      for (let i = 0; i < rects.length; i++) {
        const r = rects[i];
        const factor = 1 - i / (rects.length - 1); // 1 = inner, 0 = outer

        // compute mouse offset using p.map()
        const offsetX = p.map(p.mouseX, 0, p.width, -50, 50) * factor;
        const offsetY = p.map(p.mouseY, 0, p.height, -50, 50) * factor;

        // translate per rectangle
        p.push();
        p.translate(p.width / 2 + offsetX, p.height / 2 + offsetY);
        r.show(p);

        // 🟡 Add text in center of the innermost rectangle
        if (i === 0) {
          p.fill(255);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(32);
          p.textFont(customFont)

          const lines = ["I See It", "I Learn It", "I Make It"];
          const lineHeight = 36;

          for (let i = 0; i < lines.length; i++) {
            const y = (i - (lines.length - 1) / 2) * lineHeight;
            p.text(lines[i], 0, y);
          }
        }

        p.pop();
      }

      // now draw connecting lines between rectangles
      for (let i = 0; i < rects.length - 1; i++) {
        const factorA = 1 - i / (rects.length - 1);
        const factorB = 1 - (i + 1) / (rects.length - 1);

        const offsetAX = p.map(p.mouseX, 0, p.width, -50, 50) * factorA;
        const offsetAY = p.map(p.mouseY, 0, p.height, -50, 50) * factorA;
        const offsetBX = p.map(p.mouseX, 0, p.width, -50, 50) * factorB;
        const offsetBY = p.map(p.mouseY, 0, p.height, -50, 50) * factorB;

        // get both rects' corners shifted accordingly
        const curr = rects[i].corners.map((c) => ({
          x: c.x + offsetAX,
          y: c.y + offsetAY,
        }));
        const next = rects[i + 1].corners.map((c) => ({
          x: c.x + offsetBX,
          y: c.y + offsetBY,
        }));

        // connect corresponding corners
        for (let j = 0; j < curr.length; j++) {
          p.line(
            curr[j].x + p.width / 2,
            curr[j].y + p.height / 2,
            next[j].x + p.width / 2,
            next[j].y + p.height / 2
          );
        }

        // add interpolated lines between corners
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
            p.line(
              xA + p.width / 2,
              yA + p.height / 2,
              xB + p.width / 2,
              yB + p.height / 2
            );
          }
        }
      }
    };
  };