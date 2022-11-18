import React from "react"
import styled from "styled-components"

const BodyWrapper = styled.div`
  position: relative;
  left: 23%;
  padding-top: 80px;
  max-width: 780px;
`

const Body = ({ children }) => {
  return <BodyWrapper>{children}</BodyWrapper>
}

export default Body
