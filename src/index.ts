import { delaunay } from "./geometry/algorithm/triangulation/delaunay"
import { Global } from "./geometry/Area"
import { Point } from "./geometry/shapes/Point"
import { Renderer } from "./render/Renderer"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
export const renderer = new Renderer(canvas)

for (const _ of new Array(50).fill(0)) Global.points.push(Point.random(1300, 1600))
for (const point of Global.points) renderer.renderPoint(point, { size: 8 })
// renderer.renderPolygon(composeConvexHull(Global.points)!)
delaunay()?.map(triangle => triangle.edges.map(edge => renderer.renderSegment(edge)))