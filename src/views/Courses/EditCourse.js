import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

import { fetchAllVideos } from "../../redux/actions/videos"
import {EditCourseAPI, fetchCourseById} from "../../redux/actions/courses/index"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import CustomSelectField from "../UtilityComponents/CustomSelectField"
import { BASE_URL } from '../../utility/serverSettings'
import {fetchAllFacultyOptions} from "../../redux/actions/faculty/index"

const EditCourse = () => {

    const [fileModalState, setFileModalState] = useState(false)
    
    const dispatch = useDispatch()
    const history = useHistory()
    const CourseData = useSelector(state => state.courses.course)
    const facultyOptions = useSelector(state => state.faculty.facultyOptions) 
    const imagesData = useSelector(state => state.media.medias) 
    const allVideos = useSelector(state => state.videos.videos)

    const id = history.location?.params?.id

    useEffect(() => {
        dispatch(fetchCourseById(id))
    }, [id])

    useEffect(() => {
        dispatch(fetchAllFacultyOptions())
      }, [])

    const [editModal, setModal] = useState({
        modal: false
      })

    const toggleModel = () => {
        setModal((prevState) => {
            return { modal: !prevState.modal }
        })
    }

    const toggleFileModal = () => {
        setFileModalState((prevState) => !prevState)
    }    

    const [selectedImg, setSelectedImg] = useState(`${BASE_URL}uploads/${CourseData?.image}`)

    const initialValues = {
        image: selectedImg,
        courseName: CourseData?.name || "",
        courseType: CourseData?.type || "",
        courseCode: CourseData?.code || "",
        courseDetails: CourseData?.details || "",
        courseValidity: CourseData?.validity || "",
        price: CourseData?.price || "",
        videoLink: allVideos || "",
        faculty: CourseData?.faculty || ""
    }

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Required"),
        courseName: Yup.string().required("Required"),
        courseType: Yup.string().required("Required"),
        courseCode: Yup.string().required("Required"),
        courseDetails: Yup.string().required("Required"),
        courseValidity: Yup.number().positive().integer().required("Required"),
        price: Yup.number().positive().integer().required("Required"),
        faculty: Yup.string().required("Required")
        // videoLink: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)

        const rawData = {
            gst: 18,
            tags: values.tags,
            categories: "C",
            schedule: "hh",
            shortDescription: "ok",
            validity: values.courseValidity,
            videos: values.videoLink,
            price: values.price,
            details: values.courseDetails,
            code: values.courseCode,
            type: values.courseType,
            name: values.courseName,
            image: values.image.replace(`${BASE_URL}uploads/`, ''),
            faculty: values.faculty
        }

        dispatch(EditCourseAPI(id, rawData))
    }

    useEffect(() => {
        dispatch(fetchAllVideos())
    }, [])

    const courseOptions = [{label:"BAC", value:"Bac"}, {label: "Regular", value: "Regular"}]

    return <Row>
        <Col sm="12" md="6">
            <Card >
                <CardHeader>
                    <CardTitle>Edit Course</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            console.log("fvalue", formik.values.videoLink)
                            return (
                                <Form>
                                     <Label htmlFor="courseName">Preview Image</Label>
                                     <Row className="d-flex justify-content-center">
                                        <Col sm="12" md="8" className="mb-1">
                                            <Row className="d-flex justify-content-around align-items-center">
                                                <Col sm="12" md="8">
                                                    <img src={formik.values.image} alt="choosen image" className="img-thumbnail img-fluid" />
                                                </Col>
                                                <Col sm="12" md="4">
                                                    <Button color="primary" type="button" onClick={toggleModel} >Choose Image</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="courseName">Course Name <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="courseType">Course Type <span className="text-danger">*</span></Label>
                                                <CustomSelectField
                                                value={formik.values.courseType}
                                                options={courseOptions}
                                                onChange={(value) => formik.setFieldValue("courseType", value.value)
                                                } />
                                                <ErrorMessage
                                                name="courseType"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="courseCode">Course Code <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="courseValidity">Course Validity(Days)</Label>
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
                                                <Label htmlFor="price">Price <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="faculty">Faculty</Label>
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
                                    </Row>
                                    <Row className="mb-1">
                                        {/* <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="videoLink">Video Link</Label>
                                                <CustomSelectField
                                                // value={formik.values.videoLink}
                                                options={videoOptions}
                                                onChange={(value) => formik.setFieldValue("videoLink", [...formik.values.videoLink, value.value])
                                                } 
                                                isMulti={true}
                                                />
                                                <ErrorMessage
                                                    name="videoLink"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col> */}
                                         <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="videoLink">Youtube Video Link <span className="text-danger">*</span></Label>
                                                <CustomSelectField
                                                    value={formik.values.videoLink}
                                                    defaultValue={allVideos.map((i) => ({label: i.title, value: i._id}))}
                                                    options={allVideos.map((i) => ({label: i.title, value: i._id}))}
                                                    name="videoLink"
                                                    onChange={(value) => { formik.setFieldValue("videoLink", value.map(val => val.value)) }} 
                                                    isMulti={true}
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
                                                <Label htmlFor="courseDetails">Course Details <span className="text-danger">*</span></Label>
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
                                    <div className="float-right mt-1">
                                        <Button color="primary" type="submit">Update</Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {!fileModalState && editModal.modal ? (
                    <ImagePickerComponent
                        modalState={editModal.modal}
                        onClose={toggleModel}
                        toggleFileModal={toggleFileModal}
                        imagesData={imagesData}
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                    />
                    ) : null}
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default EditCourse