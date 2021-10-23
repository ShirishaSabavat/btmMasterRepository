import React, {useState, useEffect} from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import {useDispatch, useSelector} from "react-redux"

import FileUploadModal from "./FileUploadModal"
import { BASE_URL } from '../../utility/serverSettings'
import { fetchAllMedia } from "../../redux/actions/media/index"

const ImagePickerComponent = (props) => {
    const {selectedImg} = props

    const dispatch = useDispatch()

    const images = useSelector(state => state.media.medias)

    useEffect(() => {
        dispatch(fetchAllMedia())
    }, [])

    return (
    <Modal scrollable isOpen={props.modalState} toggle={props.onClose} className="modal-lg">
        <ModalHeader>Media Picker</ModalHeader>
        <ModalBody className="p-1 justify-content-around align-items-center">
            <div className="row">
            
            <FileUploadModal />

                {images.reverse().map((values, indx) => <div key={String(indx)} className="col-auto"><img 
                        src={`${BASE_URL}uploads/${values.file}`} 
                        alt="image" 
                        name="imgName1" 
                        id="imgName1" 
                        style={{height: 200, width: 224, margin: 5, borderWidth: `${selectedImg === "imgName1" ? "7px" : "" }`, borderColor: `${selectedImg === "imgName1" ? "green" : ""}` }} 
                        className="img-thumbnail img-fluid cursor pointer"  
                        onClick={() => { props.setSelectedImg(`${BASE_URL}uploads/${values.file}`); props.toggleFileModal() }} /></div>)}
            </div>
        </ModalBody>
        {/* <ModalFooter>
            <Button type="button" color="danger" onClick={props.onClose}>Close</Button>
            <Button type="button" color="success" onClick={props.onClose}>Done</Button>
        </ModalFooter> */}
    </Modal>
  )
}

export default ImagePickerComponent
