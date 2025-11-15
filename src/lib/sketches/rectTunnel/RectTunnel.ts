export class Rect {
  corners: { x: number; y: number }[];
  w: number;
  h: number;
  z: number;

  constructor(w: number, h: number, z: number) {
    this.w = w;
    this.h = h;
    this.z = z;

    const hw = w / 2;
    const hh = h / 2;

    this.corners = [
      { x: -hw, y: -hh },
      { x:  hw, y: -hh },
      { x:  hw, y:  hh },
      { x: -hw, y:  hh },
    ];
  }
}
