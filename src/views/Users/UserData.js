import {useState, useEffect } from 'react'
import { Row, Col, TabContent, TabPane, Card, CardBody, CardText, Badge, UncontrolledTooltip } from 'reactstrap'
import Avatar from '@components/avatar'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone, Award, Anchor } from 'react-feather'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {toast} from 'react-toastify'
import {PRODUCTION_URL} from '../../utility/serverSettings'
import { fetchUserById } from "../../redux/actions/user/index"
import Tabs from './Tabs'
import UserDetails from './components/UserDetails'
import ChangePassword from './components/ChangePassword'
import Courses from "./components/Courses"
import Workshop from "./components/Workshop"
import UserKyc from "./components/UserKyc"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const UserData = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user)

  const {userId} = useParams()

  useEffect(() => {
    dispatch(fetchUserById(userId))
  }, [])

  const renderUserImg = () => {
    const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={userData.userData?.name ?? 'BA'}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
  }

  return (
    <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Row>
                <Col xl='6' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
                  <div className='user-avatar-section mb-2'>
                    <div className='d-flex justify-content-start'>
                      {renderUserImg()}
                      <div className='d-flex flex-column ml-1'>
                        <div className='user-info mb-1'>
                          <h4 className='mb-0'>{userData.userData?.name}</h4>

                          <CopyToClipboard text={`${PRODUCTION_URL}home?referral=${userData.userData?.referralCode}`}
                            onCopy={() => toast.success("Referral link copied!")}>
                            <Badge id="user-referral-link" pill className="mt-1 cursor pointer" color='primary'>
                              {userData.userData?.referralCode}
                            </Badge>
                          </CopyToClipboard>
                          <UncontrolledTooltip placement='top' target='user-referral-link'>
                            Click to copy referral link
                          </UncontrolledTooltip>


                        </div>
                        <div className='d-flex flex-wrap align-items-center'>
                          {/* <Button.Ripple tag={Link} to={`/apps/user/edit/${selectedUser.id}`} color='primary'>
                            Edit
                          </Button.Ripple>
                          <Button.Ripple className='ml-1' color='danger' outline>
                            Delete
                          </Button.Ripple> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {userData.userData?.role === 'BAC_USER' && (
                      <div className='d-flex align-items-center user-total-numbers'>
                      <div className='d-flex align-items-center mr-2'>
                          <div className='color-box p-1 bg-light-primary'>
                          ₹
                          </div>
                          <div className='ml-1'>
                          <h5 className='mb-0'>{userData.userData?.wallet?.toLocaleString('en-IN')}</h5>
                          <small>Wallet</small>
                          </div>
                      </div>
                      <div className='d-flex align-items-center'>
                          <div className='color-box p-1 bg-light-success'>
                          <Award className='text-success' />
                          </div>
                          <div className='ml-1'>
                          <h5 className='mb-0'>{userData.userData?.rank}</h5>
                          <small>Rank</small>
                          </div>
                      </div>
                      </div>
                  )}

                </Col>

                <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
                  <div className='user-info-wrapper'>
                    <div className='d-flex flex-wrap align-items-center'>
                      <div className='user-info-title'>
                        <User className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Username: 
                        </CardText>
                      </div>
                      <CardText className='mb-0 ml-1'>
                        <a href={`mailto:${userData.userData?.email}`}>{userData.userData?.email}</a>
                      </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <Check className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Status: 
                        </CardText>
                      </div>
                      <CardText className='text-capitalize mb-0 ml-1'>
                        {userData.userData?.status}
                      </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <Star className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Role: 
                        </CardText>
                      </div>
                      <CardText className='text-capitalize mb-0 ml-1'>
                        {userData.userData?.role.replace('_USER', '')}
                      </CardText>
                    </div>
                    {/* <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <Flag className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Country
                        </CardText>
                      </div>
                      <CardText className='mb-0'>{selectedUser !== null ? selectedUser.country : 'England'}</CardText>
                    </div> */}
                    <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <Phone className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Contact: 
                        </CardText>
                      </div>
                      <CardText className='mb-0 ml-1'> <a href={`tel:${userData.userData?.phone}`}>{userData.userData?.phone}</a> </CardText>
                    </div>

                    <div className='d-flex flex-wrap align-items-center'>
                      <div className='user-info-title'>
                        <Anchor className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          KYC: 
                        </CardText>
                      </div>
                      <CardText className='mb-0 ml-1'> {userData.userData?.kycStatus}</CardText>
                    </div>

                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col className='mb-2 mb-md-0' md='3'>
          <Tabs userRole={userData.userData?.role} activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        
        <Col md='9'>
          <Card>
              <CardBody>
              <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <UserDetails userData={userData.userData} />
                  </TabPane>

                  {userData.userData?.role === 'BAC_USER' && (
                    <TabPane tabId='5'>
                      <UserKyc userData={userData.userData} />
                    </TabPane>
                  )}

                  <TabPane tabId='2'>
                    <ChangePassword />
                  </TabPane>
                  <TabPane tabId='3'>
                    <Courses purchasedCources={userData.purchasedCources} />
                  </TabPane>
                  <TabPane tabId='4'>
                    <Workshop purchasedWorkshops={userData.purchasedWorkshops} />
                  </TabPane>
              </TabContent>
              </CardBody>
          </Card>
        </Col>
    </Row>
  )
}

export default UserData
