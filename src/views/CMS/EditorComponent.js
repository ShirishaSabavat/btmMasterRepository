import React, {useState} from "react"
import {FormGroup, Button} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'


const EditorComponent = ({data, submitForm}) => {

    console.log("icd", data[0]?.content)

    const [value, setValue] = useState(data ? data[0]?.content : EditorState.createEmpty())

    const initialValues = {
        editorValue: value
    }

    return  <div>
        <Formik initialValues={initialValues} onSubmit={submitForm} enableReinitialize>
            {(formik) => {
                return (
                    <Form>
                        <FormGroup>
                            <Editor editorState={formik.values.editorValue} onEditorStateChange={data => setValue(data) } />
                            <ErrorMessage
                                name="editorValue"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup>
                            <div className="float-right">
                                <Button type="submit" color="success">Save</Button>
                            </div>
                        </FormGroup>
                    </Form>
                )
            }}
        </Formik>
    </div>
}

export default EditorComponent