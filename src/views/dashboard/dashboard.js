import { Card, CardBody, CardText, Row, Col } from 'reactstrap'
import Avatar from '@components/avatar'
import {getUserData} from '../../utility/Utils'
import PieChart from "./Charts/PieChart"
import LineChart from './Charts/LineChart'
import BarChart from './Charts/BarChart'

// import decorationLeft from '@src/assets/images/elements/decore-left.png'
// import decorationRight from '@src/assets/images/elements/decore-right.png'
import {
    ShoppingBag,
    Award,
    Activity,
    Users,
    Star,
    Video
  } from 'react-feather'

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
        title: 'MyClients',
        count: '0',
        role: ['BAC_USER'],
        color: 'bg-light-danger',
        icon: <Users size={24} />
    },
    {
        title: 'Workshops',
        count: '0',
        role: ['ADMIN', 'USER', 'BAC_USER'],
        icon: <Activity size={24} />
    },
    {
        title: 'Total Sales',
        count: '0',
        role: ['BAC_USER'],
        icon: <ShoppingBag size={24} />
    },
    {
        title: 'Total Earningss',
        count: '0',
        role: ['BAC_USER'],
        icon: <Activity size={24} />
    }
]

const Dashboard = () => {

  return (
    <>
    <Row>
      {<StatsCard data={statsData} />}
    </Row>

    {getUserData()?.user?.role === 'BAC_USER' && (
    <Row>
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                {/* <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' /> */}
                {/* <img className='congratulations-img-right' src={decorationRight} alt='decor-right' /> */}
                <Avatar icon={<Star size={28} />} className='shadow' color='primary' size='xl' />
                <div className='text-center'>
                <h1 className='mb-1 text-white'>Rank</h1>
                <CardText className='m-auto w-75'>
                    You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.
                </CardText>
                </div>
            </CardBody>
        </Card>
    </Row>
    )}


    {getUserData()?.user?.role === 'ADMIN' && (
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
