import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText, Badge, Button, Row, Col, UncontrolledTooltip, TabPane, Nav, NavItem, TabContent, NavLink } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Lock, Phone, Award, Anchor } from 'react-feather'
import { useSelector } from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {toast} from 'react-toastify'
import {PRODUCTION_URL} from '../../utility/serverSettings'
import UserDetails from '../Users/components/UserDetails'
import ChangePassword from '../Users/components/ChangePassword'
import { useState } from 'react'

const Profile = () => {

  const userData = useSelector(state => state.auth.userData)

  const [tab, setTab] = useState('1')

  // ** render user img
  const renderUserImg = () => {
      return (
        <Avatar
          initials
          color={'light-success'}
          className='rounded'
          content={userData.user.name ?? 'BA'}
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
    <>
    <Card>
      <CardBody>
        <Row>
          <Col xl='6' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section mb-2'>
              <div className='d-flex justify-content-start'>
                {renderUserImg()}
                <div className='d-flex flex-column ml-1'>
                  <div className='user-info mb-1'>
                    <h4 className='mb-0'>{userData.user.name}</h4>
                    
                    <CopyToClipboard text={`${PRODUCTION_URL}home?referral=${userData.user.referralCode}`}
                      onCopy={() => toast.success("Referral link copied!")}>
                      <Badge id="user-referral-link" pill className="mt-1 cursor pointer" color='primary'>
                        {userData.user.referralCode}
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

            {userData.user.role === 'BAC_USER' && (
                <div className='d-flex align-items-center user-total-numbers'>
                <div className='d-flex align-items-center mr-2'>
                    <div className='color-box p-1 bg-light-primary'>
                    ₹
                    </div>
                    <div className='ml-1'>
                    <h5 className='mb-0'>{userData.user.wallet.toLocaleString('en-IN')}</h5>
                    <small>Wallet</small>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='color-box p-1 bg-light-success'>
                    <Award className='text-success' />
                    </div>
                    <div className='ml-1'>
                    <h5 className='mb-0'>{userData.user.rank}</h5>
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
                  {userData.user.email}
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
                  {userData.user.status}
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
                  {userData.user.role}
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
                <CardText className='mb-0 ml-1'> {userData.user.phone}</CardText>
              </div>

              {userData.user.role === 'BAC_USER' && (
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Anchor className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    KYC: 
                  </CardText>
                </div>
                <CardText className='mb-0 ml-1'> {userData.user.kycStatus}</CardText>
              </div>
              )}
              
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>

    <Row>
      <Col className='mb-2 mb-md-0' md='3'>
        <Nav className='nav-left' pills vertical>
          <NavItem>
            <NavLink active={tab === '1'} onClick={() => setTab('1')}>
              <User size={18} className='mr-1' />
              <span className='font-weight-bold'>General Settings</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink active={tab === '2'} onClick={() => setTab('2')}>
              <Lock size={18} className='mr-1' />
              <span className='font-weight-bold'>Change Password</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      
      <Col md='9'>
        <Card>
            <CardBody>
            <TabContent activeTab={tab}>
              <TabPane tabId='1'>
                <UserDetails profile={true} userData={userData.user} />
              </TabPane>
              
              <TabPane tabId='2'>
                <ChangePassword profile={true} />
              </TabPane>

            </TabContent>
            </CardBody>
        </Card>
      </Col>
    </Row>
    
    </>
  )
}

export default Profile
