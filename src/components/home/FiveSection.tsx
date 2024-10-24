import HomeBtn from "../static/HomeBtn"
import HomeShopCard from "../static/HomeShopCard"

const arr = [
    {
        name : "Men's Shirts",
        path : `?category=men&generalCategory=t-shirts`
    },
    {
        name : "Men's Pants",
        path : `?category=men&generalCategory=pants`
    },
    {
        name : "Women's Sweaters",
        path : `?category=women&generalCategory=sweaters`
    },
    {
        name : "Women's Bags",
        path : `?category=women&generalCategory=bags`
    },
]

function FiveSection() {
    return (
        <section>
            <div className="wrapper">
                <div className="pt-10">
                    <h2 className="text-center mb-10 text-[#00174f] text-[32px]">Explore More</h2>
                </div>
                <div className="flex justify-center flex-wrap mb-8">
                    {arr.map((item, i) => (
                        <div key={i} className="w-6/12 md:w-2/12 px-1 flex justify-center mb-6 text-[#00174f]">
                            <HomeBtn color={"#00174f80"} path={item.path} txt={item.name} />
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap">
                    {Array.from({length : 4}).map((_, i) => (
                        <div className={`pr-3 w-6/12 lg:w-3/12`} key={i}>
                            <HomeShopCard />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FiveSection