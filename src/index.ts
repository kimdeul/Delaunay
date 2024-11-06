import { delaunay } from "./geometry/algorithm/triangulation/delaunay"
import { insert } from "./geometry/algorithm/triangulation/insert"
import { Global } from "./geometry/Area"
import { Point } from "./geometry/shapes/Point"
import { Segment } from "./geometry/shapes/Segment"
import { Renderer } from "./render/Renderer"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
export const renderer = new Renderer(canvas)

const PNTS = 1000;
const SEGS = 50; 

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

for (const segment of Global.segments) insert(segment)

Global.triangles.forEach(triangle => triangle.edges.map(edge => renderer.renderSegment(edge, { color: "#5555" })))
Global.segments.forEach(segment => renderer.renderSegment(segment, { color: "#f00" }))