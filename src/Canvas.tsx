import styled, { css } from "styled-components"
export const Canvas = styled.canvas`
  position: absolute;
  border: 1px solid red;
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `};
`
