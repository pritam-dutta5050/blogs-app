import React from 'react'
import { Offcanvas } from 'react-bootstrap'
interface OffcanvasProps{
    showOffcanvas: boolean,
    hideOffcanvas: () => void,
}
const OffCanvas = ({showOffcanvas, hideOffcanvas}:OffcanvasProps) => {
  return (
    <Offcanvas show={showOffcanvas} onHide={hideOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
  )
}

export default OffCanvas