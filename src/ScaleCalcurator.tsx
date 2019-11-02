import React, { useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import { SampleFont, ResultFont } from "./Fonts"
const Cloak = styled.div`
  opacity: 0;
  /* display: none; */
`
export const ScaleCaclurator = ({ text, fontSize, onChangeScale }) => {
  const baseRef = useRef<HTMLDivElement>()
  const samplingRef = useRef<HTMLDivElement>()
  useLayoutEffect(() => {
    if (!baseRef.current || !samplingRef.current) {
      return
    }
    const baseWidth = baseRef.current.clientWidth
    const sampleWidth = samplingRef.current.clientWidth
    console.log(baseWidth / sampleWidth)
    onChangeScale(baseWidth / sampleWidth)
  }, [text])
  return (
    <Cloak>
      <ResultFont ref={baseRef} fontSize={fontSize}>
        {text}
      </ResultFont>
      <SampleFont ref={samplingRef}>{text}</SampleFont>
    </Cloak>
  )
}
