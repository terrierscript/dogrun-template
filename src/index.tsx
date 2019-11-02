import React, {
  useRef,
  useState,
  useLayoutEffect,
  MouseEventHandler
} from "react"
import { render } from "react-dom"
import styled, { css } from "styled-components"

const ResultCanvas = styled.div`
  background-clip: text;
  font-weight: bold;
  font-size: 18px;
`
const Container = styled.div`
  /* position: relative; */
  border: 1px solid black;
`

const Ghost = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  ${({ rect }) => {
    if (!rect) {
      return
    }
    const [x, y, h, w] = rect
    return css`
      top: ${y}px;
      left: ${x}px;
      width: ${h}px;
      height: ${w}px;
    `
  }}
`
const MaskCanvas = () => {
  const ref = useRef<HTMLCanvasElement>()
  const ctxRef = useRef<CanvasRenderingContext2D>()
  const [startPoint, setStartPoint] = useState<number[] | null>(null)
  const [url, setUrl] = useState()
  const [draw, setDraw] = useState(false)
  const [currentRect, setCurrentRect] = useState<number[] | null>(null)

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
  useLayoutEffect(() => {
    // setInterval(() => {
    //   if (!ctxRef.current) {
    //     return
    //   }
    //   const ctx = ctxRef.current
    //   const img = ctx.createImageData(100, 100)
    //   ctx.putImageData(img, 0, 0)
    //   const imgUrl = ref.current.toDataURL("image/png")
    //   setUrl(imgUrl)
    // }, 1000)
  }, [])
  console.log(url)

  const getCanvasPos = (mx, my) => {
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
  const downHander = (mx, my) => {
    const ctx = ctxRef.current
    if (!ctx) return

    ctx.beginPath()
    setStartPoint(getCanvasPos(mx, my))
    setCurrentRect(null)
  }
  const reset = () => {
    setStartPoint(null)
    setCurrentRect(null)
  }
  const getRect = (x1, y1, x2, y2) => {
    const x = Math.min(x1, x2)
    const w = Math.abs(x1 - x2)
    const y = Math.min(y1, y2)
    const h = Math.abs(y1 - y2)
    return [x, y, w, h]
  }
  const upHandler = (mx, my) => {
    setStartPoint(null)
    const ctx = ctxRef.current
    if (!ctx) return
    if (!currentRect) return
    ctx.fillRect(...currentRect)
    reset()
  }
  const moveHandler = (mx, my) => {
    if (!startPoint) return
    const [bx, by] = startPoint
    const rect = getRect(bx, by, mx, my)
    setCurrentRect(rect)
  }
  return (
    <Container>
      <canvas
        ref={ref}
        onMouseDown={(e) => downHander(e.clientX, e.clientY)}
        onMouseOut={(e) => upHandler(e.clientX, e.clientY)}
        onMouseUp={(e) => upHandler(e.clientX, e.clientY)}
        onMouseMove={(e) => moveHandler(e.clientX, e.clientY)}
      ></canvas>
      {/* <Ghost rect={currentRect} /> */}
    </Container>
  )
}

const App = () => {
  return (
    <div>
      <MaskCanvas></MaskCanvas>
      <ResultCanvas>ショッパーズ</ResultCanvas>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
