import { createContext, useEffect, useState } from 'react'
import { jobsData } from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const [searchFilter, setSearchFilter] = useState({ location: "", job: "" })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])


    const getJobs = async()=>{
        setJobs(jobsData)
    }
    useEffect(()=>getJobs(),[])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider