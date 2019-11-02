import styled, { css } from "styled-components"

export const LargeFont = styled.div`
  display: inline-block;
  font-size: 3em;
`
export const SampleFont = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: 3em;
  color: rgba(255, 0, 0, 1);
`
export const ResultFont = styled.span`
  display: inline-block;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  ${({ mask, fontSize }) => css`
    background-image: url(${mask});
    font-size: ${fontSize};
  `}
`
