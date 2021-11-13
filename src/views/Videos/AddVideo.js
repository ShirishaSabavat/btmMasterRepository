import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CustomInput, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import {Link, Code} from "react-feather"
import {useDispatch} from "react-redux"
import {BASE_URL} from '../../utility/serverSettings'

import {AddVideoAPI} from "../../redux/actions/videos/index"
// import sampleImg from "/assets/images/default-image.jpg"


const AddVideo = () => {

    const dispatch = useDispatch()

    const [selectedImg, setSelectedImg] = useState('/assets/images/default-image.jpg')
    const [editModal, setModal] = useState({modal: false})

    const toggleModel = () => {
        setModal((prevState) => {
            return { modal: !prevState.modal }
        })
    }

    const initialValues = {
        title: "",
        image: selectedImg,
        videoLink: "",
        duration: "",
        description: "",
        bacOnly: false,
        embededVideo: false,
        videoLinkType: "YOUTUBE"
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        image: Yup.string().required("Required"),
        duration: Yup.string(),
        description: Yup.string(),
        videoLinkType: Yup.string(),
        videoLink: Yup.string().when("videoLinkType", {
            is: 'YOUTUBE',
            then: Yup.string().required(),
            otherwise: Yup.string()
          }),
        videoFile: Yup.mixed().when("videoLinkType", {
            is: 'FILE',
            then: Yup.mixed().required(),
            otherwise: Yup.mixed()
        })
    })

    const submitForm = (values, {resetForm}) => {

        console.log(values)

        const formData = new FormData()

        formData.append('duration', values.duration)
        formData.append('description', values.description)
        formData.append('image', selectedImg.replace(`${BASE_URL}uploads/`, ''))
        formData.append('title', values.title)
        formData.append('bacOnly', values.bacOnly)
        formData.append('embededVideo', values.embededVideo)
        formData.append('videoLinkType', values.videoLinkType)

        if (values.videoLinkType === 'YOUTUBE') {
            formData.append('link', values.videoLink)
        } else {
            formData.append('videoFile', values.videoFile)
        }

        dispatch(AddVideoAPI(formData, resetForm))
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
                                                <Label htmlFor="title">Video Title <span className="text-danger">*</span></Label>
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
                                            <div>   
                                                <Label>Video Type:</Label>
                                            </div>

                                            <CustomInput 
                                                type='radio' 
                                                id='videoLinkType1' 
                                                name='videoLinkType' 
                                                inline 
                                                label='YouTube' 
                                                onChange={(e) => formik.setFieldValue('videoLinkType', e.target.value)}
                                                value={'YOUTUBE'} defaultChecked />

                                            <CustomInput 
                                                type='radio' 
                                                id='videoLinkType2' 
                                                name='videoLinkType' 
                                                inline 
                                                label='Upload Video'
                                                onChange={(e) => formik.setFieldValue('videoLinkType', e.target.value)}
                                                value={'FILE'}
                                             />

                                        </Col>

                                    </Row>

                                    <Row className={`mb-1 pr-2 pl-2 ${(formik.values.videoLinkType === "FILE") ? 'd-none' : ''}`}>
                                        <Col sm="12" md="12" className='mt-1'>
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="videoLink">{formik.values.embededVideo ? "Embded code" : "Video Link"} <span className="text-danger">*</span> <small>(<a href="https://youtube.com" target="_blank" rel="noopener">Pick from youtube</a> )</small> </Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                        <InputGroupText className={!!(formik.touched.duration && formik.errors.duration) ? "border border-danger" : null}>
                                                            {formik.values.embededVideo && (
                                                                <Code size={15} />
                                                            )}
                                                            {!formik.values.embededVideo && (
                                                                <Link size={15} />
                                                            )}
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type={formik.values.embededVideo ? "textarea" : "text"}
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
                                                    className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <CustomInput
                                                    type='switch'
                                                    id='embededVideo'
                                                    name='embededVideo'
                                                    label='Use Embded Video'
                                                    inline
                                                    value={formik.values.embededVideo}
                                                    defaultChecked={formik.values.embededVideo}
                                                    onChange={(e) => formik.setFieldValue('embededVideo', e.target.checked)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row className={`mb-1 pr-2 pl-2 ${(formik.values.videoLinkType === "YOUTUBE") ? 'd-none' : ''}`}>
                                        <Col>
                                            <FormGroup>
                                                <div>
                                                    <Label for='videoFile'>File Upload <span className="text-danger">*</span></Label>
                                                </div>
                                                <InputGroup>
                                                <CustomInput 
                                                    type='file' 
                                                    id='videoFile' 
                                                    name='videoFile' 
                                                    onChange={(event) => {
                                                        formik.setFieldValue("videoFile", event.currentTarget.files[0])
                                                    }} 
                                                    accept="video/mp4,video/x-m4v,video/*" />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="videoFile"
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

                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <div className="p-1">
                                                <h6>More Options</h6>
                                                <FormGroup className="has-icon-left position-relative">
                                                    {/* <Label htmlFor="bacOnly">Bac Only</Label> */}
                                                    <CustomInput
                                                        type='switch'
                                                        id='bacOnly'
                                                        name='bacOnly'
                                                        label='Bac Only'
                                                        inline
                                                        onChange={(e) => formik.setFieldValue('bacOnly', e.target.checked)}
                                                    />
                                                </FormGroup>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Button color="primary" type="submit">Save</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>

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