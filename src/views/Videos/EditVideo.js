import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText, CustomInput} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Link} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import { EditVideoAPI, fetchVideoById } from "../../redux/actions/videos/index"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import { BASE_URL } from '../../utility/serverSettings'

const AddVideo = () => {

    const { videoId } = useParams()

    const dispatch = useDispatch()
    const history = useHistory()
    const oldData = useSelector(state => state.videos.video)
    const imagesData = useSelector(state => state.media.medias)

    useEffect(() => {
        dispatch(fetchVideoById(videoId))
    }, [])

    const [fileModalState, setFileModalState] = useState(false)

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

    const [selectedImg, setSelectedImg] = useState('')

    const initialValues = {
        title: oldData?.title || "",
        image:  selectedImg.replace(`${BASE_URL}uploads/`, '') || "",
        videoLink: oldData?.link || "",
        duration: oldData.duration || "",
        description: oldData.description || "",
        bacOnly: oldData.bacOnly || false,
        videoLinkType: oldData.videoLinkType || 'true'
    }


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        image: Yup.string().required("Required"),
        videoLink: Yup.mixed().required("Required"),
        duration: Yup.string(),
        description: Yup.string()
    })

    const submitForm = (values) => {
        console.log("values", values)
        
        let fileData

        if (values.videoLinkType === 'false') {
            fileData = new FormData()
            formData.append('inputFile', values.inputFile)
        } else {
            fileData = values.videoLink
        }

        const rawData = {
            duration: values.duration,
            description: values.description,
            link: fileData,
            image: values.image,
            title: values.title,
            bacOnly: values.bacOnly,
            videoLinkType: values.videoLinkType
        }

        dispatch(EditVideoAPI(id, rawData))
    }


    return <Row>
        <Col sm="12" md="5">
            <Card >
                <CardHeader>
                    <CardTitle>Edit Video</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            console.log("new", formik.values)
                            return (
                                <Form>
                                    <Row className="d-flex justify-content-center">
                                        <Col sm="12" md="8" className="mb-1">
                                            <Row className="d-flex justify-content-around align-items-center">
                                                <Col sm="12" md="8">
                                                    {selectedImg === '' && (
                                                        <img src={(oldData?.image === '/assets/images/default-image.jpg') ? oldData.image : `${BASE_URL}uploads/${oldData?.image}`} alt="choosen image" className="img-thumbnail img-fluid" />
                                                    )}
                                                    {selectedImg !== '' && (
                                                        <img src={`${BASE_URL}uploads/${formik.values.image}`} alt="choosen image" className="img-thumbnail img-fluid" />
                                                    )}
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
                                    </Row>
                                    <Row className="mb-1 pr-2 pl-2" >
                                        <Col sm="12" md="12">
                                            <div>Video Type:</div>
                                            <CustomInput type='radio' id='videoLinkType1' name='videoLinkType' inline label='YouTube' {...formik.getFieldProps('videoLinkType')} value={true}  defaultChecked />
                                            <CustomInput type='radio' id='videoLinkType2' name='videoLinkType' inline label='Upload Video' {...formik.getFieldProps('videoLinkType')}  value={false}   />
                                        </Col>
                                    </Row>
                                    {formik.values.videoLinkType === "true" ? <><Row  className="mb-1 pr-2 pl-2">
                                            <Col sm="12" md="12" className='mt-1'>
                                                <FormGroup className="has-icon-left position-relative">
                                                    <Label htmlFor="videoLink">{formik.values.embededVideo ? "Embded code" : "Video Link"} <span className="text-danger">*</span> <small>(<a href="https://youtube.com" target="_blank" rel="noopener">Pick from youtube</a> )</small> </Label>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType='prepend'>
                                                            <InputGroupText className={!!(formik.touched.duration && formik.errors.duration) ? "border border-danger" : null}>
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
                                                        className="field-error text-danger" />
                                                </FormGroup>
                                            </Col>
                                        </Row><Row className="mb-1 pr-2 pl-2">
                                                <Col sm="12" md="12">
                                                    <FormGroup className="has-icon-left position-relative">
                                                        <CustomInput
                                                            type='switch'
                                                            id='embededVideo'
                                                            name='embededVideo'
                                                            label='Use Embded Video'
                                                            inline
                                                            onChange={(e) => formik.setFieldValue('embededVideo', e.target.checked)} />
                                                    </FormGroup>
                                                </Col>
                                            </Row></> : <Row className="mb-1 pr-2 pl-2"><Col><FormGroup>
                                                <Label for='videoLink'>File Upload</Label>
                                                <CustomInput type='file' id='videoLink' name='videoLink' onChange={(event) => {
                                                                    formik.setFieldValue("videoLink", event.currentTarget.files[0])
                                                }} accept="video/mp4,video/x-m4v,video/*" />
                                              </FormGroup></Col></Row>
                                              }  
                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="duration">Duration (Hours)</Label>
                                                <InputGroup>
                                                    <Input
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
                                        </Col>
                                    </Row>

                                    <Row className="mb-1 pr-2 pl-2">
                                        <Col sm="12" md="12">
                                            <Button color="primary" type="submit">Update</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardBody>
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
            </Card>
        </Col>
    </Row>
}

export default AddVideo