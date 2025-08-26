import { assets } from '../assets/assets'


const Footer = () => {
    return (
        <div className='container mx-auto px-4 2xl:px-20 flex justify-between items-center gap-4 py-3 mt-20'>
            <img width={160} src={assets.logo} alt="" />
            <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>حق کپی @DanialAz |حق کپی محفوظ شده.</p>
            <div className='flex gap-2.5'>
                <img width={38} src={assets.facebook_icon} alt="facebook" />
                <img width={38} src={assets.twitter_icon} alt="twitter" />
                <img width={38} src={assets.instagram_icon} alt="instagram" />
            </div>
        </div>
    )
}

export default Footer