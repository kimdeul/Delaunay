import { Area } from "../../Area";
import { Point } from "../../shapes/Point";
import { Segment } from "../../shapes/Segment";
import { Triangle } from "../../shapes/Triangle";

class SuperPoint extends Point {}

function proposeSuperTriangle() {
  // TODO: Convex test
  return new Triangle([
    new SuperPoint({ x: 1500, y: 100 }),
    new SuperPoint({ x: 100, y: 2900 }),
    new SuperPoint({ x: 2900, y: 2900 })
  ])
}

export function delaunay(source: Point[]) {

  // Cannot make DT.
  if (source.length < 3) {
    return [];
  }

  const Local: Area = {
    points: [],
    segments: [],
    triangles: []
  }

  Local.points.push(...source)
  Local.triangles.push(proposeSuperTriangle())
  Local.points.push(...Local.triangles[0].vertices)

  for (let i=0; i<source.length; i++) {
    const point = Local.points[i]
    const filtered: Segment[] = []

    for (const triangle of Local.triangles) {
      if (triangle.deleted) continue;
      if (triangle.inCircumcircle(point)) {
        triangle.delete()
        filtered.push(...triangle.edges)
      }
    }

    const edges: Segment[] = []
    for (const segment of filtered) {
      const found = edges.find(seg => !seg.deleted && seg.is(segment))
      if (!found) edges.push(segment)
      else {
        found.delete()
        segment.delete()
      }
    }

    for (const segment of edges) {
      if (segment.deleted) continue;
      Local.triangles.push(new Triangle([segment.from, segment.to, point]))
    }
  }

  Local.triangles = Local.triangles.filter(triangle => !triangle.deleted)
  Local.triangles = Local.triangles.filter(triangle => !triangle.vertices.some(point => point instanceof SuperPoint))
  return Local.triangles;
}