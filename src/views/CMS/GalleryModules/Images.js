import React from "react"
import {Card, CardHeader, CardBody, CardTitle, CardImg, CustomInput, FormGroup, Button} from "reactstrap"
import {Formik, Form} from "formik"

const ImgSam = "/assets/images/default-image.jpg"

const Images = () => {
    const submitForm = (values) => {
        console.log("values", values)
    }

    return <>
    <Card>
        <CardHeader>
            <CardTitle>Images Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
                <Formik>
                    {(formik) => {
                        return (
                            <Form>
                            <div className="d-flex flex-wrap justify-content-around">
                                <Card style={{minWidth:"250px", minHeight: "250px", maxWidth:"300px", maxHeight:"300px"}}>
                                    <CardImg width="300px" height="300px" src={ImgSam} alt="Card image cap" className="img-fluid img-thumbnail position-relative" />
                                    <div className="position-absolute fixed-bottom d-flex justify-content-between" style={{backgroundColor: "rgba(100, 100, 100, 0.5)", padding: "5px", margin:"5px" }}>
                                        <CardTitle className="text-white">Image Name</CardTitle>
                                        <CustomInput inline type='checkbox' id={`checkimg1`} />
                                    </div>
                                </Card>
                                <Card style={{minWidth:"250px", minHeight: "250px", maxWidth:"300px", maxHeight:"300px"}}>
                                    <CardImg width="300px" height="300px" src={ImgSam} alt="Card image cap" className="img-fluid img-thumbnail position-relative" />
                                    <div className="position-absolute fixed-bottom d-flex justify-content-between" style={{backgroundColor: "rgba(100, 100, 100, 0.5)", padding: "5px", margin:"5px" }}>
                                        <CardTitle className="text-white">Image Name</CardTitle>
                                        <CustomInput inline type='checkbox' id={`checkimg2`} />
                                    </div>
                                </Card>
                                <Card style={{minWidth:"250px", minHeight: "250px", maxWidth:"300px", maxHeight:"300px"}}>
                                    <CardImg width="300px" height="300px" src={ImgSam} alt="Card image cap" className="img-fluid img-thumbnail position-relative" />
                                    <div className="position-absolute fixed-bottom d-flex justify-content-between" style={{backgroundColor: "rgba(100, 100, 100, 0.5)", padding: "5px", margin:"5px" }}>
                                        <CardTitle className="text-white">Image Name</CardTitle>
                                        <CustomInput inline type='checkbox' id={`checkimg3`} />
                                    </div>
                                </Card>
                                <Card style={{minWidth:"250px", minHeight: "250px", maxWidth:"300px", maxHeight:"300px"}}>
                                    <CardImg width="300px" height="300px" src={ImgSam} alt="Card image cap" className="img-fluid img-thumbnail position-relative" />
                                    <div className="position-absolute fixed-bottom d-flex justify-content-between" style={{backgroundColor: "rgba(100, 100, 100, 0.5)", padding: "5px", margin:"5px" }}>
                                        <CardTitle className="text-white">Image Name</CardTitle>
                                        <CustomInput inline type='checkbox'  id={`checkimg4`} />
                                    </div>
                                </Card>
                            </div>
                            <hr />
                            <FormGroup>
                                <div className="float-right">
                                    <Button type="submit" color="primary">Save</Button>
                                </div>
                            </FormGroup>
                            </Form>
                        )
                    }}
                </Formik>
        </CardBody>
    </Card>
    </>
}

export default Images