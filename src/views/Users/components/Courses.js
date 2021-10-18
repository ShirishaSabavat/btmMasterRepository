import React from "react"
import {Card, CardTitle, CardText, Badge, CardBody, Button} from "reactstrap"
// import {useDispatch, useSelector} from "react-redux"
// import { useHistory } from "react-router-dom"

const Courses  = ({purchasedCources}) => {


    return <div className="row">
        {purchasedCources && (
            <>
                {purchasedCources.map(item => (
                <Card className='col-md-6 col-sm-12 card-app-design bg-light m-1'>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <Badge color='light-primary'>Code: {item.courseId.code}</Badge>
                            <Badge color='light-primary'>Type: {item.courseId.type}</Badge>
                            <Badge color='success'>Purchased</Badge>
                        </div>
                        <CardTitle className='mt-1 mb-75'><strong>Course Name: {item.courseId.name}</strong> </CardTitle>
                        {/* <CardText className='font-small-2 mb-2'>
                            <strong>Course Details: {item.courseId.details}</strong> 
                        </CardText>     */}
                        <CardText className='font-small-2 mb-2'>
                            Price: <strong>{item.courseId.price}</strong>  <br />
                            Date: <strong>{new Date(item.createdAt).toLocaleString()}</strong>  <br />
                            Order Id: <strong>{item.orderId}</strong> <br />
                            Payment Id: <strong>{item.paymentId}</strong> <br />
                        </CardText>    
                    </CardBody>
                </Card> 
                ))}
            </>
        )}
    </div>

}

export default Courses