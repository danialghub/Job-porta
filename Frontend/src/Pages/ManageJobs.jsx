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
  const { backendUrl, companyToken, getJobs } = useContext(AppContext)

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', { headers: { token: companyToken } })

      if (data.success) {
        setJobs(data.jobsData.reverse())

      } else {
        toast.error(data.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
      }
    } catch (error) {
      toast.error(error.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
    }

  }
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visiblity', { id }, { headers: { token: companyToken } })
      if (data.success) {
        toast.success(data.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
        fetchJobs()
        getJobs()
      } else {
        toast.error(data.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
      }
    } catch (error) {
      toast.error(error.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchJobs()
    }
  }, [companyToken])
  return jobs ? jobs.length === 0 ?
    (<div className='flex items-center justify-center h-[90vh]'>
      <p className='text-xl sm:text-2xl '>هیچ کاری در دسترس نیست یا پست نشده</p>
    </div>) : (
      <>

        <div className='container p-4 max-w-5xl'>
          <div className=''>
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
              <thead>
                <tr className='border-b'>
                  <th className='px-4 py-2 border-b text-right max-sm:hidden'>#</th>
                  <th className='px-4 py-2 border-b text-right'>عنوان کار</th>
                  <th className='px-4 py-2 border-b text-right max-sm:hidden'>تاریخ</th>
                  <th className='px-4 py-2 border-b text-right max-sm:hidden'>مکان</th>
                  <th className='px-4 py-2 border-b text-center max-sm:w-36'>درخواستی ها</th>
                  <th className='px-4 py-2 border-b text-right '>وضعیت نمایش</th>
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
                        onChange={() => changeJobVisibility(item._id)}
                        checked={item.visible} className='scale-125 ml-4' type="checkbox" />
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
          <div className='mt-6 flex justify-end'>
            <button
              onClick={() => navigate('/dashboard/add-job')}
              className='bg-black/70 text-white py-2 px-8 rounded'>ایجاد کار</button>
          </div>
        </div>


      </>
    ) : <Loader />
}

export default ManageJobs