import React from "react"
import styled from "styled-components"

const BodyWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 80px;
  max-width: 900px;
`

const Body = ({ children }) => {
  return <BodyWrapper>{children}</BodyWrapper>
}

export default Body
