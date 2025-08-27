import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../Components/Loading'
import Pagination from '../Components/Pagination'

const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(false)
  const { backendUrl, companyToken, getJobs } = useContext(AppContext)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', { headers: { token: companyToken } })

      if (data.success) {
        setJobs(data.jobsData.reverse())

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
        toast.success("با موقیت تغییرات اعمال شد")
        fetchJobs()
        getJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchJobs()
    }
  }, [companyToken])
  return jobs ? jobs.length === 0 ?
    (<div className='flex items-center justify-center h-[90vh] flex-1'>
      <p className='text-xl sm:text-2xl '>هیچ کاری در دسترس نیست یا پست نشده</p>
    </div>) : (
      <>

        <div className='container p-4 mt-2 sm:max-w-4xl overflow-hidden min-h-[65vh] relative  flex-1'>
          <div className='overflow-x-auto'>
            <table className='min-w-max sm:min-w-full bg-white border border-gray-200 '>
              <thead>
                <tr className='border-b'>
                  <th className='px-4 py-3 border-b text-right'>#</th>
                  <th className='px-4 py-3 border-b text-right'>عنوان کار</th>
                  <th className='px-4 py-3 border-b text-right '>تاریخ</th>
                  <th className='px-4 py-3 border-b text-right '>مکان</th>
                  <th className='px-4 py-3 border-b text-center '>درخواستی ها</th>
                  <th className='px-4 py-3 border-b text-right '>وضعیت نمایش</th>
                </tr>
              </thead>
              <tbody>
                {jobs.slice((currentPage - 1) * 7, (currentPage) * 7).map((item, idx) => (
                  <tr key={idx} className='text-gray-700'>
                    <td className='px-4 py-3 border-b '>{idx + 1}</td>
                    <td className='px-4 py-3 border-b  '>{item.title}</td>
                    <td className='px-4 py-3 border-b  '>{moment(item.date).format('ll')}</td>
                    <td className='px-4 py-3 border-b  '>{item.location}</td>
                    <td className='px-4 py-3 border-b text-center '>{item.applicants}</td>
                    <td className='px-4 py-3 border-b  text-center'>
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

          <button
            onClick={() => navigate('/dashboard/add-job')}
            className='bg-black/70 text-white py-2 px-8 rounded mt-6'>ایجاد کار</button>
          <div className='absolute bottom-0 right-1/2 translate-x-1/2'>
            <Pagination list={jobs} page={currentPage} setPage={setCurrentPage} perPage={7} />
          </div>
        </div>


      </>
    ) : <Loader />
}

export default ManageJobs