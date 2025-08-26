import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
const Dashboard = () => {
    const navigate = useNavigate()
    const { companyData, logoutHandler } = useContext(AppContext)
    const navMenu = [
        { title: 'ایجاد کار', route: '/dashboard/add-job', icon: assets.add_icon },
        { title: 'مدیریت کارها', route: '/dashboard/manage-jobs', icon: assets.home_icon },
        { title: 'مشاهده درخواست ها', route: '/dashboard/view-applications', icon: assets.person_tick_icon },
    ]
    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])
    return (
        <div className='min-h-screen'>
            {/* navbar for recruiter Login */}
            <div className='shadow py-4'>
                <div className='px-5 flex items-center justify-between'>
                    <img
                        onClick={() => navigate('/')}
                        className='max-sm:w-32 cursor-pointer'
                        src={assets.logo} alt="" />
                    {companyData && (
                        <div className='flex items-center gap-3'>
                            <p >خوش آمدی, {companyData.name}</p>
                            <div className='relative group'>
                                <img
                                    className='w-8 border rounded-full'
                                    src={companyData.image} alt="" />
                                <div className='hidden absolute group-hover:block top-0 left-0 z-10 text-black rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm shadow'>
                                        <li
                                            onClick={() => navigate('/')}
                                            className='py-2 px-4 cursor-pointer '>خانه
                                        </li>
                                        <li
                                            onClick={logoutHandler}
                                            className='py-2 px-4 cursor-pointer '>خروج
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className='flex items-start'>
                {/* left Sidebar  */}
                <div className='inline-block min-h-screen border-r-2 '>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        {navMenu.map((menu, idx) => (
                            <NavLink
                                key={idx}
                                className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-l-4 border-blue-500 "}`}
                                to={menu.route}>
                                <img
                                    className='min-w-4'
                                    src={menu.icon} alt="" />
                                <p className='max-sm:hidden'>{menu.title}</p>
                            </NavLink>
                        ))}
                    </ul>
                    {/* main content mounts from other pages */}
                </div>

                <div className='flex-1'>

                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Dashboard