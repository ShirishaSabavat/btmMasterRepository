import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import {ArrowLeft, ArrowRight} from 'react-feather'
import * as Yup from "yup"
import { BASE_URL } from '../../../utility/serverSettings'

const AadharComponent  = ({stepper, type, setKycFormData, userKYC, setShowEdit}) => {

    const initialValues = {
        aadharNo:userKYC?.aadharNo,
        aadharAttachment:userKYC?.aadharAttachment
    }

    const validationSchema = Yup.object().shape({
        aadharNo: Yup.number().positive().required("Required"),
        aadharAttachment: Yup.string()
    })

    const submitForm = (values) => {
        setKycFormData(values)
        stepper.next()
        console.log("values", values)
    }

    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form className="row">
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="aadharNo">Aadhar Number <span className="text-danger">*</span></Label>
                            <InputGroup>
                                <Input
                                type="number"
                                name="aadharNo"
                                id="aadharNo"
                                {...formik.getFieldProps("aadharNo")}
                                invalid={!!(formik.touched.aadharNo && formik.errors.aadharNo)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="aadharNo"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            {formik.values.aadharAttachment?.name || formik.values.aadharAttachment ? <div>
                                <p>Preview:</p>
                                {formik.values.aadharAttachment?.name ?  <img width="400" src={URL.createObjectURL(formik.values.aadharAttachment)} className="img-fluid" alt='No Image' /> : <a title="View" href={`${BASE_URL}uploads/${formik.values.aadharAttachment}`} target="_blank"><img width="400" src={`${BASE_URL}uploads/${formik.values.aadharAttachment}`} className="img-fluid"  alt='No Image' /></a>  }
                            </div> : null }
                            <Label htmlFor="aadharAttachment">Aadhar Attachment</Label>
                            <CustomInput
                            type="file"
                            name="aadharAttachment"
                            id="aadharAttachment"
                            onChange={file => formik.setFieldValue("aadharAttachment", file.currentTarget.files[0])}
                            invalid={!!(formik.touched.aadharAttachment && formik.errors.aadharAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="aadharAttachment"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        
                        <div className='col-md-12 mt-3 d-flex justify-content-between'>
                            <Button.Ripple onClick={() => stepper.previous()} color='secondary' className='btn-prev' outline>
                                <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                            </Button.Ripple>
                            <Button.Ripple type='submit' color='primary' className='btn-next'>
                                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                                <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                            </Button.Ripple>
                        </div>

                    </Form>)
                }}
            </Formik>          
            </CardBody>
            </Card>
        </Col>
        <div className="ml-auto mr-2">
          <Button.Ripple onClick={() => setShowEdit(prevState => !prevState)} color='danger' className='btn-prev' outline>
              <span className='align-middle d-sm-inline-block d-none'>Cancel</span>
          </Button.Ripple>
        </div>
    </Row>
}

export default AadharComponent