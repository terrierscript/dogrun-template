import React, { useRef, useLayoutEffect, useState } from "react"
import styled, { css } from "styled-components"
import { SampleFont } from "../Fonts"
import { ScaleCaclurator, Cloak } from "./ScaleCalcurator"
import { OutputCanvas } from "./OutputCanvas"
import { DrawCanvas } from "./DrawCanvas"
import { nnyohhaMask, clearMask } from "./presetMask"
const Container = styled.div`
  padding: 1em 0;
  ${({ height }) => css`
    min-height: ${height}px;
  `}
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
            checked={modeName === mode}
            onChange={() => {
              onChange(modeName)
            }}
            onClick={() => {
              onChange(modeName)
            }}
          />
          {modeName}
        </label>
      ))}
    </div>
  )
}

export const MaskCanvas = ({ text, onChangeMask, fontSize }) => {
  const sampleRef = useRef<HTMLElement>()
  const defaultImageRef = useRef<HTMLImageElement>()
  const clearImageRef = useRef<HTMLImageElement>()
  const [scale, setScale] = useState(1)
  const [imageSource, _setImageSource] = useState<{
    source: HTMLCanvasElement | HTMLImageElement
    timestamp: number
  } | null>(null)
  const [mode, setMode] = useState("mask")
  const [size, setSize] = useState([0, 0])

  const setImageSource = (elm: HTMLCanvasElement | HTMLImageElement) => {
    _setImageSource({
      source: elm,
      timestamp: new Date().getTime()
    })
  }
  useLayoutEffect(() => {
    if (!sampleRef.current) return
    setSize([sampleRef.current.clientWidth, sampleRef.current.clientHeight])
    if (defaultImageRef.current) {
      setImageSource(defaultImageRef.current)
    }
  }, [])

  return (
    <>
      <Cloak>
        <ScaleCaclurator
          text={text}
          fontSize={fontSize}
          onChangeScale={(newScale) => {
            setScale(newScale)
          }}
        />
        <img src={nnyohhaMask} ref={defaultImageRef} />
        <img src={clearMask} ref={clearImageRef} />
      </Cloak>
      <div>
        <Mode
          mode={mode}
          onChange={(mode) => {
            setMode(mode)
          }}
        />
        <button
          onClick={() => {
            if (clearImageRef.current) {
              setImageSource(clearImageRef.current)
            }
          }}
        >
          Clear Mask
        </button>
        <Container height={size[1]}>
          <SampleFont ref={sampleRef}>{text}</SampleFont>
          <DrawCanvas
            mode={mode}
            size={size}
            defaultSource={imageSource && imageSource.source}
            setImageSource={setImageSource}
          />

          {imageSource && (
            <OutputCanvas
              baseColor={"black"}
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
