import styled, { css } from "styled-components"

export const LargeFont = styled.div`
  font-weight: bold;
  font-size: 3em;
`
export const SampleFont = styled(LargeFont)`
  position: absolute;
  color: rgba(255, 0, 0, 1);
`
export const ResultFont = styled(LargeFont)`
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  ${({ mask }) => css`
    background-image: url(${mask});
  `}
`
