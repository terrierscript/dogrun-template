import React, { useRef, useLayoutEffect } from "react"
import { Canvas } from "./Canvas"
import { GhostCanvas, Rect } from "./GhostCanvas"
export const Drawer = ({ mode, size, setImageSource }) => {
  const ref = useRef<HTMLCanvasElement>()
  const ctxRef = useRef<{
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
  }>()
  useLayoutEffect(() => {
    if (ref.current === undefined) return
    const ctx = ref.current.getContext("2d")
    if (ctx === null) return
    const canvas = ref.current
    ctxRef.current = { ctx, canvas }
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.stroke()
    setImageSource(canvas)
  }, [size])
  const draw = (rect: Rect) => {
    if (!ctxRef.current) {
      return
    }
    const { ctx, canvas } = ctxRef.current
    ctx.beginPath()
    ctx.fillStyle = mode === "mask" ? "white" : "black"
    ctx.fillRect(...rect)
    ctx.stroke()
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setImageSource(canvas)
  }
  return (
    <>
      <Canvas width={size[0]} height={size[1]} ref={ref} />
      <GhostCanvas
        width={size[0]}
        height={size[1]}
        onRectDraw={(rect) => {
          draw(rect)
        }}
      />
    </>
  )
}
