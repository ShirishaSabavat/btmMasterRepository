import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"

import ImagePickerComponent from "../../UtilityComponents/ImagePickerComponent"
import {BASE_URL} from '../../../utility/serverSettings'
import CustomSelectField from "../../UtilityComponents/CustomSelectField"
import { AddBannerAPI } from "../../../redux/actions/banner"
import {fetchAllCoursesOptions} from "../../../redux/actions/courses"
import {fetchAllCourseScheduleOptions} from "../../../redux/actions/courseSchedule"

const AddBanner = () => {

    const dispatch = useDispatch()
    const courseOptions = useSelector(state => state.courses.courseOptions) 
    const workshopOptions = useSelector(state => state.courseSchedule.courseScheuleOptions) 

    const [selectedImg, setSelectedImg] = useState('/assets/images/default-image.jpg')
    const [editModal, setModal] = useState({
        modal: false
      })

      useEffect(() => {
        dispatch(fetchAllCoursesOptions())
        dispatch(fetchAllCourseScheduleOptions())
      }, [])

    const toggleModel = () => {
    setModal((prevState) => {
        return { modal: !prevState.modal }
    })
    }

    const initialValues = {
        title:"",
        image:selectedImg,
        workshop: "",
        course:"",
        description:"",
        position:""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        image: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)

        const rawData = {
            file: selectedImg.replace(`${BASE_URL}uploads/`, ''),
            title: values.title,
            position: values.position,
            description: values.description,
            workshopId: values.workshop,
            courseId: values.course
        }

        dispatch(AddBannerAPI(rawData))
    }

    return <Row>
        <Col sm="12" md="5">
            <Card >
                <CardHeader>
                    <CardTitle>Add Banner</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
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
                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="title">Banner Title</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    {...formik.getFieldProps("title")}
                                                    invalid={!!(formik.touched.title && formik.errors.title)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="title"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="position">Position</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="position"
                                                    id="position"
                                                    {...formik.getFieldProps("position")}
                                                    invalid={!!(formik.touched.position && formik.errors.position)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="position"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1 pr-2 pl-2">
                                    <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="course">Course</Label>
                                                <CustomSelectField
                                                    value={formik.values.course}
                                                    options={courseOptions}
                                                    onChange={(value) => formik.setFieldValue("course", value.value)
                                                } />
                                                <ErrorMessage
                                                name="course"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label htmlFor="workshop">Workshop</Label>
                                                <CustomSelectField
                                                    value={formik.values.workshop}
                                                    options={workshopOptions}
                                                    onChange={(value) => formik.setFieldValue("workshop", value.value)
                                                } />
                                                <ErrorMessage
                                                name="workshop"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="description">Description</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="textarea"
                                                    name="description"
                                                    id="description"
                                                    {...formik.getFieldProps("description")}
                                                    invalid={!!(formik.touched.description && formik.errors.description)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="mt-1 pl-2">
                                        <Button color="primary" type="submit">Save</Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardBody>
                {editModal.modal ? (
                <ImagePickerComponent
                    modalState={editModal.modal}
                    onClose={toggleModel}
                    toggleFileModal={toggleModel}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                />
                ) : null}
            </Card>
        </Col>
    </Row>
}

export default AddBanner