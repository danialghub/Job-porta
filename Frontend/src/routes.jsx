import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import AddJob from './Pages/AddJob'
import ManageJobs from './Pages/ManageJobs'
import ViewApplications from './Pages/ViewApplications'
import ApplyJob from './Pages/ApplyJob'
import Applications from './Pages/Applications'

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/apply-job/:id',
        element: <ApplyJob />,
    },
    {
        path: '/applications',
        element: <Applications />,
    },
    {
        path: '/dashboard/*',
        element: <Dashboard />,
        children: [
            {
                path: 'add-job',
                element: <AddJob />
            },
            {
                path: 'manage-jobs',
                element: <ManageJobs />
            },
            {
                path: 'view-applications',
                element: <ViewApplications />
            },
        ]
    },
]
export default routes