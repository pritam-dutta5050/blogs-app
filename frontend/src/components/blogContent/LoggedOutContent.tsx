import React from 'react'
import { Card, Container } from 'react-bootstrap'
import styles from "./LoggedOutContent.module.css";

const LoggedOutContent = () => {

  console.log("LoggedOutComponent rendered");
  return (
    <Card className={`${styles.msgCard}`}>Please register with us by clicking signup button or login if you are already an user</Card>
  )
}

export default LoggedOutContent