import { Global } from "../../Area"
import { Segment } from "../../shapes/Segment"
import { delaunay } from "./delaunay"
import { demolish } from "./demolish"

export function insert(segment: Segment) {
  const { upper, lower } = demolish(segment)
  Global.triangles.push(...delaunay(upper).filter(triangle => triangle.edges.every(edge => Global.triangles.every(tri2 => tri2.edges.every(e2 => !e2.crossWith(edge))))))
  Global.triangles.push(...delaunay(lower).filter(triangle => triangle.edges.every(edge => Global.triangles.every(tri2 => tri2.edges.every(e2 => !e2.crossWith(edge))))))
}