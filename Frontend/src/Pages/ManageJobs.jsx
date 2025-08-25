import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../Components/Loading'

const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(false)
  const { backendUrl, companyToken } = useContext(AppContext)

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', { headers: { token: companyToken } })


      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visiblity', { id }, { headers: { token: companyToken } })
      if (data.success) {
        toast.success("The Job Visibility Status Changed Successfully")
        fetchJobs()
      } else {
        toast.success(data.message)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchJobs()
    }
  }, [companyToken])
  return (
    <>
      {jobs ?
        <div className='container p-4 max-w-5xl'>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
              <thead>
                <tr>
                  <th className='px-4 py-2 border-b text-left max-sm:hidden'>#</th>
                  <th className='px-4 py-2 border-b text-left'>Job Title</th>
                  <th className='px-4 py-2 border-b text-left max-sm:hidden'>Date</th>
                  <th className='px-4 py-2 border-b text-left max-sm:hidden'>Location</th>
                  <th className='px-4 py-2 border-b text-center'>Applicants</th>
                  <th className='px-4 py-2 border-b text-left'>visible</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((item, idx) => (
                  <tr key={idx} className='text-gray-700'>
                    <td className='px-4 py-2 border-b  max-sm:hidden'>{idx + 1}</td>
                    <td className='px-4 py-2 border-b  '>{item.title}</td>
                    <td className='px-4 py-2 border-b  max-sm:hidden'>{moment(item.date).format('ll')}</td>
                    <td className='px-4 py-2 border-b  max-sm:hidden'>{item.location}</td>
                    <td className='px-4 py-2 border-b text-center '>{item.applicants}</td>
                    <td className='px-4 py-2 border-b  '>
                      <input
                        onClick={() => changeJobVisibility(item._id)}
                        checked={item.visible} className='scale-125 ml-4' type="checkbox" />
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              onClick={() => navigate('/dashboard/add-job')}
              className='bg-black text-white py-2 px-4 rounded'>Add new job</button>
          </div>
        </div>
        : <Loader />
      }
    </>
  )
}

export default ManageJobs