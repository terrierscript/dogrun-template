import React, { useRef, useLayoutEffect, useState } from "react"
import styled from "styled-components"
import { Canvas } from "./Canvas"
import { GhostCanvas, Rect } from "./GhostCanvas"
import { SampleFont } from "./Fonts"
const Container = styled.div`
  /* position: relative; */
  /* border: 1px solid black; */
`

const Mode = ({ mode, onChange }) => {
  const modes = [
    {
      modeName: "white",
      label: "mask"
    },
    {
      modeName: "black",
      label: "unmask"
    }
  ]
  return (
    <div>
      {modes.map(({ modeName, label }) => (
        <label key={label}>
          <input
            type="radio"
            name="mode"
            value={"mask"}
            checked={modeName === mode}
            onChange={() => onChange(modeName)}
          />
          {label}
        </label>
      ))}
    </div>
  )
}
export const MaskCanvas = ({ text, onChangeMask }) => {
  const ref = useRef<HTMLCanvasElement>()
  const ctxRef = useRef<CanvasRenderingContext2D>()
  const [mode, setMode] = useState("white")
  const [history, setHistory] = useState<Rect[]>([])

  useLayoutEffect(() => {
    if (ref.current === undefined) return
    const ctx = ref.current.getContext("2d")
    if (ctx === null) return
    ctxRef.current = ctx
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, ref.current.width, ref.current.height)
    ctx.stroke()
  }, [])

  const updateUrl = () => {
    if (!ctxRef.current || !ref.current) {
      return
    }
    const imgUrl = ref.current.toDataURL("image/png")
    // setUrl(imgUrl)
    onChangeMask(imgUrl)
  }
  const draw = (rect: Rect) => {
    if (!ctxRef.current) {
      return
    }
    const ctx = ctxRef.current
    ctx.beginPath()
    ctx.fillStyle = mode
    ctx.fillRect(...rect)
    ctx.stroke()
    setHistory((h) => [rect, ...h])
  }
  useLayoutEffect(() => {
    updateUrl()
  }, [])
  return (
    <div>
      <Mode mode={mode} onChange={(mode) => setMode(mode)} />
      <Container>
        <SampleFont>{text}</SampleFont>
        <Canvas ref={ref} />
        <GhostCanvas
          width={300}
          height={150}
          onRectDraw={(rect) => {
            draw(rect)
            updateUrl()
          }}
        />
      </Container>
    </div>
  )
}
