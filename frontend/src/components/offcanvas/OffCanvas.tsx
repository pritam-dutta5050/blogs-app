import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import Sidebar from '../sidebar/Sidebar'
interface OffcanvasProps{
    showOffcanvas: boolean,
    hideOffcanvas: () => void,
}
const OffCanvas = ({showOffcanvas, hideOffcanvas}:OffcanvasProps) => {
  return (
    <Offcanvas show={showOffcanvas} onHide={hideOffcanvas} style={{width:"fit-content"}}>
          <Sidebar />
      </Offcanvas>
  )
}

export default OffCanvas