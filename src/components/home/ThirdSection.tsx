import img from '../../assets/img-mobile-3.jpg'
import img1 from '../../assets/img-desktop-3.jpg'
import HomeBtn from '../static/HomeBtn'

function ThirdSection({ isMobile }: any) {
    return (
        <section className='relative mb-2'>
            <div>
                <img src={isMobile ? img : img1} alt="" />
            </div>
            <div className='absolute top-[50%] z-10 left-[50%] -translate-x-[50%] -translate-y-[50%] text-white'>
                <h2 style={{width : "max-content"}} className='text-[32px] md:text-[60px] lg:mb-[1.5rem] text-center'>Weightless Warmth</h2>
                <p className='hidden md:text-[22px] leading-9 lg:block text-center'>Lightweight jackets and vests <br />to carry you through fall and winter.</p>
            </div>
            <div className='absolute pb-[3rem] lg:pb-[144px] bottom-0 left-[50%] z-10 -translate-x-[50%] text-white'>
                <div style={{width : "max-content"}} className='flex gap-6 lg:gap-9'>
                    <HomeBtn color={'#ffffff80'} txt={"Shop for Him"} />
                    <HomeBtn color={'#ffffff80'} txt={"Shop for Her"} />
                </div>
            </div>
        </section>
    )
}

export default ThirdSection