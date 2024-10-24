import { useParams } from "react-router-dom"
import { useEditCartMutation, useGetByIdProductQuery } from "../store/Api"
import Loading from "../components/static/Loading"
import DetailAccordion from "../components/detail/DetailAccordion"
import { FaStar } from "react-icons/fa"
import CardColor from "../components/static/CardColor"
import CardSize from "../components/static/CardSize"
import Quantitiy from "../components/static/Quantitiy"
import { useEffect, useState } from "react"
import DetailSize from "../components/detail/DetailSize"
import BreadCrumbs from "../components/static/BreadCrumbs"
import { useAppDispatch, useAppSelector } from "../store/Hooks"
import { setBasket } from "../store/BasketSlice"
import { CartUserType } from "../types/Type"
import { toast, ToastContainer } from "react-toastify"

function Detail() {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const [flag, setFlag] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const [size, setSize] = useState<string>('')

    const [count, setCount] = useState<number>(1)

    const { data, isLoading } = useGetByIdProductQuery(id as string)

    const [editCart, {isSuccess, error, isError}] = useEditCartMutation()

    const {basket, userId, flag : fl} = useAppSelector(state => state.basket)

    function handleAddBasket() {
        let obj : CartUserType = {
            count : count,
            productId : id ? id : "a",
            color : color ? color : "green",
            size : size ? size : "xs",
            price : data ? (+data.price - +data.discount) : 100
        }
        dispatch(setBasket(obj))
    }

    useEffect(() => {
        if(fl){
            let object = {
                id : userId,
                arr : basket
            }
            editCart(object)
        }
    }, [basket])

    useEffect(() => {
        if(isSuccess){
            toast.success("Added to Cart")
        }

        if(isError){
            console.log(error)
        }

    },[isSuccess, error, isError])

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className="pt-10">
            <ToastContainer />
            {!isLoading && data &&
                <DetailSize img={data.images ? data.images[0] : undefined} setFlag={setFlag} flag={flag} />
            }
            <div className="wrapper">
                <BreadCrumbs categoryName={data && data.categoryName} category={data && data.generalcategoryName} subCategory={data && data.subcategoryName} />
                <div className="flex pb-10 flex-wrap">
                    <div className="md:w-8/12 w-full mb-8 md:mb-0 md:pr-3">
                        <div>
                            <div className="flex mb-8 flex-wrap">
                                {!isLoading && data &&
                                    data.images?.map((item: string, i: number) => (
                                        <div className="size-6/12 px-2 mb-4" key={i}>
                                            <img src={item} className="w-full h-full" alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mb-8">
                                <h2 className="mb-4 text-[14px] font-semibold text-[#00174f]">About the Tommy Tartan Regular Fit Oxford <span className=" capitalize">{!isLoading && data?.generalcategoryName}</span></h2>
                                <p className="text-[18px] text-[#00174f]">{!isLoading && data?.description}</p>
                            </div>
                            <ul>
                                <DetailAccordion data={!isLoading ? data?.details : undefined} txt="Product Details" />
                            </ul>
                        </div>
                    </div>
                    <div className="md:w-4/12 w-full md:pl-3">
                        <div>
                            <p className="text-[14px] text-[#00174f] mb-2">Tommy Hilfiger</p>
                            <h1 className="text-[22px] font-semibold mb-2">{!isLoading && data?.name}</h1>
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: 5 }).map((_, i: number) => (
                                    <FaStar key={i} className="text-[14px] text-[#00174f] cursor-pointer" />
                                ))}
                            </div>
                            {!isLoading && data &&
                                <div className="flex items-center pb-2 gap-3 mb-4">
                                    <p className={`${data.discount ? 'line-through text-[#484848]' : "text-[#00174f]"} font-medium text-[16px]`}>${data.price}</p>
                                    <p className={`${data.discount ? '' : 'hidden'} text-[#00174f] text-[16px] font-medium`}>${data.discount ? (+data.price - +data.discount) : ''}</p>
                                    <p className={`item.discount ? '' : 'hidden' text-[16px] text-[#cc0c2f]`}>{((+data.discount * 100) / +data.price).toFixed(0)}% off</p>
                                </div>
                            }
                            <div className="mb-6">
                                <p className="text-[#484848] text-[14px] mb-2">Color</p>
                                <div className="flex flex-wrap">
                                    {!isLoading && data && data.color?.map((item: string, i: number) => (
                                        <div key={i}>
                                            <CardColor color={color} setColor={setColor} item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[#484848] text-[14px]">Size</p>
                                    <button
                                        onClick={() => setFlag(true)}
                                        className="text-[#484848] text-[14px] underline">
                                        Find My Size
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {!isLoading && data && data.size?.map((item: string, i: number) => (
                                        <div key={i}>
                                            <CardSize setSize={setSize} size={size} item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <p>
                                    <button className="text-[#484848] text-[14px] underline mb-4">Size Guide</button>
                                </p>
                                <div className="flex flex-wrap">
                                    <div className="w-3/12 ">
                                        <Quantitiy setCount={setCount} cart={false} />
                                    </div>
                                    <div className="w-9/12">
                                        <button
                                            onClick={handleAddBasket}
                                            className="w-full py-3 flex justify-center items-center hover:underline bg-[#00174f] text-white">
                                            Add To Bag
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul>
                                    <li className="text-[#484848] text-[14px] mb-2">Free Standard Shipping on Orders $100+</li>
                                    <li className="text-[#484848] text-[14px] mb-2">4 interest-free payments of $13.91 with Klarna.</li>
                                    <li className="text-[#484848] text-[14px] mb-2">or 4 interest-free payments of $13.91 with</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Detail
