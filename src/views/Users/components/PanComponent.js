import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
// import "react-datepicker/dist/react-datepicker.css"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import {ArrowLeft, ArrowRight} from 'react-feather'
import { BASE_URL } from '../../../utility/serverSettings'

const PanComponent  = ({stepper, type, setKycFormData, userKYC, setShowEdit}) => {

    console.log("userKYC", userKYC)

    const initialValues = {
        panNo:userKYC.panNo,
        panname:userKYC.panname,
        dob:userKYC.dob,
        panAttachment:userKYC.panAttachment
    }

    const validationSchema = Yup.object().shape({
        panNo: Yup.string().required("Required"),
        panname: Yup.string().required("Required"),
        dob: Yup.string().required("Required"),
        panAttachment: Yup.string()
    })

    const submitForm = (values) => {
        setKycFormData(values)
        console.log("values", values)
        stepper.next()
    }

    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form className="row">
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="panNo">PAN NO <span className="text-danger">*</span></Label>
                            <Input
                            name="panNo"
                            id="panNo"
                            {...formik.getFieldProps("panNo")}
                            invalid={!!(formik.touched.panNo && formik.errors.panNo)}
                            >
                            </Input>
                            <ErrorMessage
                                name="panNo"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="panname">Name as per PAN <span className="text-danger">*</span></Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="panname"
                                id="panname"
                                {...formik.getFieldProps("panname")}
                                invalid={!!(formik.touched.panname && formik.errors.panname)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="panname"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="dob">Date of Birth <span className="text-danger">*</span></Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="dob"
                                id="dob"
                                {...formik.getFieldProps("dob")}
                                invalid={!!(formik.touched.dob && formik.errors.dob)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="dob"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            {formik.values.panAttachment?.name || formik.values.panAttachment ? <div>
                                <p>Preview:</p>
                                {formik.values.panAttachment?.name ? <img width="400" src={URL.createObjectURL(formik.values.panAttachment)} className="img-fluid" alt='No Image' /> : <a title="View" href={`${BASE_URL}uploads/${formik.values.panAttachment}`} target="_blank"><img width="400" src={`${BASE_URL}uploads/${formik.values.panAttachment}`} className="img-fluid"  alt='No Image' /></a>  }
                            </div> : null }
                            <Label htmlFor="panAttachment">PAN Attachment No</Label>
                            <CustomInput
                            type="file"
                            name="panAttachment"
                            id="panAttachment"
                            onChange={file => formik.setFieldValue("panAttachment", file.currentTarget.files[0])}
                            invalid={!!(formik.touched.panAttachment && formik.errors.panAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="panAttachment"
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

export default PanComponent