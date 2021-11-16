import React, {useRef, useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import {  useParams } from "react-router-dom"
import JoditEditor from "jodit-react"
import { fetchAllVideos } from "../../redux/actions/videos"
import {EditCourseAPI, fetchCourseByIdToEdit} from "../../redux/actions/courses/index"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import CustomSelectField from "../UtilityComponents/CustomSelectField"
import { BASE_URL } from '../../utility/serverSettings'
import {fetchAllFacultyOptions} from "../../redux/actions/faculty/index"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const EditCourse = () => {

    const { courseId } = useParams()
    
    const dispatch = useDispatch()
    const CourseData = useSelector(state => state.courses.course)
    const facultyOptions = useSelector(state => state.faculty.facultyOptions) 
    const imagesData = useSelector(state => state.media.medias) 
    const allVideos = useSelector(state => state.videos.videos)
    
    // const videoLinks = CourseData?.videos?.map(videoLink =>  allVideos?.filter(videoID =>  videoID._id === videoLink)) 
    // const videoOptions = videoLinks?.map(videoData => ({ label: videoData[0]?.title, value: videoData[0]?._id }))
    const networkLoading = useSelector(state => state.common.loading)

    const editor = useRef(null)
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCourseByIdToEdit(courseId))
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

    const [selectedImg, setSelectedImg] = useState("")

    useEffect(() => {
        setSelectedImg(`${BASE_URL}uploads/${CourseData?.image}`)
    }, [CourseData])

    const prepareSelectedVideo = () => {
        return 0
        if (!CourseData.videos) return

        const videoDetails = CourseData.videos?.map(videoLink =>  allVideos?.filter(videoID =>  videoID._id === videoLink))
        const selectOptions = videoDetails?.map(videoData => ({ label: videoData[0]?.title, value: videoData[0]?._id }))
        
        return selectOptions
    }

    const initialValues = {
        image: selectedImg,
        courseName: CourseData?.name || "",
        courseType: CourseData?.type || "",
        courseCode: CourseData?.code || "",
        courseDetails: CourseData?.details || "",
        courseValidity: CourseData?.validity || "",
        price: CourseData?.price || "",
        videoLink:  CourseData?.videos?.map(i => ({label: i.title, value: i._id})),
        faculty: CourseData?.faculty || "",
        featured: CourseData?.featured || ""
    }

    const validationSchema = Yup.object().shape({
        courseName: Yup.string().required("Required"),
        courseType: Yup.string().required("Required"),
        courseCode: Yup.string().required("Required"),
        courseDetails: Yup.string().required("Required"),
        courseValidity: Yup.number().positive().integer().required("Required"),
        price: Yup.number().positive().integer().required("Required"),
        faculty: Yup.string().required("Required"),
        videoLink: Yup.array().required("Required")
    })

    const submitForm = (values) => {
        const videoLinks = values.videoLink.map(item => {
            if (item?.value) {
                return item.value
            }
            return item
        })
        const rawData = {
            gst: 18,
            tags: values.tags,
            categories: "C",
            schedule: "hh",
            shortDescription: "ok",
            validity: values.courseValidity,
            videos: values.videoLink.map(i => i.value),
            price: values.price,
            details: values.courseDetails,
            code: values.courseCode,
            type: values.courseType,
            name: values.courseName,
            image: selectedImg.replace(`${BASE_URL}uploads/`, ''),
            faculty: values.faculty,
            featured: values.featured
        }

        dispatch(EditCourseAPI(courseId, rawData))
    }

    const courseOptions = [{label:"BAC", value:"Bac"}, {label: "Regular", value: "Regular"}]

    if (!CourseData.name) {
        return (<TableDataLoadingSkleton />)
    }

    return <Row>
        <Col sm="12" md="7">
            <Card >
                <CardHeader>
                    <CardTitle>Edit Course</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <div>
                        <div>Preview Image</div>
                        <Row className="d-flex justify-content-center">
                            <Col sm="12" md="8" className="mb-1">
                                <Row className="d-flex justify-content-around align-items-center">
                                    <Col sm="12" md="8">

                                        {!selectedImg && (
                                            <img src='/assets/images/default-image.jpg' alt="choosen image" className="img-thumbnail img-fluid" />
                                        )}
                                        {selectedImg !== '' && (
                                            <img src={selectedImg} alt="choosen image" className="img-thumbnail img-fluid" />
                                        )}

                                    </Col>
                                    <Col sm="12" md="4">
                                        <Button color="primary" type="button" onClick={toggleModel} >Choose Image</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
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
                                         <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="videoLink">Video Links <span className="text-danger">*</span></Label>
                                                <CustomSelectField
                                                    value={formik.values.videoLink}
                                                    defaultValue={CourseData?.videos?.map(i => ({label: i.title, value: i._id}))}
                                                    options={allVideos.map((i) => ({label: i.title, value: i._id}))}
                                                    name="videoLink"
                                                    onChange={(value) => { formik.setFieldValue("videoLink", value) }} 
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
                                                {/* <InputGroup>
                                                    <Input
                                                    type="textarea"
                                                    name="courseDetails"
                                                    id="courseDetails"
                                                    {...formik.getFieldProps("courseDetails")}
                                                    invalid={!!(formik.touched.courseDetails && formik.errors.courseDetails)}
                                                    >
                                                    </Input>
                                                </InputGroup> */}
                                                <JoditEditor
                                                    ref={editor}
                                                    value={formik.values.courseDetails}
                                                    config={config}
                                                    tabIndex={1} 
                                                    onBlur={newContent => formik.setFieldValue('courseDetails', newContent)} 
                                                />
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
                                            <div className="p-2">
                                                <h6>More Options</h6>
                                                <FormGroup check inline>
                                                    <Input type='checkbox' name='featured' id='featured' defaultChecked={formik.values.featured} {...formik.getFieldProps("featured")} />
                                                    <Label for='featured' check>
                                                        Featured
                                                    </Label>
                                                </FormGroup>
                                            </div>
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
                    {editModal.modal ? (
                    <ImagePickerComponent
                        modalState={editModal.modal}
                        onClose={toggleModel}
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