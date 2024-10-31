import { Segment } from "./Segment";
import { Shape } from "./Shape";

interface Location2D { x: number, y: number }

export class Point<Location extends Location2D = Location2D> extends Shape {

  private location: Location;

  constructor(location: Location) {
    super()
    this.location = location;
  }

  get x() { return this.location.x }
  get y() { return this.location.y }

  static random(min: number, max: number) {
    return new Point({ 
      x: min + Math.random() * (max - min),
      y: min + Math.random() * (max - min)
    })
  }

  lineTo(to: Point) {
    return new Segment(this, to)
  }

}