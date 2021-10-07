import {useState, useEffect } from 'react'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"

import { fetchUserById } from "../../redux/actions/user/index"
import Tabs from './Tabs'
import UserDetails from './components/UserDetails'
import ChangePassword from './components/ChangePassword'
import Courses from "./components/Courses"
import Workshop from "./components/Workshop"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const UserData = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  const history = useHistory()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user)

  const uid = history.location?.params?.id

  useEffect(() => {
    dispatch(fetchUserById(uid))
  }, [uid])

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
                <UserDetails userData={userData} />
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
