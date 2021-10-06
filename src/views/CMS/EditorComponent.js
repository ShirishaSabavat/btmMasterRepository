import React, {useState} from "react"
import {FormGroup, Button} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

const EditorComponent = ({data, submitForm}) => {

    console.log({data})

    const [value, setValue] = useState(data ? data : EditorState.createEmpty())

    // console.log('convertToRaw(editorState.getCurrentContent(value))')
    // console.log(draftToHtml(convertToRaw(value.getCurrentContent())))

    const initialValues = {
        editorValue: value
    }

    return  <div>
        <Formik initialValues={initialValues} onSubmit={submitForm} enableReinitialize>
            {(formik) => {
                return (
                    <Form>
                        <FormGroup>
                            <Editor 
                                editorState={formik.values.editorValue} 
                                onEditorStateChange={val => setValue(val.getCurrentContent()) } 
                            />
                            
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