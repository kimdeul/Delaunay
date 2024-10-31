import { Point } from "./shapes/Point"
import { Segment } from "./shapes/Segment"

export interface Area {
  points: Point[],
  segments: Segment[],
}

export const Global: Area = {
  points: [],
  segments: []
}