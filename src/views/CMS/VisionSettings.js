import React, {useState, useEffect, useRef} from "react"
import {Card, CardHeader, CardTitle, CardBody, Button} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import JoditEditor from "jodit-react"

import { fetchCMS, AddCMS } from "../../redux/actions/cms"

const VisionSettings = () => {

    const dispatch = useDispatch()

    const editor = useRef(null)
    const [content, setContent] = useState(useSelector(state => state.cms.vission[0]?.content) || "")
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCMS("vission"))
    }, [])

    const submitForm = () => {
        const rawData = {
            type: "vission",
            content
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

export default VisionSettings