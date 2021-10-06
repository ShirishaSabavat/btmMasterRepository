import React, {useEffect} from "react"
import {Row, Col, Card, CardTitle, CardText, Badge, CardBody, Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom"

import {fetchCourseScheduleById} from "../../redux/actions/courseSchedule/index"

const ViewCourse  = () => {

    const dispatch = useDispatch()
    const courseData = useSelector(state => state.courseSchedule.courseSchedule)
    const history = useHistory() 

    const courseID = history.location?.params?.id 

    console.log(courseData)

    useEffect(() => {
        dispatch(fetchCourseScheduleById(courseID))
     }, [courseID])

    return <Row>
        <Col sm="12" md="4">
            <Card className='card-app-design'>
                <CardBody>
                    <Badge color='light-primary'>Batch No: {courseData.batchNo}</Badge>
                    <CardTitle className='mt-1 mb-75'><strong>Course Name:</strong> {courseData.name}</CardTitle>
                    <CardTitle className='mt-1 mb-75'><strong>Faculty:</strong> {courseData.faculty}</CardTitle>
                    <CardText className='font-small-2 mb-2'>
                        <strong>Address:</strong> {courseData.address}
                    </CardText>    
                    <div className='design-planning-wrapper mb-2 py-75'>
                        <div className='design-planning'>
                        <CardText className='mb-25'>Start Date</CardText>
                        <h6 className='mb-0'>{courseData.startDate}</h6>
                        </div>
                        <div className='design-planning'>
                        <CardText className='mb-25'>End Date</CardText>
                        <h6 className='mb-0'>{courseData.endDate}</h6>
                        </div>
                        <div className='design-planning'>
                        <CardText className='mb-25'>Start Time</CardText>
                        <h6 className='mb-0'>{courseData.startTime}</h6>
                        </div>
                        <div className='design-planning'>
                        <CardText className='mb-25'>End Time</CardText>
                        <h6 className='mb-0'>{courseData.endTime}</h6>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <a href={courseData.location} target="_blank"><Button color="primary" type="button">Location</Button></a>
                    </div>

                </CardBody>
            </Card> 
        </Col>
    </Row>

}

export default ViewCourse