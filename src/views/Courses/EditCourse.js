import React from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Video, Calendar, DollarSign, Link, Codesandbox} from "react-feather"

const EditCourse = () => {

    const initialValues = {
        courseType:"",
        courseCode:"",
        courseDetails:"",
        courseValidity:"",
        price:"",
        videoLink:"",
        facultyName:""
    }

    const validationSchema = Yup.object().shape({
        courseType: Yup.string().required("Required"),
        courseCode: Yup.string().required("Required"),
        courseDetails: Yup.string().required("Required"),
        courseValidity: Yup.number().positive().integer().required("Required"),
        price: Yup.number().positive().integer().required("Required"),
        videoLink: Yup.string().required("Required"),
        facultyName: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    return <Row>
        <Col sm="12" md="6">
            <Card >
                <CardHeader>
                    <CardTitle>Edit Course</CardTitle>
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
                                                <Label for="courseType">Course Type</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.courseType && formik.errors.courseType) ? "border border-danger" : null}>
                                                        <Video size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="courseType"
                                                    id="courseType"
                                                    {...formik.getFieldProps("courseType")}
                                                    invalid={!!(formik.touched.courseType && formik.errors.courseType)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="courseType"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="courseCode">Course Code</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.courseCode && formik.errors.courseCode) ? "border border-danger" : null}>
                                                        <Codesandbox size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="courseCode"
                                                    id="courseCode"
                                                    placeholder="School Name ..."
                                                    {...formik.getFieldProps("courseCode")}
                                                    invalid={!!(formik.touched.courseCode && formik.errors.courseCode)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="courseCode"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="courseValidity">Course Validity</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.courseValidity && formik.errors.courseValidity) ? "border border-danger" : null}>
                                                        <Calendar size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="courseValidity"
                                                    id="courseValidity"
                                                    placeholder="School Name ..."
                                                    {...formik.getFieldProps("courseValidity")}
                                                    invalid={!!(formik.touched.courseValidity && formik.errors.courseValidity)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="courseValidity"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="price">Price</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.price && formik.errors.price) ? "border border-danger" : null}>
                                                        <DollarSign size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    placeholder="School Name ..."
                                                    {...formik.getFieldProps("price")}
                                                    invalid={!!(formik.touched.price && formik.errors.price)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="price"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="videoLink">Video Link</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.videoLink && formik.errors.videoLink) ? "border border-danger" : null}>
                                                        <Link size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="videoLink"
                                                    id="videoLink"
                                                    placeholder="School Name ..."
                                                    {...formik.getFieldProps("videoLink")}
                                                    invalid={!!(formik.touched.videoLink && formik.errors.videoLink)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="videoLink"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="courseDetails">Course Details</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="textarea"
                                                    name="courseDetails"
                                                    id="courseDetails"
                                                    placeholder="School Name ..."
                                                    {...formik.getFieldProps("courseDetails")}
                                                    invalid={!!(formik.touched.courseDetails && formik.errors.courseDetails)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="courseDetails"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="float-right mt-1">
                                        <Button color="primary" type="submit">Update</Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default EditCourse