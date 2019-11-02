import React, { useRef, useState, MouseEventHandler } from "react"
import { render } from "react-dom"
import { MaskCanvas } from "./MaskCanvas"
import { ResultFont } from "./Fonts"

const App = () => {
  const ref = useRef()
  const [mask, setMask] = useState(null)
  const [text, setText] = useState("ショッパーズ")
  return (
    <div>
      <ResultFont mask={mask}>{text}</ResultFont>
      <img src={mask} />
      <MaskCanvas
        text={text}
        onChangeMask={(cnvMask) => setMask(cnvMask)}
      ></MaskCanvas>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
