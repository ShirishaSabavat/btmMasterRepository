import React, {useState, useEffect, useRef} from "react"
import {Card, CardHeader, CardBody, CardTitle, Button} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"

import { fetchCMS, AddCMS, EditCMS } from "../../redux/actions/cms"
import JoditEditor from "jodit-react"

const AboutSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.about[0]?.content)

    const editor = useRef(null)
    const [content, setContent] = useState()
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCMS("about"))
    }, [])

    useEffect(() => {
        setContent(data)
    }, [data])

    const submitForm = (values) => {
        const rawData = {
            type: "about",
            content
        }
        if (data) {
            dispatch(EditCMS('ABOUT', rawData))
            return
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

export default AboutSettings