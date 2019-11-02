import React, {
  useRef,
  useState,
  MouseEventHandler,
  useLayoutEffect
} from "react"
import { render } from "react-dom"
import { MaskCanvas } from "./draw/MaskCanvas"
import { ResultFont } from "./Fonts"

const App = () => {
  const ref = useRef<HTMLElement>()
  const [mask, setMask] = useState(null)
  const [text, setText] = useState("ショッパーズ")
  // const [width, setWidth] = useState(0)
  const fontSize = "1em"
  return (
    <div>
      <ResultFont ref={ref} mask={mask} fontSize={fontSize}>
        {text}
      </ResultFont>
      {/* <img src={mask || ""} /> */}
      <div>
        あの<ResultFont mask={mask}>{text}</ResultFont>の すきとおった風、
        <br />
        夏でも底に冷たさをもつ青いそら、 うつくしい森で飾られたモーリオ市、
        <br />
        郊外のぎらぎらひかる草の波。
        <br />
      </div>
      <MaskCanvas
        fontSize={"1em"}
        text={text}
        onChangeMask={(cnvMask) => setMask(cnvMask)}
      ></MaskCanvas>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
