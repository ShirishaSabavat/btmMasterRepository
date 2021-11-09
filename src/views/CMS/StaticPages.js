import React, {useState, useEffect, useRef} from "react"
import {Card, CardHeader, CardBody, CardTitle, Button} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"

import { fetchCMS, AddCMS, EditCMS } from "../../redux/actions/cms"
import JoditEditor from "jodit-react"

const StaticPages = () => {

    const dispatch = useDispatch()
    const data1 = useSelector(state => state.cms?.privacyPolicy[0]?.content)
    const data2 = useSelector(state => state.cms?.termsAndConditions[0]?.content)
    const data3 = useSelector(state => state.cms?.refundPolicy[0]?.content)

    const editor1 = useRef(null)
    const editor2 = useRef(null)
    const editor3 = useRef(null)
    const [content1, setContent1] = useState()
    const [content2, setContent2] = useState()
    const [content3, setContent3] = useState()
    const config = {
        readonly: false
    }

    useEffect(() => {
        dispatch(fetchCMS("PRIVACY_POLICY"))
    }, [])
    useEffect(() => {
        dispatch(fetchCMS("TERMS_AND_CONDITIONS"))
    }, [])
    useEffect(() => {
        dispatch(fetchCMS("REFUND_POLICY"))
    }, [])

    useEffect(() => {
        setContent1(data1)
        setContent2(data2)
        setContent3(data3)
    }, [])

    const submitForm1 = (values) => {
        const rawData = {
            type: "PRIVACY_POLICY",
            content: content1
        }
        if (data1) {
            dispatch(EditCMS('PRIVACY_POLICY', rawData))
            return
        }
        dispatch(AddCMS('PRIVACY_POLICY', rawData))
    }

    const submitForm2 = (values) => {
        const rawData = {
            type: "TERMS_AND_CONDITIONS",
            content: content2
        }
        if (data2) {
            dispatch(EditCMS('TERMS_AND_CONDITIONS', rawData))
            return
        }
        dispatch(AddCMS('TERMS_AND_CONDITIONS', rawData))
    }

    const submitForm3 = (values) => {
        const rawData = {
            type: "REFUND_POLICY",
            content: content3
        }
        if (data3) {
            dispatch(EditCMS('REFUND_POLICY', rawData))
            return
        }
        dispatch(AddCMS('REFUND_POLICY', rawData))
    }
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Static Page Settings</CardTitle>
            </CardHeader>
        </Card>
        <br className="mx-1" />
        <Card>
            <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <hr className="m-0" />
            <CardBody>
                <JoditEditor
                    ref={editor1}
                    value={content1}
                    config={config}
                    tabIndex={1} 
                    onBlur={newContent => setContent1(newContent)} 
                />
                <div className="mt-2">
                    <Button type="button" color="success" onClick={submitForm1}>Save</Button>
                </div>
            </CardBody>
        </Card>
        <br />
        <Card>
            <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <hr className="m-0" />
            <CardBody>
                <JoditEditor
                    ref={editor2}
                    value={content2}
                    config={config}
                    tabIndex={2} 
                    onBlur={newContent => setContent2(newContent)} 
                />
                <div className="mt-2">
                    <Button type="button" color="success" onClick={submitForm2}>Save</Button>
                </div>
            </CardBody>
        </Card>
        <br />
        <Card>
            <CardHeader>
                <CardTitle>Refund Policy</CardTitle>
            </CardHeader>
            <hr className="m-0" />
            <CardBody>
                <JoditEditor
                    ref={editor3}
                    value={content3}
                    config={config}
                    tabIndex={3} 
                    onBlur={newContent => setContent3(newContent)} 
                />
                <div className="mt-2">
                    <Button type="button" color="success" onClick={submitForm3}>Save</Button>
                </div>
            </CardBody>
        </Card>
    </>
}

export default StaticPages