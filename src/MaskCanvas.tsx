import React, { useRef, useLayoutEffect, useState } from "react"
import styled from "styled-components"
import { Canvas } from "./Canvas"
import { GhostCanvas, Rect } from "./GhostCanvas"
import { SampleFont } from "./Fonts"
import { ScaleCaclurator } from "./ScaleCalcurator"
import { OutputCanvas } from "./OutputCanvas"
const Container = styled.div`
  /* position: relative; */
  /* border: 1px solid black; */
`

const Mode = ({ mode, onChange }) => {
  const modes = ["mask", "unmask"]
  return (
    <div>
      {modes.map((modeName) => (
        <label key={modeName}>
          <input
            type="radio"
            name="mode"
            value={"mask"}
            checked={modeName === mode}
            onChange={() => onChange(modeName)}
          />
          {modeName}
        </label>
      ))}
    </div>
  )
}

export const MaskCanvas = ({ text, onChangeMask, fontSize }) => {
  const ref = useRef<HTMLCanvasElement>()
  const [scale, setScale] = useState(1)
  const [imageSource, _setImageSource] = useState<{
    source: HTMLCanvasElement
    timestamp: number
  } | null>(null)
  const ctxRef = useRef<{
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
  }>()
  const [mode, setMode] = useState("mask")
  const setImageSource = (elm: HTMLCanvasElement) => {
    _setImageSource({
      source: elm,
      timestamp: new Date().getTime()
    })
  }
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
  }, [])

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
  console.log(imageSource)

  return (
    <>
      <div>
        <ScaleCaclurator
          text={text}
          fontSize={fontSize}
          onChangeScale={(newScale) => {
            setScale(newScale)
          }}
        />
      </div>
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
            }}
          />
          {imageSource && (
            <OutputCanvas
              scale={scale}
              source={imageSource.source}
              timestamp={imageSource.timestamp}
              onChange={onChangeMask}
            />
          )}
        </Container>
      </div>
    </>
  )
}
