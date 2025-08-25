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
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        {
          headers: { tokken: companyToken }
        }
      )
      if (data.success) {
        fetchCompanyJobApplications()
        toast.success("Status succussfully changed")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  return applicants && applicants.length ? (
    <div className='container max-w-5xl p-4 '>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left'>#</th>
              <th className='px-4 py-2 text-left'>User Name</th>
              <th className='px-4 py-2 text-left max-sm:hidden'>Job Title</th>
              <th className='px-4 py-2 text-left max-sm:hidden'>Location</th>
              <th className='px-4 py-2 text-left'>Resume</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((data, idx) => (
              <tr className='text-gray-700' key={idx}>
                <td className='px-4 py-2 text-left border-b'>{idx + 1}</td>
                <td className='px-4 py-2 text-left border-b flex items-center'>
                  <img
                    className='w-10 h-10 rounded-full max-sm:hidden mr-3'
                    src={data.userId.image} alt="" />
                  <span>{data.userId.name}</span>
                </td>
                <td className='px-4 py-2 text-left border-b max-sm:hidden'>{data.jobId.title}</td>
                <td className='px-4 py-2 text-left border-b max-sm:hidden'>{data.jobId.location}</td>
                <td className='px-4 py-2 text-left border-b'>
                  <a
                    className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2  items-center'
                    href={data.userId.resume} target='_blank'>
                    Resume <img src={assets.resume_download_icon} />
                  </a>
                </td>
                <td className='px-4 py-2 text-center border-b relative'>
                  <div className='relative inline-block mr-10  group'>
                    <button className='text-gray-500 action-button '>...</button>
                    <div className='z-10 hidden absolute top-0 right-0 md:left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button
                        onClick={() => changeJobApplicationStatus(data._id, "Accepted")}
                        className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button
                        onClick={() => changeJobApplicationStatus(data._id, "Rejected")}
                        className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
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