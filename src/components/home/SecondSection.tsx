import video from '../../assets/second-mobile.mp4'
import HomeBtn from '../static/HomeBtn';
import left from '../../assets/left-2.jpg'
import right from '../../assets/right-2.jpg'
import Upload from '../static/Upload';

function SecondSection() {
  return (
    <section className='relative mb-2'>
      {/* <Upload /> */}
      <div className='lg:hidden'>
        <video src={video} className='w-full' autoPlay muted loop>
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='absolute lg:hidden top-[55%] z-10 left-[50%] -translate-x-[50%] -translate-y-[50%] text-white'>
        <h2 className='text-center text-[32px]'>Sweater Weather <br />Is Here</h2>
      </div>
      <div className='flex lg:hidden flex-col gap-[34px] text-white items-center bottom-0 absolute left-[50%] translate-x-[-50%] pb-[4rem]'>
        <HomeBtn txt={"Shop Men's Sweaters"} />
        <HomeBtn txt={"Shop Women's Sweaters"} />
      </div>
      <div className='hidden lg:block relative'>
        <div className='flex'>
            <div className="w-6/12">
                <img src={left} alt="" />
            </div>
            <div className="w-6/12">
                <img src={right} alt="" />
            </div>
        </div>
        <div className='absolute text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 p-[2rem]'>
            <h2 className='text-[60px] text-center mb-[1.4rem]'>Sweater Weather Is Here</h2>
            <p className='text-center text-[22px] leading-9'>Our favorite lightweight and layerable picks, <br />in cool cotton, cozy cashmere and more.</p>
        </div>
        <div className='absolute pb-[144px] bottom-0 left-[50%] z-10 translate-x-[-50%]'>
            <div className='flex gap-9 text-white'>
                <HomeBtn color={'#ffffff80'} txt={"Shop Men's Sweaters"} />
                <HomeBtn color={'#ffffff80'} txt={"Shop Women's Sweaters"} />
            </div>
        </div>
      </div>
    </section>
  );
}

export default SecondSection;
