import { Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape {

  private vertices: Point[]

  constructor(vertices: Point[]) {
    super()
    this.vertices = vertices;
  }

  // Circumcircle test
}