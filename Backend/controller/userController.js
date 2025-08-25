import User from '../models/User.js'
import Job from '../models/Job.js'
import JobApplication from '../models/jobApplicarion.js'
import { v2 as cloudinary } from 'cloudinary'
//get user data

export const getUserData = async (req, res) => {
    const userId = req.auth().userId

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ succuss: false, message: "User Not Found!" })
        }
        res.json({ succuss: true, user })
    } catch (error) {
        res.json({ succuss: false, message: error.message })
    }
}

//Apply for a job

export const applyForJob = async (req, res) => {
    const { jobId } = req.body

    const userId = req.auth().userId

    try {
        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length) {
            return res.json({ succuss: false, message: "Already Applied!" })
        }
        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ succuss: false, message: "Job Not Found!" })
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
       return res.json({ succuss: true, message: "Applied Successfully" })
    } catch (error) {
        res.json({ succuss: false, message: error.message })
    }
}

//get user applied applications

export const getUserJobApplications = async (req, res) => {
    try {

        const userId = req.auth().userId

        const application = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()
        if (!application.length) {
            return res.json({ succuss: false, message: "No job Applications found for this user!" })
        }
        return res.json({ succuss: true, application })
    } catch (error) {
        res.json({ succuss: false, message: error.message })
    }
}

//update user profile

export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth().userId
        const resumeFile = req.file
        console.log(resumeFile);

        const userData = await User.findById(userId)
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
            await userData.save()
            return res.json({ succuss: true, message: "Resume Updated!" })
        } else {
            res.json({ succuss: false, message: "Resume didn't Upload" })
        }

    } catch (error) {
        res.json({ succuss: false, message: error.message })
    }
}