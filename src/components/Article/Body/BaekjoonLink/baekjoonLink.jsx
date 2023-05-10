import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { HiLink } from "react-icons/hi"

const Wrapper = styled.div`
  display: flex;
  margin: 0 16px 40px;
  cursor: pointer;
  height: 90px;
  background: #f1f3f5;
  transition: 0.15s all;
  border-radius: 5px;
  &:hover {
    background: #e6e9eb;
  }
  & svg{
    width: 50px;
    height: 50px;
    margin: auto 20px;
    fill: #636a70;
  }
`

const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`
const Title = styled.div`
  font-size: 20px;
`

const PlainLink = styled.div`
  color: gray;
  font-size: 14px;
`
const BaekjoonLink = ({ title }) => {
  const [problemNumber, setProblemNumber] = useState(0);
  const [problemName, setProblemName] = useState('');
  useEffect(() => {
    const t = title.split('-')

    const numRegex = /-?(?:[0-9]+(?:\.[0-9]*)?|(?:[0-9]+)?\.[0-9]+)/g
    setProblemNumber(numRegex.exec(t[0])[0])
    setProblemName(t[1].trim())
  },[])
  const navigateToProblem = () => {
    window.open('https://www.acmicpc.net/problem/' + problemNumber)
  }
  return (
    <Wrapper
      onClick={ navigateToProblem }
    >
      <HiLink/>
      <Description>
        <Title>백준 {problemNumber}번 - {problemName}</Title>
        <PlainLink>https://www.acmicpc.net/problem/{problemNumber}</PlainLink>
      </Description>
    </Wrapper>
  )
}

export default BaekjoonLink