import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, Badge,  InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Link} from "react-feather"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import {useDispatch, useSelector} from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'
import {fetchAllFacultyOptions} from "../../redux/actions/faculty/index"
import {EditCourseScheduleAPI, fetchCourseScheduleById} from "../../redux/actions/courseSchedule/index"
import {fetchAllCoursesOptions} from "../../redux/actions/courses/index"
import CustomSelectField from "../UtilityComponents/CustomSelectField"
import "react-datepicker/dist/react-datepicker.css"

const EditCourseSchedule = () => {

    const { workshopId } = useParams()
 
    const dispatch = useDispatch()
    const facultyOptions = useSelector(state => state.faculty.facultyOptions)   
    const courseOptions = useSelector(state => state.courses.courseOptions)   
    const courseScheduleData = useSelector(state => state.courseSchedule.courseSchedule)
    const networkLoading = useSelector(state => state.common.loading)
    const courseOptionsHandler = (value, formik) => {
        formik.setFieldValue("courseId", value.value)
    }
        
    useEffect(() => {
        dispatch(fetchCourseScheduleById(workshopId))
    }, [workshopId])
    useEffect(() => {
        dispatch(fetchAllFacultyOptions())
        dispatch(fetchAllCoursesOptions())
    }, [])

    const [courseData, setCourseData] = useState({
        courseId: "",
        startdate:  "",
        enddate: "",
        starttime:  "",
        endtime: "",
        location: "",
        faculty: "",
        address: ""
    })

    useEffect(() => {
        setCourseData({
            courseId: courseScheduleData?.courseId || "",
            startdate: courseScheduleData?.startDate || "",
            enddate: courseScheduleData?.endDate || "",
            starttime: courseScheduleData?.startTime || "",
            endtime: courseScheduleData?.endTime || "",
            location: courseScheduleData?.location || "",
            faculty: courseScheduleData?.faculty || "",
            address: courseScheduleData?.address || ""
        })
    }, [courseScheduleData])

    const initialValues = {
        courseId: courseData?.courseId || "",
        startdate: courseData?.startdate || "",
        enddate: courseData?.enddate || "",
        starttime: courseData?.starttime || "",
        endtime: courseData?.endtime || "",
        location: courseData?.location || "",
        faculty: courseData?.faculty || "",
        address: courseData?.address || ""
    }

    const validationSchema = Yup.object().shape({
        courseId: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        faculty: Yup.string().required("Required"),
        address: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
        const rawData = {
            courseId: values.courseId,
            startDate: new Date(values.startdate).toDateString(),
            endDate: new Date(values.enddate).toDateString(),
            startTime: values.starttime.toString(),
            endTime: values.endtime.toString(),
            startDate: values.startdate,
            faculty: values.faculty,
            address: values.address,
            location: values.location
        }

        dispatch(EditCourseScheduleAPI(workshopId, rawData))

    }

    if (!courseScheduleData.courseId) {
        return (<TableDataLoadingSkleton />)
    }

    return (<>
        <Row >
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Course Schedule</CardTitle>
                    </CardHeader>
                    <hr className="m-0" />
                    <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-1">
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="courseId">Course Name</Label>
                                                <CustomSelectField
                                                    value={formik.values.courseId}
                                                    options={courseOptions}
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
                                                value={formik.values.startdate}
                                                onChange={(date) => {
                                                    formik.values.startdate = date
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
                                                value={formik.values.enddate}
                                                onChange={(date) => {
                                                    formik.values.enddate = date
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
                                                    formik.values.starttime = date
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
                                                    formik.values.endtime = date
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
                                    
                                    <Row className="mt-1">
                                        <Col sm="12" md="12">
                                            <Button color="primary" type="submit" disabled = {networkLoading}>{networkLoading ? "Please Wait..." : "Update"}</Button>
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

export default EditCourseSchedule