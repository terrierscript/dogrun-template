import React, { useRef, useLayoutEffect, useState } from "react"
import styled from "styled-components"
import { SampleFont } from "./Fonts"
import { ScaleCaclurator } from "./ScaleCalcurator"
import { OutputCanvas } from "./OutputCanvas"
import { Drawer } from "./Drawer"
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
  const sampleRef = useRef<HTMLElement>()
  const [scale, setScale] = useState(1)
  const [imageSource, _setImageSource] = useState<{
    source: HTMLCanvasElement
    timestamp: number
  } | null>(null)
  const [mode, setMode] = useState("mask")
  const [size, setSize] = useState([0, 0])

  const setImageSource = (elm: HTMLCanvasElement) => {
    _setImageSource({
      source: elm,
      timestamp: new Date().getTime()
    })
  }
  useLayoutEffect(() => {
    if (!sampleRef.current) return
    setSize([sampleRef.current.clientWidth, sampleRef.current.clientHeight])
  }, [])

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
          <SampleFont ref={sampleRef}>{text}</SampleFont>
          <Drawer mode={mode} size={size} setImageSource={setImageSource} />

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
