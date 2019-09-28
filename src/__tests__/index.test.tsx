import React from "react"
import { act, render } from "@testing-library/react"

test("Example Test", () => {
  const { getByTestId } = render(<div data-testid="target">hello</div>)
  expect(getByTestId("target").textContent).toEqual("hello")
})
