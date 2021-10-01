import React from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import EditorComponent from "./EditorComponent"

const ContactSettings = () => {
    const submitForm = (values) => {
        console.log("values", values)
    }
    return <>
    <Card>
        <CardHeader>
            <CardTitle>Contact Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <EditorComponent submitForm={submitForm} />
        </CardBody>
    </Card>
    </>
}

export default ContactSettings