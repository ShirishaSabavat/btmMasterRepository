import React from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import EditorComponent from "./EditorComponent"

const VisionSettings = () => {
    const submitForm = (values) => {
        console.log("values", values)
    }
    return <>
    <Card>
        <CardHeader>
            <CardTitle>Vission Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <EditorComponent submitForm={submitForm} />
        </CardBody>
    </Card>
    </>
}

export default VisionSettings