import React from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import EditorComponent from "./EditorComponent"

const MissionSettings = () => {
    const submitForm = (values) => {
        console.log("values", values)
    }
    return <>
    <Card>
        <CardHeader>
            <CardTitle>Mission Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <EditorComponent submitForm={submitForm} />
        </CardBody>
    </Card>
    </>
}

export default MissionSettings