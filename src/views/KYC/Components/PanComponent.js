import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
// import "react-datepicker/dist/react-datepicker.css"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"

const PanComponent  = () => {

    const initialValues = {
        panNo:"",
        panname:"",
        dob:"",
        panAttachment:""
    }

    const validationSchema = Yup.object().shape({
        panNo: Yup.number().positive().required("Required"),
        panname: Yup.string().required("Required"),
        dob: Yup.date().required("Required"),
        panAttachment: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="panNo">PAN NO</Label>
                            <Input
                            type="number"
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
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="panname">Name as per PAN</Label>
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
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="dob">DOB as per PAN</Label>
                            <Flatpickr
                                className="form-control"
                                name="dob"
                                value={formik.values.dob}
                                onChange={(date) => {
                                    formik.values.dob = date
                                }} />
                            <ErrorMessage
                                name="dob"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="panAttachment">PAN Attachment No</Label>
                            <CustomInput
                            type="file"
                            name="panAttachment"
                            id="panAttachment"
                            {...formik.getFieldProps("panAttachment")}
                            invalid={!!(formik.touched.panAttachment && formik.errors.panAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="panAttachment"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-end">
                            <Button type="submit" color="success">Save</Button>
                        </FormGroup>
                    </Form>)
                }}
            </Formik>          
            </CardBody>
            </Card>
        </Col>
    </Row>
}

export default PanComponent