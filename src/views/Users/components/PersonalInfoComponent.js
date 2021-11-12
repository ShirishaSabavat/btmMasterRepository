import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardBody} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {User, Mail, Phone, ArrowLeft, ArrowRight} from "react-feather"
import { useSelector } from "react-redux"
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'

const PersonalInfoComponent  = ({ stepper, type, setKycFormData }) => {

    const userData = useSelector(state => state.auth.userData)

    const initialValues = {
        name: userData.user.name,
        email: userData.user.email,
        phone: userData.user.phone
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email().required("Required"),
        phone: Yup.string().min(13, 'Enter valid phone no.').required("Required")
    })

    const submitForm = (values) => {
        stepper.next()
        setKycFormData(values)
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
                            <Label htmlFor="name">Name <span className="text-danger">*</span></Label>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>
                                <InputGroupText className={ !!(formik.touched.name && formik.errors.name) ? "border border-danger" : null}>
                                    <User size={15} />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                {...formik.getFieldProps("name")}
                                invalid={!!(formik.touched.name && formik.errors.name)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="email">Email <span className="text-danger">*</span></Label>
                            <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                            <InputGroupText className={ !!(formik.touched.email && formik.errors.email) ? "border border-danger" : null}>
                                <Mail size={15} />
                            </InputGroupText>
                            </InputGroupAddon>
                                <Input
                                type="email"
                                name="email"
                                id="email"
                                {...formik.getFieldProps("email")}
                                invalid={!!(formik.touched.email && formik.errors.email)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 has-icon-left position-relative">
                            <Label htmlFor="phone">Mobile No <span className="text-danger">*</span></Label>

                            <Cleave placeholder="Enter phone number"
                                options={{blocks: [3, 3, 3, 4], prefix: '+91'}}
                                name="phone"
                                className="form-control"
                                id="phone"
                                {...formik.getFieldProps("phone")}
                                invalid={!!(formik.touched.phone && formik.errors.phone)}
                                />

                            {/* <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                            <InputGroupText className={ !!(formik.touched.phone && formik.errors.phone) ? "border border-danger" : null}>
                                <Phone size={15} />
                            </InputGroupText>
                            </InputGroupAddon>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    {...formik.getFieldProps("phone")}
                                    invalid={!!(formik.touched.phone && formik.errors.phone)}
                                >
                                </Input>
                            </InputGroup> */}
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>

                        <div className='col-md-12 mt-3 d-flex justify-content-between'>
                            <Button.Ripple color='secondary' className='btn-prev' outline disabled>
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
    </Row>
}

export default PersonalInfoComponent