import React from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button,  InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Users, Link} from "react-feather"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"


import CustomSelectField from "../UtilityComponents/CustomSelectField"
import "react-datepicker/dist/react-datepicker.css"

const Schedule = () => {

    const initialValues = {
        batchNo:"",
        seatsAllowed:"",
        date:"",
        startTime:"",
        endTime:"",
        venuAddress:"",
        locationLink:"",
        facultyName:""
    }

    const validationSchema = Yup.object().shape({
        batchNo: Yup.number().positive().integer().required("Required"),
        seatsAllowed: Yup.number().positive().integer().required("Required"),
        date: Yup.string().required("Required"),
        startTime: Yup.string().required("Required"),
        endTime: Yup.string().required("Required"),
        venuAddress: Yup.string().required("Required"),
        locationLink: Yup.string().required("Required"),
        facultyName: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    const facultyNameOptions = [{label: "Lecture 1", value: "Ram"}]

    return (<>
        <Row >
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Schedule</CardTitle>
                    </CardHeader>
                    <hr className="m-0" />
                    <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="batchNo">Batch No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="batchNo"
                                                    id="batchNo"
                                                    {...formik.getFieldProps("batchNo")}
                                                    invalid={!!(formik.touched.batchNo && formik.errors.batchNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="batchNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="seatsAllowed">Seats Allowed</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.seatsAllowed && formik.errors.seatsAllowed) ? "border border-danger" : null}>
                                                        <Users size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="seatsAllowed"
                                                    id="seatsAllowed"
                                                    {...formik.getFieldProps("seatsAllowed")}
                                                    invalid={!!(formik.touched.seatsAllowed && formik.errors.seatsAllowed)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="seatsAllowed"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="startTime">Start Time</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                data-enable-time
                                                name="startTime"
                                                id='date-time-picker'
                                                value={formik.values.startTime}
                                                onChange={(date) => {
                                                    formik.values.startTime = date
                                                }} />
                                                <ErrorMessage name="startTime" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="endTime">End Time</Label>
                                                <br />  
                                                <Flatpickr
                                                className="form-control"
                                                data-enable-time
                                                name="endTime"
                                                id='date-time-picker'
                                                value={formik.values.endTime}
                                                onChange={(date) => {
                                                    formik.values.endTime = date
                                                }} />
                                                <ErrorMessage name="endTime" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="locationLink">Location Link</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.locationLink && formik.errors.locationLink) ? "border border-danger" : null}>
                                                        <Link size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="locationLink"
                                                    id="locationLink"

                                                    {...formik.getFieldProps("locationLink")}
                                                    invalid={!!(formik.touched.locationLink && formik.errors.locationLink)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="locationLink"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="facultyName">Faculty Name</Label>
                                                <CustomSelectField
                                                value={formik.values.facultyName}
                                                options={facultyNameOptions}
                                                name="facultyName"
                                                id="facultyName"
                                                {...formik.getFieldProps("facultyName")}
                                                />
                                                <ErrorMessage
                                                name="facultyName"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row> 
                                    <Row className="mb-1">
                                        <Col>
                                        <FormGroup className="has-icon-left position-relative">
                                            <Label htmlFor="venuAddress">Venu Address</Label>
                                            <InputGroup>
                                                <Input
                                                type="textarea"
                                                name="venuAddress"
                                                id="venuAddress"
                                                {...formik.getFieldProps("venuAddress")}
                                                invalid={!!(formik.touched.venuAddress && formik.errors.venuAddress)}
                                                >
                                                </Input>
                                            </InputGroup>
                                            <ErrorMessage
                                                name="venuAddress"
                                                component="div"
                                                className="field-error text-danger"
                                            />
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <Row className="mt-1">
                                        <Col sm="12" md="12">
                                            <Button color="primary" type="submit">Update</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            )
                        }}
                    </Formik>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>)
}

export default Schedule