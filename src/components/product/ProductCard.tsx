import { useRef } from "react";
import { FaAngleLeft, FaAngleRight, FaRegStar } from "react-icons/fa";
import { ProductType } from "../../types/Type";
import CardColor from "../static/CardColor";
import CardImgSlider from "../static/CardImgSlider";
import Slider from "react-slick";
import CardSlider from "../static/CardSlider";
import { useNavigate } from "react-router-dom";

interface ProductCardType {
  item: ProductType;
  setQuickFlag?: (value: boolean) => void | undefined;
  setId?: (value: string) => void | undefined;
  flag: boolean;
  setColor?: (value: string) => void;
  color?: string;
}

function ProductCard({ item, setQuickFlag, setId, flag, setColor,  color }: ProductCardType) {
  const slider = useRef<Slider>(null);
  const navigate = useNavigate()

  let kod = 0;
  if (item.discount) {
    kod = (+item.discount * 100) / +item.price;
  }

  const goToNextSlide = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const goToPrevSlide = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  return (
    <div>
      {flag ?
        <div className="relative max-h-[500px] card-hover">
          <div className="absolute card-btns top-[50%] left-2 right-2 translate-y-[-50%] flex z-[900] justify-between">
            <button
              className="bg-[#ffffffe6] px-3 rounded-full py-2 text-[14px] text-[#00174f]"
              onClick={goToPrevSlide}
            >
              <FaAngleLeft />
            </button>

            <button
              onClick={() => {
                if (setQuickFlag) {
                  setQuickFlag(true);
                }
                if (setId) {
                  setId(item.id ?? '');
                }
              }}
              className="bg-[#ffffffe6] px-8 py-2 rounded-sm text-[14px] text-[#00174f]">
              Quick View
            </button>

            <button
              className="bg-[#ffffffe6] px-3 rounded-full py-2 text-[14px] text-[#00174f]"
              onClick={goToNextSlide}
            >
              <FaAngleRight />
            </button>
          </div>
          <CardImgSlider ref={slider} data={item.images ? item.images : undefined} />
        </div>
        :
        <div>
          <CardSlider ref={slider} data={item.images ? item.images : undefined} />
        </div>
      }
      <div>
        <p
          onClick={() => navigate(`/en/detail/${item.id}`)}
          className="text-[14px] text-[#00174f] cursor-pointer hover:underline py-2">{item.name}</p>
        <div className="flex items-center pb-2 gap-1">
          <p className={`${item.discount !== '0' ? 'line-through text-[#484848]' : "text-[#00174f]"} font-medium text-[12px]`}>${item.price}</p>
          <p className={`${item.discount !== '0'? '' : 'hidden'} text-[#00174f] text-[12px] font-medium`}>${item.discount ? (+item.price - +item.discount) : ''}</p>
          <p className={`${item.discount !== '0' ? '' : 'hidden text-[12px] text-[#cc0c2f] '}`}>{kod.toFixed(0)}% off</p>
        </div>
        <p className="text-[#cc0c2f] mb-3 text-[12px] ">Extra 25% off $250+ for VIPs</p>
        <div className="flex items-center">
          {item.color?.map((item: string, i: number) => (
            <div key={i}>
              <CardColor setColor={setColor!} color={color ?? ''} item={item} />
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2 gap-[2px]">
          {Array.from({ length: 5 }).map((_, i: number) => (
            <FaRegStar className="text-[12px] cursor-pointer" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
