import { lazy } from 'react'

// ** Merge Routes
const SalesRoute = [
  {
    path: '/sales',
    component: lazy(() => import('../../views/Sales/Sales'))
  },
  {
    path: '/view-sales/:saleId',
    component: lazy(() => import('../../views/Sales/ViewSales'))
  }
]

export default SalesRoute
