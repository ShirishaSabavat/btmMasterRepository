import React, {useState } from 'react'

import { Airplay, CreditCard, User, Home, File } from 'react-feather'
import { Card, CardHeader, CardTitle, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

import PersonalInfoComponent from "./Components/PersonalInfoComponent"
import PanComponent from "./Components/PanComponent"
import GSTComponent from "./Components/GSTComponent"
import BankAccountComponent from "./Components/BankAccountComponent"
import AadharComponent from "./Components/AadharComponent"
import AddressComponent from "./Components/AddressComponent"

const KYC = () => {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <Card>
      <CardHeader><CardTitle>KYC Settings</CardTitle></CardHeader>
      <hr className="m-0" />
        <Nav tabs className='p-1'>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}
            >
              <User size={14} />
              <span className='align-middle'>Personal Info</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                toggle('2')
              }}
            >
              <CreditCard size={14} />
              <span className='align-middle'>Pan Details</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}
            >
              <CreditCard size={14} />
              <span className='align-middle'>GST Details</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '4'}
              onClick={() => {
                toggle('4')
              }}
            >
              <Airplay size={14} />
              <span className='align-middle'>Bank Account</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '5'}
              onClick={() => {
                toggle('5')
              }}
            >
              <File size={14} />
              <span className='align-middle'>Addhar Details</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '6'}
              onClick={() => {
                toggle('6')
              }}
            >
              <Home size={14} />
              <span className='align-middle'>Bussiness Address</span>
            </NavLink>
          </NavItem>
        </Nav>
        <hr className="m-0" />
        <TabContent className='py-50' activeTab={active}>
          <TabPane tabId='1'>
              <PersonalInfoComponent />
          </TabPane>
          <TabPane tabId='2'>
              <PanComponent />
          </TabPane>
          <TabPane tabId='3'>
              <GSTComponent />
          </TabPane>
          <TabPane tabId='4'>
              <BankAccountComponent />
          </TabPane>
          <TabPane tabId='5'>
              <AadharComponent />
          </TabPane>
          <TabPane tabId='6'>
              <AddressComponent />
          </TabPane>
        </TabContent>
    </Card>
  )
}
export default KYC
