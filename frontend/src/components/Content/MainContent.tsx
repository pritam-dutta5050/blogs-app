import React, { useContext } from 'react'
import { UserContext } from '../../store/loggedInUser-store'
import LoggedOutContent from './LoggedOutContent';
import LoggedInContent from './LoggedInContent';

const MainContent = () => {
    const {user} = useContext(UserContext);
  return (
    <div>
        {user ? <LoggedInContent /> : <LoggedOutContent />}
    </div>
  )
}

export default MainContent