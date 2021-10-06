import React from "react"
import {Card, CardTitle, CardText, Badge, CardBody, Button} from "reactstrap"
// import {useDispatch, useSelector} from "react-redux"
// import { useHistory } from "react-router-dom"

const Workshop  = () => {

    // const dispatch = useDispatch()
    // const history = useHistory() 

    // const courseID = history.location?.params?.id 

    return <div className="w-100 d-flex justify-content-around">
        <Card className='card-app-design bg-light m-1'>
            <CardBody>
                <div className="d-flex justify-content-between">
                    <Badge color='light-primary'>Batch No: </Badge>
                    <Badge color='success'>Purchased</Badge>
                </div>
                <CardTitle className='mt-1 mb-75'><strong>Course Name:</strong> </CardTitle>
                <CardTitle className='mt-1 mb-75'><strong>Faculty:</strong> </CardTitle>
                <CardText className='font-small-2 mb-2'>
                    <strong>Address:</strong> 
                </CardText>    
                <div className='design-planning-wrapper mb-2 py-75'>
                    <div className='design-planning'>
                    <CardText className='mb-25'>Start Date</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                    <div className='design-planning'>
                    <CardText className='mb-25'>End Date</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                    <div className='design-planning'>
                    <CardText className='mb-25'>Start Time</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                    <div className='design-planning'>
                    <CardText className='mb-25'>End Time</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <a href="" target="_blank"><Button color="primary" type="button">Location</Button></a>
                </div>
            </CardBody>
        </Card> 
        <Card className='card-app-design bg-light m-1'>
            <CardBody>
                <div className="d-flex justify-content-between">
                    <Badge color='light-primary'>Batch No: </Badge>
                    <Badge color='success'>Purchased</Badge>
                </div>
                <CardTitle className='mt-1 mb-75'><strong>Course Name:</strong> </CardTitle>
                <CardTitle className='mt-1 mb-75'><strong>Faculty:</strong> </CardTitle>
                <CardText className='font-small-2 mb-2'>
                    <strong>Address:</strong> 
                </CardText>    
                <div className='design-planning-wrapper mb-2 py-75'>
                    <div className='design-planning'>
                    <CardText className='mb-25'>Start Date</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                    <div className='design-planning'>
                    <CardText className='mb-25'>End Date</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                    <div className='design-planning'>
                    <CardText className='mb-25'>Start Time</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                    <div className='design-planning'>
                    <CardText className='mb-25'>End Time</CardText>
                    <h6 className='mb-0'></h6>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <a href="" target="_blank"><Button color="primary" type="button">Location</Button></a>
                </div>
            </CardBody>
        </Card> 
    </div>

}

export default Workshop