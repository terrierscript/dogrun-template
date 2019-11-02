import React, { useRef, useLayoutEffect, FC } from "react"
import styled from "styled-components"
const CloakCanvas = styled.canvas`
  display: none;
`
export const OutputCanvas: FC<{
  scale: number
  source: HTMLCanvasElement
  timestamp: number
  onChange: (url: string) => unknown
}> = ({ scale, timestamp, source, onChange }) => {
  const ref = useRef<HTMLCanvasElement>()
  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = ref.current.getContext("2d")
    if (!ctx) return
    if (!source) return
    ctx.drawImage(source, 0, 0, source.width * scale, source.height * scale)
    const imgUrl = ref.current.toDataURL("image/png")
    onChange(imgUrl)
    // ctx.restore()
  }, [scale, source, timestamp])
  return <CloakCanvas ref={ref}></CloakCanvas>
}
