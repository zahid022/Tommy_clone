import { forwardRef } from 'react';
import Slider from "react-slick";

interface SliderType {
  data: string[] | undefined;
}

const CardSlider = forwardRef<Slider, SliderType>(({ data }, ref) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider ref={ref} {...settings}>
        {data?.map((item: string, i: number) => (
          <div className='h-[360px] w-[270px] px-2' key={i}>
            <img className='w-full h-full' src={item} alt={`image-${i}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default CardSlider;