import React from "react"
import {Card} from "reactstrap"
import { PlusCircle } from "react-feather"
import {useDispatch} from "react-redux"

import {postMedia} from "../../redux/actions/media/index"

const FileUploadModal = () => {

    const dispatch = useDispatch()

    const handleImageUpload = (e) => {

        const imageData = e.currentTarget.files[0]

        const formdata = new FormData()
        formdata.append("file", imageData)

        console.log("imageData", imageData)
        console.log("formData", formdata)

        dispatch(postMedia(formdata))

    }

  return (
        <form>
            <Card className="d-flex justify-content-center align-items-center m-0" style={{minWidth: "200px", minHeight: "200px", maxHeigth: "250px", maxWidth: "250px"}}>
                <div  role="button">
                    <label for="image" role="button" className="d-flex flex-column justify-content-center align-items-center"> 
                        <PlusCircle size={50} />
                        <h3>Upload</h3>
                    </label>
                    <input type="file" name="image" id="image" className="d-none" onChange={(e) => handleImageUpload(e)} />
                </div>
            </Card>
        </form>
    )
}

export default FileUploadModal
