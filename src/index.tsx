import React, { useRef, useState, MouseEventHandler } from "react"
import { render } from "react-dom"
import styled, { css } from "styled-components"
import { MaskCanvas } from "./MaskCanvas"

const ResultCanvas = styled.div`
  background: black;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 2em;
  ${({ mask }) => css`
    background-image: url(${mask});
  `}
`
const App = () => {
  const ref = useRef()
  const [mask, setMask] = useState(null)
  console.log(mask)
  return (
    <div>
      <ResultCanvas mask={mask}>ショッパーズ</ResultCanvas>
      <MaskCanvas onChangeMask={(cnvMask) => setMask(cnvMask)}></MaskCanvas>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
