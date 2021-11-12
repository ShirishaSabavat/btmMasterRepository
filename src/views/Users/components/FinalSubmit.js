import React from "react"
import {Row, Col, Button, Alert, Card, CardBody} from 'reactstrap'
import {ArrowLeft, CheckSquare, AlertCircle} from 'react-feather'

const FinalSubmit  = ({stepper, type, setKycFormData, onFinalSubmit}) => {

    const finalSubmitHandler = (e) => {
        onFinalSubmit()
    }

    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
                    <div className='p-3'>
                        <Alert color='warning' isOpen={true}>
                            <div className='alert-body'>
                            <AlertCircle size={15} />{' '}
                            <span className='ml-1'>
                                Please confirm all your data. Once submitted you won't be able to change any data. 
                            </span>
                            </div>
                        </Alert>
                    </div>

                    <div className='col-md-12 mt-3 d-flex justify-content-between'>
                        <Button.Ripple onClick={() => stepper.previous()} color='secondary' className='btn-prev' outline>
                            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button.Ripple>
                        <Button.Ripple onClick={finalSubmitHandler} color='primary' className='btn-next'>
                            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                            <CheckSquare size={14} className='align-middle ml-sm-25 ml-0'></CheckSquare>
                        </Button.Ripple>
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default FinalSubmit