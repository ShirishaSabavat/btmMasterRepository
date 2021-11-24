import React, { useEffect, useState } from "react"
// import Avatar from '@components/avatar'
import { Calendar, MapPin } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Card, CardTitle, CardBody, CardText, Media, UncontrolledTooltip } from 'reactstrap'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, List, ListItem, IconButton, ListItemButton, ListItemAvatar, Avatar, ListItemText, Dialog, DialogContent } from '@mui/material'
import { fetchMyCourseDetails } from '../../redux/actions/courses'
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../utility/serverSettings"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PlayCircleFilled as PlayCircleFilledIcon, Folder as FolderIcon} from '@mui/icons-material'
import Empty from '../../components/loading/Empty'
import ReactPlayer from 'react-player'
import { useHistory, useParams } from "react-router"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const WatchVideos = () => {

    const {courseId} = useParams()

    const history = useHistory()

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courses.course)
    const loading = useSelector(state => state.common.loading)

    const [currentlyPlaying, setCurrentlyPlaying] = useState({videoLinkType: '', link: ''})

    useEffect(() => {
        dispatch(fetchMyCourseDetails(courseId))
    }, [])

    useEffect(() => {
        if (courseDetails) {
            setCurrentlyPlaying(courseDetails.videos[0])
        }
    }, [courseDetails])

    if (loading || !courseDetails || !courseDetails.videos) {
        return (<TableDataLoadingSkleton />)
    }

    return (
        <div className="row">
            <div className="col-md-9 col-sm-12 text-center">
                <div>
                    {currentlyPlaying && (
                        <ReactPlayer
                            controls={true}
                            loop={true}
                            height="480px"
                            width="100%"
                            config={{ 
                                file: { 
                                    attributes: {
                                        controlsList: 'nodownload',
                                        onContextMenu: e => e.preventDefault()
                                    } 
                                } 
                            }}
                            url={currentlyPlaying.videoLinkType === 'FILE' ? `${BASE_URL}videoUploads/${currentlyPlaying.videoFile}` : currentlyPlaying.link}
                        />
                    )}
                </div>
            </div>

            <div className="col-md-3 col-sm-12">
                <div>
                    <Card className='card-developer-meetup'>
                        <CardBody className="hide-scrollbar" style={{maxHeight: 480, overflow: 'scroll'}}>
                            <CardTitle tag='h4' className=''>
                                Videos:
                            </CardTitle>
                            <List dense={true}>
                                {courseDetails.videos.length === 0 && (
                                    <Empty 
                                        title="Currently no videos are available" 
                                        style="1" 
                                    />
                                )}

                                {courseDetails.videos.length !== 0 && (
                                    <>
                                    {courseDetails.videos.map(vid => (
                                            <>
                                                {vid && (
                                                    <ListItemButton
                                                        className="cursor pointer"
                                                        selected={currentlyPlaying._id === vid._id}
                                                        onClick={() => setCurrentlyPlaying(vid)}
                                                        >
                                                        <ListItemAvatar>
                                                            <Avatar src={`${BASE_URL}uploads/${vid.image}`} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={vid.title}
                                                            secondary={`Duration: ${vid.duration}`}
                                                        />
                                                    </ListItemButton>
                                                )}
                                            </>
                                            
                                        ))}
                                    </>
                                )}

                            </List>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="col-md-9 col-sm-12 mt-2">
                <div>
                    <Card className='card-developer-meetup'>
                        <CardBody>
                            <CardTitle tag='h4' className='mb-25'>
                                <b>{courseDetails.name}</b>
                            </CardTitle>

                            <div style={{padding: 4,  justifyContent: 'center'}} dangerouslySetInnerHTML={{__html: courseDetails.details}} />

                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default WatchVideos