import { forwardRef } from 'react';
import Slider from "react-slick";

interface SliderType {
  data: string[] | undefined;
}

const CardImgSlider = forwardRef<Slider, SliderType>(({ data }, ref) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider ref={ref} {...settings}>
        {data?.map((item: string, i: number) => (
          <div key={i}>
            <img src={item} alt={`image-${i}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default CardImgSlider;