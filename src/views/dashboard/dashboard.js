import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, Media } from 'reactstrap'
import Avatar from '@components/avatar'
// import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import {
    Eye,
    MessageSquare,
    ShoppingBag,
    Heart,
    Award,
    Truck,
    Cpu,
    Server,
    Activity,
    Users,
    AlertOctagon
  } from 'react-feather'

const statsData = [
    {
        title: 'Videos',
        count: '0',
        color: 'bg-light-info',
        icon: <ShoppingBag size={24} />
    },
    {
        title: 'Cources',
        count: '0',
        color: 'bg-light-success',
        icon: <Award size={24} />
    },
    {
        title: 'Users',
        count: '0',
        color: 'bg-light-danger',
        icon: <Users size={24} />
    },
    {
        title: 'Schedules',
        count: '0',
        icon: <Activity size={24} />
    }
]

const Dashboard = () => {
  return (
    <Row>
      {<StatsCard data={statsData} />}
    </Row>
  )
}

const StatsCard = (props) => {
    return props.data.map(val => {
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
