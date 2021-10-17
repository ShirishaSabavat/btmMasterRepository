import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone } from 'react-feather'
import { useSelector } from 'react-redux'

const Profile = () => {

    const userData = useSelector(state => state.auth.userData)

  // ** render user img
  const renderUserImg = () => {
    const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
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
                    <CardText tag='span'>
                      {userData.user.email}
                    </CardText>
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

            <div className='d-flex align-items-center user-total-numbers'>
              <div className='d-flex align-items-center mr-2'>
                <div className='color-box p-1 bg-light-primary'>
                ₹
                </div>
                <div className='ml-1'>
                  <h5 className='mb-0'>N/A</h5>
                  <small>Monthly Sales</small>
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='color-box p-1 bg-light-success'>
                  <TrendingUp className='text-success' />
                </div>
                <div className='ml-1'>
                  <h5 className='mb-0'>N/A</h5>
                  <small>Annual Profit</small>
                </div>
              </div>
            </div>
          </Col>

          <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <User className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Username
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {userData.user.email}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Check className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Status
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0'>
                  {userData.user.status}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Star className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Role
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0'>
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
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Contact
                  </CardText>
                </div>
                <CardText className='mb-0'>{userData.user.phone}</CardText>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Profile
