import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, CustomInput, Button, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { Country, State, City }  from 'country-state-city'
import {Home, Book, Phone, MapPin, User, Key, Mail } from "react-feather"

import CustomSelectField from "../UtilityComponents/CustomSelectField"

const OrganizationSettings = () => {
    
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

  const countryChangeHadler = (value, formik) => {
    formik.setFieldValue("country", value.label)
    setSelectedCountry(value.value)
  }

  const StateChangeHadler = (value, formik) => {
    console.log("val", value)
    formik.setFieldValue("state", value.label)
    setSelectedState(value)
  }

    const initialValues = {
        orgName:"",
        regNo:"",
        country:"IN",
        state:"",
        city:"",
        pincode:"",
        email:"",
        webaddress:"",
        phNo:"",
        personName:"",
        address:"",
        username:"",
        password:"",
        panNo:"",
        gstNo:"",
        cinNo:"",
        pfNo:"",
        prdNo:"",
        esiNo:"",
        logo:""
    }

    const validationSchema = Yup.object().shape({
        orgName: Yup.string().required("Required"),
        regNo: Yup.number().positive().integer().required("Required"),
        country: Yup.string().required("Required"),
        state:  Yup.string().required("Required"),
        city:  Yup.string().required("Required"),
        pincode: Yup.number().positive().integer().required("Required"),
        email:Yup.string().email().required("Required"),
        webaddress:Yup.string().required("Required"),
        phNo: Yup.number().positive().integer().required("Required"),
        personName:Yup.string().required("Required"),
        address:Yup.string().required("Required"),
        username:Yup.string().required("Required"),
        password:Yup.string().required("Required"),
        panNo: Yup.number().positive().integer().required("Required"),
        gstNo: Yup.number().positive().integer().required("Required"),
        cinNo: Yup.number().positive().integer().required("Required"),
        pfNo: Yup.number().positive().integer().required("Required"),
        prdNo: Yup.number().positive().integer().required("Required"),
        esiNo: Yup.number().positive().integer().required("Required"),
        logo:Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }


    return <Row className="w-100 h-100 ">
        <Col>
            <Card>
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-1">
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="orgName">Organization Name</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.orgName && formik.errors.orgName) ? "border border-danger" : null}>
                                                        <Home size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="orgName"
                                                    id="orgName"
                                                    placeholder="Organization Name ..."
                                                    {...formik.getFieldProps("orgName")}
                                                    invalid={!!(formik.touched.orgName && formik.errors.orgName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="orgName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="regNo">Registration No</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.regNo && formik.errors.regNo) ? "border border-danger" : null}>
                                                        <Book size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="number"
                                                    name="regNo"
                                                    id="regNo"
                                                    {...formik.getFieldProps("regNo")}
                                                    invalid={!!(formik.touched.regNo && formik.errors.regNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="regNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
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
                                        <Col sm="12" md="3">
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
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12" md="3">
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
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="pincode">Pincode</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.pincode && formik.errors.pincode) ? "border border-danger" : null}>
                                                        <MapPin size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="number"
                                                    name="pincode"
                                                    id="pincode"
                                                    {...formik.getFieldProps("pincode")}
                                                    invalid={!!(formik.touched.pincode && formik.errors.pincode)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="pincode"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="email">Mail Id</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.email && formik.errors.email) ? "border border-danger" : null}>
                                                        <Mail size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="email"
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
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="webaddress">Web Address</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.webaddress && formik.errors.webaddress) ? "border border-danger" : null}>
                                                        <MapPin size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="number"
                                                    name="webaddress"
                                                    id="webaddress"
                                                    {...formik.getFieldProps("webaddress")}
                                                    invalid={!!(formik.touched.webaddress && formik.errors.webaddress)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="webaddress"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12">
                                            <Label for="address">Address</Label>
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input
                                                    type="textarea"
                                                    name="address"
                                                    id="address"
                                                    {...formik.getFieldProps("address")}
                                                    invalid={!!(formik.touched.address && formik.errors.address)}
                                                />
                                                <ErrorMessage
                                                name="address"
                                                component="div"
                                                className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3>Contact Details</h3>
                                    <hr />
                                    <Row>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="phNo">Phone No</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.phNo && formik.errors.phNo) ? "border border-danger" : null}>
                                                        <Phone size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="number"
                                                    name="phNo"
                                                    id="phNo"
                                                    {...formik.getFieldProps("phNo")}
                                                    invalid={!!(formik.touched.phNo && formik.errors.phNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="phNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="personName">Person Name</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.personName && formik.errors.personName) ? "border border-danger" : null}>
                                                        <User size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="personName"
                                                    id="personName"
                                                    {...formik.getFieldProps("personName")}
                                                    invalid={!!(formik.touched.personName && formik.errors.personName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="personName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="username">User Name</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.username && formik.errors.username) ? "border border-danger" : null}>
                                                        <User size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    {...formik.getFieldProps("username")}
                                                    invalid={!!(formik.touched.username && formik.errors.username)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="username"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="password">Password</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.password && formik.errors.password) ? "border border-danger" : null}>
                                                        <Key size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
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
                                    </Row>
                                    <hr />
                                    <h3>Organization Details</h3>
                                    <hr />
                                    <Row className="mb-1">
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="panNo">Pan No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="panNo"
                                                    id="panNo"
                                                    {...formik.getFieldProps("panNo")}
                                                    invalid={!!(formik.touched.panNo && formik.errors.panNo)}
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="panNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="gstNo">GST No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="gstNo"
                                                    id="gstNo"
                                                    {...formik.getFieldProps("gstNo")}
                                                    invalid={!!(formik.touched.gstNo && formik.errors.gstNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="gstNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="prdNo">Provident Fund No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="prdNo"
                                                    id="prdNo"
                                                    {...formik.getFieldProps("prdNo")}
                                                    invalid={!!(formik.touched.prdNo && formik.errors.prdNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="prdNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="esiNo">ESI No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="esiNo"
                                                    id="esiNo"
                                                    {...formik.getFieldProps("esiNo")}
                                                    invalid={!!(formik.touched.esiNo && formik.errors.esiNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="esiNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="cinNo">CIN No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="cinNo"
                                                    id="cinNo"
                                                    {...formik.getFieldProps("cinNo")}
                                                    invalid={!!(formik.touched.cinNo && formik.errors.cinNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="cinNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label for="pfNo">PF No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="number"
                                                    name="pfNo"
                                                    id="pfNo"
                                                    {...formik.getFieldProps("pfNo")}
                                                    invalid={!!(formik.touched.pfNo && formik.errors.pfNo)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="pfNo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <Label for="logo">Logo</Label>
                                                <CustomInput type='file' 
                                                    name="logo"
                                                    id="logo"
                                                    {...formik.getFieldProps("logo")}
                                                />
                                                <ErrorMessage
                                                    name="logo"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup className="d-flex justify-content-end">
                                        <Button color="primary" type="submit" >Save</Button>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default OrganizationSettings