import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, CustomInput} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import FileUploadModal from "../UtilityComponents/FileUploadModal"
import { useSelector, useDispatch} from 'react-redux'
import {BASE_URL} from '../../utility/serverSettings'
import { saveGallery } from '../../redux/actions/gallery'

// import sampleImg from "/assets/images/default-image.jpg"

const AddGallery = () => {

    const dispatch = useDispatch()

    const imagesData = useSelector(state => state.media.medias)
    
    const [selectedImg, setSelectedImg] = useState('/assets/images/default-image.jpg')
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

    const initialValues = {
        name: "",
        file: selectedImg
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required")
    })

    const submitForm = (values, { resetForm }) => {
        if (selectedImg === '/assets/images/default-image.jpg') return
        
        values.file = selectedImg.replace(`${BASE_URL}uploads/`, '')
        
        dispatch(saveGallery(values))

        resetForm()
        setSelectedImg('/assets/images/default-image.jpg')
    }


    return <Row>
        <Col sm="12" md="4">
            <Card >
                <CardHeader>
                    <CardTitle>Add Images</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-1">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="name">Image Title</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    {...formik.getFieldProps("name")}
                                                    invalid={!!(formik.touched.name && formik.errors.name)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="8" className="mb-1">
                                            <Row className="d-flex justify-content-around align-items-center">
                                                <Col sm="12" md="8">
                                                    <img src={selectedImg} alt="choosen image" className="img-thumbnail img-fluid" />
                                                </Col>
                                                <Col sm="12" md="4">
                                                    <Button color="primary" type="button" onClick={toggleModel} >Choose Image</Button>
                                                </Col>
                                            </Row>
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
                {!fileModalState && editModal.modal ? (
                <ImagePickerComponent
                    modalState={editModal.modal}
                    onClose={toggleModel}
                    toggleFileModal={toggleModel}
                    imagesData={imagesData}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                />
                ) : null}
                {fileModalState ? (
                <FileUploadModal
                    modalState={fileModalState}
                    onClose={toggleFileModal}
                />
                ) : null}
            </Card>
        </Col>
    </Row>
}

export default AddGallery