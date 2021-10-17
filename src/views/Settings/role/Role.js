import {Row, Col, Button, FormGroup, Card, CardHeader, CardTitle, CardBody, Label, Input, Badge} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Link} from "react-router-dom"
import {Edit} from "react-feather"
import DataTable from "react-data-table-component"

const Role = () => {

    const initialValues = {
        roleName:""
    }

    const validationSchema = Yup.object().shape({
        roleName: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    const tableColumns = [
        {
            name: "S.NO",
            selector: "sno",
            sortable: true,
            cell: (row) => (
              <p className="text-bold-500 text-truncate mb-0">{row.sno}</p>
            )
        },
        {
            name: "Role",
            selector: "role",
            sortable: true,
            cell: (row) => (
              <p className="text-bold-500 text-truncate mb-0">{row.role}</p>
            )
        },
        {
          name: "Status",
          selector: "status",
          sortable: true,
          cell: (row) => (
            <Badge color={row.status === "ACTIVE" ? "success" : "danger"} pill>
                <span>{row.status.toUpperCase()}</span>
            </Badge>
          )
        },
        {
          name: "Actions",
          selector: "",
          sortable: true,
          cell: (row) => {
            const id = row._id
            return (
              <div className="d-flex flex-column align-items-center">
                <ul className="list-inline mb-0">
                <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={{pathname: "/edit-role", params:{id}}}>
                            <Edit size={15} />
                        </Link>
                        </Button>
                    </li>        
                </ul>
              </div>
            )
          }
        }
      ]

    const customStyles = {
        headCells: {
          style: {
            fontSize: "15px",
            fontWeight: "bolder"
          }
        },
        rows: {
          style: {
            "&:hover": {
              backgroundColor: "#eee"
            },
            cursor: "pointer"
          }
        }
      }

      const rolesData = [{sno: 1, role: "ADMIN", status: "ACTIVE"}]

    return <Row>
        <Col sm="12" md="4">
            <Card>
                <CardHeader>
                    <CardTitle>Role</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            return (<Form>
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="roleName">Role Name</Label>
                                    <Input
                                    type="text"
                                    name="roleName"
                                    id="roleName"
                                    {...formik.getFieldProps("roleName")}
                                    invalid={!!(formik.touched.roleName && formik.errors.roleName)}
                                    >
                                    </Input>
                                    <ErrorMessage
                                        name="roleName"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-end">
                                    <Button type="button" color="primary">Save</Button>
                                </FormGroup>
                            </Form>)
                        }}
                    </Formik>
                </CardBody>
            </Card>
        </Col>
        <Col sm="12" md="8">
            <Card>
                <CardHeader>
                    <CardTitle>All Roles</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={rolesData}
                    columns={tableColumns}
                    noHeader
                    pagination
                    customStyles={customStyles}
                />
            </Card>
        </Col>
    </Row>

}

export default Role