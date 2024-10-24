import img from "../../assets/shopCard.jpg"
import HomeBtn from "./HomeBtn"


function HomeShopCard() {
    return (
        <div>
            <div>
                <img src={img} className="w-full" alt="" />
            </div>
            <div className="py-5">
                <h2 className="text-center text-[#00174f] text-[18px] mb-2 md:text-[24px]">New Arrivals</h2>
                <div className="flex text-[#00174f] justify-center">
                    <HomeBtn color={"#00174f80"} txt={"Shop Now"} />
                </div>
            </div>
        </div>
    )
}

export default HomeShopCard