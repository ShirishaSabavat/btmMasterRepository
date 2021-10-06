import React, {useEffect} from "react"
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { convertToRaw } from 'draft-js'

import EditorComponent from "./EditorComponent"
import { fetchCMS, AddCMS } from "../../redux/actions/cms"

const MissionSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.mission)

    useEffect(() => {
        dispatch(fetchCMS("vission"))
    }, [])

    const submitForm = (values) => {
        const rawData = {
            type: "mission",
            content: convertToRaw(values.editorValue?.getCurrentContent()).blocks
        }
        dispatch(AddCMS('MISSION', rawData))
    }
    return <>
    <Card>
        <CardHeader>
            <CardTitle>Mission Page Settings</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
            <EditorComponent submitForm={submitForm} data={data} />
        </CardBody>
    </Card>
    </>
}

export default MissionSettings