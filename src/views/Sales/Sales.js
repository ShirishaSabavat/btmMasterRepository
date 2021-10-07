import React from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Eye} from "react-feather"

const Sales = () => {

    const tableColumns = [
        {
            name: "S.No",
            selector: "sno",
            sortable: true,
            cell: (row) => (
              <p className="text-bold-500 text-truncate mb-0">{row.sno}</p>
            )
        },
        {
          name: "Purchase Type",
          selector: "purchaseType",
          sortable: true,
          minWidth: "200px",
          cell: (row) => (
            <Badge color={row.status === "WORKSHOP" ? "danger" : "success"} pill>
            <span>{row.purchaseType}</span>
          </Badge>
          )
        },
        {
          name: "Name",
          selector: "name",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
          )
        },
        {
          name: "Date",
          selector: "date",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
          )
        },
        {
          name: "Paid Amount",
          selector: "paidAmount",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.paidAmount}</p>
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
                        <Link to={{pathname: "/view-sales", params:{id}}}>
                            <Eye size={15} />
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

    const salesData = [{sno: "1", _id:"124", purchaseType: "WORKSHOP", name: "Sample 1", date: "2-2-2021", paidAmount: "100", status: "ACTIVE" }]

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Sales</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={salesData}
                    columns={tableColumns}
                    noHeader
                    pagination
                    customStyles={customStyles}
                />
            </Card>
        </Col>
    </Row>
}

export default Sales