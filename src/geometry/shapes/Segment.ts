import { Point } from "./Point";
import { Shape } from "./Shape";

export class Segment extends Shape {

  readonly from: Point;
  readonly to: Point;
  
  constructor(from: Point, to: Point) {
    super()
    this.from = from;
    this.to = to;
  }

  is(segment: Segment) {
    if (this.from === segment.from && this.to === segment.to) return true;
    if (this.from === segment.to && this.from === segment.to) return true;
    return false;
  }

  distance() {
    return Math.sqrt((this.from.x - this.to.x) ** 2 + (this.from.y - this.to.y) ** 2)
  }
  
}