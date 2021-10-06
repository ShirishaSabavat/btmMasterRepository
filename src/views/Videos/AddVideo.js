import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import {Link} from "react-feather"
import {useDispatch} from "react-redux"
import {BASE_URL} from '../../utility/serverSettings'

import {AddVideoAPI} from "../../redux/actions/videos/index"
// import sampleImg from "/assets/images/default-image.jpg"


const AddVideo = () => {

    const dispatch = useDispatch()

    const [selectedImg, setSelectedImg] = useState('/assets/images/default-image.jpg')
    const [editModal, setModal] = useState({
        modal: false
      })

    const toggleModel = () => {
    setModal((prevState) => {
        return { modal: !prevState.modal }
    })
    }

    const initialValues = {
        title:"",
        image:selectedImg,
        videoLink:"",
        duration:"",
        description:""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        image: Yup.string().required("Required"),
        videoLink: Yup.string().required("Required"),
        duration: Yup.number().positive().integer().required("Required"),
        description: Yup.string().required("required")
    })

    const submitForm = (values, {resetForm}) => {
        console.log("values", values)

        const rawData = {
            duration: values.duration,
            description: values.description,
            link: values.videoLink,
            image: selectedImg.replace(`${BASE_URL}uploads/`, ''),
            title: values.title
        }

        dispatch(AddVideoAPI(rawData, resetForm))
    }

    return <Row>
        <Col sm="12" md="5">
            <Card >
                <CardHeader>
                    <CardTitle>Add Video</CardTitle>
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
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="title">Video Title</Label>
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
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="videoLink">Video Link</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.duration && formik.errors.duration) ? "border border-danger" : null}>
                                                        <Link size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="videoLink"
                                                    id="videoLink"
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
                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="duration">Duration</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="duration"
                                                    id="duration"
                                                    {...formik.getFieldProps("duration")}
                                                    invalid={!!(formik.touched.duration && formik.errors.duration)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="duration"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="description">Description</Label>
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
                                    <div className="float-right mt-1">
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

export default AddVideo