import {Button} from "reactstrap"

const EditForm = ({setShowEdit}) => {
    return <>
    <h1>Edit Form</h1>
    <Button type="button" color="primary" size="sm" onClick={() => setShowEdit(false)}>save</Button>
    </>
}

export default EditForm