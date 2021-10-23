import React, {useState, useEffect, useRef} from "react"
import {Card, CardHeader, CardBody, CardTitle, Button} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import JoditEditor from "jodit-react"

import { fetchCMS, AddCMS, EditCMS } from "../../redux/actions/cms"

const MissionSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.mission[0])?.content

    const editor = useRef(null)
    const [content, setContent] = useState()
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCMS("mission"))
    }, [])

    useEffect(() => {
        setContent(data)
    }, [data])

    const submitForm = () => {
        const rawData = {
            type: "mission",
            content
        }

        if (data) {
            dispatch(EditCMS('MISSION', rawData))
            return
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
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} 
                onBlur={newContent => setContent(newContent)} 
            />
            <div className="mt-2">
                <Button type="button" color="success" onClick={submitForm}>Save</Button>
            </div>
        </CardBody>
    </Card>
    </>
}

export default MissionSettings