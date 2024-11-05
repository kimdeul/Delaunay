import { Point } from "./shapes/Point"
import { Segment } from "./shapes/Segment"
import { Triangle } from "./shapes/Triangle"

export interface Area {
  points: Point[],
  segments: Segment[],
  triangles: Triangle[],
}

export const Global: Area = {
  points: [],
  segments: [],
  triangles: [],
}