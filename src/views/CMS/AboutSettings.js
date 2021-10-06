import React, {useEffect} from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"

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
            content: JSON.stringify(values.editorValue)
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
            <EditorComponent submitForm={submitForm} data={data[0] ? JSON.parse(data[0].content) : undefined} />
        </CardBody>
    </Card>
    </>
}

export default AboutSettings