import React, {useState, useEffect} from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import {useDispatch, useSelector} from "react-redux"

import FileUploadModal from "./FileUploadModal"
import { BASE_URL } from '../../utility/serverSettings'
import {fetchAllMedia} from "../../redux/actions/media/index"

const ImagePickerComponent = (props) => {
    const {selectedImg} = props

    const dispatch = useDispatch()

    const [reFetch, setReFetch] = useState("")
    const [images] = useState(useSelector(state => state.media.medias))

    useEffect(() => {
        dispatch(fetchAllMedia())
    }, [reFetch])

    return (
    <Modal scrollable isOpen={props.modalState} toggle={props.onClose} className="modal-lg">
        <ModalHeader>Media Picker</ModalHeader>
        <ModalBody className="p-3 justify-content-around align-items-center">
            <div className="row">
            <FileUploadModal setReFetch={setReFetch} />
                {images?.map(values => <div className="col"><img 
                        src={`${BASE_URL}uploads/${values.file}`} 
                        alt="image" 
                        name="imgName1" 
                        id="imgName1" 
                        style={{height: 200, width: 224, margin: 5, borderWidth: `${selectedImg === "imgName1" ? "7px" : "" }`, borderColor: `${selectedImg === "imgName1" ? "green" : ""}` }} 
                        className="img-thumbnail img-fluid"  
                        onClick={() => { props.setSelectedImg(`${BASE_URL}uploads/${values.file}`); props.toggleFileModal() }} /></div>)}
            </div>
        </ModalBody>
        <ModalFooter>
            <Button type="button" color="danger" onClick={props.onClose}>Close</Button>
            <Button type="button" color="success" onClick={props.onClose}>Done</Button>
        </ModalFooter>
    </Modal>
  )
}

export default ImagePickerComponent
