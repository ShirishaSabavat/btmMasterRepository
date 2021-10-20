// ** Dropdowns Imports
import { Fragment } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'
import { Chip } from '@mui/material'
import { InfoRounded, Check } from '@mui/icons-material'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  const history = useHistory()

  const userData = useSelector(state => state.auth.userData)

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>

        {userData?.user.role === 'BAC_USER' && (
        <div className="ml-2">
          <Chip 
            label={`₹ ${userData?.user.wallet?.toLocaleString('en-IN')}`} 
            title="Wallet"
            onClick={() => history.push('/wallet')} 
            color="info"  />
        </div>
        )}
      </div>


      <ul className='nav navbar-nav align-items-center ml-auto'>
        
        {userData?.user.role === 'BAC_USER' && (
          <div className="mr-3">
            <Chip 
              icon={userData?.user.kycStatus === 'VERIFIED' ? <Check /> : <InfoRounded /> }
              size="small" 
              title="KYC Status"
              label={userData?.user.kycStatus === 'PENDING' ? "KYC Incomplete" : userData?.user.kycStatus === 'PROCESSING' ? "KYC Processing" : "KYC Verified" } 
              variant="outlined" 
              onClick={() => history.push('/kyc')} 
              color={userData?.user.kycStatus === 'PENDING' ? "error" : userData?.user.kycStatus === 'PROCESSING' ? "warning" : "success" }  />
          </div>
        )}

        <UserDropdown />

      </ul>

    </Fragment>
  )
}
export default NavbarUser
