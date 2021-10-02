import React, {useState} from "react"
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap"
import FileUploadModal from "./FileUploadModal"

const ImagePickerComponent = (props) => {
    const {imagesData, selectedImg} = props

    const [images, setImages] = useState(imagesData || "")

    console.log("datta", imagesData)

    return (
    <Modal scrollable isOpen={props.modalState} toggle={props.onClose} className="modal-lg">
        <ModalBody className="d-flex flex-wrap justify-content-around align-items-center">
            <FileUploadModal />
            {images?.map(values => <img src={`https://bac-api.amoghnya.com/${values.file}`} alt="image" name="imgName1" id="imgName1" style={{margin: "5px", borderWidth: `${selectedImg === "imgName1" ? "3px" : "" }`, borderColor: `${selectedImg === "imgName1" ? "green" : ""}` }} className="img-thumbnail img-fluid"  onClick={() => props.setSelectedImg(values.file)} />)}
        </ModalBody>
        <ModalFooter>
            <Button type="button" color="danger" onClick={props.onClose}>Close</Button>
            <Button type="button" color="success" onClick={props.onClose}>Done</Button>
        </ModalFooter>
    </Modal>
  )
}

export default ImagePickerComponent
