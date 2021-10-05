import React, {useEffect} from "react"
import {Row, Col, Card, CardTitle, CardText, Badge, CardBody} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom"

import {fetchCourseById} from "../../redux/actions/courses/index"

const ViewCourse  = () => {

    const dispatch = useDispatch()
    const courseData = useSelector(state => state.courses.course)
    const history = useHistory() 

    const courseID = history.location?.params?.id 

    useEffect(() => {
        dispatch(fetchCourseById(courseID))
     }, [courseID])

    return <Row>
        <Col sm="12" md="4">
            <Card className='card-app-design'>
                <CardBody>
                    <Badge color='light-primary'>Type: {courseData.type}</Badge>
                    <CardTitle className='mt-1 mb-75'><strong>Course Name:</strong> {courseData.name}</CardTitle>
                    <CardTitle className='mt-1 mb-75'><strong>Faculty:</strong> {courseData.faculty}</CardTitle>
                    <CardText className='font-small-2 mb-2'>
                        <strong>Address:</strong> {courseData.address}
                    </CardText>    
                    <div className='design-planning-wrapper mb-2 py-75'>
                        <div className='design-planning'>
                        <CardText className='mb-25'>Start Date</CardText>
                        <h6 className='mb-0'>{courseData.startdate}</h6>
                        </div>
                        <div className='design-planning'>
                        <CardText className='mb-25'>End Date</CardText>
                        <h6 className='mb-0'>{courseData.enddate}</h6>
                        </div>
                        <div className='design-planning'>
                        <CardText className='mb-25'>Start Time</CardText>
                        <h6 className='mb-0'>{courseData.starttime}</h6>
                        </div>
                        <div className='design-planning'>
                        <CardText className='mb-25'>End Time</CardText>
                        <h6 className='mb-0'>{courseData.endtime}</h6>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <CardText className='mb-2 p-1 border rounded bg-success text-white'>Price {courseData.price} INR</CardText>
                    </div>

                </CardBody>
            </Card> 
        </Col>
    </Row>

}

export default ViewCourse