import p5 from "p5";

export class Star {
  x: number;
  y: number;
  z: number;
  pz: number;

  constructor(p: p5) {
    this.x = p.random(-p.width, p.width);
    this.y = p.random(-p.height, p.height);
    this.z = p.random(p.width);
    this.pz = this.z;
  }

  show(p: p5) {
    p.fill(255);
    p.noStroke();

    const sx = p.map(this.x / this.z, 0, 1, 0, p.width);
    const sy = p.map(this.y / this.z, 0, 1, 0, p.height);

    const r = p.map(this.z, 0, p.width, 6, 0);
    p.ellipse(sx, sy, r, r);

    const px = p.map(this.x / this.pz, 0, 1, 0, p.width);
    const py = p.map(this.y / this.pz, 0, 1, 0, p.height);
    this.pz = this.z;
    p.stroke(255);
    p.line(px, py, sx, sy);
  }

  update(p: p5) {
    // const speed = p.map(p.mouseX, 0, p.mouseY, 0, 20);
    this.z = this.z - 20;
    if (this.z < 1) {
      this.z = p.width;
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
      this.pz = this.z;
    }
  }
}
