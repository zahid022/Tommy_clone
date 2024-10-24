import img from '../../assets/hero-img.jpg'
import img1 from '../../assets/hero-mobile-img.jpg'
import HomeBtn from '../static/HomeBtn'

function HeroSection({ isMobile }: any) {
  return (
    <section className='relative mb-2'>
      <div>
        <img className='w-full' src={isMobile ? img1 : img} alt="" />
      </div>
      <div
        style={{
          width: 'max-content'
        }}
        className='flex flex-col absolute top-[50%] lg:top-auto z-10 left-[50%] lg:left-[8%] -translate-x-[50%] lg:translate-x-0 lg:bottom-[20%]  text-white'>
        <h4 className='text-center md:text-start uppercase text-[14px] md:text-[20px] tracking-[3px] mb-[6px]'>New Arrivals</h4>
        <h2 className='text-center md:text-start text-[32px] md:text-[60px] mb-3'>Classic Good Looks</h2>
        <p className='text-center text-[14px] md:text-start tracking-[1px] md:text-[22px] lg:leading-8 leading-6'>Dream couple Patrick Schwarzenegger and <br />
          Abby Champion wear our freshest <br className=' md:hidden' /> fall takes on timeless style.</p>
        <div className='flex mt-[25px] md:justify-start justify-center gap-6'>
          <HomeBtn color={'#ffffff80'} txt={"Men's New Arrivals"} />
          <HomeBtn color={'#ffffff80'} txt={"Women's New Arrivals"} />
        </div>
      </div>
    </section>
  )
}

export default HeroSection