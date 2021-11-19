import React, {useState, useEffect, useRef} from "react"
import {Card, CardHeader, CardBody, CardTitle, Button} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

import { fetchCMS, AddCMS, EditCMS } from "../../redux/actions/cms"
import JoditEditor from "jodit-react"

const ContactSettings = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.cms.contact)
    const serverLoading = useSelector(state => state.common.loading)

    const editor = useRef(null)
    const [content, setContent] = useState()
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCMS("CONTACT"))
    }, [])

    useEffect(() => {
        if (data) {
            setContent(data[0].content)
        }
    }, [data])

    const submitForm = (values) => {
        const rawData = {
            type: "CONTACT",
            content
        }
        if (data) {
            dispatch(EditCMS('CONTACT', rawData))
            return
        }
        dispatch(AddCMS('CONTACT', rawData))
    }

    if (serverLoading) {
        return (<TableDataLoadingSkleton />)
    }

    return (
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
    )
}

export default ContactSettings