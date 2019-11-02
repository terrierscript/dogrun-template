import React, { useRef, useState, useLayoutEffect, FC } from "react"
import { Canvas } from "./Canvas"
type Point = [number, number]
type Rect = [number, number, number, number]
const getRect = (x1, y1, x2, y2): Rect => {
  const x = Math.min(x1, x2)
  const w = Math.abs(x1 - x2)
  const y = Math.min(y1, y2)
  const h = Math.abs(y1 - y2)
  return [x, y, w, h]
}
type DrawFn = (rect: Rect) => void
export const GhostCanvas: FC<{
  width: any
  heigth: any
  onRectDraw: DrawFn
}> = ({ width, heigth, onRectDraw }) => {
  const ref = useRef<HTMLCanvasElement>()
  const ctxRef = useRef<CanvasRenderingContext2D>()
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [drawRect, setDrawRect] = useState<Rect | null>(null)
  useLayoutEffect(() => {
    if (ref.current === undefined) {
      return
    }
    const ctx = ref.current.getContext("2d")
    if (ctx === null) {
      return
    }
    ctxRef.current = ctx
  }, [])
  const getCanvasPos = (mx, my): Point | null => {
    if (!ref.current) {
      return null
    }
    const ctx = ctxRef.current
    if (!ctx) {
      return null
    }
    const cx = mx - ref.current.offsetLeft
    const cy = my - ref.current.offsetTop
    return [cx, cy]
  }
  const start = (mx: number, my: number) => {
    const ctx = ctxRef.current
    if (!ctx) return
    if (!ref.current) return
    const pos = getCanvasPos(mx, my)
    setStartPoint(pos)
  }
  const move = (mx: number, my: number) => {
    if (!ctxRef.current) return
    if (!ref.current) return
    if (!startPoint) return
    const ctx = ctxRef.current
    const [bx, by] = startPoint
    const pos = getCanvasPos(mx, my)
    if (!pos) {
      return
    }
    const [cx, cy] = pos
    ctx.clearRect(0, 0, ref.current.width, ref.current.height)
    ctx.beginPath()
    ctx.strokeStyle = "gray"
    const rect = getRect(bx, by, cx, cy)
    ctx.rect(...rect)
    ctx.stroke()
    setDrawRect(rect)
  }
  const end = () => {
    if (drawRect) {
      onRectDraw(drawRect)
    }
    setStartPoint(null)
    setDrawRect(null)
    if (!ctxRef.current) return
    if (!ref.current) return
    const ctx = ctxRef.current
    ctx.clearRect(0, 0, ref.current.width, ref.current.height)
  }
  return (
    <Canvas
      width={width}
      heigth={heigth}
      ref={ref}
      onMouseDown={(e) => start(e.clientX, e.clientY)}
      onMouseUp={(e) => end()}
      onMouseOut={(e) => end()}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
    ></Canvas>
  )
}
