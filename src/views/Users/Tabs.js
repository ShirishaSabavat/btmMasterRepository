import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Video, Briefcase, Anchor } from 'react-feather'

const Tabs = ({ userRole, activeTab, toggleTab, isDefaultBac }) => {

  return (
    <Nav className='nav-left' pills vertical>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='mr-1' />
          <span className='font-weight-bold'>General Settings</span>
        </NavLink>
      </NavItem>

      {userRole === 'BAC_USER' && (
        <NavItem>
          <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
            <Anchor size={18} className='mr-1' />
            <span className='font-weight-bold'>KYC</span>
          </NavLink>
        </NavItem>
      )}

      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>Change Password</span>
        </NavLink>
      </NavItem>

      {!isDefaultBac && (
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Video size={18} className='mr-1' />
          <span className='font-weight-bold'>Courses</span>
        </NavLink>
      </NavItem>
      )}

      {!isDefaultBac && (
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <Briefcase size={18} className='mr-1' />
          <span className='font-weight-bold'>Workshop</span>
        </NavLink>
      </NavItem>
      )}

    </Nav>
  )
}

export default Tabs
