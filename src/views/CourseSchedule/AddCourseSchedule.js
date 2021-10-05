import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardText, CardBody, FormGroup, Label, Input, Button, Badge,  InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Link} from "react-feather"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import {useDispatch, useSelector} from "react-redux"

import {fetchAllFacultyOptions} from "../../redux/actions/faculty/index"
import {fetchAllCoursesOptions, fetchCourseById} from "../../redux/actions/courses/index"
import CustomSelectField from "../UtilityComponents/CustomSelectField"
import "react-datepicker/dist/react-datepicker.css"

const AddCourseSchedule = () => {

    const dispatch = useDispatch()
    const facultyOptions = useSelector(state => state.faculty.facultyOptions)   
    const courseOptions = useSelector(state => state.courses.courseOptions)   
    const course = useSelector(state => state.courses.course)   
    const [courseID, setCourseID] = useState("")

    const courseOptionsHandler = (value, formik) => {
        formik.setFieldValue("courseId", value.value)
        setCourseID(value.value)
    }

    useEffect(() => {
        dispatch(fetchAllFacultyOptions())
        dispatch(fetchAllCoursesOptions())
      }, [])

      useEffect(() => {
         dispatch(fetchCourseById(courseID))
      }, [courseID])

    const initialValues = {
        courseId:"",
        startdate:"",
        enddate:"",
        starttime:"",
        endtime:"",
        location:"",
        faculty:"",
        address:""
    }

    const validationSchema = Yup.object().shape({
        courseId: Yup.string().required("Required"),
        startdate: Yup.string().required("Required"),
        enddate: Yup.string().required("Required"),
        starttime: Yup.string().required("Required"),
        endtime: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        faculty: Yup.string().required("Required"),
        address: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    return (<>
        <Row >
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Course Schedule</CardTitle>
                    </CardHeader>
                    <hr className="m-0" />
                    <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            console.log("co", courseOptions)
                            console.log("formik", formik.values)
                            return (
                                <Form>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="courseId">Course Name</Label>
                                                <CustomSelectField
                                                    value={formik.values.courseId}
                                                    options={courseOptions.map(values => values)}
                                                    onChange={(value) => courseOptionsHandler(value, formik)}
                                                />
                                                <ErrorMessage
                                                name="courseId"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="faculty">Faculty</Label>
                                                <CustomSelectField
                                                    value={formik.values.faculty}
                                                    options={facultyOptions.map(values => values)}
                                                    onChange={(value) => formik.setFieldValue("faculty", value.value)
                                                } />
                                                <ErrorMessage
                                                name="faculty"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="startdate">Start Date</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                data-enable-time
                                                enable-time
                                                name="startdate"
                                                value={formik.values.startdate}
                                                onChange={(date) => {
                                                    formik.values.startdate = date
                                                }} />
                                                <ErrorMessage name="startdate" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="enddate">End Date</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                data-enable-time
                                                name="enddate"
                                                value={formik.values.enddate}
                                                onChange={(date) => {
                                                    formik.values.enddate = date
                                                }} />
                                                <ErrorMessage name="enddate" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="starttime">Start Time</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                data-enable-time
                                                enable-time
                                                name="starttime"
                                                value={formik.values.starttime}
                                                id='timepicker'
                                                options={{
                                                  enableTime: true,
                                                  noCalendar: true,
                                                  dateFormat: 'H:i',
                                                  time_24hr: false
                                                }}
                                                onChange={(date) => {
                                                    formik.values.starttime = date
                                                }} />
                                                <ErrorMessage name="starttime" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="endtime">End Time</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                data-enable-time
                                                name="endtime"
                                                id='timepicker'
                                                options={{
                                                  enableTime: true,
                                                  noCalendar: true,
                                                  dateFormat: 'H:i',
                                                  time_24hr: false
                                                }}
                                                value={formik.values.endtime}
                                                onChange={(date) => {
                                                    formik.values.endtime = date
                                                }} />
                                                <ErrorMessage name="endtime" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="12">
                                                <FormGroup className="has-icon-left position-relative">
                                                    <Label for="address">Address</Label>
                                                    <InputGroup>
                                                        <Input
                                                        type="textarea"
                                                        name="address"
                                                        id="address"
                                                        {...formik.getFieldProps("address")}
                                                        invalid={!!(formik.touched.address && formik.errors.address)}
                                                        >
                                                        </Input>
                                                    </InputGroup>
                                                    <ErrorMessage
                                                        name="address"
                                                        component="div"
                                                        className="field-error text-danger"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="location">Location</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.location && formik.errors.location) ? "border border-danger" : null}>
                                                        <Link size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="location"
                                                    id="location"

                                                    {...formik.getFieldProps("location")}
                                                    invalid={!!(formik.touched.location && formik.errors.location)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="location"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
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
            <Col sm="12" md="4">
                {courseID ? <Card className='card-app-design'>
                    <CardBody>
                        <Badge color='light-primary'>Type: {course.type}</Badge>
                        <CardTitle className='mt-1 mb-75'><strong>Course Name:</strong> {course.name}</CardTitle>
                        <CardText className='font-small-2 mb-2'>
                            <strong>Course Description:</strong> {course.details}
                        </CardText>    
                        <div className='d-flex justify-content-center align-items-center'>
                            <CardText className='mb-2 p-1 border rounded bg-success text-white'>Price {course.price} INR</CardText>
                        </div>
                    </CardBody>
                </Card> : null }
            </Col>
        </Row>
    </>)
}

export default AddCourseSchedule