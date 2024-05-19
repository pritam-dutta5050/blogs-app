import React from 'react'
import { Container } from 'react-bootstrap'

const LoggedOutContent = () => {

  console.log("LoggedOutComponent rendered");
  return (
    <Container>Please register with us by clicking signup button or login if you are already an user</Container>
  )
}

export default LoggedOutContent