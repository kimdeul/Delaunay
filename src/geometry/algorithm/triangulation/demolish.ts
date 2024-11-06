import { Global } from "../../Area";
import { Segment } from "../../shapes/Segment";
import { CCW } from "../vector";

export function demolish(segment: Segment) {
  const vertices = { upper: [segment.from, segment.to], lower: [segment.from, segment.to] }
  for (const triangle of Global.triangles) {
    if (triangle.edges.some(edge => edge.crossWith(segment))) {
      triangle.delete()
      for (const point of triangle.vertices) if (!point.is(segment.from) && !point.is(segment.to)) (
        CCW(segment.from, segment.to, point) > 0 
        ? vertices.upper : vertices.lower
      ).push(point)
    }
  }
  Global.triangles = Global.triangles.filter(triangle => !triangle.deleted)
  return vertices
}