import HomeRoute from './HomeRoute'
import SettingsRoute from './SettingsRoute'
import CourseRoutes from "./CourseRoutes"

// ** Document title
const TemplateTitle = '%s - ATS School Management'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
    ...HomeRoute,
    ...SettingsRoute,
    ...CourseRoutes
    ]

export { DefaultRoute, TemplateTitle, Routes }

