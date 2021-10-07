import {Row, Col, Card, CardHeader, CardTitle, CardBody, Label, FormGroup, Button, CustomInput} from "reactstrap"
import {Formik, Form, ErrorMessage} from 'formik'
import * as Yup from "yup"

const EditRole = () => {

    const initialValues = {
        courses: [],
        videos: []
    }

    const validationSchema = Yup.object().shape({

    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    return <Row>
        <Col sm="12" md="4">
            <Card>
                <CardHeader>
                    <CardTitle>Role: </CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} >
                        {(formik) => {
                            return (<Form>
                                <FormGroup className="d-flex align-items-center ">
                                    <Label for="courses"><strong>Courses:</strong></Label>
                                    <div className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="viewCourse">View</Label>
                                        <CustomInput type="checkbox" name="courses" id="viewCourse" {...formik.getFieldProps("courses")} value="view" />
                                    </div>
                                    <div  className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="addCourse">Add</Label>
                                        <CustomInput type="checkbox" name="courses" id="addCourse" {...formik.getFieldProps("courses")} value="add" />
                                    </div>
                                    <div  className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="editCourse">Edit</Label>
                                        <CustomInput type="checkbox" name="courses" id="editCourse" {...formik.getFieldProps("courses")} value="edit" />
                                    </div>
                                    <div  className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="deleteCourse">Delete</Label>
                                        <CustomInput type="checkbox" name="courses" id="deleteCourse" {...formik.getFieldProps("courses")} value="delete" />
                                    </div>
                                    <ErrorMessage
                                        name="courses"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                                <FormGroup className="d-flex align-items-center ">
                                    <Label for="videos"><strong>Videos:</strong></Label>
                                    <div className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="viewVideo">View</Label>
                                        <CustomInput type="checkbox" name="coursevideoss" id="viewVideo" {...formik.getFieldProps("videos")}  value="view" />
                                    </div>
                                    <div  className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="addVideo">Add</Label>
                                        <CustomInput type="checkbox" name="videos" id="addVideo" {...formik.getFieldProps("videos")}  value="add" />
                                    </div>
                                    <div  className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="editVideo">Edit</Label>
                                        <CustomInput type="checkbox" name="videos" id="editVideo" {...formik.getFieldProps("videos")}  value="edit" />
                                    </div>
                                    <div  className="mx-1 d-flex flex-column align-items-center">
                                        <Label for="deleteVideo">Delete</Label>
                                        <CustomInput type="checkbox" name="videos" id="deleteVideo" {...formik.getFieldProps("videos")}  value="delete" />
                                    </div>
                                    <ErrorMessage
                                        name="videos"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-end">
                                    <Button color="success" type="submit">Save</Button>
                                </FormGroup>
                            </Form>)
                        }}
                    </Formik>
                </CardBody>
            </Card>
        </Col>
    </Row>

}

export default EditRole