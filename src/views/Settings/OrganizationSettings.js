import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, CustomInput, Button, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { Country, State, City }  from 'country-state-city'
import {Home, Book, Phone, MapPin, User, Key, Mail } from "react-feather"
import {useDispatch, useSelector} from "react-redux"

import {fetchAllOrganizationSettings, postOrganizationSettings} from "../../redux/actions/settings/organization"
import CustomSelectField from "../UtilityComponents/CustomSelectField"
import ImagePickerComponent from "../UtilityComponents/ImagePickerComponent"
import sampleImg from "../../assets/images/portrait/small/avatar-s-1.jpg"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const OrganizationSettings = () => {

    const dispatch = useDispatch()
    const organizationData = useSelector(state => state.organization.organization)
    const loading = useSelector(state => state.common.loading)

    const [selectedImg, setSelectedImg] = useState(sampleImg)
    
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

  useEffect(() => {
      dispatch(fetchAllOrganizationSettings())
  }, [])

  const countryChangeHadler = (value, formik) => {
    formik.setFieldValue("country", value.value)
    setSelectedCountry(value.value)
  }

  const StateChangeHadler = (value, formik) => {
    console.log("val", value)
    formik.setFieldValue("state", value.value)
    setSelectedState(value)
  }

    const initialValues = {
        orgName: organizationData[0]?.name || "",
        regNo: organizationData[0]?.regNo || "",
        country: organizationData[0]?.country || "IN",
        state: organizationData[0]?.state || "",
        city: organizationData[0]?.city || "",
        pincode: organizationData[0]?.pinCode || "",
        email: organizationData[0]?.mailId || "",
        webaddress: organizationData[0]?.webaddress || "",
        phNo: organizationData[0]?.phoneNo || "",
        personName: organizationData[0]?.contactPerson || "",
        address:organizationData[0]?.address || "",
        username: organizationData[0]?.username || "",
        password: organizationData[0]?.password || "",
        panNo: organizationData[0]?.pAN || "",
        gstNo: organizationData[0]?.gST || "",
        cinNo: organizationData[0]?.cIN || "",
        pfNo: organizationData[0]?.pfNo || "",
        esiNo: organizationData[0]?.eSI || "",
        logo: organizationData[0]?.logo || selectedImg,
        latitude: organizationData[0]?.lat || "",
        longitude:  organizationData[0]?.lng || "",
        footerText:  organizationData[0]?.footerText || ""
    }

    const validationSchema = Yup.object().shape({
        orgName: Yup.string(),
        regNo: Yup.string(),
        country: Yup.string(),
        state:  Yup.string(),
        city:  Yup.string(),
        pincode: Yup.number().positive().integer(),
        email:Yup.string().email(),
        webaddress:Yup.string(),
        phNo: Yup.number().positive().integer(),
        personName:Yup.string(),
        address:Yup.string(),
        username:Yup.string(),
        password:Yup.string(),
        panNo: Yup.string(),
        gstNo: Yup.string(),
        cinNo: Yup.string(),
        pfNo: Yup.string(),
        esiNo: Yup.string(),
        logo:Yup.string(),
        latitude:Yup.string(),
        longitude:Yup.string(),
        footerText:Yup.string()
    })

    const submitForm = (values) => {
        console.log("values", values)

        const id = organizationData[0]?._id

        const rawData =  {
            logo: values.logo,
            eSI: values.esiNo,
            pfNo: values.pfNo,
            cIN: values.cinNo,
            gST: values.gstNo,
            pAN: values.panNo,
            phoneNo: values.phNo,
            contactPerson: values.personName,
            address: values.address,
            pinCode: values.pincode,
            city: values.city,
            state: values.state,
            country: values.country,
            regNo: values.regNo,
            name: values.orgName,
            lat: values.latitude,
            lng: values.longitude,
            footerText: values.footerText,
            mailId: values.email
        }

        dispatch(postOrganizationSettings(id, rawData))
    }

    if (loading) {
        return (<TableDataLoadingSkleton />)
    }


    return <Row className="w-100 h-100 ">
        <Col>
            <Card>
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-1">
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="orgName">Organization Name</Label>
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
                                                <Label htmlFor="regNo">Registration No</Label>
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
                                                <Label htmlFor="pincode">Pincode</Label>
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
                                        {/* <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="email">Mail Id</Label>
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
                                                <Label htmlFor="webaddress">Web Address</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.webaddress && formik.errors.webaddress) ? "border border-danger" : null}>
                                                        <MapPin size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
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
                                        </Col> */}
                                    </Row>
                                    <Row className="mb-1">
                                        <Col sm="12">
                                            <Label htmlFor="address">Address</Label>
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

                                    <h3 className="mt-3">Contact Details</h3>
                                    
                                    <hr />
                                    
                                    <Row>
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="phNo">Phone No</Label>
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
                                                <Label htmlFor="email">Mail Id</Label>
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
                                                <Label htmlFor="personName">Authorized Person Name</Label>
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
                                    </Row>

                                    <h3 className="mt-3">Organization Details</h3>
                                    
                                    <hr />
                                    
                                    <Row className="mb-1">
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="panNo">Pan No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="string"
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
                                                <Label htmlFor="gstNo">GST No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="string"
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
                                                <Label htmlFor="pfNo">Provident Fund No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="string"
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
                                        <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="esiNo">ESI No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="string"
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
                                                <Label htmlFor="cinNo">CIN No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="string"
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
                                        {/* <Col sm="12" md="3">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="pfNo">PF No</Label>
                                                <InputGroup>
                                                    <Input
                                                    type="string"
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
                                        </Col>                                         */}
                                    </Row>
                                    <h3 className="mt-3">Map location</h3>
                                    <hr />
                                        <Row>
                                            <Col sm="12" md="3">
                                                <FormGroup className="has-icon-left position-relative">
                                                    <Label htmlFor="latitude">latitude</Label>
                                                    <InputGroup>
                                                        <Input
                                                        type="string"
                                                        name="latitude"
                                                        id="latitude"
                                                        {...formik.getFieldProps("latitude")}
                                                        invalid={!!(formik.touched.latitude && formik.errors.latitude)}
                                                        >
                                                        </Input>
                                                    </InputGroup>
                                                    <ErrorMessage
                                                        name="latitude"
                                                        component="div"
                                                        className="field-error text-danger"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="3">
                                                <FormGroup className="has-icon-left position-relative">
                                                    <Label htmlFor="longitude">longitude</Label>
                                                    <InputGroup>
                                                        <Input
                                                        type="string"
                                                        name="longitude"
                                                        id="longitude"
                                                        {...formik.getFieldProps("longitude")}
                                                        invalid={!!(formik.touched.longitude && formik.errors.longitude)}
                                                        >
                                                        </Input>
                                                    </InputGroup>
                                                    <ErrorMessage
                                                        name="longitude"
                                                        component="div"
                                                        className="field-error text-danger"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    <h3 className="mt-3">CMS</h3>
                                    <hr />

                                        <Row>
                                            <Col sm="12" md="12">
                                                <FormGroup className="has-icon-left position-relative">
                                                    <Label htmlFor="footerText">Footer Text</Label>
                                                    <InputGroup>
                                                        <Input
                                                        type="textarea"
                                                        name="footerText"
                                                        id="footerText"
                                                        {...formik.getFieldProps("footerText")}
                                                        invalid={!!(formik.touched.footerText && formik.errors.footerText)}
                                                        >
                                                        </Input>
                                                    </InputGroup>
                                                    <ErrorMessage
                                                        name="footerText"
                                                        component="div"
                                                        className="field-error text-danger"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    {/* <Row className="d-flex">
                                        <Col sm="12" md="5" className="mb-1">
                                            <Row className="d-flex justify-content-around align-items-center">
                                                <Col sm="12" md="8">
                                                    <img src={formik.values.logo} alt="choosen image" className="img-thumbnail img-fluid" />
                                                </Col>
                                                <Col sm="12" md="4">
                                                    <Button color="primary" type="button" onClick={toggleModel} >Choose Image</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row> */}
                                    {/* {editModal.modal ? (
                                    <ImagePickerComponent
                                        modalState={editModal.modal}
                                        onClose={toggleModel}
                                        toggleFileModal={toggleModel}
                                        selectedImg={selectedImg}
                                        setSelectedImg={setSelectedImg}
                                    />
                                    ) : null} */}
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