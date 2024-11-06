import { delaunay } from "./geometry/algorithm/triangulation/delaunay"
import { demolish } from "./geometry/algorithm/triangulation/demolish"
import { Global } from "./geometry/Area"
import { Point } from "./geometry/shapes/Point"
import { Segment } from "./geometry/shapes/Segment"
import { Renderer } from "./render/Renderer"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
export const renderer = new Renderer(canvas)

const PNTS = 50;
const SEGS = 1; 

for (const _ of new Array(PNTS).fill(0)) Global.points.push(Point.random(1300, 1600))
while (Global.segments.length < SEGS) {
  const index = Math.floor(Math.random() * PNTS)
  const addition = new Segment(Global.points[index], Global.points[(index + 1) % PNTS])
  if (Global.segments.some(segment => segment.is(addition) || segment.crossWith(addition))) continue
  Global.segments.push(addition)
}
// renderer.renderPolygon(composeConvexHull(Global.points)!)
Global.triangles.push(...delaunay(Global.points))
Global.points.forEach(point => renderer.renderPoint(point, { size: 5, color: "#0005" }))

for (const segment of Global.segments) {
  const { upper, lower } = demolish(segment)
  upper.forEach(point => renderer.renderPoint(point, { size: 5, color: "#0f05" }))
  lower.forEach(point => renderer.renderPoint(point, { size: 5, color: "#00f5" }))
}

Global.triangles.forEach(triangle => triangle.edges.map(edge => renderer.renderSegment(edge, { color: "#5555" })))
Global.segments.forEach(segment => renderer.renderSegment(segment, { color: "#f00" }))