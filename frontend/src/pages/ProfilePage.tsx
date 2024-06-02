import React, { useContext } from 'react'
import { UserContext } from '../store/loggedInUser-store'

const ProfilePage = () => {

  const {user} = useContext(UserContext);
  return (
    <center>
      {user?._id}
    </center>
  )
}

export default ProfilePage