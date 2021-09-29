import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"

import { Editor } from 'react-draft-wysiwyg'

const CMS = () => {
    return <Card>
        <CardHeader>
            <CardTitle>CMS Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <Card>
                <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <h3>Mission</h3>
                    <Editor editorState={value} onEditorStateChange={data => setValue(data)} />
                </CardBody>
            </Card>
        </CardBody>
    </Card>
}

export default CMS