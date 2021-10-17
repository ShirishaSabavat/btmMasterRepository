import { Card, CardBody, CardText, Row, Col, CardHeader, CardTitle, Button, Input } from 'reactstrap'
import Avatar from '@components/avatar'
import {getUserData} from '../../utility/Utils'
import PieChart from "./Charts/PieChart"
import LineChart from './Charts/LineChart'
import BarChart from './Charts/BarChart'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// import decorationLeft from '@src/assets/images/elements/decore-left.png'
// import decorationRight from '@src/assets/images/elements/decore-right.png'
import {
    ShoppingBag,
    Award,
    Activity,
    Users,
    Star,
    Share,
    Share2,
    Video
  } from 'react-feather'
import { useSelector } from 'react-redux'

const statsData = [
    {
        title: 'Users',
        count: '0',
        role: ['ADMIN'],
        color: 'bg-light-danger',
        icon: <Users size={24} />
    },
    {
        title: 'Videos',
        count: '0',
        color: 'bg-light-info',
        role: ['ADMIN'],
        icon: <Video size={24} />
    },
    {
        title: 'Courses',
        count: '0',
        color: 'bg-light-success',
        role: ['ADMIN', 'USER', 'BAC_USER'],
        icon: <Award size={24} />
    },
    {
        title: 'Workshops',
        count: '0',
        role: ['ADMIN', 'USER', 'BAC_USER'],
        icon: <Activity size={24} />
    },
    {
        title: 'My Clients',
        count: '0',
        role: ['BAC_USER'],
        color: 'bg-light-danger',
        icon: <Users size={24} />
    },
    {
        title: 'Total Sales',
        count: '0',
        role: ['BAC_USER'],
        icon: <ShoppingBag size={24} />
    },
    {
        title: 'Earningss',
        count: '0',
        role: ['BAC_USER'],
        icon: <Activity size={24} />
    }
]

const Dashboard = () => {

    const userData = useSelector(state => state.auth.userData)

    const handleCopy = ({ target: { value } }) => {
        setValue(value)
      }
    
      const onCopy = () => {
        toast.success("Referral link copied!", {
            position: toast.POSITION.BOTTOM_CENTER
        })
      }

  return (
    <>
    <Row>
      {<StatsCard data={statsData} />}
    </Row>

    {userData.user.role === 'BAC_USER' && (
    <Row>
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                {/* <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' /> */}
                {/* <img className='congratulations-img-right' src={decorationRight} alt='decor-right' /> */}
                <Avatar icon={<Share2 size={28} />} className='shadow' color='success' size='xl' />
                <div className='text-center'>
                <h1 className='mb-1 text-white'>Share & Earn</h1>
                <CardText className='m-auto w-75'>
                    Now you can share your referral code and earn <strong>10%</strong> comissions on each purchase.
                </CardText>

                {userData?.user.kycStatus !== 'VERIFIED' && (
                <Button.Ripple disabled className="mt-2" size="small" color='secondary'>
                    KYC not verified yet
                </Button.Ripple>
                )}

                {userData?.user.kycStatus === 'VERIFIED' && (
                <CopyToClipboard onCopy={onCopy} text={`https://businessaacharya.com/home?referral=${userData.user.referralCode}`}>
                    <Button.Ripple className="mt-2" size="small" color='warning'>
                      Copy!
                    </Button.Ripple>
                </CopyToClipboard>
                )}  

                </div>
            </CardBody>
        </Card>
    </Row>
    )}


    {userData.user.role === 'ADMIN' && (
    <>
        <Row>
            <Col sm="12" md="4">
                <PieChart title="Online Courses" data={{series:[400, 600]}} />
            </Col>
            <Col sm="12" md="4">
                <PieChart title="WorkShop" data={{series:[351, 649]}} />
            </Col>
            <Col sm="12" md="4">
                <PieChart title="Users" data={{series:[600, 400]}} />
            </Col>
        </Row>
        <Row>
            <Col sm='12' md="8">
                <LineChart />
            </Col>
            <Col sm='12' md="4">
                <BarChart />
            </Col>
        </Row>
    </>
    )}
    </>
  )
}

const StatsCard = (props) => {
    const userRole = getUserData().user.role
    const newData = props.data.filter(i => i.role.includes(getUserData().user.role))
    // console.log({newData})
    // console.log(props.data.filter(i => i.role.includes('USER')))
    return newData.map(val => {
        return (
            <Col md="3" sm="12">
                <Card>
                <CardBody>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2 className='font-weight-bolder mb-0'>{val.title}</h2>
                            <p className='card-text'>{val.count}</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 ${ val.color ? val.color : 'bg-light-primary' }`}>
                            <div className='avatar-content'>{val.icon}</div>
                        </div>
                    </div>
                </CardBody>
                </Card>
            </Col>
        )
    })
    
}

export default Dashboard
