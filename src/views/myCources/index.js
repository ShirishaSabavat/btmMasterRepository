import React, { useEffect, useState } from "react"
// import Avatar from '@components/avatar'
import { Calendar, MapPin } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Card, CardTitle, CardBody, CardText, Media } from 'reactstrap'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Dialog } from '@mui/material'
import { fetchMyCourses } from '../../redux/actions/courses'
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../utility/serverSettings"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PlayCircleFilled as PlayCircleFilledIcon, Folder as FolderIcon} from '@mui/icons-material'
import Empty from '../../components/loading/Empty'
import ReactPlayer from 'react-player'

const MyCources = () => {

    const dispatch = useDispatch()

    const myCourses = useSelector(state => state.courses.myCourses)

    const [videoModal, setVideoModal] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')

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
                                <img src={`${BASE_URL}uploads/${item.courseId.image}`} className="img-fluid" style={{maxHeight: 300}} />
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

                                        {item.courseId.videos && (
                                            <>
                                                {item.courseId.videos.map(vid => (
                                                    <ListItem
                                                        onClick={() => { setVideoModal(true); setVideoUrl(vid.link) }}
                                                        secondaryAction={
                                                            <IconButton onClick={() => { setVideoModal(true); setVideoUrl(vid.link) }} edge="end" aria-label="delete">
                                                                <PlayCircleFilledIcon />
                                                            </IconButton>
                                                        }
                                                        >
                                                        <ListItemAvatar>
                                                            <Avatar src={`${BASE_URL}uploads/${vid.image}`} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={vid.title}
                                                            secondary={`Duration: ${vid.duration}`}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </>
                                        )}
                                        
                                    </List>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                <Typography>Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="">
                                    {item.courseId.type === "Bac" && (
                                        <div className='my-auto pb-2'>
                                            <Chip size="small" label="BAC Course" color="primary" />
                                        </div>
                                    )}
                                    <Typography variant="subtitle1" component="h2">
                                        Order Id: {item.orderId}
                                    </Typography>
                                    <Typography variant="subtitle1" component="h2">
                                        Purchased Date: {new Date(item.purchaseDate).toLocaleTimeString()}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                    </div>
                    ))}
                </>
            )}

            <Dialog
                fullWidth={true}
                open={videoModal}
                maxWidth="md"
                style={{minHeight: 300, justifyContent: 'center', alignItems: 'center'}}
                onClose={() => setVideoModal(false)}
            >
                <ReactPlayer
                    url={videoUrl}
                    />
            </Dialog>
        </div>
    )
}

export default MyCources