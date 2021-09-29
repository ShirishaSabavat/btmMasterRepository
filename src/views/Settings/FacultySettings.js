import React from "react"
import {Card, CardHeader, CardBody, CardTitle, Button, Row, Col, FormGroup, Label, InputGroup, Input, CustomInput} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

const FacultySettings = () => {
    const initialValues = {
        facultyName:"",
        facultyDetails:"",
        facultyPhoto:""
    }
    const validationSchema = Yup.object().shape({
        facultyName: Yup.string().required("Required"),
        facultyDetails: Yup.string().required("Required"),
        facultyPhoto: Yup.string().required("required")
    })
    const submitForm = (values) => {
        console.log("values", values)
    }
    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardHeader>
                    <CardTitle>Faculty Settings</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="facultyName">Faculty Name</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="facultyName"
                                                    id="facultyName"
                                                    {...formik.getFieldProps("facultyName")}
                                                    invalid={!!(formik.touched.facultyName && formik.errors.facultyName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="facultyName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="facultyPhoto">Faculty Photo</Label>
                                                <CustomInput type='file' 
                                                    name="facultyPhoto"
                                                    id="facultyPhoto"
                                                    {...formik.getFieldProps("facultyPhoto")}
                                                />
                                                <ErrorMessage
                                                    name="facultyPhoto"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="facultyDetails">Faculty Details</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="textarea"
                                                    name="facultyDetails"
                                                    id="facultyDetails"
                                                    {...formik.getFieldProps("facultyDetails")}
                                                    invalid={!!(formik.touched.facultyDetails && formik.errors.facultyDetails)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="facultyDetails"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="float-right">
                                                <Button type="submit" color="primary">Save</Button>
                                            </div>
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
}

export default FacultySettings