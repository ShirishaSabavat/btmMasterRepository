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
import {AddCourseScheduleAPI} from "../../redux/actions/courseSchedule/index"
import CustomSelectField from "../UtilityComponents/CustomSelectField"

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
        startdate: Yup.date().required("Required"),
        enddate: Yup.date().required("Required"),
        starttime: Yup.date().required("Required"),
        endtime: Yup.date().required("Required"),
        location: Yup.string().required("Required"),
        faculty: Yup.string().required("Required"),
        address: Yup.string().required("Required")
    })

    const submitForm = (values, {resetForm}) => {
        console.log("values", values)

        const rawData = {
            courseId: values.courseId,
            startDate: values.startdate,
            endDate: values.enddate,
            startTime: values.starttime,
            endTime: values.endtime,
            faculty: values.faculty,
            address: values.address,
            location: values.location,
            batchNo: course.code
        }

        dispatch(AddCourseScheduleAPI(rawData, resetForm))
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
                                                <Label htmlFor="startdate">Start Date</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                name="startdate"
                                                id="startdate"
                                                value={formik.values.startdate}
                                                options={{
                                                    dateFormat: "Y-m-d"
                                                  }}
                                                onChange={(date) => {
                                                    formik.setFieldValue("startdate", date[0])
                                                }} />
                                                <ErrorMessage name="startdate" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="enddate">End Date</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                name="enddate"
                                                id="enddate"
                                                value={formik.values.enddate}
                                                options={{
                                                    dateFormat: "Y-m-d"
                                                  }}
                                                onChange={(date) => {
                                                    formik.setFieldValue("enddate", date[0])
                                                }} />
                                                <ErrorMessage name="enddate" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="starttime">Start Time</Label>
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
                                                    formik.values.starttime = date[0]
                                                }} />
                                                <ErrorMessage name="starttime" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="endtime">End Time</Label>
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
                                                    formik.values.endtime = date[0]
                                                }} />
                                                <ErrorMessage name="endtime" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="12">
                                                <FormGroup className="has-icon-left position-relative">
                                                    <Label htmlFor="address">Address</Label>
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
                                                <Label htmlFor="location">Location</Label>
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
                        <CardText className='font-small-2 mb-2' style={{maxHeight: 340}}>
                            <strong>Course Description:</strong> {course.details}
                        </CardText>    
                        <div className='d-flex'>
                            <CardText className='mb-2 p-1 border rounded'>Price {course.price} INR</CardText>
                        </div>
                    </CardBody>
                </Card> : null }
            </Col>
        </Row>
    </>)
}

export default AddCourseSchedule