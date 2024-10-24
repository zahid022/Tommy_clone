import img from '../../assets/HC_CLUB_LOGO_VERT_BLUE-mb.png'
import img1 from '../../assets/HC_CLUB_LOGO_HOR-dt.png'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

function FooterTop() {
    const [flag, setFlag] = useState<boolean>(true)
    return (
        <section className='py-5 lg:py-10'>
            <div className='flex md:px-28 lg:w-[75%] lg:mx-auto lg:flex-row lg:items-center flex-col items-center md:items-start'>
                <div className='mb-3 lg:w-5/12 mx-auto'>
                    <div className='relative flex mb-3 md:flex-col justify-center'>
                        <h2 className='font-semibold absolute left-[50%] md:left-0 md:translate-x-0 translate-x-[-90%] md:static text-[#000C2D] text-[16px]'>JOIN</h2>
                        <img src={img} alt="" className='w-[120px] md:hidden' />
                        <img src={img1} alt="" className='w-[262px] hidden md:block' />
                    </div>
                    <span className='text-[14px] text-center md:text-start block mb-3 text-[#00174f]'>For a 20% off welcome offer and much more</span>
                </div>
                <div className='w-7/12 mx-auto'>
                    <div className='w-full mb-4'>
                        <div className='w-full md:flex'>
                            <div className='relative md:w-7/12 md:pr-3 w-full mb-3'>
                                <input
                                    type="text"
                                    className='pt-5 pr-3 pb-[6px] text-[14px] pl-4 rounded-sm border outline-none h-11 border-[#00174f] inset-0 block w-full peer'
                                    name='email'
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className='absolute top-3 left-4 text-[12px] text-[#484848] transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#00174f] peer-valid:top-1 peer-valid:text-[10px] peer-valid:text-[#00174f]'>
                                    Your email
                                </label>
                            </div>
                            <button className='text-white md:w-4/12 block w-full text-[14px] h-11 rounded-sm bg-[#00174f]'>Join Now</button>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3' onClick={() => setFlag(!flag)}>
                        <div className={`${flag ? 'bg-[#00174f] border border-[#00174f]' : 'bg-white border border-[#cc0c2f]'} h-5 w-5 flex justify-center items-center rounded-sm`}>
                            {flag && <FaCheck className='text-white text-[12px]' />}
                        </div>
                        <p className='text-[12px] text-[#00174f] leading-4 max-w-[547px] w-[90%]'>By clicking the Join Now button, I agree to the Terms and Conditions and to receive updates on the latest products and promotions via email or other channels. See Privacy Policy, which includes our Notice of Financial Incentive, for more information.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FooterTop