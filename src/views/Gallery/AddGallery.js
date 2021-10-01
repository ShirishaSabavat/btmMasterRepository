import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup, CustomInput} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import FileUploadModal from "../UtilityComponents/FileUploadModal"

import sampleImg from "../../assets/images/portrait/small/avatar-s-1.jpg"

const AddGallery = () => {

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
        title:"",
        image:""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        image: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
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
                                                <Label for="title">Image Title</Label>
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
                                        <Col sm="12" md="8" className="mb-1">
                                            <Row className="d-flex justify-content-around align-items-center">
                                                <Col sm="12" md="8">
                                                    <img src={sampleImg} alt="choosen image" className="img-thumbnail img-fluid" />
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
                    toggleFileModal={toggleFileModal}
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