import React from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import EditorComponent from "./EditorComponent"

const CMS = (props) => {
    const submitForm = (values) => {
        console.log("values", values)
    }

    return <Card>
        <CardHeader>
            <CardTitle>CMS Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <div className="m-1">
                <h3>About</h3>
                <hr />
                <EditorComponent submitForm={submitForm} />
            </div>
            <div className="m-1">
                <h3>Mission</h3>
                <hr />
                <EditorComponent submitForm={submitForm} />
            </div>
            <div className="m-1">
                <h3>Vision</h3>
                <hr />
                <EditorComponent submitForm={submitForm} />
            </div>
            <div className="m-1">
                <h3>Contact</h3>
                <hr />
                <EditorComponent submitForm={submitForm} />
            </div>
           
        </CardBody>
    </Card>
}

export default CMS