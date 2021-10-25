import { Card, CardBody, CardText, Row, Col, Table, Button } from 'reactstrap'
// ** Styles
import '@styles/base/pages/app-invoice.scss'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { fetchSaleDetails } from '../../redux/actions/sales'
import { useReactToPrint } from 'react-to-print'

const ViewSales = () => {

    const dispatch = useDispatch()

    const { saleId } = useParams()

    const invoiceRef = useRef()

    const sale = useSelector(state => state.sales.sale)

    useEffect(() => {
        dispatch(fetchSaleDetails(saleId))
    }, [])

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current
    })

    if (!sale.orderId) {
        return (<div></div>)
    }
    

    return (
        <div ref={invoiceRef} className='invoice-preview-wrapper'>
            <Row className='invoice-preview'>
                <Col md="8">
                    <Card className='invoice-preview-card'>
                        <CardBody className='invoice-padding pb-0'>
                            {/* Header */}
                            <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                            <div>
                                <div className='logo-wrapper'>
                                <img src="/assets/images/logo-h.png" style={{width: 154}} />
                                {/* <h3 className='text-primary invoice-logo'>Vuexy</h3> */}
                                </div>
                                <CardText className='mb-25'>Hyderabad Telangana, </CardText>
                                <CardText className='mb-25'>Pincode 500029</CardText>
                            </div>
                            <div className='mt-md-0 mt-2'>
                                <h4 className='invoice-title'>
                                <span className='invoice-number'>#{sale.orderId}</span>
                                </h4>
                                <div className='invoice-date-wrapper'>
                                <p className='invoice-date-title'>Date:</p>
                                <p className='invoice-date'>{new Date(sale.purchaseDate).toLocaleString()}</p>
                                </div>
                                {/* <div className='invoice-date-wrapper'>
                                <p className='invoice-date-title'>Due Date:</p>
                                <p className='invoice-date'>{'10-2021'}</p>
                                </div> */}
                            </div>
                            </div>
                            {/* /Header */}
                        </CardBody>

                        <hr className='invoice-spacing' />

                        {/* Address and Contact */}
                        <CardBody className='invoice-padding pt-0'>
                            <Row className='invoice-spacing'>
                            <Col className='p-0' lg='8'>
                                <h6 className='mb-2'>Invoice To:</h6>
                                <h6 className='mb-25'>{sale.userId.name}</h6>
                                <CardText className='mb-25'>{sale.userId.email}</CardText>
                                <CardText className='mb-25'>{sale.userId.phone}</CardText>
                            </Col>
                            <Col className='p-0 mt-xl-0 mt-2' lg='4'>
                                <h6 className='mb-2'>Payment Details:</h6>
                                <table>
                                <tbody>
                                    <tr>
                                        <td className='pr-1'>Paid:</td>
                                        <td>
                                            <span className='font-weight-bolder'>₹ {sale.netAmount.toLocaleString('en-IN')} </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='pr-1'>Method:</td>
                                        <td>
                                            <span className='font-weight-bolder'>Razorpay </span>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </Col>
                            </Row>
                        </CardBody>
                        {/* /Address and Contact */}

                        {/* Invoice Description */}
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className='py-1'>Product</th>
                                    <th className='py-1'>Price</th>
                                    <th className='py-1'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='py-1'>
                                        <p className='card-text font-weight-bold mb-25'>{sale.purchaseType === "ONLINE" ? "ONLINE COURSE" : "WORKSHOP" }</p>
                                        <p className='card-text text-nowrap'>
                                            {sale.purchaseType === "ONLINE" ? sale.courseId.name : `${sale.workshopId.batchNo} - ${sale.workshopId.address}`}
                                        </p>
                                    </td>
                                    <td className='py-1'>
                                        <span className='font-weight-bold'>₹ {sale.amount.toLocaleString('en-IN')}</span>
                                    </td>
                                    <td className='py-1'>
                                        <span className='font-weight-bold'>₹ {sale.amount.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        {/* /Invoice Description */}

                        {/* Total & Sales Person */}
                        <CardBody className='invoice-padding pb-0'>
                            <Row className='invoice-sales-total-wrapper'>
                            <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
                                <CardText className='mb-0'>
                                    {/* <span className='font-weight-bold'>Salesperson:</span> <span className='ml-75'>Alfie Solomons</span> */}
                                </CardText>
                            </Col>
                            <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
                                <div className='invoice-total-wrapper'>
                                <div className='invoice-total-item'>
                                    <p className='invoice-total-title'>Subtotal:</p>
                                    <p className='invoice-total-amount'>₹ {sale.amount.toLocaleString('en-IN')}</p>
                                </div>
                                {/* <div className='invoice-total-item'>
                                    <p className='invoice-total-title'>Discount:</p>
                                    <p className='invoice-total-amount'>$28</p>
                                </div> */}
                                <div className='invoice-total-item'>
                                    <p className='invoice-total-title'>GST ({sale.gst}%):</p>
                                    <p className='invoice-total-amount'>₹ {(sale.netAmount - sale.amount).toLocaleString('en-IN')}</p>
                                </div>
                                <hr className='my-50' />
                                <div className='invoice-total-item'>
                                    <p className='invoice-total-title'>Total:</p>
                                    <p className='invoice-total-amount'>₹ {sale.netAmount.toLocaleString('en-IN')}</p>
                                </div>
                                </div>
                            </Col>
                            </Row>
                        </CardBody>
                        {/* /Total & Sales Person */}

                        <hr className='invoice-spacing' />

                        {/* Invoice Note */}
                        {/* <CardBody className='invoice-padding pt-0'>
                            <Row>
                            <Col sm='12'>
                                <span className='font-weight-bold'>Note: </span>
                                <span>
                                    It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                                    projects. Thank You!
                                </span>
                            </Col>
                            </Row>
                        </CardBody> */}
                        {/* /Invoice Note */}
                    </Card>
                </Col>

                <Col md="4">
                <Card className='invoice-action-wrapper'>
                    <CardBody>

                        <Button.Ripple
                            color='secondary'
                            block
                            outline
                            className='mb-75'
                            onClick={handlePrint}
                        >
                            Print
                        </Button.Ripple>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default ViewSales