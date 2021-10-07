import React, {useState, useRef} from "react"
import {Card, CardHeader, CardBody, CardTitle, Button} from "reactstrap"
import JoditEditor from "jodit-react"

const ContactSettings = () => {

    const editor = useRef(null)
    const [content, setContent] = useState("")
    const config = {
        readonly: false
    }

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
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} 
                onBlur={newContent => setContent(newContent)} 
            />
            <div className="d-flex justify-content-end m-1">
                <Button type="button" color="success" onClick={submitForm}>Save</Button>
            </div>
        </CardBody>
    </Card>
    </>
}

export default ContactSettings