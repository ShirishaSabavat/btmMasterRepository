import AuthRoute from './AuthRoute'
import SettingsRoute from './SettingsRoute'
import CourseRoutes from "./CourseRoutes"
import CMSRoutes from './CMSRoutes'
import Videos from "./Videos"
import LandingRoute from './LandingRoutes'
import GalleryRoute from './GalleryRoute'
import MyCustomerRoute from "./MyCustomerRoute"
import MyCommissionRoute from "./MyCommissionRoute"
import MyMessagesRoute from "./MyMessagesRoute"
import MyPayoutsRoute from "./MyPayoutsRoute"
import MyReportsRoute from "./MyReportsRoute"
import MyCourcesRoutes from './MyCourcesRoutes'
import KYCRoute from "./KYCRoute"
import CourseScheduleRoute from "./CourseScheduleRoute"
import SocialMedia from "./SocialMedia"
import UserRoute from "./UserRoute"
import MyWorkshopsRoutes from './MyWorkshops'
import SalesRoute from "./SalesRoute"
import StaffRoute from "./StaffRoute"
import RoleRoute from "./RoleRoute"
import PaymentRoute from "./PaymentRoute"
import InquiryRoute from "./InquiryRoute"
import FollowUpRoute from './FollowUpRoute'

// ** Document title
const TemplateTitle = '%s - ATS School Management'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    ...AuthRoute,
    ...SettingsRoute,
    ...CourseRoutes,
    ...CMSRoutes,
    ...Videos,
    ...LandingRoute,
    ...GalleryRoute,
    ...MyCustomerRoute,
    ...MyCommissionRoute,
    ...MyMessagesRoute,
    ...MyPayoutsRoute,
    ...MyReportsRoute,
    ...MyCourcesRoutes,
    ...KYCRoute,
    ...CourseScheduleRoute,
    ...SocialMedia,
    ...UserRoute,
    ...MyWorkshopsRoutes,
    ...SalesRoute,
    ...StaffRoute,
    ...RoleRoute,
    ...PaymentRoute,
    ...InquiryRoute,
    ...FollowUpRoute
    ]

export { DefaultRoute, TemplateTitle, Routes }

