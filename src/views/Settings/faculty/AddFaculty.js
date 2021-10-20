import React, {useState} from "react"
import {Card, CardHeader, CardBody, CardTitle, Button, Row, Col, FormGroup, Label, InputGroup, Input, CustomInput} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch} from "react-redux"

// import sampleImg from "/assets/images/default-image.jpg"
import {AddFaculty} from "../../../redux/actions/faculty/index"
import ImagePickerComponent from "../../UtilityComponents/ImagePickerComponent"

const AddFacultyComponent = () => {

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

    const toggleFileModal = () => {
        setFileModalState((prevState) => !prevState)
    }

    const initialValues = {
        facultyName:"",
        facultyDetails:"",
        image: selectedImg
    }
    const validationSchema = Yup.object().shape({
        facultyName: Yup.string().required("Required"),
        facultyDetails: Yup.string().required("Required"),
        image: Yup.string().required("required")
    })
    const submitForm = (values, resetForm) => {
        const rawData = {
            name: values.facultyName,
            details: values.facultyDetails,
            image: values.image
        }
        dispatch(AddFaculty(rawData, resetForm))
    }
    return <Row>
        <Col sm="12" md="5">
            <Card>
                <CardHeader>
                    <CardTitle>Faculty Settings</CardTitle>
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
                                    <Row className="pl-1 pr-1">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="facultyName">Faculty Name <span className="text-danger">*</span></Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="facultyName"
                                                    id="facultyName"
                                                    {...formik.getFieldProps("facultyName")}
                                                    invalid={!!(formik.touched.facultyName && formik.errors.facultyName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="facultyName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="pl-1 pr-1">
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="facultyDetails">Faculty Details <span className="text-danger">*</span></Label>
                                                <InputGroup>
                                                    <Input
                                                    type="textarea"
                                                    name="facultyDetails"
                                                    id="facultyDetails"
                                                    {...formik.getFieldProps("facultyDetails")}
                                                    invalid={!!(formik.touched.facultyDetails && formik.errors.facultyDetails)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="facultyDetails"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="float-right">
                                                <Button type="submit" color="primary">Save</Button>
                                            </div>
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

export default AddFacultyComponent