import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { JobCategories, JobLocations, assets } from '../assets/assets'
import JobCard from './JobCard'
const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [isShowedFilter, setIsShowedFilter] = useState(true)

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* sideBar-current filter */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* searched Titles in Hero Component */}
                {isSearched && (searchFilter.job || searchFilter.location) &&
                    (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.job && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded  '>
                                        {searchFilter.job}
                                        <img
                                            onClick={() =>
                                                setSearchFilter(prev => ({ ...prev, job: "" }))}
                                            src={assets.cross_icon}
                                            className='cursor-pointer' />
                                    </span>

                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded  '>
                                        {searchFilter.location}
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
                <button onClick={e => setIsShowedFilter(prev => !prev)} className='lg:hidden  px-6 py-1.5 rounded border border-gray-500'>
                    {isShowedFilter ? "Click" : "Filters"}
                </button>
                {/* Category filters */}
                <div className='max-lg:flex mt-4 justify-between items-center'>
                    <div className={isShowedFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>Search By Categories</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {JobCategories.map((job, idx) => (
                                <li className='flex gap-3 items-center' key={idx}>
                                    <input className='scale-125' type="checkbox" />
                                    {job}
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
                                    <input className='scale-125' type="checkbox" />
                                    {location}
                                </li>
                            ))

                            }
                        </ul>
                    </div>
                </div>

            </div>

            <section className=' w-full lg-w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2'>Latest Jobs</h3>
                <p className='mb-8'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci sequi ea voluptatibus inventore, enim error.</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {jobs.map(data => (
                        <JobCard key={data._id} {...data} />
                    ))

                    }
                </div>
            </section>



        </div>
    )
}

export default JobListing