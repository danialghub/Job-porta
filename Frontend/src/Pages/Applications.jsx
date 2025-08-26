import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Loader from '../Components/Loading'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {
    const { user } = useUser()
    const { getToken } = useAuth()

    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)
    const { backendUrl, userData, userApplications, fetchUsersData, fetchUserApplications } = useContext(AppContext)


    const updateResume = async () => {
        try {
            const formData = new FormData()
            formData.append('resume', resume)
            const token = await getToken()

            const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.succuss) {
                toast.success(data.message, { className: "max-sm:w-[90vw] mt-5 mx-auto " })
                await fetchUsersData()
            } else {
                toast.error(data.message, { className: "max-sm:w-[90vw] mt-5 mx-auto" })
            }
        } catch (error) {
            toast.error(error.message, { className: "max-sm:w-[90vw] mt-5 mx-auto" })
        }
        setResume(null)
        setIsEdit(false)

    }
    useEffect(() => {
        if (user) {
            fetchUserApplications()
        }
    }, [user])
    return userApplications ? (
        <>
            <Navbar />

            <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
                {/* Getting Resume Inputs */}
                <h2 className='text-xl font-semibold '>رزومه شما</h2>
                <div className='flex gap-2 mb-6 mt-3'>
                    {isEdit || userData && !userData.resume ?
                        <>
                            <label
                                className='flex items-center'
                                htmlFor="resumeUpload">
                                <p
                                    className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 '
                                >{resume ? resume.name : "انتخاب رزومه"}</p>
                                <input
                                    id="resumeUpload"
                                    onChange={e => setResume(e.target.files[0])}
                                    accept='application/pdf'
                                    type="file"
                                    hidden
                                />
                                <img src={assets.profile_upload_icon} alt="" />
                            </label>
                            <button
                                onClick={updateResume}
                                className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'
                            >ذخیره</button>
                        </>
                        :
                        <div className='flex gap-2'>
                            <a
                                target='_blank'
                                className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg shadow shadow-blue-300'
                                href={userData.resume}>
                                رزومه
                            </a>
                            <button
                                onClick={() => setIsEdit(true)}
                                className='text-gray-500 border border-gray-300 rounded-lg px-5 py-2'>ویرایش</button>
                        </div>
                    }
                </div>
                {/* Job Applied Info */}

                <h2 className='text-xl font-semibold mb-4 '>کارهای درخواست داده شده</h2>
                <>
                    {userApplications.length ?


                        <table className='min-w-full bg-white border rounded-lg max-sm:overflow-x-scroll '>
                            <thead>
                                <tr>
                                    <th className='px-4 py-3  border-b text-right '>شرکت</th>
                                    <th className='px-4 py-3  border-b text-right '>عنوان کار</th>
                                    <th className='px-4 py-3 border-b text-right max-sm:hidden '>مکان</th>
                                    <th className='px-4 py-3 border-b text-right '>تاریخ</th>
                                    <th className='px-4 py-3  border-b text-right '>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody className='max-sm:text-sm'>
                                {userApplications.map((job, idx) => (true ? (
                                    <tr key={idx}>
                                        <td className='px-4 py-3 flex items-center gap-2 border-b'>
                                            <img
                                                className='w-8 h-8'
                                                src={job.companyId.image} alt="" />
                                            {job.companyId.name}
                                        </td>
                                        <td className='px-4 py-3 border-b'>{job.jobId.title}</td>
                                        <td className='px-4 py-3 border-b max-sm:hidden'>{job.jobId.location}</td>
                                        <td className='px-4 py-3 border-b'>{moment(job.date).format('ll')}</td>
                                        <td className='px-4 py-3 border-b '>
                                            <div className={`${job.status == "قبول شده" ? 'bg-green-100' : job.status == 'رد شده' ? 'bg-red-100' : 'bg-blue-100'} w-20 text-center py-1.5 rounded `}>
                                                {job.status}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (null)

                                ))
                                }
                            </tbody>
                        </table>
                        : <div className='min-w-full text-3xl h-[50vh] flex justify-center items-center'>هیچ درخواستی یافت نشد</div>
                    }

                </>

            </div>
            <Footer />

        </>
    ) : <Loader />
}

export default Applications