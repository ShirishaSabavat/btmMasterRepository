import { useEffect, useState, useContext } from 'react'
import classnames from 'classnames'
import {
  Card,
  CardHeader,
  CardTitle,
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

const PieChart = ({title, data}) => {
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   axios.get('/card/card-analytics/customers').then(res => setData(res.data))
  // }, [])
  const context = useContext(ThemeColors)

  const options = {
      chart: {
        toolbar: {
          show: false
        }
      },
      labels: ['Regular', 'BAC'],
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      stroke: {
        width: 4
      },
      colors: [context.colors.primary.main, context.colors.warning.main]
    },
    series = data.series

  const renderChartInfo = () => {
    // return data.listData.map((item, index) => {

      return (
        <div
          // key={}
          className={classnames('d-flex justify-content-between', {
            'mb-1': 1 !== 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Circle
              size={15}
              className={classnames({
                // [item.iconColor]: item.iconColor
              })}
            />
            <span className='font-weight-bold ml-75'>Regular</span>
          </div>
          <span>500</span>
        </div>
      )
    // })
  }

  return (
    <Card>
      <CardHeader className='align-items-end'>
        <CardTitle tag='h4'>{title}</CardTitle>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu right>
            {/* {data.last_days.map(item => ( */}
              <DropdownItem className='w-100'>
                {/* {item} */} item
              </DropdownItem>
            {/* ))} */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='pie' height={325} />
        <div className='pt-25'>{renderChartInfo()}</div>
      </CardBody>
    </Card>
  )
}
export default PieChart
