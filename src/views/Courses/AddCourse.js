import React, {useRef, useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import { toast } from 'react-toastify'
import JoditEditor from "jodit-react"
// import sampleImg from "../../assets/images/portrait/small/avatar-s-1.jpg"
import CustomSelectField from "../UtilityComponents/CustomSelectField"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import { fetchAllMedia } from "../../redux/actions/media"
import { fetchAllVideos } from "../../redux/actions/videos"
import { AddCourseAPI } from "../../redux/actions/courses"
import {fetchAllFacultyOptions} from "../../redux/actions/faculty/index"
import { BASE_URL } from "../../utility/serverSettings"
import { useHistory } from "react-router-dom"

const AddCourse = () => {

    const dispatch = useDispatch()
    const coursesData = useSelector(state => state.courses.courses)
    const imagesData = useSelector(state => state.media.medias)
    const allVideos = useSelector(state => state.videos.videos)
    const facultyOptions = useSelector(state => state.faculty.facultyOptions)    
    const networkLoading = useSelector(state => state.common.loading)

    const history = useHistory()

    const editor = useRef(null)
    const config = {
        readonly: false
    }

    const [selectedImg, setSelectedImg] = useState("")
    const [editModal, setModal] = useState({
        modal: false
      })

      useEffect(() => {
        dispatch(fetchAllFacultyOptions())
      }, [])

    const toggleModel = () => {
    setModal((prevState) => {
        return { modal: !prevState.modal }
    })
    }

    const initialValues = {
        courseName:"",
        courseType:"",
        courseCode:"",
        courseDetails:"",
        courseValidity:"",
        price:"",
        videoLink:[],
        tags:"",
        faculty:"",
        featured: false
    }

    const validationSchema = Yup.object().shape({
        courseName:Yup.string().required("Required"),
        courseType: Yup.string().required("Required"),
        courseCode: Yup.string().required("Required"),
        courseDetails: Yup.string().required("Required"),
        courseValidity: Yup.number().positive().integer().required("Required"),
        price: Yup.number().positive().integer().required("Required"),
        videoLink: Yup.array().required("Required"),
        tags: Yup.string()
        // faculty: Yup.string().required("Required")
    })

    const goBack = () => {
        history.push('/courses')
    }

    const submitForm = (values, {resetForm}) => {
        if (selectedImg === "") {
            console.log("errrr")
            throw toast.error("Image Required", {
                position: toast.POSITION.BOTTOM_CENTER
              })
        }
        console.log("course values", values)
        const videoLinks = values.videoLink.map(item => {
            if (item?.value) {
                return item.value
            }
            return item
        })
        const rawData =  {
            image: selectedImg.replace(`${BASE_URL}uploads/`, ''),
            gst: 18,
            tags: values.tags,
            categories: "C",
            schedule: "hh",
            shortDescription: "ok",
            validity: values.courseValidity,
            videos: videoLinks,
            price: values.price,
            details: values.courseDetails,
            code: values.courseCode,
            type: values.courseType,
            name: values.courseName,
            faculty: values.faculty,
            featured: values.featured
        }

        dispatch(AddCourseAPI(rawData, goBack))
    }
    
    useEffect(() => {
        dispatch(fetchAllMedia())
        dispatch(fetchAllVideos())
    }, [])

    const courseOptions = [{label:"BAC", value:"Bac"}, {label: "Regular", value: "Regular"}]

    return <Row>
        <Col sm="12" md="7">
            <Card >
                <CardHeader>
                    <CardTitle>Add Course</CardTitle>
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
                                <Form >
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
                                                <Label htmlFor="courseValidity">Course Validity(Days) <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="videoLink">Youtube Video Link <span className="text-danger">*</span> </Label>
                                                <CustomSelectField
                                                    value={formik.values.videoLink}
                                                    options={allVideos.map((i) => ({label: i.title, value: i._id}))}
                                                    name="videoLink"
                                                    onChange={(value) => formik.setFieldValue("videoLink", value)} 
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
                                    {/* <Row>
                                        <Col sm="12">
                                            <FormGroup>
                                                <Label htmlFor="tag">Tags</Label>
                                                <TagsInput value={state.tags} onChange={handleChange} addOnBlur className="react-tagsinput rounded"  />
                                            </FormGroup>
                                        </Col>
                                    </Row> */}
                                    {/* <Row>
                                        <Col sm="12">
                                            <FormGroup>
                                                <Label htmlFor="tag">Tags</Label>
                                                <ReactTagInput 
                                                    tags={state.tags} 
                                                    placeholder="Type and press enter"
                                                    maxTags={10}
                                                    editable={true}
                                                    readOnly={false}
                                                    removeOnBackspace={true}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col sm="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="tags">Tags <small>(seperated by comma)</small> </Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="tags"
                                                    id="tags"
                                                    {...formik.getFieldProps("tags")}
                                                    invalid={!!(formik.touched.tags && formik.errors.tags)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="tags"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    {/* <Row>
                                        <Col sm="12">
                                            <div className="p-2">
                                                <h6>More Options</h6>
                                                <FormGroup check inline>
                                                    <Input type='checkbox' defaultChecked={formik.values.featured} name='featured' id='featured' {...formik.getFieldProps("featured")} />
                                                    <Label for='featured' check>
                                                        Featured
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                        </Col>
                                    </Row> */}

                                    <Row className="mt-1">
                                        <Col sm="12" md="12">
                                            <Button color="primary" type="submit"disabled = {networkLoading}>{networkLoading ? "Please Wait..." : "Save"}</Button>
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
                        toggleFileModal={toggleModel}
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

export default AddCourse