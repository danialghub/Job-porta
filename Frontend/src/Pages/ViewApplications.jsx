import React from 'react'
import { viewApplicationsPageData, assets } from '../assets/assets'
const ViewApplications = () => {
  return (
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
            {viewApplicationsPageData.map((data, idx) => (
              <tr className='text-gray-700' key={idx}>
                <td className='px-4 py-2 text-left border-b'>{idx + 1}</td>
                <td className='px-4 py-2 text-left border-b flex'>
                  <img
                    className='w-10 h-10 rounded-full max-sm:hidden mr-3'
                    src={data.imgSrc} alt="" />
                  <span>{data.name}</span>
                </td>
                <td className='px-4 py-2 text-left border-b max-sm:hidden'>{data.jobTitle}</td>
                <td className='px-4 py-2 text-left border-b max-sm:hidden'>{data.location}</td>
                <td className='px-4 py-2 text-left border-b'>
                  <a
                    className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2  items-center'
                    href="" target='_blank'>
                    Resume <img src={assets.resume_download_icon} />
                  </a>
                </td>
                <td className='px-4 py-2 text-center border-b relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute top-0 right-0 md:left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
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
  )
}

export default ViewApplications