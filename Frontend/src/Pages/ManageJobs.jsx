import React from 'react'
import { manageJobsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const ManageJobs = () => {
  const navigate = useNavigate()
  return (
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
            {manageJobsData.map((item, idx) => (
              <tr key={idx} className='text-gray-700'>
                <td className='px-4 py-2 border-b  max-sm:hidden'>{idx + 1}</td>
                <td className='px-4 py-2 border-b  '>{item.title}</td>
                <td className='px-4 py-2 border-b  max-sm:hidden'>{moment(item.date).format('ll')}</td>
                <td className='px-4 py-2 border-b  max-sm:hidden'>{item.location}</td>
                <td className='px-4 py-2 border-b text-center '>{item.applicants}</td>
                <td className='px-4 py-2 border-b  '>
                  <input className='scale-125 ml-4' type="checkbox" />
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
  )
}

export default ManageJobs