import React, { useEffect } from "react"
// import Avatar from '@components/avatar'
import { Calendar, MapPin } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Card, CardTitle, CardBody, CardText, Media } from 'reactstrap'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { fetchMyCourses } from '../../redux/actions/courses'
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../utility/serverSettings"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PlayCircleFilled as PlayCircleFilledIcon, Folder as FolderIcon} from '@mui/icons-material'

 
const MyCources = () => {

    const dispatch = useDispatch()

    const myCourses = useSelector(state => state.courses.myCourses)

    useEffect(() => {
        dispatch(fetchMyCourses())
    }, [])

    return (
        <div className="row">
            {myCourses && (
                <>
                    {myCourses.map(item => (
                    <div className="col-md-4 col-sm-12">
                        <Card className='card-developer-meetup'>
                            <div className='meetup-img-wrapper rounded-top text-center'>
                                <img src={`${BASE_URL}uploads/${item.courseId.image}`} className="img-fluid" />
                            </div>
                            <div className="row">
                                <div className="col-6 text-center">
                                    <div className="pt-1">
                                        <Chip size="small" label="Purchased" color="primary" />
                                    </div>
                                </div>
                                <div className="col-6 text-center">
                                    <div className="pt-1">
                                        <Typography className="m-0">{new Date(item.purchaseDate).toLocaleTimeString()}</Typography>
                                    </div>
                                </div>
                            </div>
                            <CardBody>
                                <div className='align-items-center'>
                                {/* <div className='meetup-day'>
                                    <h6 className='mb-0'>THU</h6>
                                    <h3 className='mb-0'>24</h3>
                                </div> */}
                                <div className='my-auto'>
                                    <CardTitle tag='h4' className='mb-25'>
                                        {item.courseId.name}
                                    </CardTitle>
                                    <CardText className='mb-0'>{item.courseId.shortDescription}</CardText>
                                    {/* <CardText className='mb-0'>{new Date(item.purchaseDate).toLocaleTimeString()}</CardText> */}
                                </div>
                                </div>
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
                                <Typography>Videos</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="p-0">
                                    <List dense={true}>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <PlayCircleFilledIcon />
                                                </IconButton>
                                            }
                                            >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Single-line item"
                                                secondary="Secondary text"
                                            />
                                        </ListItem>
                                    </List>
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

export default MyCources