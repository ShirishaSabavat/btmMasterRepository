import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import Select from "react-select"
import TagsInput from 'react-tagsinput'
import { selectThemeColors } from '@utils'

import 'react-tagsinput/react-tagsinput.css' 
import CustomSelectField from "../UtilityComponents/CustomSelectField"

const AddCourse = () => {
    
    const [state, setState] = useState({
        tags: []
    })

    const handleChange = (tags) => {
        setState({tags})
    }

    const initialValues = {
        courseName:"",
        courseType:"",
        courseCode:"",
        courseDetails:"",
        courseValidity:"",
        price:"",
        videoLink:[],
        facultyName:"",
        tags: state.tags
    }

    const validationSchema = Yup.object().shape({
        courseName:Yup.string().required("Required"),
        courseType: Yup.string().required("Required"),
        courseCode: Yup.string().required("Required"),
        courseDetails: Yup.string().required("Required"),
        courseValidity: Yup.number().positive().integer().required("Required"),
        price: Yup.number().positive().integer().required("Required"),
        videoLink: Yup.string().required("Required"),
        facultyName: Yup.string().required("Required")
        // tags: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("course values", values)
    }

    const courseOptions = [{label:"BAC", value:"bac"}, {label: "Regular", value: "regular"}]
    const videoOptions = [
        { value: 'ocean', label: 'WATCH LATER AD TO QUEUE React JS - React Tutorial for Beginners', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'NOW PLAYING WATCH LATER ADD TO QUEUE Learn React JS with Project in 2 Hours | React Tutorial for Beginners | React Project Crash Course', color: '#0052CC', isFixed: true },
        { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
        { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
        { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
      ]

      const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault()
        }
      }

    return <Row>
        <Col sm="12" md="6">
            <Card >
                <CardHeader>
                    <CardTitle>Add Course</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            console.log("ff", formik.values)
                            return (
                                <Form onKeyDown={onKeyDown}>
                                    <Row>
                                        <Col sm="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="courseName">Course Name</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="courseName"
                                                    id="courseName"
                                                    {...formik.getFieldProps("courseName")}
                                                    invalid={!!(formik.touched.courseName && formik.errors.courseName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="courseName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="courseType">Course Type</Label>
                                                <CustomSelectField
                                                value={formik.values.courseType}
                                                options={courseOptions}
                                                {...formik.getFieldProps("courseType")}
                                                />
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
                                                    <Input
                                                    type="text"
                                                    name="courseCode"
                                                    id="courseCode"
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
                                                <Label for="courseValidity">Course Validity(Days)</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="courseValidity"
                                                    id="courseValidity"
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
                                                    <Input
                                                    type="number"
                                                    name="price"
                                                    id="price"
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
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="videoLink">Video Link</Label>
                                                <Select
                                                isClearable={true}
                                                theme={selectThemeColors}
                                                isMulti
                                                name='videoLink'
                                                id="videoLink"
                                                options={videoOptions}
                                                className='react-select'
                                                classNamePrefix='select'
                                                />
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
                                    <Row>
                                        <Col sm="12">
                                            <FormGroup>
                                                <Label for="tag">Tags</Label>
                                                <TagsInput value={state.tags} onChange={handleChange} addOnBlur className="react-tagsinput rounded"  />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="float-right mt-1">
                                        <Button color="primary" type="submit">Save</Button>
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

export default AddCourse