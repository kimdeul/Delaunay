import { composeConvexHull } from "./geometry/algorithm/convex"
import { Global } from "./geometry/Area"
import { Point } from "./geometry/shapes/Point"
import { Renderer } from "./render/Renderer"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const renderer = new Renderer(canvas)

for (const _ of new Array(20).fill(0)) Global.points.push(Point.random(200, 800))
for (const point of Global.points) renderer.renderPoint(point, { size: 8 })
renderer.renderPolygon(composeConvexHull(Global.points)!)