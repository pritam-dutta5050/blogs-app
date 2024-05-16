import React from 'react'
import { Button } from 'react-bootstrap'

interface NavBarLoggedOutViewProps{
  onSignupClicked: ()=>void;
  onLoginClicked: ()=>void;
}

const NavBarLoogedOutView = ({onSignupClicked, onLoginClicked}: NavBarLoggedOutViewProps) => {
  return (
    <>
        <Button onClick={onSignupClicked}>Signup</Button>
        <Button onClick={onLoginClicked}>Login</Button>
    </>
  )
}

export default NavBarLoogedOutView