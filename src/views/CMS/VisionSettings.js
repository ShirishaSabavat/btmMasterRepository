import React, {useEffect} from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { convertToRaw } from 'draft-js'

import EditorComponent from "./EditorComponent"
import { fetchCMS, AddCMS } from "../../redux/actions/cms"

const VisionSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.vission)

    useEffect(() => {
        dispatch(fetchCMS("vission"))
    }, [])

    const submitForm = (values) => {
        const rawData = {
            type: "vission",
            content: convertToRaw(values.editorValue?.getCurrentContent()).blocks
        }
        dispatch(AddCMS('VISSION', rawData))
    }
    return <>
    <Card>
        <CardHeader>
            <CardTitle>Vission Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <EditorComponent submitForm={submitForm} data={data} />
        </CardBody>
    </Card>
    </>
}

export default VisionSettings