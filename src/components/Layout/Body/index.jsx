import React from "react"
import styled from "styled-components"

const BodyWrapper = styled.div`
  position: relative;
  left: 18%;
  padding-top: 80px;
  max-width: 900px;
`

const Body = ({ children }) => {
  return <BodyWrapper>{children}</BodyWrapper>
}

export default Body
