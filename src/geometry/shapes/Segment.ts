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
    if (this.from.id === segment.from.id && this.to.id === segment.to.id) return true;
    if (this.from.id === segment.to.id && this.to.id === segment.from.id) return true;
    return false;
  }

  distance() {
    return Math.sqrt((this.from.x - this.to.x) ** 2 + (this.from.y - this.to.y) ** 2)
  }
  
}