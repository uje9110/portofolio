import p5 from "p5";

export class Rect {
  corners: { x: number; y: number }[];

  constructor(private p: p5, private w: number, private h: number) {
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
    p.noFill();
    p.stroke(255);
    p.beginShape();
    for (const c of this.corners) p.vertex(c.x, c.y);
    p.endShape(p.CLOSE);
  }
}