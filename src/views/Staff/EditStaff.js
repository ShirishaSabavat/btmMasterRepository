import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from "react-flatpickr"
import { Country, State, City }  from 'country-state-city'
import {useHistory} from "react-router-dom"

import {EditStaffAPI} from "../../redux/actions/staff/index"
import {fetchUserById} from "../../redux/actions/user/index"
import CustomSelectField from "../UtilityComponents/CustomSelectField"

const AddStaff = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const staffData = useSelector(state => state.user.user)

    const id = history.location?.params?.id

    useEffect(() => {
        dispatch(fetchUserById(id))
    }, [id])

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
        fullName: staffData?.userData?.name || "",
        email:staffData?.userData?.email || "",
        phone:staffData?.userData?.phone || "",
        dob:staffData?.userData?.dob || "",
        gender:staffData?.userData?.gender || "",
        role:staffData?.userData?.role || "",
        password: "",
        dateOfJoining:staffData?.userData?.dateOfJoining || "",
        salary:staffData?.userData?.salary || "",
        epf:staffData?.userData?.epf || "",
        panNo:staffData?.userData?.pan || "",
        aadhar:staffData?.userData?.aadhar || "",
        marritalStatus:staffData?.userData?.marritalStatus || "",
        country:staffData?.userData?.country || "",
        state:staffData?.userData?.state || "",
        city:staffData?.userData?.city || "",
        address:staffData?.userData?.address || "",
        bankName:staffData?.userData?.bankName || "",
        branch:staffData?.userData?.branchName || "",
        acc:staffData?.userData?.accountNo || "",
        ifsc: staffData?.userData?.ifsc || ""
    }

    const validationSchema = Yup.object().shape({
        fullName:Yup.string().required("Required"),
        email:Yup.string().email().required("Required"),
        phone:Yup.number().positive().required("Required"),
        role:Yup.string().required("Required")
    })

    const submitForm = (values, {resetForm}) => {
        console.log("values", values)

        const rawData = {
            name: values.fullName,
            email: values.email,
            phone: values.phone,
            dob: values.dob,
            gender: values.gender,
            role: values.role,
            password: values.password,
            dateOfJoining: values.dateOfJoining,
            salary: values.salary,
            epf : values.epf,
            pan : values.panNo,
            aadhar : values.aadhar,
            marritalStatus : values.marritalStatus,
            country : values.country,
            statue : values.state,
            city : values.city,
            bankName : values.bankName,
            branchName : values.branch,
            accountNo : values.acc,
            address : values.address,
            ifsc : values.ifsc
        }

        if (!rawData.password || rawData.password === '') {
            rawData.password = null
        }

        dispatch(EditStaffAPI(id, rawData, resetForm))
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


    const genderOptions = [{label: "MALE", value:"MALE"}, {label:"FEMALE", value: "FEMALE"}]
    const roleOptions = [{label: "EMPLOYEE", value:"EMPLOYEE"}, {label:"USER", value: "USER"}]
    const maritialStatusOptions = [{label: "MARRIED", value:"MARRIED"}, {label:"SINGLE", value: "SINGLE"}]

    return <Row>
        <Col sm="12" md="6">
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
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="fullName">Full Name <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="phone">Phone <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="dob">DOB </Label>
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
                                                <Label htmlFor="gender">Gender </Label>
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
                                                <Label htmlFor="role">Role <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="email">Email <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="password">Password <span className="text-danger">*</span></Label>
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
                                                <Label htmlFor="dateOfJoining">Date of Joining</Label>
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
                                                <Label htmlFor="salary">Salary</Label>
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
                                                <Label htmlFor="epf">EPF</Label>
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
                                                <Label htmlFor="panNo">PAN NO</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
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
                                                <Label htmlFor="aadhar">aadhar Number</Label>
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
                                                <Label htmlFor="maritialStatus">Marritial Status</Label>
                                                <CustomSelectField
                                                    value={formik.values.marritalStatus}
                                                    options={maritialStatusOptions}
                                                    onChange={(value) => formik.setFieldValue("marritalStatus", value.value)
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
                                                <Label htmlFor="bankName">Bank Name</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="text"
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
                                                <Label htmlFor="branch">Branch</Label>
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
                                                <Label htmlFor="acc">Account Number</Label>
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
                                                <Label htmlFor="ifsc">IFSC Code</Label>
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
                                                <Label htmlFor="address">Address</Label>
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
                                    <div className="mt-1">
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