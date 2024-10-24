import img from '../../assets/img-mobile-4.jpg'
import img1 from '../../assets/img-desktop-4.jpg'
import HomeBtn from '../static/HomeBtn'

function FourSection({ isMobile }: any) {
    return (
        <section className='relative'>
            <div>
                <img src={isMobile ? img : img1} alt="" />
            </div>
            <div
                style={{
                    width: 'max-content'
                }}
                className='flex flex-col absolute top-[50%] lg:top-auto z-10 left-[50%] lg:left-[8%] -translate-x-[50%] lg:translate-x-0 lg:bottom-[20%]  text-white'>
                <h2 className='text-center md:text-start text-[32px] md:text-[60px] mb-3'>Tommy Essentials</h2>
                <p className='text-center hidden lg:block md:text-start tracking-[1px] md:text-[22px] lg:leading-8 leading-6'>Our favorites and yours — bestselling styles <br />
                    with our signature Tommy twist.</p>
            </div>
            <div
                style={{
                    width: 'max-content'
                }}
                className='flex mt-[33px] lg:mt-0 absolute pb-[3rem] lg:pb-[120px] bottom-0 left-[50%] lg:left-[8%] lg:translate-x-0 z-10 -translate-x-[50%] text-white md:justify-start justify-center gap-6'>
                <HomeBtn color={'#ffffff80'} txt={"Shop Men"} />
                <HomeBtn color={'#ffffff80'} txt={"Shop Women"} />
            </div>
        </section>
    )
}

export default FourSection