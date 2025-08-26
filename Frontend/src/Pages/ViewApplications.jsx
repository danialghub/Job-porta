import React, { useContext, useEffect, useState } from 'react'
import { viewApplicationsPageData, assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import Loader from '../Components/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'
const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        {
          headers: { token: companyToken }
        }
      )

      if (data.success) {
        setApplicants(data.applications.reverse())

      } else {
        toast.error(data.message, { className: "max-sm:w-[90vw] mt-5 mx-auto" })
      }
    } catch (error) {
      toast.error(error.message, { className: "max-sm:w-[90vw] mt-5 mx-auto" })

    }
  }
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        {
          headers: { token: companyToken }
        }
      )
      if (data.success) {
        fetchCompanyJobApplications()
        toast.success(data.message, { className: "max-sm:w-[90vw] max-sm:mt-5 max-sm:mx-auto" })
      } else {
        toast.error(data.message, { className: "max-sm:w-[90vw] max-sm:mt-5 max-sm:mx-auto" })
      }
    } catch (error) {
      toast.error(error.message, { className: "max-sm:w-[90vw] max-sm:mt-5 max-sm:mx-auto" })

    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  return applicants ? applicants.length === 0 ?
    (
      (<div className='flex items-center justify-center h-[90vh]'>
        <p className='text-xl sm:text-2xl '>هیچ درخواستی وجود ندارد</p>
      </div>)
    )
    : (

      <div className='container max-w-5xl p-4 '>
        <div>
          <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='px-4 py-2 text-right'>#</th>
                <th className='px-4 py-2 text-right'>نام کاربری</th>
                <th className='px-4 py-2 text-right max-sm:hidden'>عنوان شغل</th>
                <th className='px-4 py-2 text-right max-sm:hidden'>مکان</th>
                <th className='px-4 py-2 text-right'>رزومه</th>
                <th className='px-4 py-2 text-center'>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {applicants.filter(item => item.jobId && item.userId).map((data, idx) => (
                <tr className='text-gray-700' key={idx}>
                  <td className='px-4 py-2 text-right border-b'>{idx + 1}</td>
                  <td className='px-4 py-2 text-right border-b flex items-center'>
                    <img
                      className='w-10 h-10 rounded-full max-sm:hidden ml-3'
                      src={data.userId.image} alt="" />
                    <span>{data.userId.name}</span>
                  </td>
                  <td className='px-4 py-2 text-right border-b max-sm:hidden'>{data.jobId.title}</td>
                  <td className='px-4 py-2 text-right border-b max-sm:hidden'>{data.jobId.location}</td>
                  <td className='px-4 py-2 text-right border-b'>
                    <a
                      className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2  items-center'
                      href={data.userId.resume} target='_blank'>
                      رزومه <img src={assets.resume_download_icon} />
                    </a>
                  </td>

                  <td className='px-4 py-2 text-center  border-b relative '>
                    {data.status === "در حال انتظار"
                      ? (<div className='relative inline-block ml-10   group'>
                        <button className='text-gray-500 action-button '>...</button>
                        <div className='z-10 hidden absolute top-0 right-0 md:left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                          <button
                            onClick={() => changeJobApplicationStatus(data._id, " قبول شده")}
                            className='block w-full text-right px-4 py-2 text-blue-500 hover:bg-gray-100'>قبول شده</button>
                          <button
                            onClick={() => changeJobApplicationStatus(data._id, "رد شده")}
                            className='block w-full text-right px-4 py-2 text-red-500 hover:bg-gray-100'>رد شده</button>
                        </div>
                      </div>)
                      : <div className='text-right mr-10'>{data.status}</div>

                    }

                  </td>
                </tr>
              ))

              }
            </tbody>
          </table>
        </div>
      </div>
    ) : <Loader />
}

export default ViewApplications