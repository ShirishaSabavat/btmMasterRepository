import React, {useEffect} from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { convertToRaw } from 'draft-js'

import { fetchCMS, AddCMS } from "../../redux/actions/cms"
import EditorComponent from "./EditorComponent"


const AboutSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.about)

    useEffect(() => {
        dispatch(fetchCMS("about"))
    }, [])

    const submitForm = (values) => {
        const rawData = {
            type: "about",
            content: convertToRaw(values.editorValue?.getCurrentContent()).blocks
        }
        dispatch(AddCMS('ABOUT', rawData))
    }
    return <>
    <Card>
        <CardHeader>
            <CardTitle>About Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <EditorComponent submitForm={submitForm} data={data} />
        </CardBody>
    </Card>
    </>
}

export default AboutSettings