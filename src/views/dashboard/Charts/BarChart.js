import { useState, useContext } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

import { ThemeColors } from '@src/utility/context/ThemeColors'
import '@styles/react/libs/charts/apex-charts.scss'

const BarChart = () => {
  const [data, setData] = useState(null)
  const context = useContext(ThemeColors)

  const options = {
      chart: {
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      },
      colors: ['#51e5a8'],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '77%'
          },
          track: {
            background: '#ebe9f1',
            strokeWidth: '50%'
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: '#5e5873',
              fontFamily: 'Montserrat',
              fontSize: '2.86rem',
              fontWeight: '600'
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [context.colors.success.main],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          bottom: 30
        }
      }
    },
    series = [83]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Sale Type</CardTitle>
      </CardHeader>
      <CardBody className='p-0'>
        <Chart options={options} series={series} type='radialBar' height={245} />
      </CardBody>
      <Row className='border-top text-center mx-0'>
        <Col xs='6' className='border-right py-1'>
          <CardText className='text-muted mb-0'>Direct</CardText>
          <h3 className='font-weight-bolder mb-0'>---</h3>
        </Col>
        <Col xs='6' className='py-1'>
          <CardText className='text-muted mb-0'>Referal</CardText>
          <h3 className='font-weight-bolder mb-0'>---</h3>
        </Col>
      </Row>
    </Card>
  )
}
export default BarChart
