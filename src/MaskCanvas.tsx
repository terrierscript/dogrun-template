import React, { useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import { Canvas } from "./Canvas"
import { GhostCanvas } from "./GhostCanvas"
const Container = styled.div`
  /* position: relative; */
  border: 1px solid black;
`
export const MaskCanvas = ({ onChangeMask }) => {
  const ref = useRef<HTMLCanvasElement>()
  const ctxRef = useRef<CanvasRenderingContext2D>()
  const updateUrl = () => {
    if (!ctxRef.current || !ref.current) {
      return
    }
    const imgUrl = ref.current.toDataURL("image/png")
    // setUrl(imgUrl)
    onChangeMask(imgUrl)
  }
  useLayoutEffect(() => {
    if (ref.current === undefined) return
    const ctx = ref.current.getContext("2d")
    if (ctx === null) return
    ctxRef.current = ctx
  }, [])
  useLayoutEffect(() => {
    updateUrl()
  }, [])
  return (
    <Container>
      <Canvas ref={ref} />
      <GhostCanvas
        width={300}
        height={150}
        onRectDraw={(rect) => {
          if (!ctxRef.current) {
            return
          }
          const ctx = ctxRef.current
          ctx.fillRect(...rect)
          updateUrl()
        }}
      />
    </Container>
  )
}
