import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import JobCard from '../Components/JobCard'
import Loading from '../Components/Loading'

import kConvert from 'k-convert'
import { assets } from '../assets/assets'
import moment from 'moment'

const ApplyJob = () => {
  const { id } = useParams()
  const { jobs } = useContext(AppContext)

  const [jobData, setJobData] = useState(null)


  const fetchData = async () => {
    const data = jobs.find(job => job._id == id)

    if (data) {
      setJobData(data)
    }

  }
  useEffect(() => {
    if (jobs.length > 0) {
      fetchData()
    }
  }, [id, jobs])


  return jobData ? (
    <>
      <Navbar />

      {/*main contents*/}
      <div className='min-h-screen container flex flex-col mx-auto px-4 py-10 2xl:px-20 bg-white rounded-lg'>
        {/*job info section */}
        <div className='rounded-xl text-black  w-full flex justify-center flex-wrap  md:justify-between gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 '>
          <div className='flex flex-col md:flex-row  items-center '>
            <img
              src={assets.company_icon}
              alt=""
              className='w-24 h-24 rounded-lg p-4 mr-4 max-md:mb-4 bg-white flex items-center justify-center'
            />
            <div className='text-center md:text-left text-neutral-700'>
              <h3 className='text-2xl sm:text-4xl mb-2 font-medium'>{jobData.title}</h3>
              <div className='flex flex-wrap max-md:justify-center gap-y-2 text-gray-600 gap-6 lg:gap-10 text-sm h-4'>
                <span className="flex gap-1 items-center">
                  <img src={assets.suitcase_icon} alt="" />
                  {jobData.companyId.name}
                </span>
                <span className="flex gap-1 items-center">
                  <img src={assets.location_icon} alt="" />
                  {jobData.location}
                </span>
                <span className="flex gap-1 items-center">
                  <img src={assets.person_icon} alt="" />
                  {jobData.level}
                </span>
                <span className="flex gap-1 items-center">
                  <img src={assets.money_icon} alt="" />
                  CTC: {kConvert.convertTo(jobData.salary)}
                </span>

              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center text-end text-sm max-lg:mt-6'>
            <button className='px-10 py-2.5 mb-2 max-md:mx-auto max-md:text-center bg-blue-600 rounded  text-white'>Apply now</button>
            <p className='font-light text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row justify-between items-start'>
          {/*description section */}
          <div className='w-full lg:w-2/4 '>
            <h2 className='font-bold mb-4 text-2xl'>Job Description</h2>
            <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
            <button

              className='px-10 py-2.5 mt-10 max-md:mx-auto max-md:text-center bg-blue-600 rounded text-white'>Apply now</button>
          </div>
          <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 '>
            <h2>More Jobs from {jobData.companyId.name}</h2>
            {jobs.filter(job => job._id !== jobData._id && job.companyId._id == jobData.companyId._id).filter(job => true).slice(0, 4).map(job => (
              <JobCard key={job._id} {...job} />
            ))

            }
          </div>

        </div>

      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob