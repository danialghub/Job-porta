
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './Components/RecruiterLogin'
import AppRoutes from './routes'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const { showRecruiterLogin } = useContext(AppContext)

  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <AppRoutes />
    </>

  )
}

export default App