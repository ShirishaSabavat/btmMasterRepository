import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '@components/avatar'
import { isUserLoggedIn } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { Chip } from '@mui/material'

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Power, Globe, List } from 'react-feather'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userData = useSelector(state => state.auth.userData)

  const userAvatar = userData.user.avatar || '/assets/images/default-user.jpg'

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{userData.user.name}</span>
          <Chip size="small" label={userData.user.role.replace('_USER', '')} color="primary" />
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='/profile' >
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/wallet' >
          <List size={14} className='mr-75' />
          <span className='align-middle'>Transactions</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/home' >
          <Globe size={14} className='mr-75' />
          <span className='align-middle'>View Site</span>
        </DropdownItem>
        <DropdownItem onClick={() => { dispatch(handleLogout()); history.push('/login') }}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
