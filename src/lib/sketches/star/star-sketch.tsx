"use client";

import p5 from "p5";
import { Star } from "./Star";

const StarSketch = (p: p5, w: number, h: number) => {
  let stars: Star[] = [];

  p.setup = () => {
    p.createCanvas(w, h);

    // create 100 stars
    for (let i = 0; i < 500; i++) {
      stars.push(new Star(p));
    }
  };

  p.draw = () => {
    p.background(10, 15, 28);
    p.translate(p.width / 2, p.height / 2);
    for (let s of stars) {
      s.show(p);
      s.update(p);
    }
  };
};

export default StarSketch;
