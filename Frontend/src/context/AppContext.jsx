import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useUser, useAuth } from '@clerk/clerk-react'
export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { user } = useUser()

    const { getToken } = useAuth()

    const [searchFilter, setSearchFilter] = useState({ location: "", job: "" })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])



    const getJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)


            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchUsersData = async () => {
        try {
            const token = await getToken()


            const { data } = await axios.get(backendUrl + '/api/users/user', {
                headers: { Authorization: `Bearer ${token}` }
            })


            if (data.succuss) {
                console.log(data.user);
                setUserData(data.user)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    const fetchUserApplications = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/users/applications', {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            if (data.succuss) {
                setUserApplications(data.application)
                console.log(data.application);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    useEffect(() => {
        getJobs()
        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])
    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUsersData()
            fetchUserApplications()
        }
    }, [user])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUsersData,
        fetchUserApplications

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider