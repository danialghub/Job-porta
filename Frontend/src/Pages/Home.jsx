import { useContext } from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import JobListing from '../Components/JobListing'
import Footer from '../Components/Footer'
import { AppContext } from '../context/AppContext'
const Home = () => {



    return (
        <div>
            <Navbar />
            <Hero />
            <JobListing />
            <Footer />

        </div>
    )
}

export default Home