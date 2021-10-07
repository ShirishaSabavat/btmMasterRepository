import React from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"

import {AddStaffAPI} from "../../redux/actions/staff/index"
import CustomSelectField from "../UtilityComponents/CustomSelectField"

const AddStaff = () => {

    const dispatch = useDispatch()
    const staffData = useSelector(state => state.staff.staff)

    const initialValues = {
        fullName: staffData?.fullName || "",
        email:staffData?.email || "",
        phone:staffData?.phone || "",
        dob:staffData?.dob || "",
        gender:staffData?.gender || "",
        role:staffData?.role || "",
        password:staffData?.password || "",
        dateOfJoining:staffData?.dateOfJoining || "",
        salary:staffData?.salary || ""
    }

    const validationSchema = Yup.object().shape({
        fullName:Yup.string().required("Required"),
        email:Yup.string().email().required("Required"),
        phone:Yup.number().positive().required("Required"),
        dob:Yup.date().required("Required"),
        gender:Yup.string().required("Required"),
        role:Yup.string().required("Required"),
        password:Yup.string().required("Required"),
        dateOfJoining:Yup.date().required("Required"),
        salary:Yup.number().positive().required("Required")
    })

    const submitForm = (values, {resetForm}) => {
        console.log("values", values)

        const rawData = {
            fullName: values.fullName,
            email:values.email,
            phone:values.phone,
            dob:values.dob,
            gender:values.gender,
            role:values.role,
            password:values.password,
            dateOfJoining:values.dateOfJoining,
            salary:values.salary
        }

        dispatch(AddStaffAPI(rawData, resetForm))
    }

    const genderOptions = [{label: "MALE", value:"male"}, {label:"FEMALE", value: "female"}]
    const roleOptions = [{label: "ADMIN", value:"ADMIN"}, {label:"USER", value: "USER"}]

    return <Row>
        <Col sm="12" md="5">
            <Card >
                <CardHeader>
                    <CardTitle>Edit Staff</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="fullName">Full Name</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="fullName"
                                                    id="fullName"
                                                    {...formik.getFieldProps("fullName")}
                                                    invalid={!!(formik.touched.fullName && formik.errors.fullName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="fullName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="email">Email</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    {...formik.getFieldProps("email")}
                                                    invalid={!!(formik.touched.email && formik.errors.email)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="phone">Phone</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="phone"
                                                    id="phone"
                                                    {...formik.getFieldProps("phone")}
                                                    invalid={!!(formik.touched.phone && formik.errors.phone)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="phone"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="dob">DOB</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                name="dob"
                                                id="dob"
                                                value={formik.values.dob}
                                                options={{
                                                    dateFormat: "Y-m-d"
                                                  }}
                                                onChange={(date) => {
                                                    formik.setFieldValue("dob", date[0])
                                                }} />
                                                <ErrorMessage name="dob" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="gender">Gender</Label>
                                                <CustomSelectField
                                                    value={formik.values.gender}
                                                    options={genderOptions}
                                                    onChange={(value) => formik.setFieldValue("gender", value.value)
                                                } />
                                                <ErrorMessage
                                                name="gender"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="role">Role</Label>
                                                <CustomSelectField
                                                    value={formik.values.role}
                                                    options={roleOptions}
                                                    onChange={(value) => formik.setFieldValue("role", value.value)
                                                } />
                                                <ErrorMessage
                                                name="role"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="password">Password</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    {...formik.getFieldProps("password")}
                                                    invalid={!!(formik.touched.password && formik.errors.password)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="dateOfJoining">Date of Joining</Label>
                                                <br />
                                                <Flatpickr
                                                className="form-control"
                                                name="dateOfJoining"
                                                id="dateOfJoining"
                                                value={formik.values.dateOfJoining}
                                                options={{
                                                    dateFormat: "Y-m-d"
                                                  }}
                                                onChange={(date) => {
                                                    formik.setFieldValue("dateOfJoining", date[0])
                                                }} />
                                                <ErrorMessage name="dateOfJoining" component="div" className="field-error text-danger" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="salary">Salary</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="salary"
                                                    id="salary"
                                                    {...formik.getFieldProps("salary")}
                                                    invalid={!!(formik.touched.salary && formik.errors.salary)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="salary"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="float-right mt-1">
                                        <Button color="success" type="submit">Update</Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default AddStaff