import React, {useState} from "react"
import { Modal, ModalBody, ModalFooter } from "reactstrap"
import Button from "reactstrap/lib/Button"

import SampleImg from "../../assets/images/portrait/small/avatar-s-1.jpg"

const ImagePickerComponent = (props) => {

    const [selectedImg, setSelectedImg] = useState("")

  return (
    <Modal isOpen={props.modalState} toggle={props.onClose} className="modal-xl h-50">
        <ModalBody>
            <div className="mb-1 d-flex justify-content-end">
                <Button color="primary" type="button" onClick={() => props.toggleFileModal(true)}>Upload</Button>
            </div>
            <hr />
            <div className="d-flex flex-wrap justify-content-around">
                <img src={SampleImg} alt="image" name="imgName" id="imgName" style={{margin: "5px"}} className={`img-thumbnail img-fluid ${selectedImg === "imgName" ? ' border border-2 border-success' : null } `} onClick={e => setSelectedImg(e.currentTarget.id)} />
                <img src={SampleImg} alt="image" name="imgName2" id="imgName2" style={{margin: "5px"}} className={`img-thumbnail img-fluid ${selectedImg === "imgName2" ? ' border border-2 border-success' : null } `} onClick={e => setSelectedImg(e.currentTarget.id)} />
                <img src={SampleImg} alt="image" name="imgName3" id="imgName3" style={{margin: "5px"}} className={`img-thumbnail img-fluid ${selectedImg === "imgName3" ? ' border border-2 border-success' : null } `} onClick={e => setSelectedImg(e.currentTarget.id)} />
                <img src={SampleImg} alt="image" name="imgName4" id="imgName4" style={{margin: "5px"}} className={`img-thumbnail img-fluid ${selectedImg === "imgName4" ? ' border border-2 border-success' : null } `} onClick={e => setSelectedImg(e.currentTarget.id)} />
                <img src={SampleImg} alt="image" name="imgName5" id="imgName5" style={{margin: "5px"}} className={`img-thumbnail img-fluid ${selectedImg === "imgName5" ? ' border border-2 border-success' : null } `} onClick={e => setSelectedImg(e.currentTarget.id)} />
                <img src={SampleImg} alt="image" name="imgName6" id="imgName6" style={{margin: "5px"}} className={`img-thumbnail img-fluid ${selectedImg === "imgName6" ? ' border border-2 border-success' : null } `} onClick={e => setSelectedImg(e.currentTarget.id)} />
            </div>
        </ModalBody>
        <ModalFooter>
            <Button type="button" color="danger" onClick={props.onClose}>Close</Button>
            <Button type="submit" color="success" onClick={props.onClose}>Done</Button>
        </ModalFooter>
    </Modal>
  )
}

export default ImagePickerComponent
