import { useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './Components/RecruiterLogin'
import routes from './routes'
import 'quill/dist/quill.snow.css'

function App() {

  const { showRecruiterLogin } = useContext(AppContext)
  const router = useRoutes(routes)
  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}
      {router}
    </>

  )
}

export default App