import {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, FormGroup, Button, CustomInput, Table} from "reactstrap"
import {Formik, Form, ErrorMessage} from 'formik'
import { useDispatch, useSelector } from "react-redux"
import { fetchAllRoles, updateRoles } from "../../../redux/actions/roles"

const EditRole = () => {

    const dispatch = useDispatch()
    const roleData = useSelector(state => state.roles.roles)

    useEffect(() => {
        dispatch(fetchAllRoles())
    }, [])

    const [rolesState, setRolesState] = useState({})

    useEffect(() => {
        { roleData[0]?.permissions.map(values => {
            setRolesState(values)
        }) }
    }, [roleData])

    console.log("rs", roleData)

    const initialValues = {
        viewCourse: rolesState?.cources?.view || false,
        addCourse : rolesState?.cources?.add || false,
        editCourse: rolesState?.cources?.edit || false,
        deleteCourse: rolesState?.cources?.delete || false,
        viewVideo: rolesState?.videos?.view || false,
        addVideo : rolesState?.videos?.add || false,
        editVideo: rolesState?.videos?.edit || false,
        deleteVideo: rolesState?.videos?.delete || false,
        viewWorkShop: rolesState?.workshops?.view || false,
        addWorkShop : rolesState?.workshops?.add || false,
        editWorkShop: rolesState?.workshops?.edit || false,
        deleteWorkShop: rolesState?.workshops?.delete || false,
        viewPurchase: rolesState?.purchase?.view || false,
        addPurchase : rolesState?.purchase?.add || false,
        editPurchase: rolesState?.purchase?.edit || false,
        deletePurchase: rolesState?.purchase?.delete || false,
        viewCms: rolesState?.cms?.view || false,
        addCms : rolesState?.cms?.add || false,
        editCms: rolesState?.cms?.edit || false,
        deleteCms: rolesState?.cms?.delete || false,
        viewUser: rolesState?.users?.view || false,
        addUser : rolesState?.users?.add || false,
        editUser: rolesState?.users?.edit || false,
        deleteUser: rolesState?.users?.delete || false
    }

    const submitForm = (values) => {
        console.log("values", values)

        const rawData = {
            name : "EMPLOYEEU",
            permissions: [
                {
                    videos: {
                        add: values.addVideo,
                        edit: values.editVideo,
                        view: values.viewVideo,
                        delete: values.deleteVideo
                    },
                    cources: {
                        add: values.add.addCource,
                        edit: values.edit.editCource,
                        view: values.view.viewCource,
                        delete: values.deleteCource
                    },
                    workshops: {
                        add: values.addWorkShop,
                        edit: values.editWorkShop,
                        view: values.viewWorkShop,
                        delete: values.deleteWorkShop
                    },
                    purchase: {
                        add: values.addPurchase,
                        edit: values.editPurchase,
                        view: values.viewPurchase,
                        delete: values.deletePurchase
                    },
                    cms: {
                        add: values.addCms,
                        edit: values.editCms,
                        view: values.viewCms,
                        delete: values.deleteCms
                    },
                    users: {
                        add: values.addUser,
                        edit: values.editUser,
                        view: values.viewUser,
                        delete: values.deleteUser
                    }
                }
            ]
        }

        dispatch(updateRoles(id, rawData))
    }

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardHeader>
                    <CardTitle>Role: </CardTitle>
                </CardHeader>
                <hr className="m-0" />
                    <Formik initialValues={initialValues} onSubmit={submitForm} enableReinitialize >
                        {(formik) => {
                            console.log("values", formik.values)
                            return (<Form>
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
                                    <tr>
                                        <td>Courses</td>
                                        <td>
                                        <CustomInput type="checkbox" name="viewCourse" id="viewCourse" {...formik.getFieldProps("viewCourse")} defaultChecked={formik?.values?.viewCourse}  />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="addCourse" id="addCourse" {...formik.getFieldProps("addCourse")} defaultChecked={formik.values.addCourse}  />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="editCourse" id="editCourse" {...formik.getFieldProps("editCourse")}  defaultChecked={formik.values.editCourse}  />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="deleteCourse" id="deleteCourse" {...formik.getFieldProps("deleteCourse")}  defaultChecked={formik.values.deleteCourse}  />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Videos</td>
                                        <td>
                                        <CustomInput type="checkbox" name="viewVideo" id="viewVideo" {...formik.getFieldProps("viewVideo")} defaultChecked={formik.values.viewVideo} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="addVideo" id="addVideo" {...formik.getFieldProps("addVideo")} defaultChecked={formik?.values?.addVideo} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="editVideo" id="editVideo" {...formik.getFieldProps("editVideo")} defaultChecked={formik.values.editVideo} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="deleteVideo" id="deleteVideo" {...formik.getFieldProps("deleteVideo")} defaultChecked={formik.values.deleteVideo} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Workshops</td>
                                        <td>
                                        <CustomInput type="checkbox" name="viewWorkShop" id="viewWorkShop" {...formik.getFieldProps("viewWorkShop")} defaultChecked={formik.values.viewWorkShop} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="addWorkShop" id="addWorkShop" {...formik.getFieldProps("addWorkShop")} defaultChecked={formik.values.addWorkShop} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="editWorkShop" id="editWorkShop" {...formik.getFieldProps("editWorkShop")} defaultChecked={formik.values.editWorkShop} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="deleteWorkShop" id="deleteWorkShop" {...formik.getFieldProps("deleteWorkShop")} defaultChecked={formik.values.deleteWorkShop} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Purchase</td>
                                        <td>
                                        <CustomInput type="checkbox" name="viewPurchase" id="viewPurchase" {...formik.getFieldProps("viewPurchase")} defaultChecked={formik.values.viewPurchase} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="addPurchase" id="addPurchase" {...formik.getFieldProps("addPurchase")} defaultChecked={formik.values.addPurchase} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="editPurchase" id="editPurchase" {...formik.getFieldProps("editPurchase")} defaultChecked={formik.values.editPurchase} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="deletePurchase" id="deletePurchase" {...formik.getFieldProps("deletePurchase")} defaultChecked={formik.values.deletePurchase} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CMS</td>
                                        <td>
                                        <CustomInput type="checkbox" name="viewCms" id="viewCms" {...formik.getFieldProps("viewCms")} defaultChecked={formik.values.viewCms} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="addCms" id="addCms" {...formik.getFieldProps("addCms")} defaultChecked={formik.values.addCms} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="editCms" id="editCms" {...formik.getFieldProps("editCms")} defaultChecked={formik.values.editCms} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="deleteCms" id="deleteCms" {...formik.getFieldProps("deleteCms")} defaultChecked={formik.values.deleteCms} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>
                                        <CustomInput type="checkbox" name="viewUser" id="viewUser" {...formik.getFieldProps("viewUser")} defaultChecked={formik.values.viewUser} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="addUser" id="addUser" {...formik.getFieldProps("addUser")} defaultChecked={formik.values.addUser} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="editUser" id="editUser" {...formik.getFieldProps("editUser")} defaultChecked={formik.values.editUser} />
                                        </td>
                                        <td>
                                        <CustomInput type="checkbox" name="deleteUser" id="deleteUser" {...formik.getFieldProps("deleteUser")} defaultChecked={formik.values.deleteUser} />
                                        </td>
                                    </tr>
                                </tbody>                       
                                <FormGroup>
                                    <ErrorMessage
                                        name="courses"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                    <ErrorMessage
                                        name="videos"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>

                            </Table>
                                <FormGroup className="d-flex justify-content-end mr-1">
                                    <Button color="success" type="submit">Save</Button>
                                </FormGroup>
                            </Form>)
                        }}
                    </Formik>
            </Card>
        </Col>
    </Row>

}

export default EditRole