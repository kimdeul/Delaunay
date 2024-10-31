import { Point } from "../geometry/shapes/Point";
import { Segment } from "../geometry/shapes/Segment";

type StyleOption = { size?: number, color?: string };

export class Renderer {

  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
  }

  renderPoint(point: Point, fill?: StyleOption) {
    this.ctx.fillStyle = fill?.color ?? "#000"
    const size = fill?.size ?? 2
    this.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size)
  }

  renderSegment(segment: Segment, stroke?: StyleOption) {
    this.ctx.beginPath()
    this.ctx.moveTo(segment.from.x, segment.from.y)
    this.ctx.lineTo(segment.to.x, segment.to.y)
    this.ctx.strokeStyle = stroke?.color ?? "#000"
    this.ctx.lineWidth = stroke?.size ?? 2
    this.ctx.stroke()
    this.ctx.closePath()
  }

  renderPolygon(points: Point[], option?: { fill: StyleOption, stroke: StyleOption }) {
    if (points.length < 3) return;
    this.ctx.beginPath()
    let prev = points[0], now = points[1]
    this.renderSegment(new Segment(prev, now), option?.stroke)
    for (const point of [...points.slice(1), points[0]]) {
      prev = now; now = point;
      this.renderSegment(new Segment(prev, now), option?.stroke)
    }
    for (const point of points) this.renderPoint(point, option?.fill)
  }

}