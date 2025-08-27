
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './Components/RecruiterLogin'
import AppRoutes from './routes'
import 'quill/dist/quill.snow.css'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const { showRecruiterLogin } = useContext(AppContext)

  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}
      <div className='max-sm:w-[80vw] max-sm:mx-auto ' >
        <ToastContainer
          rtl={true}
          draggable
        />
      </div >
      <AppRoutes />
    </>

  )
}

export default App