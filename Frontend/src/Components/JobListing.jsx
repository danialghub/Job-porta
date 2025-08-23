import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { JobCategories, JobLocations, assets } from '../assets/assets'
import JobCard from './JobCard'
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

const JobListing = () => {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [isShowedFilter, setIsShowedFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [seletedCategories, setSelectedCategories] = useState([])
    const [seletedLocations, setSelectedLocations] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    //handling checked inputs
    const handleCategories = job => {
        setSelectedCategories(prev => prev.includes(job) ? prev.filter(cat => cat !== job) : [...prev, job])
    }
    const handleLocations = location => {
        setSelectedLocations(prev => prev.includes(location) ? prev.filter(loc => loc !== location) : [...prev, location])
    }
    //handling filtered jobs
    useEffect(() => {
        const matchedCategories = job => !seletedCategories.length || seletedCategories.includes(job.category)

        const matchedLocations = job => !seletedLocations.length || seletedLocations.includes(job.location)

        const mathedTitle = job => !searchFilter.job || job.title.toLowerCase().includes(searchFilter.job.toLowerCase())

        const matchedSearchLocation = job => !searchFilter.location || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(job =>
            matchedCategories(job) && matchedLocations(job) && mathedTitle(job) && matchedSearchLocation(job)
        )
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)


    }, [seletedCategories, seletedLocations, searchFilter, jobs])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 gap-20 '>
            {/* sideBar-current filter */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* searched Titles in Hero Component */}
                {isSearched && (searchFilter.job || searchFilter.location) &&
                    (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.job && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-2 py-1.5 rounded  '>
                                        {searchFilter.job.length > 5 ? searchFilter.job.slice(0, 5).concat('...') : searchFilter.job}
                                        <img
                                            onClick={() =>
                                                setSearchFilter(prev => ({ ...prev, job: "" }))}
                                            src={assets.cross_icon}
                                            className='cursor-pointer' />
                                    </span>

                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-2 py-1.5 rounded  '>
                                        {searchFilter.location.length > 5 ? searchFilter.location.slice(0, 5).concat('...') : searchFilter.location}
                                        <img
                                            onClick={() =>
                                                setSearchFilter(prev => ({ ...prev, location: "" }))}
                                            src={assets.cross_icon}
                                            className='cursor-pointer' />
                                    </span>

                                )}
                            </div>
                        </>
                    )


                }
                <button onClick={e => setIsShowedFilter(prev => !prev)} className='lg:hidden my-4  px-6 py-1.5 rounded border border-gray-500'>
                    {isShowedFilter ? "Click" : "Filters"}
                </button>
                {/* Category filters */}
                <div className='max-lg:flex  justify-between items-center'>
                    <div className={isShowedFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>Search By Categories</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {JobCategories.map((job, idx) => (
                                <li className='flex gap-3 items-center' key={idx}>
                                    <input
                                        id={`${job}${idx}`}
                                        className='scale-125'
                                        type="checkbox"
                                        onChange={() => handleCategories(job)}
                                        checked={seletedCategories.includes(job)}
                                    />
                                    <label htmlFor={`${job}${idx}`}>{job}</label>
                                </li>
                            ))

                            }
                        </ul>
                    </div>

                    {/* Location filters */}
                    <div className={isShowedFilter ? "" : "max-lg:hidden mt-4"}>
                        <h4 className='font-medium text-lg py-4'>Search By Location</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {JobLocations.map((location, idx) => (
                                <li className='flex gap-3 items-center' key={idx}>
                                    <input
                                        id={`${location}${idx}`}
                                        className='scale-125'
                                        type="checkbox"
                                        onChange={() => handleLocations(location)}
                                        checked={seletedLocations.includes(location)}
                                    />
                                    <label htmlFor={`${location}${idx}`}>{location}</label>
                                </li>
                            ))

                            }
                        </ul>
                    </div>
                </div>

            </div>
            {/* Job List */}
            <section className=' w-full lg-w-3/4 text-gray-800 max-lg:px-4' id='job_list'>
                <h3 className='font-medium text-3xl py-2'>Latest Jobs</h3>
                <p className='mb-8'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci sequi ea voluptatibus inventore, enim error.</p>

                {!filteredJobs.length && (
                    <h3 className='font-bold text-3xl '>there are no information...</h3>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, (currentPage) * 6).map(data => (
                        <JobCard key={data._id} {...data} />
                    ))

                    }
                </div>
                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex justify-center items-center space-x-2 mt-10  '>
                        <a onClick={e => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            href="#job_list"
                            className={`w-10 h-10  flex justify-center items-center rounded ${currentPage - 1 == 0 ? 'bg-gray-400 pointer-events-none' : 'bg-gray-700 '}`}
                        >
                            <RiArrowLeftSLine className='font-bolder text-2xl text-white' />


                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, idx) => (
                            <a key={idx} href="#job_list" onClick={e => setCurrentPage(idx + 1)}>
                                <button
                                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-white ${currentPage == idx + 1 ? "bg-blue-500" : "bg-gray-600"}`}
                                >{idx + 1}</button>
                            </a>
                        ))

                        }
                        <a
                            onClick={e => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredJobs.length / 6)))}
                            href="#job_list"
                            className={`w-10 h-10  flex justify-center items-center rounded ${currentPage - 1 == Math.ceil(filteredJobs.length / 6) - 1 ? 'bg-gray-400 pointer-events-none' : 'bg-gray-700 '}`}
                        >
                            <RiArrowRightSLine className='font-bolder text-2xl text-white' />
                        </a>
                    </div>
                )
                }
            </section>



        </div>
    )
}

export default JobListing