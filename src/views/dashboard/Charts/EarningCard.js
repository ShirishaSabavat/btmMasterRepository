import { useEffect, useState, useContext } from 'react'
import classnames from 'classnames'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
import {Circle} from 'react-feather'
import Chart from 'react-apexcharts'
import axios from 'axios'

import { ThemeColors } from '@src/utility/context/ThemeColors'
import '@styles/react/libs/charts/apex-charts.scss'

const EarningCard = ({title, data}) => {

    const context = useContext(ThemeColors)

    const calculateEarningPercentage = () => {
        const profit  = data.netEarnings[0]?.netAmount - data.netComissions[0]?.comissions
        const profitPercentage = (Math.round(((profit / data.netEarnings[0]?.netAmount) + Number.EPSILON) * 100) / 100) * 100
        const result = [profitPercentage, 100 - profitPercentage]
        console.log({result})
        return result 
    }

    const options = {
        chart: {
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: { show: false },
        comparedResult: [2, -3, 8],
        labels: ['Profit', 'Commisions'],
        stroke: { width: 0 },
        colors: [context.colors.success.main, context.colors.danger.main],
        grid: {
          padding: {
            right: -20,
            bottom: -8,
            left: -20
          }
        },
        plotOptions: {
          pie: {
            startAngle: -10,
            donut: {
              labels: {
                show: true,
                name: {
                  offsetY: 15
                },
                value: {
                  offsetY: -15,
                  formatter(val) {
                    return `${parseInt(val)} %`
                  }
                },
                total: {
                  show: true,
                  offsetY: 15,
                  label: 'Profit',
                  formatter(w) {
                    return calculateEarningPercentage()[0]
                  }
                }
              }
            }
          }
        },
        responsive: [
          {
            breakpoint: 1325,
            options: {
              chart: {
                height: 100
              }
            }
          },
          {
            breakpoint: 1200,
            options: {
              chart: {
                height: 120
              }
            }
          },
          {
            breakpoint: 1065,
            options: {
              chart: {
                height: 100
              }
            }
          },
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 120
              }
            }
          }
        ]
    }

  return (
    <Card className='earnings-card'>
      {data?.netComissions && (
      <CardBody>
        <Row>
          <Col xs='6'>
            <CardTitle className='mb-1'>Earnings</CardTitle>
            <div className='font-small-2'>All Time</div>
            <h5 className='mb-1'>₹ {data.netEarnings[0]?.netAmount.toLocaleString('en-IN')}</h5>
            <CardText className='text-muted font-small-2'>
              <span className='font-weight-bolder'>₹ {data.netComissions[0]?.comissions.toLocaleString('en-IN')}</span>
              <span> spent in commisions.</span>
            </CardText>
          </Col>
          <Col xs='6'>
            <Chart options={options} series={calculateEarningPercentage()} type='donut' height={120} />
          </Col>
        </Row>
      </CardBody>
      )}
    </Card>
  )
}
export default EarningCard
