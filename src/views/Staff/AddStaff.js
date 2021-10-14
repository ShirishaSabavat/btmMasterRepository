import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch} from "react-redux"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import { Country, State, City }  from 'country-state-city'

import {AddStaffAPI} from "../../redux/actions/staff/index"
import CustomSelectField from "../UtilityComponents/CustomSelectField"

const AddStaff = () => {

    const dispatch = useDispatch()

    const allCountries = Country.getAllCountries().map(values => { return {label : values.name, value : values.isoCode } })

    const [countryOptions] = useState(allCountries)
    const [stateOptions, setStates] = useState([])
    const [cityOptions, setCityOptions] = useState()
  
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedState, setSelectedState] = useState("")
  
    useEffect(() => {
      setStates(State.getStatesOfCountry(selectedCountry).map(values => { return {label : values.name, value : values.isoCode, countryCode: values.countryCode } }))
    }, [selectedCountry])
  
    useEffect(() => {
      const CountryCode = selectedState?.countryCode 
      const StateCode = selectedState?.value
      setCityOptions(City.getCitiesOfState(CountryCode, StateCode).map(values => { return {label : values.name, value: values.stateCode } }))
    }, [selectedState])


    const initialValues = {
        fullName:"",
        email:"",
        phone:"",
        dob:"",
        gender:"",
        role:"",
        password:"",
        dateOfJoining:"",
        salary:"",
        epf:"",
        panNo:"",
        aadhar:"",
        maritialStatus:"",
        country:"",
        state:"",
        city:"",
        address:"",
        bankName:"",
        branch:"",
        acc:"",
        ifsc:""
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

    const countryChangeHadler = (value, formik) => {
        formik.setFieldValue("country", value.label)
        setSelectedCountry(value.value)
      }
    
      const StateChangeHadler = (value, formik) => {
        console.log("val", value)
        formik.setFieldValue("state", value.label)
        setSelectedState(value)
      }


    const genderOptions = [{label: "MALE", value:"male"}, {label:"FEMALE", value: "female"}]
    const roleOptions = [{label: "ADMIN", value:"ADMIN"}, {label:"USER", value: "USER"}]
    const maritialStatusOptions = [{label: "Married", value:"married"}, {label:"Single", value: "single"}]

    return <Row>
        <Col sm="12" md="6">
            <Card >
                <CardHeader>
                    <CardTitle>Add Staff</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row>
                                        <Col sm="12" md="12">
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
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="epf">EPF</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="epf"
                                                    id="epf"
                                                    {...formik.getFieldProps("epf")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="panNo">PAN NO</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="panNo"
                                                    id="panNo"
                                                    {...formik.getFieldProps("panNo")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="aadhar">aadhar Number</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="aadhar"
                                                    id="aadhar"
                                                    {...formik.getFieldProps("aadhar")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="maritialStatus">Marritial Status</Label>
                                                <CustomSelectField
                                                    value={formik.values.maritialStatus}
                                                    options={maritialStatusOptions}
                                                    onChange={(value) => formik.setFieldValue("maritialStatus", value.value)
                                                } />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="country">Country</Label>
                                                <CustomSelectField
                                                value={formik.values.country}
                                                options={countryOptions}
                                                onChange={(value) => countryChangeHadler(value, formik)}
                                                />
                                                <ErrorMessage
                                                name="country"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="state">State</Label>
                                                <CustomSelectField
                                                value={formik.values.state}
                                                options={stateOptions}
                                                onChange={(value) => StateChangeHadler(value, formik) }
                                                />
                                                <ErrorMessage
                                                name="state"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label For="city">City</Label>
                                                <CustomSelectField
                                                value={formik.values.city}
                                                options={cityOptions}
                                                onChange={(value) => formik.setFieldValue("city", value.label)}
                                                />
                                                <ErrorMessage
                                                name="city"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="bankName">Bank Name</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="bankName"
                                                    id="bankName"
                                                    {...formik.getFieldProps("bankName")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="branch">Branch</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="branch"
                                                    id="branch"
                                                    {...formik.getFieldProps("branch")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="acc">Account Number</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="acc"
                                                    id="acc"
                                                    {...formik.getFieldProps("acc")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="ifsc">IFSC Code</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
                                                    name="ifsc"
                                                    id="ifsc"
                                                    {...formik.getFieldProps("ifsc")}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="address">Address</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="textarea"
                                                    name="address"
                                                    id="address"
                                                    {...formik.getFieldProps("address")}
                                                    >
                                                    </Input>
                                                </InputGroup>
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
            </Card>
        </Col>
    </Row>
}

export default AddStaff