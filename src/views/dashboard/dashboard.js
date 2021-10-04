import { Card, CardBody, CardText, Row, Col } from 'reactstrap'
import Avatar from '@components/avatar'
import {getUserData} from '../../utility/Utils'

// import decorationLeft from '@src/assets/images/elements/decore-left.png'
// import decorationRight from '@src/assets/images/elements/decore-right.png'
import {
    ShoppingBag,
    Award,
    Activity,
    Users,
    Star
  } from 'react-feather'

const statsData = [
    {
        title: 'Videos',
        count: '0',
        color: 'bg-light-info',
        icon: <ShoppingBag size={24} />
    },
    {
        title: 'Courses',
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
    },
    {
        title: 'Rank',
        count: '10',
        icon: <Star size={24} />
    }
]

const Dashboard = () => {
  return (
      <>
    <Row>
      {<StatsCard data={statsData} />}
    </Row>

    {getUserData().role === 'BAC_USER' && (
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
</>
  )
}

const StatsCard = (props) => {
    const newData = getUserData().role !== 'BAC_USER' ? props.data.filter(i => i.title !== 'Rank') : props.data
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
