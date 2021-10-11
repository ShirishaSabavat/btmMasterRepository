import React, { useEffect } from "react"
// import Avatar from '@components/avatar'
import { Calendar, MapPin } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Card, CardTitle, CardBody, CardText, Media } from 'reactstrap'
import { Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Typography, 
    Chip, 
    List, 
    ListItem, 
    IconButton, 
    ListItemAvatar, 
    Avatar, 
    ListItemText, 
    ListItemButton, 
    ListItemIcon} from '@mui/material'
import { fetchMyWorkshops } from '../../redux/actions/courses'
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../utility/serverSettings"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PlayCircleFilled as PlayCircleFilledIcon, Folder as FolderIcon, Check} from '@mui/icons-material'
import Empty from '../../components/loading/Empty'
import Timeline from '@components/timeline'

const MyWorkshops = () => {

    const dispatch = useDispatch()

    const myWorkshops = useSelector(state => state.courses.myWorkshops)

    useEffect(() => {
        dispatch(fetchMyWorkshops())
    }, [])

    return (
        <div className="row">
            
            {myWorkshops.length === 0 && (
                <div className="col-md-12 col-sm-12 text-center">
                    <Empty 
                        title="Looks like you haven't purchased any workshops yet." 
                        button={true}
                        buttonLink={'/all-courses'}
                        buttonText={'Explore'}
                    />
                </div>
            )}

            {myWorkshops && (
                <>
                    {myWorkshops.map(item => (
                    <div className="col-md-4 col-sm-12">
                        <Card className='card-developer-meetup'>
                            <div className='meetup-img-wrapper rounded-top text-center'>
                                <img src={`${BASE_URL}uploads/${item.courseId?.image}`} className='img-fluid' />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="pt-1 ml-2">
                                        <Chip variant="outlined" size="small" label="Purchased" color="primary" />
                                    </div>
                                </div>
                                <div className="col-6 text-center">
                                    <div className="pt-1">
                                        <Typography className="m-0"></Typography>
                                    </div>
                                </div>
                            </div>
                            <CardBody>
                                <div className='my-auto pb-1'>
                                    <CardTitle tag='h4' className='mb-25'>
                                        {item.courseId.name}
                                    </CardTitle>
                                    <CardText className='mb-0'>{item.courseId.shortDescription}</CardText>
                                    {/* <CardText className='mb-0'>{new Date(item.purchaseDate).toLocaleTimeString()}</CardText> */}
                                </div>

                                <div className='my-auto pb-2'>
                                    <Chip size="small" label={item.workshopId.batchNo} color="primary" />
                                </div>

                                <Timeline data={[
                                    {
                                        title: 'Start',
                                        content: new Date(item.workshopId?.startDate).toDateString(),
                                        meta: '',
                                        customContent: (
                                        <h6>{new Date(item.workshopId?.startTime).toLocaleTimeString()}</h6>
                                        )
                                    },
                                    {
                                        title: 'End',
                                        content: new Date(item.workshopId?.endDate).toDateString(),
                                        meta: '',
                                        color: 'secondary',
                                        customContent: (
                                        <h6>{new Date(item.workshopId?.endTime).toLocaleTimeString()}</h6>
                                        )
                                    }
                                ]} />
                                {/* <Media>
                                <Avatar color='light-primary' className='rounded mr-1' icon={<Calendar size={18} />} />
                                <Media body>
                                    <h6 className='mb-0'>Sat, May 25, 2020</h6>
                                    <small>10:AM to 6:PM</small>
                                </Media>
                                </Media>
                                <Media className='mt-2'>
                                <Avatar color='light-primary' className='rounded mr-1' icon={<MapPin size={18} />} />
                                <Media body>
                                    <h6 className='mb-0'>Central Park</h6>
                                    <small>Manhattan, New york City</small>
                                </Media>
                                </Media> */}
                            </CardBody>

                            <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                        <Typography>Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Purchased Date: {new Date(item.purchaseDate).toLocaleTimeString()}</Typography>
                                        <Typography>Transaction Id: {item.paymentId}</Typography>
                                    </AccordionDetails>
                                </Accordion>

                        </Card>
                    </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default MyWorkshops