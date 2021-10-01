import React, {useState} from "react"
import {FormGroup, Button} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'


const EditorComponent = ({submitForm}) => {
    const [value, setValue] = useState(EditorState.createEmpty())

    const initialValues = {
        editorValue: value
    }

    const validationSchema = Yup.object().shape({
        editorValue: Yup.string().required("Required")
    })

    return  <div>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
            {(formik) => {
                return (
                    <Form>
                        <FormGroup>
                            <Editor editorState={formik.values.editorValue} onEditorStateChange={data => setValue(data)} />
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