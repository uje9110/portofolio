import p5 from "p5";

export class Rect {
  corners: { x: number; y: number }[];
  w: number;
  h: number;
  z: number;

  constructor(p: p5, w: number, h: number, z: number) {
    this.w = w;
    this.h = h;
    this.z = z;

    const hw = w / 2;
    const hh = h / 2;

    this.corners = [
      { x: -hw, y: -hh }, // TL
      { x: hw, y: -hh },  // TR
      { x: hw, y: hh },   // BR
      { x: -hw, y: hh },  // BL
    ];
  }

  drawRect(
    p: p5,
    movementScale: number,
    zoom: number,
    fillColor: p5.Color
  ) {
    const factor = this.z / 10;

    const offsetX =
      p.map(p.mouseX, 0, p.width, -50, 50) * factor * movementScale;
    const offsetY =
      p.map(p.mouseY, 0, p.height, -50, 50) * factor * movementScale;

    p.push();
    p.scale(zoom);
    p.translate(offsetX, offsetY);

    p.stroke(255, 150);
    p.fill(fillColor);

    p.beginShape();
    for (const c of this.corners) {
      p.vertex(c.x, c.y, this.z);
    }
    p.endShape(p.CLOSE);

    p.pop();
  }

  drawLines(
    p: p5,
    movementScale: number,
    zoom: number,
    linesBetween: number,
    next: Rect
  ) {
    const factorA = this.z / 10;
    const factorB = next.z / 10;

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
    p.scale(zoom);
    p.stroke(255, 150);

    // Corner-to-corner connecting lines
    for (let j = 0; j < currentRect.length; j++) {
      p.line(
        currentRect[j].x,
        currentRect[j].y,
        this.z,
        nextRect[j].x,
        nextRect[j].y,
        next.z
      );
    }

    // Internal spaced lines
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

        p.line(xA, yA, this.z, xB, yB, next.z);
      }
    }

    p.pop();
  }
}
