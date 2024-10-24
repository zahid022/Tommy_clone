import { FaXmark } from "react-icons/fa6"
import useWindowWidth from "../static/useWindowWidth ";
import { useEffect, useState } from "react";
import Quantitiy from "../static/Quantitiy";
import { useGetByIdProductQuery } from "../../store/Api";
import Loading from "../static/Loading";
import ProductCard from "./ProductCard";
import CardSize from "../static/CardSize";
import { CartUserType } from "../../types/Type";
import { useAppDispatch } from "../../store/Hooks";
import { setBasket } from "../../store/BasketSlice";

interface filterSideType {
    setQuickFlag: (value: boolean) => void;
    quickFlag: boolean;
    id: string;
}


function QuickSide({ setQuickFlag, quickFlag, id }: filterSideType) {
    const width = useWindowWidth()
    const [classFilter, setClassFilter] = useState<string>('')
    const dispatch = useAppDispatch()

    const [size, setSize] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [count, setCount] = useState<number>(1)

    const { data, isLoading } = useGetByIdProductQuery(id as string, { skip: id === '' })

    function handleAddCart() {
        let obj: CartUserType = {
            count: count,
            productId: id,
            color: color ? color : "green",
            size: size ? size : "xs",
            price: data ? (+data.price - +data.discount) : 100
        }
        dispatch(setBasket(obj))
    }

    useEffect(() => {
        if (width <= 768) {
            if (quickFlag) {
                setClassFilter('translate-y-0');
            } else {
                setClassFilter('translate-y-[300%]');
            }
        } else {
            if (quickFlag) {
                setClassFilter('translate-x-0');
            } else {
                setClassFilter('translate-x-[300%]');
            }
        }
    }, [width, quickFlag]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div
            style={{
                visibility: quickFlag ? 'visible' : 'hidden'
            }}
            className={`${quickFlag ? 'z-[999] opacity-[1]' : '-z-[1] opacity-0'} ${classFilter} fixed duration-300 bg-[#00000080] inset-0`}>
            <div className="relative h-full w-full">
                <div className={`bg-white absolute top-0 ${(width <= 768 ? 'w-full' : "min-w-[500px]")} bottom-0 right-0`}>
                    <div className={`flex sticky items-center z-[999] ${(width <= 768 ? 'w-full' : "min-w-[500px]")} justify-end top-0 right-0 pb-2  p-10`}>
                        <button onClick={() => setQuickFlag(false)} className="bg-[#f9fafb] rounded-full p-2">
                            <FaXmark className="text-[16px] text-[#00174f]" />
                        </button>
                    </div>
                    <div className="max-w-[500px] px-3 h-screen overflow-y-auto pb-64 scrollbar-hide">
                        <div className="mb-4">
                            {!isLoading && data &&
                                <ProductCard setColor={setColor} color={color} flag={false} item={data} />
                            }
                        </div>
                        <div className="flex items-center flex-wrap gap-3">
                            {!isLoading && data &&
                                data.size?.map((item: string, i: number) => (
                                    <CardSize setSize={setSize} size={size} item={item} key={i} />
                                ))
                            }
                        </div>
                    </div>
                    <div className={`sticky bottom-0 z-[999] bg-white right-0 ${(width <= 768 ? 'w-full' : "min-w-[500px]")} px-10 py-6 border-t border-[#e5e5e5]`}>
                        <div className="flex mb-4">
                            <div className="w-3/12">
                                <Quantitiy setCount={setCount} cart={false} />
                            </div>
                            <div className="w-9/12">
                                <button
                                    onClick={handleAddCart}
                                    className="w-full hover:underline text-[14px] flex justify-center items-center text-white bg-[#00174f] py-[12px] rounded-sm">
                                    Add To Bag - ${data ? (+data.price - +data.discount) : ''}
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="text-[14px] text-[#00174f] underline">
                                View Full Product Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickSide