import React, { useEffect, useState } from "react"
// import Avatar from '@components/avatar'
import { Calendar, MapPin } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Card, CardTitle, CardBody, CardText, Media, UncontrolledTooltip } from 'reactstrap'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Dialog, DialogContent } from '@mui/material'
import { fetchMyCourses } from '../../redux/actions/courses'
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../utility/serverSettings"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PlayCircleFilled as PlayCircleFilledIcon, Folder as FolderIcon} from '@mui/icons-material'
import Empty from '../../components/loading/Empty'
import ReactPlayer from 'react-player'
import { useHistory } from "react-router"

const MyCources = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const myCourses = useSelector(state => state.courses.myCourses)

    useEffect(() => {
        dispatch(fetchMyCourses())
    }, [])

    return (
        <div className="row">
            {myCourses.length === 0 && (
                <div className="col-md-12 col-sm-12 text-center">
                    <Empty 
                        title="Looks like you haven't purchased any courses yet." 
                        button={true}
                        buttonLink={'/all-courses'}
                        buttonText={'Explore'}
                    />
                </div>
            )}

            {myCourses && (
                <>
                    {myCourses.map(item => (
                    <div className="col-md-4 col-sm-12">
                        <Card className='card-developer-meetup'>
                            <div className='meetup-img-wrapper rounded-top text-center'>
                                <img src={`${BASE_URL}uploads/${item.courseId?.image}`} className="img-fluid" style={{maxHeight: 300}} />
                                <IconButton id="course-watch" title="play" color="error" style={{position: 'absolute', right: '11px', bottom: '112px'}} size="lg" onClick={() => history.push(`/my-courses/watch-videos/${item.courseId._id}`)} edge="end" aria-label="delete">
                                    <PlayCircleFilledIcon style={{width: 54, height: 54}} />
                                </IconButton>
                                <UncontrolledTooltip placement='top' target="course-watch">
                                    Start watching
                                </UncontrolledTooltip>
                            </div>
                            <CardBody>
                                <div className='align-items-center'>
                                    {/* <div className='meetup-day'>
                                        <h6 className='mb-0'>THU</h6>
                                        <h3 className='mb-0'>24</h3>
                                    </div> */}
                                    <div className='my-auto'>
                                        <CardTitle tag='h4' className='mb-25'>
                                            {item.courseId?.name}
                                        </CardTitle>
                                        <CardText className='mb-0'>{item.courseId?.shortDescription}</CardText>
                                        {/* <CardText className='mb-0'>{new Date(item.purchaseDate).toLocaleTimeString()}</CardText> */}
                                    </div>
                                </div>

                            </CardBody>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                <Typography>Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="">
                                    {item.courseId?.type === "Bac" && (
                                        <div className='my-auto pb-2'>
                                            <Chip size="small" label="BAC Course" color="primary" />
                                        </div>
                                    )}
                                    <Typography variant="subtitle1" component="h2">
                                        Order Id: {item.orderId}
                                    </Typography>
                                    <Typography variant="subtitle1" component="h2">
                                        Purchased Date: {new Date(item.purchaseDate).toLocaleString()}
                                    </Typography>
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