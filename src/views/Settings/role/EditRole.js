import {useState, useEffect} from "react"
import {Row, Col, Form, Card, CardHeader, CardTitle, FormGroup, Button, CustomInput, Table} from "reactstrap"
// import {Formik, Form, ErrorMessage} from 'formik'
import { useDispatch, useSelector } from "react-redux"
import { fetchRoleDetails, updateRoles, updatePermission } from "../../../redux/actions/roles"
import { useParams } from "react-router"

const EditRole = () => {

    const { roleId } = useParams()

    const dispatch = useDispatch()

    const roleData = useSelector(state => state.roles.role)

    useEffect(() => {
        dispatch(fetchRoleDetails(roleId))
    }, [])

    const savePermissions = () => {
        dispatch(updateRoles({id: roleData?._id, data: {name: roleData?.name, permissions: roleData?.permissions}}))
    }

    const checkPermission = (role) => {
        return false
    }

    if (!roleData?.permissions) {
        return (<></>)
    }

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardHeader>
                    <CardTitle>Role: {roleId}</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <Form>
                    <Table striped borderless responsive>
                    <thead className='thead-light'>
                    <tr>
                        <th>Module</th>
                        <th>View</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                        <tbody>

                        {roleData?.permissions.map((i, index) => (
                            <tr key={index.toString()}>
                                <td>{Object.keys(i)[0]}</td>
                                <td>
                                    <CustomInput type="checkbox" onChange={e => dispatch(updatePermission({ value: e.target.checked, role: 'view', module: index}))} id={`view-${Object.keys(i)[0]}`} name={`view-${Object.keys(i)[0]}`} defaultChecked={i[Object.keys(i)[0]].view }  />
                                </td>
                                <td>
                                    <CustomInput type="checkbox" onChange={e => dispatch(updatePermission({ value: e.target.checked, role: 'add', module: index}))} id={`add-${Object.keys(i)[0]}`} name={`add-${Object.keys(i)[0]}`} defaultChecked={i[Object.keys(i)[0]].add}  />
                                </td>
                                <td>
                                    <CustomInput type="checkbox" onChange={e => dispatch(updatePermission({ value: e.target.checked, role: 'edit', module: index}))} id={`edit-${Object.keys(i)[0]}`} name={`edit-${Object.keys(i)[0]}`} defaultChecked={i[Object.keys(i)[0]].edit}  />
                                </td>
                                <td>
                                    <CustomInput type="checkbox" onChange={e => dispatch(updatePermission({ value: e.target.checked, role: 'delete', module: index}))} id={`delete-${Object.keys(i)[0]}`} name={`delete-${Object.keys(i)[0]}`} defaultChecked={i[Object.keys(i)[0]].delete}  />
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>                       

                </Table>
                    <FormGroup className="mt-2 ml-2">
                        <Button color="success" type="button" onClick={() => savePermissions()}>Save</Button>
                    </FormGroup>
                </Form>
            </Card>
        </Col>
    </Row>

}

export default EditRole