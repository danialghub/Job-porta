import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddJob = () => {

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('Bangalore')
    const [category, setCategory] = useState('Programming')
    const [level, setLevel] = useState('Beginner level')
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken, getJobs } = useContext(AppContext)

    useEffect(() => {
        if (!quillRef.current && editorRef.current)
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            })
    }, [])
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl + "/api/company/post-job", {
                title,
                description,
                category,
                level,
                salary,
                location,
            }, { headers: { token: companyToken } })
            if (data.success) {
                toast.success("a new Job Successufully Added", { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
                setTitle("")
                setSalary(0)
                quillRef.current.root.innerHTML = ""
                getJobs()
            } else {
                toast.error(data.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })
            }
        } catch (error) {
            toast.error(error.message, { className: "max-sm:w-[70vw] max-sm:mr-12 max-sm:mt-4 max-sm:mx-auto" })

        }
    }


    return (
        <form className='container max-w-5xl p-4 flex flex-col w-full items-start gap-5'>
            <div className='w-full'>
                <p className='mb-2 text-gray-600'>عنوان کار</p>
                <input
                    placeholder='عنوان'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>
            <div className='w-full max-w-lg'>
                <p className='my-2 text-gray-600'>توضیحات کار</p>
                <div ref={editorRef}></div>

            </div>
            <div className='flex flex-col items-start sm:flex-row w-full  sm:items-center gap-8 sm:gap-8'>
                <div className='w-full'>
                    <p className='mb-2 text-gray-600'>دسته بندی کار</p>
                    <select
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded  outline-none'
                        value={category}
                        onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((item, idx) => (
                            <option key={idx} value={item}>{item}</option>
                        ))

                        }
                    </select>
                </div>
                <div className='w-full'>
                    <p className='mb-2 text-gray-600'>مکان کار</p>
                    <select
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded  outline-none'
                        value={location}
                        onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((item, idx) => (
                            <option key={idx} value={item}>{item}</option>
                        ))

                        }
                    </select>
                </div>
                <div className='w-full'>
                    <p className='mb-2 text-gray-600'>سطح کار</p>
                    <select
                        className='w-full  px-3 py-2 border-2 border-gray-300 rounded outline-none'
                        value={level}
                        onChange={e => setLevel(e.target.value)}>

                        <option value='سطح مبتدی'>سطح مبتدی</option>
                        <option value='سطح جونیور'>سطح جونیور</option>
                        <option value='سطح سنیور'>سطح سنیور</option>

                    </select>
                </div>
            </div>

            <div className=''>
                <p className='mb-2 text-gray-600'>حقوق کار</p>
                <input
                    value={salary}
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
                    onChange={e => setSalary(e.target.value)}
                    type="Number"
                    min={0} />
            </div>
            <button
                onClick={onSubmitHandler}
                className='w-28 py-2 mt-4 bg-gray-800 text-white rounded'>ایجاد</button>

        </form>
    )
}

export default AddJob