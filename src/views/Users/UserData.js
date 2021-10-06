import {useState } from 'react'
import Tabs from './Tabs'
import UserDetails from './components/UserDetails'
import ChangePassword from './components/ChangePassword'
import Courses from "./components/Courses"
import Workshop from "./components/Workshop"
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const UserData = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Row>
        <Col className='mb-2 mb-md-0' md='3'>
        <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md='9'>
        <Card>
            <CardBody>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                <UserDetails />
                </TabPane>
                <TabPane tabId='2'>
                <ChangePassword />
                </TabPane>
                <TabPane tabId='3'>
                  <Courses />
                </TabPane>
                <TabPane tabId='4'>
                  <Workshop />
                </TabPane>
            </TabContent>
            </CardBody>
        </Card>
        </Col>
    </Row>
  )
}

export default UserData
