import React, {useState, useEffect, useRef} from "react"
import {Card, CardHeader, CardTitle, CardBody, Button} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import JoditEditor from "jodit-react"

import { fetchCMS, AddCMS, EditCMS } from "../../redux/actions/cms"

const VisionSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.vission[state.cms.vission?.length - 1]?.content)

    const editor = useRef(null)
    const [content, setContent] = useState()
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCMS("VISSION"))
    }, [])

    useEffect(() => {
        setContent(data)
    }, [data])


    const submitForm = () => {
        const rawData = {
            type: "VISSION",
            content
        }
        if (data) {
            dispatch(EditCMS('VISSION', rawData))
            return
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
            <div className="mt-2">
                <Button type="button" color="success" onClick={submitForm}>Save</Button>
            </div>
        </CardBody>
    </Card>
    </>
}

export default VisionSettings