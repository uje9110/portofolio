import p5 from "p5";

export class Rect {
  corners: { x: number; y: number }[];
  w: number;
  h: number;
  opacity: number;
  

  constructor(p: p5, w: number, h: number, opacity: number) {
    this.w = w;
    this.h = h;
    this.opacity = opacity;

    const hw = w / 2;
    const hh = h / 2;

    this.corners = [
      { x: -hw, y: -hh }, // top-left
      { x: hw, y: -hh }, // top-right
      { x: hw, y: hh }, // bottom-right
      { x: -hw, y: hh }, // bottom-left
    ];
  }

  show(p: p5) {
    p.beginShape();
    for (const c of this.corners) {
      p.vertex(c.x, c.y);
    }
    p.stroke(255);
    p.endShape(p.CLOSE);
  }

  drawRect(p: p5, factor: number, movementScale: number, zoom: number) {
    const offsetX =
      p.map(p.mouseX, 0, p.width, -50, 50) * factor * movementScale;
    const offsetY =
      p.map(p.mouseY, 0, p.height, -50, 50) * factor * movementScale;

    p.push();
    p.stroke(255);
    p.fill(255, 255, 255, this.opacity);
    p.translate(p.width / 2, p.height / 2);
    p.scale(zoom);
    p.translate(offsetX, offsetY);

    this.show(p);

    p.pop();
  }

  drawLines(
    p: p5,
    index: number,
    rectsLength: number,
    movementScale: number,
    zoom: number,
    linesBetween: number,
    next: Rect
  ) {
    const factorA = 1 - index / (rectsLength - 1);
    const factorB = 1 - (index + 1) / (rectsLength - 1);

    const offsetAX =
      p.map(p.mouseX, 0, p.width, -50, 50) * factorA * movementScale;
    const offsetAY =
      p.map(p.mouseY, 0, p.height, -50, 50) * factorA * movementScale;
    const offsetBX =
      p.map(p.mouseX, 0, p.width, -50, 50) * factorB * movementScale;
    const offsetBY =
      p.map(p.mouseY, 0, p.height, -50, 50) * factorB * movementScale;

    const currentRect = this.corners.map((c) => ({
      x: c.x + offsetAX,
      y: c.y + offsetAY,
    }));

    const nextRect = next.corners.map((c) => ({
      x: c.x + offsetBX,
      y: c.y + offsetBY,
    }));

    p.push();
    p.stroke(255);
    p.translate(p.width / 2, p.height / 2);
    p.scale(zoom);

    for (let j = 0; j < currentRect.length; j++) {
      p.line(currentRect[j].x, currentRect[j].y, nextRect[j].x, nextRect[j].y);
    }

    for (let j = 0; j < currentRect.length; j++) {
      const c1 = currentRect[j];
      const c2 = currentRect[(j + 1) % currentRect.length];
      const n1 = nextRect[j];
      const n2 = nextRect[(j + 1) % nextRect.length];

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
}
